'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Shield, Camera, Sparkles, Lock, Eye, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const countermeasures = [
  {
    title: "マスク着用",
    description: "配信時はマスクの着用が可能です。お好みのマスクを使用して、プライバシーを守りながら配信できます。",
    features: [
      "医療用マスク",
      "布マスク",
      "おしゃれなデザインマスク",
      "フェイスシールド"
    ],
    image: "https://images.pexels.com/photos/4429279/pexels-photo-4429279.jpeg",
    icon: Shield
  },
  {
    title: "加工アプリ",
    description: "専用の加工アプリを使用して、顔出しせずに配信することができます。様々なエフェクトやフィルターを使用可能です。",
    features: [
      "顔のぼかし加工",
      "スタンプ機能",
      "フィルター効果",
      "アバター機能"
    ],
    image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg",
    icon: Camera
  }
];

const additionalFeatures = [
  {
    icon: Lock,
    title: "エリアブロック",
    description: "特定地域からのアクセスをブロックできます。"
  },
  {
    icon: Eye,
    title: "プライバシー保護",
    description: "個人情報は厳重に管理・保護されます。"
  },
  {
    icon: ImageIcon,
    title: "画像管理",
    description: "配信画像は全て暗号化して保存されます。"
  }
];

function CountermeasureContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

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
    ).fromTo(cards.children,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.2
      },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);

  return (
    <div ref={sectionRef} className="py-24 bg-[#FFF5F7] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[linear-gradient(to_bottom,rgba(255,192,203,0.1),transparent)]" />
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-100/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-50 px-6 py-2 rounded-full mb-4">
            <Shield className="h-5 w-5 text-pink-500" />
            <span className="text-pink-700 font-medium">PRIVACY PROTECTION</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            マーメイド兵庫の<span className="text-pink-500">身バレ対策</span>
          </h2>
          <p className="text-lg text-gray-600">
            プライバシーを最大限に配慮した<br />
            安心・安全な環境でお仕事ができます
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {countermeasures.map((measure, idx) => (
            <div
              key={idx}
              className={cn(
                "bg-white rounded-3xl overflow-hidden",
                "border-2 border-pink-100",
                "transition-all duration-300",
                "hover:shadow-xl hover:-translate-y-1"
              )}
            >
              <div className="relative h-64">
                <Image
                  src={measure.image}
                  alt={measure.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                      <measure.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">{`${String(idx + 1).padStart(2, '0')}. ${measure.title}`}</h3>
                  </div>
                  <p className="text-white/90">{measure.description}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {measure.features.map((feature, featureIdx) => (
                    <div
                      key={featureIdx}
                      className="bg-pink-50 rounded-xl p-3 text-center"
                    >
                      <p className="text-sm text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, idx) => (
              <div
                key={idx}
                className={cn(
                  "bg-white rounded-xl p-6",
                  "border border-pink-100",
                  "transition-all duration-300",
                  "hover:shadow-lg hover:-translate-y-1"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <feature.icon className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CountermeasureSection() {
  return (
    <ClientAnimationProvider>
      <CountermeasureContent />
    </ClientAnimationProvider>
  );
}