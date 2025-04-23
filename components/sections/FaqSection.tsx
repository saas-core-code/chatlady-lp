'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const faqItems = [
  {
    question: "未経験でもできますか？",
    answer: "はい、未経験の方でも安心して始められます。丁寧な研修制度があり、女性スタッフがしっかりサポートします。多くの方が未経験からスタートしています。"
  },
  {
    question: "顔出しは必須ですか？",
    answer: "いいえ、顔出しは必須ではありません。マスクやカツラを使用したり、首から下だけの配信も可能です。プライバシーを考慮した働き方ができます。"
  },
  {
    question: "身バレの心配はありませんか？",
    answer: "県外からの配信設定や、特定地域からのアクセスブロックなど、身バレ防止対策を徹底しています。プライバシー保護を最優先に考えたシステムを採用しています。"
  },
  {
    question: "どのくらいの頻度で働けばいいですか？",
    answer: "勤務頻度は完全に自由です。週1日からでも、短時間からでも働けます。学業や家事、他のお仕事と両立している方も多くいらっしゃいます。"
  },
  {
    question: "報酬はいつ受け取れますか？",
    answer: "基本的には月末締めの翌月15日払いですが、希望により日払いや週払いにも対応しています。急な出費が必要な時も安心です。"
  },
  {
    question: "パソコンやカメラなどの機材は自分で用意する必要がありますか？",
    answer: "店舗での勤務であれば、すべての機材を当社で用意しています。在宅勤務の場合は、必要な機材の貸し出しも行っていますのでご相談ください。"
  },
  {
    question: "男性スタッフはいますか？",
    answer: "現場には女性スタッフのみが常駐しています。面接から研修、日々のサポートまですべて女性スタッフが担当するので安心です。"
  },
  {
    question: "親や友人にバレたくないのですが大丈夫ですか？",
    answer: "完全個室での勤務、プライバシーに配慮した入退室管理、配信地域の制限など、徹底した対策を行っています。これまで多くの方が秘密を保ちながら働いています。"
  }
];

function FaqContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const accordion = accordionRef.current;

    if (!section || !title || !accordion) return;

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
    ).fromTo(accordion,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 },
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
      id="よくある質問"
      className="py-24 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle,rgba(255,102,153,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            <span className="text-pink-500">よくある質問</span>
          </h2>
          <p className="text-lg text-gray-700">
            チャットレディのお仕事に関するよくある質問をまとめました。
            さらに詳しく知りたい方はお気軽にお問い合わせください。
          </p>
        </div>

        <div ref={accordionRef} className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className={cn(
                  "border border-gray-200 rounded-lg overflow-hidden",
                  "shadow-sm hover:shadow-md transition-all duration-300"
                )}
              >
                <AccordionTrigger className="px-6 py-4 text-left font-mincho font-medium text-lg hover:no-underline bg-white hover:bg-pink-50/50">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-white text-gray-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-gray-700 mb-2">その他のご質問は、お気軽にお問い合わせください</p>
            <p className="text-xl font-bold text-pink-600">080-XXXX-XXXX</p>
            <p className="text-sm text-gray-500 mt-2">受付時間: 10:00〜22:00（年中無休）</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FaqSection() {
  return (
    <ClientAnimationProvider>
      <FaqContent />
    </ClientAnimationProvider>
  );
}