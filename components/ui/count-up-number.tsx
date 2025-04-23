'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatFn?: (value: number) => string;
}

export default function CountUpNumber({
  value,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatFn,
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (!inView) return;
    
    // Clear previous timer if exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Apply delay before starting animation
    timerRef.current = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;
      
      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min(1, (now - startTime) / (duration * 1000));
        
        // Easing function: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        // Calculate current count value
        countRef.current = easeProgress * value;
        setCount(countRef.current);
        
        if (now < endTime) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(updateCount);
    }, delay * 1000);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inView, value, duration, delay]);
  
  // Format the count value
  const formattedCount = formatFn 
    ? formatFn(count) 
    : count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return (
    <span ref={ref} className="inline-block">
      {prefix}{formattedCount}{suffix}
    </span>
  );
}