'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, GiftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

function CtaContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    gsap.fromTo(
      content,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
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
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-pink-50/50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-40 bg-[radial-gradient(circle_at_top,rgba(255,102,153,0.1),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,rgba(255,102,153,0.05),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={contentRef}
          className={cn(
            "max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden",
            "shadow-[0_10px_40px_rgba(255,192,203,0.3)]",
            "transform transition-all duration-500 hover:shadow-[0_20px_60px_rgba(255,192,203,0.4)]"
          )}
        >
          <div className="relative p-8 md:p-12">
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-rose-100/40 rounded-full transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100/40 to-rose-100/40 rounded-full transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <GiftIcon className="h-6 w-6 text-pink-500" />
                <span className="text-pink-700 font-medium">期間限定キャンペーン実施中！</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                  体験ボーナス１万円！
                </span>
                <br />
                <span className="text-2xl md:text-3xl">＋</span>
                <br />
                3時間の体験で最大
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">３万円</span>
              </h2>

              <p className="text-gray-700 mb-8 leading-relaxed">
                不安な気持ちで、お問合せ・ご応募頂いて大丈夫です！
                今の段階では不安は解消しないと思います。
                そのためにも安心して頂ける職場環境、サポート体制に全力で取り組む専門スタッフにお任せください。
              </p>

              <div className="bg-pink-50 rounded-xl p-6 mb-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                  ※3時間の体験で1～3万円の報酬が目安です。報酬+体験ボーナスを当日に現金日払いで支給しています。
                </p>
              </div>

              <div className="flex flex-col gap-4 max-w-xl mx-auto">
                <a 
                  href="#応募"
                  className={cn(
                    "block w-full py-4 px-6 text-center text-white font-bold text-lg",
                    "bg-gradient-to-r from-[#FF7F50] to-[#FF1493]",
                    "rounded-full shadow-lg",
                    "transition-all duration-300",
                    "hover:shadow-xl hover:scale-[1.02]",
                    "active:scale-[0.98]"
                  )}
                >
                  詳しく見る
                </a>

                <a 
                  href="https://line.me/R/ti/p/@your-line-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block w-full py-4 px-6 text-center text-white font-bold text-lg",
                    "bg-[#00B900] hover:bg-[#00A000]",
                    "rounded-full shadow-lg",
                    "transition-all duration-300",
                    "hover:shadow-xl hover:scale-[1.02]",
                    "active:scale-[0.98]",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                    alt="LINE"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                  お問合せ・面接応募
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CtaSection() {
  return (
    <ClientAnimationProvider>
      <CtaContent />
    </ClientAnimationProvider>
  );
}