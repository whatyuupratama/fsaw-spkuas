export type CriterionType = 'max' | 'min';

export interface FuzzyValue {
  low: number;
  mid: number;
  high: number;
}

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  type: CriterionType;
}

export interface Alternative {
  id: string;
  name: string;
  values: Record<string, FuzzyValue>;
}

export interface WeightSummary {
  id: string;
  name: string;
  rawWeight: number;
  normalizedWeight: number;
  type: CriterionType;
}

export interface MatrixRow {
  alternativeId: string;
  alternativeName: string;
  values: Record<string, FuzzyValue>;
}

export interface AggregatedScore {
  alternativeId: string;
  alternativeName: string;
  fuzzyScore: FuzzyValue;
  crispScore: number;
}

export interface NormalizationReference {
  criterionId: string;
  criterionName: string;
  max: FuzzyValue;
  min: FuzzyValue;
  type: CriterionType;
}

export interface FuzzySawResult {
  weightSummary: WeightSummary[];
  decisionMatrix: MatrixRow[];
  normalizedMatrix: MatrixRow[];
  weightedMatrix: MatrixRow[];
  aggregatedScores: AggregatedScore[];
  ranking: AggregatedScore[];
  normalizationReferences: Record<string, NormalizationReference>;
}

const emptyFuzzy: FuzzyValue = { low: 0, mid: 0, high: 0 };

const ensureFuzzy = (value?: FuzzyValue): FuzzyValue =>
  value ?? { ...emptyFuzzy };

const safeDivide = (numerator: number, denominator: number): number => {
  if (denominator === 0) {
    return 0;
  }

  return parseFloat((numerator / denominator).toFixed(6));
};

const multiplyFuzzy = (value: FuzzyValue, multiplier: number): FuzzyValue => ({
  low: parseFloat((value.low * multiplier).toFixed(6)),
  mid: parseFloat((value.mid * multiplier).toFixed(6)),
  high: parseFloat((value.high * multiplier).toFixed(6)),
});

const addFuzzy = (a: FuzzyValue, b: FuzzyValue): FuzzyValue => ({
  low: parseFloat((a.low + b.low).toFixed(6)),
  mid: parseFloat((a.mid + b.mid).toFixed(6)),
  high: parseFloat((a.high + b.high).toFixed(6)),
});

export const defuzzify = (value: FuzzyValue): number => {
  const crisp = (value.low + 4 * value.mid + value.high) / 6;
  return parseFloat(crisp.toFixed(6));
};

const buildNormalizationReference = (
  criteria: Criterion[],
  alternatives: Alternative[],
): Record<string, NormalizationReference> => {
  return criteria.reduce<Record<string, NormalizationReference>>((acc, criterion) => {
    const values = alternatives.map((alt) => ensureFuzzy(alt.values[criterion.id]));

    if (values.length === 0) {
      acc[criterion.id] = {
        criterionId: criterion.id,
        criterionName: criterion.name,
        max: { ...emptyFuzzy },
        min: { ...emptyFuzzy },
        type: criterion.type,
      };

      return acc;
    }

    acc[criterion.id] = {
      criterionId: criterion.id,
      criterionName: criterion.name,
      max: {
        low: Math.max(...values.map((value) => value.low)),
        mid: Math.max(...values.map((value) => value.mid)),
        high: Math.max(...values.map((value) => value.high)),
      },
      min: {
        low: Math.min(...values.map((value) => value.low)),
        mid: Math.min(...values.map((value) => value.mid)),
        high: Math.min(...values.map((value) => value.high)),
      },
      type: criterion.type,
    };

    return acc;
  }, {});
};

const normalizeValue = (
  value: FuzzyValue,
  reference: NormalizationReference,
): FuzzyValue => {
  if (reference.type === 'max') {
    return {
      low: reference.max.low === 0 ? 0 : safeDivide(value.low, reference.max.low),
      mid: reference.max.mid === 0 ? 0 : safeDivide(value.mid, reference.max.mid),
      high: reference.max.high === 0 ? 0 : safeDivide(value.high, reference.max.high),
    };
  }

  return {
    low: value.low === 0 ? 0 : safeDivide(reference.min.low, value.low),
    mid: value.mid === 0 ? 0 : safeDivide(reference.min.mid, value.mid),
    high: value.high === 0 ? 0 : safeDivide(reference.min.high, value.high),
  };
};

export const calculateFuzzySaw = (
  criteria: Criterion[],
  alternatives: Alternative[],
): FuzzySawResult => {
  const decisionMatrix: MatrixRow[] = alternatives.map((alternative) => ({
    alternativeId: alternative.id,
    alternativeName: alternative.name,
    values: criteria.reduce<Record<string, FuzzyValue>>((acc, criterion) => {
      acc[criterion.id] = ensureFuzzy(alternative.values[criterion.id]);
      return acc;
    }, {}),
  }));

  const weightSum = criteria.reduce((total, criterion) => total + criterion.weight, 0);
  const normalizedWeightFallback = criteria.length === 0 ? 0 : 1 / criteria.length;

  const weightSummary: WeightSummary[] = criteria.map((criterion) => {
    const normalizedWeight =
      weightSum === 0
        ? normalizedWeightFallback
        : parseFloat((criterion.weight / weightSum).toFixed(6));

    return {
      id: criterion.id,
      name: criterion.name,
      rawWeight: parseFloat(criterion.weight.toString()),
      normalizedWeight,
      type: criterion.type,
    };
  });

  const weightMap = weightSummary.reduce<Record<string, number>>((acc, summary) => {
    acc[summary.id] = summary.normalizedWeight;
    return acc;
  }, {});

  const normalizationReferences = buildNormalizationReference(criteria, alternatives);

  const normalizedMatrix: MatrixRow[] = decisionMatrix.map((row) => ({
    alternativeId: row.alternativeId,
    alternativeName: row.alternativeName,
    values: Object.entries(row.values).reduce<Record<string, FuzzyValue>>(
      (acc, [criterionId, value]) => {
        const reference = normalizationReferences[criterionId];
        acc[criterionId] = normalizeValue(value, reference);
        return acc;
      },
      {},
    ),
  }));

  const weightedMatrix: MatrixRow[] = normalizedMatrix.map((row) => ({
    alternativeId: row.alternativeId,
    alternativeName: row.alternativeName,
    values: Object.entries(row.values).reduce<Record<string, FuzzyValue>>(
      (acc, [criterionId, value]) => {
        const weight = weightMap[criterionId] ?? normalizedWeightFallback;
        acc[criterionId] = multiplyFuzzy(value, weight);
        return acc;
      },
      {},
    ),
  }));

  const aggregatedScores: AggregatedScore[] = weightedMatrix.map((row) => {
    const fuzzyScore = Object.values(row.values).reduce<FuzzyValue>((acc, value) => addFuzzy(acc, value), {
      ...emptyFuzzy,
    });

    return {
      alternativeId: row.alternativeId,
      alternativeName: row.alternativeName,
      fuzzyScore,
      crispScore: defuzzify(fuzzyScore),
    };
  });

  const ranking = [...aggregatedScores].sort((a, b) => b.crispScore - a.crispScore);

  return {
    weightSummary,
    decisionMatrix,
    normalizedMatrix,
    weightedMatrix,
    aggregatedScores,
    ranking,
    normalizationReferences,
  };
};

export const formatFuzzyValue = (value: FuzzyValue): string =>
  [value.low, value.mid, value.high].map((point) => point.toFixed(3)).join(' | ');
