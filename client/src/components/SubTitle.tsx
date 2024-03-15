import clsx from 'clsx';
import React from 'react';

interface SubTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  title: string;
}

export default function SubTitle({ title, ...rest }: SubTitleProps) {
  const { className, ...props } = rest;

  return (
    <p className={clsx('text-sm text-primary-450', className)} {...props}>
      {title}
    </p>
  );
}
