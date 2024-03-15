import clsx from 'clsx';
import React from 'react';

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
}

export default function Anchor({ title, ...rest }: AnchorProps) {
  const { className, ...props } = rest;

  return (
    <a {...props} className={clsx('text-sm text-primary-500 font-bold', className)}>
      {title}
    </a>
  );
}
