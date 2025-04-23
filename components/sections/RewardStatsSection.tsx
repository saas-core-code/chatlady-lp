'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import CountUpNumber from '@/components/ui/count-up-number';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

function RewardStatsContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    gsap.fromTo(
      cards.children,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95,
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
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

  const stats = [
    {
      title: "報酬還元率",
      value: 75,
      suffix: "%",
      description: "業界最高水準の高還元率"
    },
    {
      title: "時給換算",
      value: 3500,
      prefix: "¥",
      description: "平均的な時給目安"
    },
    {
      title: "平均月収",
      value: 48,
      suffix: "万円",
      description: "6ヶ月目の平均実績"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-4">
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={cn(
                "bg-white rounded-2xl p-12 text-center",
                "shadow-[0_4px_20px_rgba(255,192,203,0.15)]",
                "transform transition-all duration-500",
                "hover:shadow-[0_8px_30px_rgba(255,192,203,0.3)]",
                "hover:-translate-y-1"
              )}
            >
              <h3 className="text-xl text-gray-600 mb-6">{stat.title}</h3>
              <p className="text-5xl font-bold text-pink-600 mb-4 tracking-tight">
                {stat.prefix}<CountUpNumber value={stat.value} />{stat.suffix}
              </p>
              <p className="text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RewardStatsSection() {
  return (
    <ClientAnimationProvider>
      <RewardStatsContent />
    </ClientAnimationProvider>
  );
}