import * as React from 'react';
import { cn } from '@/utils/cn';

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const Image = ({ className, alt, loading = 'lazy', ...props }: ImageProps) => {
  return (
    <img
      className={cn('h-auto max-w-full', className)}
      alt={alt}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
};
