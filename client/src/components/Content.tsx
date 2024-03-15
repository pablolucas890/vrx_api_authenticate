import clsx from 'clsx';
import React from 'react';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Content({ children, ...rest }: ContentProps) {
  const { className, ...props } = rest;

  return (
    <div
      {...props}
      className={clsx('bg-secondary-100 flex flex-col justify-center w-full p-10 h-screen items-center', className)}
    >
      {children}
    </div>
  );
}
