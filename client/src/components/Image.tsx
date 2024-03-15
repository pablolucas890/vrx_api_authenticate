import React from 'react';

interface ImageProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
}

export default function Image({ url, title, ...rest }: ImageProps) {
  return (
    <a {...rest}>
      <img src={url} alt={title} />
    </a>
  );
}
