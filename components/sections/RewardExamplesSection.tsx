'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Briefcase, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedCard from '@/components/ui/animated-card';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

// Case studies data
const caseStudies = [
  {
    title: "大学生Aさん（22歳）",
    hours: "週3日・5時間",
    monthlyIncome: 28,
    description: "授業の合間や夕方以降の時間を活用。学費と生活費を無理なく稼いでいます。ビデオより気軽なテキストチャットメインで活動。",
    icon: Clock,
    color: "bg-pink-50 text-pink-500"
  },
  {
    title: "主婦Bさん（35歳）",
    hours: "平日昼間・週4日",
    monthlyIncome: 45,
    description: "子供が学校に行っている間の時間を有効活用。家計の足しにしつつ、自分のためのお小遣いも確保。安定した固定客がつき、リピート率が高いのが特徴。",
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-500"
  },
  {
    title: "フリーランスCさん（28歳）",
    hours: "不定期・月80時間程度",
    monthlyIncome: 76,
    description: "本業の合間に、自宅から高収入を得るために活動。ファンを多く獲得し、投げ銭やアイテム収入が大きい。月の半分はトップチャットレディとしてピックアップされています。",
    icon: Briefcase,
    color: "bg-purple-50 text-purple-500"
  }
];

function RewardExamplesContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    
    if (!section || !title) return;
    
    gsap.fromTo(
      title,
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
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="py-24 bg-pink-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.8),transparent)]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            先輩チャットレディの<span className="text-pink-500">収入事例</span>
          </h2>
          <p className="text-lg text-gray-700">
            実際に活躍している方々の収入例をご紹介します。
            あなたのライフスタイルに合わせた働き方が可能です。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <AnimatedCard key={index} index={index}>
              <div className={cn(
                "bg-white rounded-xl shadow-lg p-8 h-full border border-gray-100",
                "hover:shadow-xl transition-all duration-300 hover:border-pink-200"
              )}>
                <div className="flex flex-col h-full">
                  <div className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-6",
                    study.color
                  )}>
                    <study.icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-xl font-mincho font-bold mb-2">{study.title}</h3>
                  <div className="flex items-center mb-4">
                    <span className="text-gray-600 text-sm">{study.hours}</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="font-bold text-lg text-pink-600">月収 {study.monthlyIncome}万円</span>
                  </div>
                  
                  <p className="text-gray-600 flex-grow">{study.description}</p>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">時給換算</span>
                      <span className="font-bold text-lg">
                        ¥{Math.round((study.monthlyIncome * 10000) / (study.hours.includes('月') 
                          ? parseInt(study.hours.match(/\d+/)?.[0] || '80')
                          : parseInt(study.hours.match(/\d+/)?.[0] || '4') * 4 * parseInt(study.hours.match(/\d+/)?.[1] || '5')
                        )).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-mincho font-bold mb-4 text-center">報酬のポイント</h3>
          <ul className="space-y-3">
            {[
              "基本報酬は時間制：お客様とのチャット時間に応じて報酬が発生します",
              "歩合制度あり：売上の最大75%が報酬として還元されます",
              "ボーナスあり：月間売上やランキングに応じて追加報酬があります",
              "日払い可能：希望に応じて当日の報酬をお支払いします",
              "インセンティブ：新人期間は特別報酬体系で高額報酬が可能です"
            ].map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-pink-500 mr-2">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function RewardExamplesSection() {
  return (
    <ClientAnimationProvider>
      <RewardExamplesContent />
    </ClientAnimationProvider>
  );
}