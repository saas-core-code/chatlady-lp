'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { MessageCircle, Star } from 'lucide-react';
import Image from 'next/image';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const staffComments = [
  {
    name: 'りんかさん',
    age: '25才',
    role: 'フリーター',
    income: '68万円',
    visits: '21回/月',
    workTime: '1日/5.5時間',
    store: '西宮北口店',
    experience: '1年5か月',
    rewardRate: '38.0%',
    ratings: {
      atmosphere: 5,
      staff: 5,
      salary: 5,
      bonus: 4
    },
    comment: 'お店の雰囲気はとても清潔感があり毎回お部屋を心地よく使わせてもらっています。スタッフさんはシフトのことや配信のこと、何でも相談に乗って下さりいつも助けられています。またとても話を聞いて下さるので、小さな悩みでも親身になってアドバイスをくれます。'
  },
  {
    name: 'かりんさん',
    age: '20才',
    role: '学生',
    income: '77万円',
    visits: '13回/月',
    workTime: '1日/6.5時間',
    store: '西宮北口店',
    experience: '1年4か月',
    rewardRate: '39.0%',
    ratings: {
      atmosphere: 5,
      staff: 5,
      salary: 5,
      bonus: 4
    },
    comment: 'チャットレディ自体はじめてでしたが1から教えて下さり、物事が続かない私でも1年以上お仕事を楽しく続けられています！スタッフさんは優しくお部屋もキレイです。お話下手だけど大丈夫かな？と不安でしたが快適な環境で働けています。'
  }
];

const ratingCategories = [
  { key: 'atmosphere', label: 'お店の雰囲気（おしゃれ・清潔感）' },
  { key: 'staff', label: 'スタッフの対応（マニュアル説明・日々の相談）' },
  { key: 'salary', label: 'お給料（支払い・やりがい）' },
  { key: 'bonus', label: 'ボーナス（褒賞のあざり）' }
];

function StaffCommentsContent() {
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
    <section
      ref={sectionRef}
      className="py-24 bg-[#FFF5F7] relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[linear-gradient(to_bottom,rgba(255,192,203,0.1),transparent)]" />
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-100/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-50 px-6 py-2 rounded-full mb-4">
            <MessageCircle className="h-5 w-5 text-pink-500" />
            <span className="text-pink-700 font-medium">INTERVIEW</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            兵庫で働くチャットレディの声
          </h2>
          <p className="text-lg text-gray-600">
            マーメイドに在籍される多くの女性の中から<br />
            700名にチャットレディの感想を頂きました！
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {staffComments.map((staff, idx) => (
            <div
              key={idx}
              className={cn(
                "bg-white rounded-3xl overflow-hidden",
                "border-2 border-pink-100",
                "transition-all duration-300",
                "hover:shadow-xl hover:-translate-y-1"
              )}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-2xl font-bold text-pink-500 mb-2">
                      月収{staff.income} 月/{staff.visits}回
                    </p>
                    <h3 className="text-xl font-bold mb-1">
                      {staff.name} {staff.age} {staff.role}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-sm text-gray-600">店舗：{staff.store}</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-sm text-gray-600">勤務歴：{staff.experience}</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-sm text-gray-600">時間：{staff.workTime}</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-3">
                    <p className="text-sm text-gray-600">報酬率：{staff.rewardRate}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {ratingCategories.map((category) => (
                    <div key={category.key} className="space-y-2">
                      <p className="text-sm text-gray-600">{category.label}</p>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              i < staff.ratings[category.key as keyof typeof staff.ratings]
                                ? "bg-yellow-400"
                                : "bg-gray-200"
                            )}
                          >
                            <Star className="h-5 w-5 text-white fill-current" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {staff.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StaffCommentsSection() {
  return (
    <ClientAnimationProvider>
      <StaffCommentsContent />
    </ClientAnimationProvider>
  );
}