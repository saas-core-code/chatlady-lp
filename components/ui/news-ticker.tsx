'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface NewsTickerProps {
  items: string[];
  className?: string;
  textClassName?: string;
}

export function NewsTicker({ items, className, textClassName }: NewsTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    const content = contentRef.current;
    if (!ticker || !content) return;

    // コンテンツを複製して無限スクロールを実現
    content.innerHTML += content.innerHTML;

    const animate = () => {
      if (!ticker) return;
      ticker.scrollLeft += 1;

      if (ticker.scrollLeft >= content.scrollWidth / 2) {
        ticker.scrollLeft = 0;
      }
    };

    const animation = setInterval(animate, 30);

    return () => clearInterval(animation);
  }, [items]);

  return (
    <div 
      ref={tickerRef}
      className={cn(
        "overflow-hidden whitespace-nowrap flex items-center",
        className
      )}
    >
      <div
        ref={contentRef}
        className="inline-flex items-center"
      >
        {items.map((item, index) => (
          <span
            key={index}
            className={cn(
              "inline-flex items-center px-4",
              textClassName
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}