"use client";
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface StockImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  candidates?: string[]; // optional ordered list of additional URLs
}

const FALLBACK = 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2cb9?auto=format&fit=crop&w=1200&q=60';

export function StockImage({ src, alt, fallback = FALLBACK, className, candidates, ...rest }: StockImageProps) {
  const ordered = candidates && candidates.length ? Array.from(new Set([src, ...candidates, fallback])) : [src, fallback];
  const [index, setIndex] = useState(0);
  const current = ordered[Math.min(index, ordered.length - 1)];
  return (
    <Image
      {...rest}
      src={current}
      alt={alt}
      className={className + ' transition-opacity duration-500'}
      onError={() => { if (index < ordered.length - 1) setIndex(i => i + 1); }}
      placeholder="empty"
    />
  );
}
