'use client';

import { create } from 'zustand';
import { Alternative, Criterion, FuzzyValue } from '@/utils/fuzzy/fuzzySaw';

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const blankValue = (): FuzzyValue => ({ low: 0, mid: 0, high: 0 });

const baseCriteria: Criterion[] = [
  { id: 'c1', name: 'Kualitas Data Historis', weight: 0.35, type: 'max' },
  { id: 'c2', name: 'Kinerja Aktual', weight: 0.25, type: 'max' },
  { id: 'c3', name: 'Biaya Implementasi', weight: 0.2, type: 'min' },
  { id: 'c4', name: 'Potensi Dampak', weight: 0.2, type: 'max' },
];

const baseAlternatives: Alternative[] = [
  {
    id: 'a1',
    name: 'Alternatif A',
    values: {
      c1: { low: 60, mid: 70, high: 85 },
      c2: { low: 50, mid: 60, high: 70 },
      c3: { low: 20, mid: 30, high: 40 },
      c4: { low: 65, mid: 75, high: 90 },
    },
  },
  {
    id: 'a2',
    name: 'Alternatif B',
    values: {
      c1: { low: 40, mid: 55, high: 70 },
      c2: { low: 35, mid: 45, high: 55 },
      c3: { low: 15, mid: 25, high: 35 },
      c4: { low: 50, mid: 60, high: 75 },
    },
  },
  {
    id: 'a3',
    name: 'Alternatif C',
    values: {
      c1: { low: 70, mid: 80, high: 95 },
      c2: { low: 45, mid: 55, high: 65 },
      c3: { low: 18, mid: 28, high: 32 },
      c4: { low: 60, mid: 70, high: 85 },
    },
  },
];

const buildDefaultCriteria = (): Criterion[] =>
  baseCriteria.map((criterion) => ({ ...criterion }));

const buildDefaultAlternatives = (): Alternative[] =>
  baseAlternatives.map((alternative) => ({
    ...alternative,
    values: Object.entries(alternative.values).reduce<Record<string, FuzzyValue>>(
      (acc, [criterionId, value]) => {
        acc[criterionId] = { ...value };
        return acc;
      },
      {},
    ),
  }));

interface FuzzySawState {
  criteria: Criterion[];
  alternatives: Alternative[];
  addCriterion: () => void;
  updateCriterion: (id: string, payload: Partial<Omit<Criterion, 'id'>>) => void;
  removeCriterion: (id: string) => void;
  addAlternative: () => void;
  updateAlternativeName: (id: string, name: string) => void;
  removeAlternative: (id: string) => void;
  updateAlternativeValue: (
    alternativeId: string,
    criterionId: string,
    payload: Partial<FuzzyValue>,
  ) => void;
  resetDefaults: () => void;
}

export const useFuzzySawStore = create<FuzzySawState>((set, get) => ({
  criteria: buildDefaultCriteria(),
  alternatives: buildDefaultAlternatives(),
  addCriterion: () => {
    set((state) => {
      const newCriterion: Criterion = {
        id: createId('c'),
        name: `Kriteria ${state.criteria.length + 1}`,
        weight: 0.1,
        type: 'max',
      };

      const updatedAlternatives = state.alternatives.map((alternative) => ({
        ...alternative,
        values: {
          ...alternative.values,
          [newCriterion.id]: blankValue(),
        },
      }));

      return {
        criteria: [...state.criteria, newCriterion],
        alternatives: updatedAlternatives,
      };
    });
  },
  updateCriterion: (id, payload) => {
    set((state) => ({
      criteria: state.criteria.map((criterion) =>
        criterion.id === id ? { ...criterion, ...payload } : criterion,
      ),
    }));
  },
  removeCriterion: (id) => {
    set((state) => ({
      criteria: state.criteria.filter((criterion) => criterion.id !== id),
      alternatives: state.alternatives.map((alternative) => {
        const updatedValues = { ...alternative.values };
        delete updatedValues[id];
        return { ...alternative, values: updatedValues };
      }),
    }));
  },
  addAlternative: () => {
    const { criteria } = get();
    set((state) => {
      const newAlternative: Alternative = {
        id: createId('a'),
        name: `Alternatif ${String.fromCharCode(65 + state.alternatives.length)}`,
        values: criteria.reduce<Record<string, FuzzyValue>>((acc, criterion) => {
          acc[criterion.id] = blankValue();
          return acc;
        }, {}),
      };

      return { alternatives: [...state.alternatives, newAlternative] };
    });
  },
  updateAlternativeName: (id, name) => {
    set((state) => ({
      alternatives: state.alternatives.map((alternative) =>
        alternative.id === id ? { ...alternative, name } : alternative,
      ),
    }));
  },
  removeAlternative: (id) => {
    set((state) => ({
      alternatives: state.alternatives.filter((alternative) => alternative.id !== id),
    }));
  },
  updateAlternativeValue: (alternativeId, criterionId, payload) => {
    set((state) => ({
      alternatives: state.alternatives.map((alternative) => {
        if (alternative.id !== alternativeId) {
          return alternative;
        }
        return {
          ...alternative,
          values: {
            ...alternative.values,
            [criterionId]: {
              ...ensureValue(alternative.values[criterionId]),
              ...payload,
            },
          },
        };
      }),
    }));
  },
  resetDefaults: () =>
    set({
      criteria: buildDefaultCriteria(),
      alternatives: buildDefaultAlternatives(),
    }),
}));

const ensureValue = (value?: FuzzyValue): FuzzyValue => value ?? blankValue();
