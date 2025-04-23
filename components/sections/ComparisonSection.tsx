'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Scale } from 'lucide-react';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const comparisonData = [
  {
    label: '振込手数料',
    mermaid: '0円',
    others: '200円など'
  },
  {
    label: '日払手数料',
    mermaid: '0円',
    others: '200円など'
  },
  {
    label: '雑費',
    mermaid: '0円',
    others: 'あり'
  },
  {
    label: '日払全額支給',
    mermaid: '1円単位まで\n全額支給',
    others: '上限5000円など'
  },
  {
    label: '日払上限',
    mermaid: 'なし\n(全額支給)',
    others: 'あり'
  },
  {
    label: 'ノルマ・罰金',
    mermaid: 'なし',
    others: 'あり'
  }
];

function ComparisonContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const table = tableRef.current;

    if (!section || !title || !table) return;

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
    ).fromTo(table,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[linear-gradient(to_bottom,rgba(255,192,203,0.1),transparent)]" />
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-100/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-50 px-6 py-2 rounded-full mb-4">
            <Scale className="h-5 w-5 text-pink-500" />
            <span className="text-pink-700 font-medium">COMPARISON</span>
          </div>
          <div className="relative">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[600px] max-w-full">
              <div className="bg-pink-400 text-white text-center py-4 px-8 rounded-full text-xl font-bold">
                マーメイドは好待遇を実現!!
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={tableRef}
          className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-3 text-center font-bold text-lg">
            <div className="p-6 bg-white"></div>
            <div className="p-6 bg-pink-100 text-pink-800">マーメイド</div>
            <div className="p-6 bg-gray-200 text-gray-700">一般的な<br />チャットルーム</div>
          </div>

          {comparisonData.map((item, idx) => (
            <div 
              key={idx}
              className={cn(
                "grid grid-cols-3 text-center border-t border-gray-200",
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              )}
            >
              <div className="p-6 flex items-center justify-center font-medium">
                {item.label}
              </div>
              <div className="p-6 bg-pink-50/50 text-pink-800 font-bold whitespace-pre-line">
                {item.mermaid}
              </div>
              <div className="p-6 text-gray-500 whitespace-pre-line">
                {item.others}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          ※店舗によりボーナス・待遇は異なりますので面接時にご確認ください。
        </p>
      </div>
    </section>
  );
}

export default function ComparisonSection() {
  return (
    <ClientAnimationProvider>
      <ComparisonContent />
    </ClientAnimationProvider>
  );
}