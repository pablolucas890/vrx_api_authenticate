import clsx from 'clsx';
import React from 'react';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export default function Title({ title, ...rest }: TitleProps) {
  const { className, ...props } = rest;

  return (
    <h1 {...props} className={clsx('text-2xl font-bold text-primary-450', className)}>
      {title}
    </h1>
  );
}
