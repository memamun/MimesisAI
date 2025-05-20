'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { AlertCircle } from 'lucide-react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/placeholder-image.svg',
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        {...props}
        onError={() => {
          setError(true);
          if (props.onLoadingComplete) {
            props.onLoadingComplete({} as any);
          }
        }}
        onLoad={(result) => {
          setLoading(false);
          if (props.onLoadingComplete && !error) {
            props.onLoadingComplete(result.target as any);
          }
        }}
      />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
          <AlertCircle className="w-10 h-10 text-red-400 mb-2" />
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
} 