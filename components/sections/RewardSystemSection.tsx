'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import CountUpNumber from '@/components/ui/count-up-number';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

function RewardSystemContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const stats = statsRef.current;

    if (!section || !title || !stats) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(stats.children,
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
        stagger: 0.1,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-pink-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,rgba(255,102,153,0.05),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(255,102,153,0.08),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            <span className="text-pink-500">報酬</span>について
          </h2>
          <p className="text-lg text-gray-700">
            業界最高水準の報酬還元率と充実した待遇をご用意。
            あなたの頑張りに応じて、さらなる高収入も可能です。
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: 75, label: '報酬還元率', suffix: '%', description: '業界最高水準の高還元率' },
            { value: 3500, label: '時給換算', prefix: '¥', description: '平均的な時給目安' },
            { value: 48, label: '平均月収', suffix: '万円', description: '6ヶ月目の平均実績' }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className={cn(
                "bg-white rounded-xl shadow-lg p-8 text-center",
                "transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              )}
            >
              <p className="text-lg text-gray-600 mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-pink-600 mb-2">
                {stat.prefix}<CountUpNumber value={stat.value} />{stat.suffix}
              </p>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RewardSystemSection() {
  return (
    <ClientAnimationProvider>
      <RewardSystemContent />
    </ClientAnimationProvider>
  );
}