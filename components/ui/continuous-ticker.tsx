'use client';

import { useRef, useEffect } from 'react';

interface Image {
  src: string;
  alt: string;
}

interface ContinuousTickerProps {
  images: Image[];
  speed?: number;
}

export default function ContinuousTicker({ images, speed = 0.5 }: ContinuousTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // 中身を複製してループ用意
    el.innerHTML += el.innerHTML;
    let rafId: number;

    function tick() {
      if (!el) return;
      el.scrollLeft += speed;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft -= el.scrollWidth / 2;
      }
      rafId = requestAnimationFrame(tick);
    }
    
    tick();
    
    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  return (
    <div className="overflow-hidden whitespace-nowrap" ref={containerRef}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className="inline-block w-[180px] h-auto mr-4 object-cover rounded-xl"
        />
      ))}
    </div>
  );
}