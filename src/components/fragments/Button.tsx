import React, { JSX } from 'react';

type ButtonProps = {
  value: string;
  variant?: 'red' | 'white';
  className?: string;
  onClick?: () => void;
};

export default function Button({
  value,
  variant,
  className,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`
        ${className}
        ${
          variant === 'red'
            ? 'bg-[#A0153E] text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer'
            : 'bg-white text-[#A0153E] px-4 py-2 rounded border border-[#A0153E] hover:bg-[#A0153E] hover:text-white transition-colors duration-300 cursor-pointer'
        }
      `}
    >
      {value}
    </button>
  );
}
