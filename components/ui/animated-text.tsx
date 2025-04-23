'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayStart?: number;
  className?: string;
}

export default function AnimatedText({
  children,
  staggerChildren = 0.05,
  delayStart = 0,
  className
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const text = element.textContent || '';
    element.textContent = '';

    const chars = text.split('');
    element.innerHTML = chars
      .map(char => `<span class="inline-block opacity-0">${char}</span>`)
      .join('');

    gsap.to(element.children, {
      opacity: 1,
      y: 0,
      stagger: staggerChildren,
      delay: delayStart,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [staggerChildren, delayStart]);

  return (
    <div 
      ref={textRef}
      className={cn("relative", className)}
    >
      {children}
    </div>
  );
}