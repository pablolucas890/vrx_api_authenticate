import clsx from 'clsx';
import React from 'react';

interface CardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  title: string;
}

export default function Card({ url, title, ...rest }: CardProps) {
  return (
    <a
      {...rest}
      href={url}
      className={clsx(
        'bg-white rounded-2xl shadow-md p-5 w-80 h-40 flex flex-col justify-center items-center',
        'font-poopins text-primary-500 hover:bg-opacity-30 hover:scale-110 hover:shadow-xl duration-300',
      )}
    >
      {title}
    </a>
  );
}
