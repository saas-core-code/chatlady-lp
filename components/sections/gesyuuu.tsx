'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import CountUpNumber from '@/components/ui/count-up-number';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

function GesyuuContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    gsap.fromTo(
      card,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95,
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div 
          ref={cardRef}
          className={cn(
            "max-w-xl mx-auto",
            "bg-white rounded-2xl p-12 text-center",
            "shadow-[0_4px_20px_rgba(255,192,203,0.15)]",
            "transform transition-all duration-500",
            "hover:shadow-[0_8px_30px_rgba(255,192,203,0.3)]",
            "hover:-translate-y-1"
          )}
        >
          <h3 className="text-2xl text-gray-600 mb-8">平均月収</h3>
          <p className="text-7xl font-bold text-pink-600 mb-6 tracking-tight">
            <CountUpNumber value={48} />万円
          </p>
          <p className="text-lg text-gray-500">6ヶ月目の平均実績</p>
        </div>
      </div>
    </section>
  );
}

export default function Gesyuu() {
  return (
    <ClientAnimationProvider>
      <GesyuuContent />
    </ClientAnimationProvider>
  );
}