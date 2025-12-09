'use client';

import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/magicui/grid-pattern';

interface GridPatternProps {
  className?: string;
}

export function GridPatternDemo({ className }: GridPatternProps) {
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={'4 2'}
        className={cn(
          '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]'
        )}
      />
    </div>
  );
}
