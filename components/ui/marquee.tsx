'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  direction?: 'left' | 'right';
}

export function Marquee({ 
  items, 
  speed = 30, 
  className,
  direction = 'left' 
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollContent = () => {
      if (!containerRef.current || !scrollerRef.current) return;

      if (direction === 'left') {
        if (scrollerRef.current.offsetWidth <= containerRef.current.scrollLeft) {
          containerRef.current.scrollLeft = 0;
        } else {
          containerRef.current.scrollLeft += 1;
        }
      } else {
        if (containerRef.current.scrollLeft <= 0) {
          containerRef.current.scrollLeft = scrollerRef.current.offsetWidth;
        } else {
          containerRef.current.scrollLeft -= 1;
        }
      }
    };

    const interval = setInterval(scrollContent, speed);
    return () => clearInterval(interval);
  }, [direction, speed]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "overflow-hidden whitespace-nowrap",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className="inline-block whitespace-nowrap"
      >
        {items.map((item, idx) => (
          <span
            key={idx}
            className="inline-block px-4"
          >
            {item}
          </span>
        ))}
        {/* Duplicate items for seamless loop */}
        {items.map((item, idx) => (
          <span
            key={`duplicate-${idx}`}
            className="inline-block px-4"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}