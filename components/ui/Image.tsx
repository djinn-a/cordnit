import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { getImageUrl } from '@/lib/getImageUrl';

export function Image({ src, ...props }: NextImageProps) {
  const resolvedSrc = typeof src === 'string' ? getImageUrl(src) : src;
  return <NextImage src={resolvedSrc} {...props} />;
}
