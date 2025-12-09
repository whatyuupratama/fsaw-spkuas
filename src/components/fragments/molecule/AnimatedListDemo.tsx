'use client';

import { cn } from '@/lib/utils';
import { AnimatedList } from '@/components/magicui/animated-list';

interface Item {
  name: string;
  icon: string;
  color: string;
}

interface NotificationProps extends Item {
  delay?: number;
}

let notifications = [
  {
    name: 'Alternatif unggulan ditemukan',
    icon: '📊',
    color: '#FFB800',
  },
  {
    name: 'Normalisasi matriks selesai',
    icon: '📐',
    color: '#FF3D71',
  },
  {
    name: 'Perbandingan bobot diperbarui',

    icon: '⚖️',
    color: '#00C9A7',
  },
  {
    name: 'Ranking akhir siap dibagikan',
    icon: '🚀',
    color: '#1E86FF',
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, icon, color, delay = 0 }: NotificationProps) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4',
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className='flex flex-row items-center gap-3'>
        <div
          className='flex size-10 items-center justify-center rounded-2xl'
          style={{
            backgroundColor: color,
          }}
        >
          <span className='text-lg'>{icon}</span>
        </div>
        <div className='flex flex-col overflow-hidden'>
          <figcaption className='flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white '>
            <span className='text-sm sm:text-lg'>{name}</span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  className,
  delay = 100,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        'relative flex h-[260px] flex-col overflow-hidden text-black w-auto',
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} delay={idx * delay} />
        ))}
      </AnimatedList>
    </div>
  );
}
