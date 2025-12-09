'use client';
import React from 'react';
import { Boxes } from '@/components/ui/background-boxes';

type BackgroundBoxesDemoProps = {
  className?: string;
};
export function BackgroundBoxesDemo({ className }: BackgroundBoxesDemoProps) {
  return (
    <div
      className={`h-full relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg ${
        className || ''
      }`}
    >
      <div className='absolute inset-0 w-full h-full' />
      <Boxes />
    </div>
  );
}
