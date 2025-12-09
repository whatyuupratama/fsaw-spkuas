'use client';

import React, { forwardRef, useRef } from 'react';

import { cn } from '@/lib/utils';
import { AnimatedBeam } from '@/components/magicui/animated-beam';

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = 'Circle';

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className='relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10'
      ref={containerRef}
    >
      <div className='flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10'>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div1Ref}>
            <Icons.susu />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.brokoli />
          </Circle>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div2Ref}>
            <Icons.wortel />
          </Circle>
          <Circle ref={div4Ref} className='size-16'>
            <Icons.anak />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.ikan />
          </Circle>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Circle ref={div3Ref}>
            <Icons.apel />
          </Circle>
          <Circle ref={div7Ref}>
            <Icons.telur />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        pathWidth={3}
        pathColor='white'
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        pathWidth={3}
        pathColor='white'
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        pathWidth={3}
        pathColor='white'
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        pathWidth={3}
        pathColor='white'
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        pathWidth={3}
        pathColor='white'
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        pathWidth={3}
        pathColor='white'
        reverse
      />
    </div>
  );
}

const Icons = {
  anak: () => <span style={{ fontSize: '2.5rem' }}>👶</span>,
  susu: () => <span style={{ fontSize: '1.5rem' }}>🥛</span>,
  brokoli: () => <span style={{ fontSize: '1.5rem' }}>🥦</span>,
  apel: () => <span style={{ fontSize: '1.5rem' }}>🍎</span>,
  wortel: () => <span style={{ fontSize: '1.5rem' }}>🥕</span>,
  telur: () => <span style={{ fontSize: '1.5rem' }}>🥚</span>,
  ikan: () => <span style={{ fontSize: '1.5rem' }}>🐟</span>,
};
