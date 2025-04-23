'use client';

import { useRef, useEffect } from 'react';
import { facilityImages } from '@/lib/facilityImages';
import Image from 'next/image';

type TickerProps = {
  reverse?: boolean;
};

// 一行分のスクロールティッカーコンポーネント
function Ticker({ reverse = false }: TickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 中身を複製して無限ループ用の2セットに
    el.innerHTML += el.innerHTML;

    let rafId: number;
    // reverse が true のときは逆方向スクロール
    const speed = reverse ? -0.5 : 0.5;

    function tick() {
      el.scrollLeft += speed;
      if (!reverse && el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft -= el.scrollWidth / 2;
      }
      if (reverse && el.scrollLeft <= 0) {
        el.scrollLeft += el.scrollWidth / 2;
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

// 上下2行で左右別方向に流れるティッカー
export default function ContinuousTicker() {
  return (
    <div className="flex flex-col gap-4">
      {/* 1行目: 右→左 */}
      <Ticker />
      {/* 2行目: 左→右 */}
      <Ticker reverse />
    </div>
  );
}