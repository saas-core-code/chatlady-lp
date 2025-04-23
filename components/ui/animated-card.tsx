'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export default function AnimatedCard({ children, index = 0, className }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 0.2 : 0.8;
    const ease = prefersReducedMotion ? 'none' : 'power2.out';

    const anim = gsap.fromTo(
      cardRef.current!,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
    };
  }, [index]);

  return <div ref={cardRef} className={cn('opacity-0', className)}>{children}</div>;
}