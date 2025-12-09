'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const frontMembers = [
  { name: 'Fiky', src: '/team/fiky.png' },
  { name: 'Meita', src: '/team/meita.png' },
  { name: 'Sarah', src: '/team/sarah.png' },
];

const trailingMember = { name: 'Wahyu', src: '/team/wahyu.png' };

const wiggle = (delay = 0, duration = 3) => ({
  animate: {
    rotate: ['-3deg', '3deg', '-3deg'],
  },
  transition: {
    repeat: Infinity,
    duration,
    ease: 'easeInOut',
    delay,
  },
});

const IconBubble = ({
  src,
  size,
  delay,
  duration = 3,
  alt,
}: {
  src: string;
  size: number;
  delay?: number;
  duration?: number;
  alt: string;
}) => {
  const motionProps = wiggle(delay, duration);
  return (
    <motion.div
      className='relative flex items-center justify-center rounded-full border-4 border-white/70 bg-white/50 shadow-2xl shadow-[#87003d]/40 backdrop-blur-sm'
      style={{ width: size, height: size }}
      animate={motionProps.animate}
      transition={motionProps.transition}
    >
      <div className='relative h-full w-full overflow-hidden rounded-full'>
        <Image src={src} alt={alt} fill sizes={`${size}px`} className='object-cover' />
      </div>
    </motion.div>
  );
};

const IconTeam = () => {
  const marqueeDuration = 28;
  const frontSpacing = 1.1;
  const trailingDelay = 7.5;
  const lineup = [
    { ...frontMembers[0], size: 120, delay: 0 },
    { ...frontMembers[1], size: 120, delay: frontSpacing },
    { ...frontMembers[2], size: 120, delay: frontSpacing * 2 },
    { ...trailingMember, size: 150, delay: trailingDelay },
  ];

  return (
    <div className='relative left-1/2 right-1/2 mb-8 h-56 w-screen -translate-x-1/2 overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl' aria-hidden />
      {lineup.map((member) => (
        <motion.div
          key={member.name}
          className='absolute top-1/2 -translate-y-1/2'
          style={{ willChange: 'transform' }}
          initial={{ x: '115vw' }}
          animate={{ x: '-115vw' }}
          transition={{
            duration: marqueeDuration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: member.delay,
          }}
        >
          <IconBubble src={member.src} size={member.size} alt={member.name} delay={0} duration={3.8} />
        </motion.div>
      ))}
    </div>
  );
};

export default IconTeam;
