"use client";
import { useEffect, useRef, useState } from 'react';
import { StockImage } from './StockImage';

interface HeroVideoProps {
  poster: string;
  sources: string[];
  local?: string; // optional locally hosted video path (preferred)
  imageAlt: string;
  className?: string;
  overlayClassName?: string;
}

export function HeroVideo({ poster, sources, local, imageAlt, className = '', overlayClassName = '' }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onCanPlay = () => setCanPlay(true);
    const onError = () => setFailed(true);
    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('error', onError);
    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('error', onError);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Timeout fallback if video never loads
  useEffect(() => {
    const id = setTimeout(() => {
      if (!canPlay) setFailed(true);
    }, 4000);
    return () => clearTimeout(id);
  }, [canPlay]);

  const finalSources = local ? [local, ...sources] : sources;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-label={imageAlt}>
      {/* Always render poster image as baseline */}
      <StockImage src={poster} alt={imageAlt} fill className="object-cover" />
      {!failed && !prefersReduced && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
          autoPlay
          playsInline
          muted
          loop
          poster={poster}
          preload="auto"
          crossOrigin="anonymous"
          onCanPlay={() => setCanPlay(true)}
          style={canPlay ? { opacity: 1 } : undefined}
        >
          {finalSources.map((src, i) => (
            <source key={i} src={src} />
          ))}
        </video>
      )}
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
