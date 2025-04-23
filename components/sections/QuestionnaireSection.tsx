'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { ClipboardList, Users, Star, Heart } from 'lucide-react';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const initialQuestionnaireResults = [
  {
    rank: 1,
    title: '報酬条件が高いから',
    votes: 284,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-100',
    icon: Star
  },
  {
    rank: 2,
    title: 'お問い合わせ・面接の丁寧な対応\nスタッフの人柄',
    votes: 108,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    icon: Users
  },
  {
    rank: 3,
    title: '美顔アプリがすごい\n身バレの不安なく働ける設備',
    votes: 63,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    icon: Star
  },
  {
    rank: 4,
    title: '清潔感のある\nチャットルーム・職場環境',
    votes: 27,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    icon: Star
  },
  {
    rank: 5,
    title: 'ホームページがきれい・見やすい',
    votes: 18,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    icon: ClipboardList
  }
];

const continuationQuestionnaireResults = [
  {
    rank: 1,
    title: '希望金額、それ以上に稼げてるから',
    votes: 219,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-100',
    icon: Star
  },
  {
    rank: 2,
    title: '以前在籍していたチャットルームより\n稼げるようになったから',
    votes: 148,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    icon: Users
  },
  {
    rank: 3,
    title: 'スタッフが親身に相談に乗ってくれる\n収入が増えるようにアドバイスをくれる',
    votes: 89,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    icon: Heart
  },
  {
    rank: 4,
    title: '日払いが助かる\n日払手数料・ノルマ・ペナルティがない',
    votes: 31,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    icon: Star
  },
  {
    rank: 5,
    title: 'シフトの融通が利く\n立地が良くて通いやすい',
    votes: 13,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    icon: ClipboardList
  }
];

function QuestionnaireResults({ results, title, subtitle }: { 
  results: typeof initialQuestionnaireResults,
  title: string,
  subtitle: string
}) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const totalVotes = results.reduce((sum, item) => sum + item.votes, 0);

  return (
    <div className="mb-20 last:mb-0">
      <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-8">
        <h3 className="text-2xl md:text-3xl font-mincho font-bold mb-4">
          {title}
        </h3>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>

      <div ref={resultsRef} className="max-w-4xl mx-auto space-y-6">
        {results.map((result, idx) => (
          <div
            key={idx}
            className={cn(
              "bg-white rounded-2xl p-6",
              "border-2 transition-all duration-300",
              "hover:shadow-lg hover:-translate-y-1",
              result.borderColor
            )}
          >
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center",
                "bg-gradient-to-br text-white font-bold text-2xl",
                result.color
              )}>
                {result.rank}
              </div>

              <div className="flex-grow">
                <h4 className="text-xl font-bold mb-2 whitespace-pre-line">
                  {result.title}
                </h4>
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "absolute left-0 top-0 h-full rounded-full",
                      "bg-gradient-to-r transition-all duration-1000",
                      result.color
                    )}
                    style={{ width: `${(result.votes / totalVotes) * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{result.votes}</p>
                <p className="text-sm text-gray-500">票</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionnaireContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    gsap.fromTo(title,
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
            <ClipboardList className="h-5 w-5 text-pink-500" />
            <span className="text-pink-700 font-medium">QUESTIONNAIRE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            チャットレディの<span className="text-pink-500">アンケート結果</span>
          </h2>
          <p className="text-lg text-gray-600">
            マーメイドに在籍する女性<br />
            <span className="font-bold text-pink-500">500</span>名にアンケートを実施
          </p>
        </div>

        <QuestionnaireResults 
          results={initialQuestionnaireResults}
          title="なぜマーメイドを選びましたか？"
          subtitle="入店のきっかけについて"
        />

        <QuestionnaireResults 
          results={continuationQuestionnaireResults}
          title="なぜ継続して勤務されてますか？"
          subtitle="長期勤務の理由について"
        />
      </div>
    </section>
  );
}

export default function QuestionnaireSection() {
  return (
    <ClientAnimationProvider>
      <QuestionnaireContent />
    </ClientAnimationProvider>
  );
}