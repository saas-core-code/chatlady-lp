'use client';

import { useRef, useEffect } from 'react';
import { facilityImages } from '@/lib/facilityImages';
import Image from 'next/image';

type TickerProps = {
  reverse?: boolean;
};

function Ticker({ reverse = false }: TickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // コンテンツを2倍に複製して無限ループ
    el.innerHTML += el.innerHTML;

    let rafId: number;
    const speed = reverse ? -0.5 : 0.5;

    function tick() {
      const current = containerRef.current;
      if (!current) return;

      current.scrollLeft += speed;

      // ループ位置のリセット
      if (!reverse && current.scrollLeft >= current.scrollWidth / 2) {
        current.scrollLeft -= current.scrollWidth / 2;
      }
      if (reverse && current.scrollLeft <= 0) {
        current.scrollLeft += current.scrollWidth / 2;
      }

      rafId = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(rafId);
  }, [reverse]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap select-none"
      style={{ willChange: 'scroll-position' }}
    >
      {facilityImages.map((img, i) => (
        <div
          key={i}
          className="inline-block relative w-[180px] h-[120px] mx-2 rounded-xl overflow-hidden"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="180px"
            priority={i < facilityImages.length}
          />
        </div>
      ))}
    </div>
  );
}

export default function ContinuousTicker() {
  return (
    <div className="flex flex-col gap-4">
      {/* 1行目: 左から右 */}
      <Ticker />
      {/* 2行目: 右から左 */}
      <Ticker reverse />
    </div>
  );
}
