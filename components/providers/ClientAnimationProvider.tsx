'use client';

import { ReactNode, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ClientAnimationProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        // Apply settings for reduced motion
        gsap.defaults({
          duration: 0.2,
          ease: 'none'
        });
      } else {
        // Normal animation settings
        gsap.defaults({
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      // Set animation ready state
      setIsReady(true);
      
      // Clean up ScrollTrigger on unmount
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  
  if (!isReady) {
    return null;
  }
  
  return (
    <div className="animation-context animation-ready">
      {children}
    </div>
  );
}