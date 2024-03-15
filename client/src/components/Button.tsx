import clsx from 'clsx';
import React from 'react';

import { MdNavigateNext } from 'react-icons/md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  hasIcon?: boolean;
  active?: boolean;
}

export default function Button({ title, hasIcon, active, ...rest }: ButtonProps) {
  const { className, ...props } = rest;

  return (
    <div className='relative'>
      <button
        {...props}
        className={clsx(
          'text-white font-poopins p-3 rounded-md border-0 w-200 flex justify-center items-center',
          active ? 'bg-primary-500' : 'bg-primary-300',
          className,
        )}
      >
        <p className='font-bold'>{title}</p>
        {hasIcon && <MdNavigateNext className='text-white top-4 left-4 text-3xl ml-5' />}
      </button>
    </div>
  );
}
