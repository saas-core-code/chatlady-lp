'use client';

import { useEffect, useState } from 'react';
import { NewsTicker } from '@/components/ui/news-ticker';
import { cn } from '@/lib/utils';

const newsItems = [
  "新人応援キャンペーン実施中！入店祝い金3万円支給",
  "業界最高水準の報酬率75%を実現",
  "完全個室のプライベート空間をご用意",
  "24時間365日いつでも働けます",
  "経験者優遇・未経験者歓迎"
];

export default function NewsSection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNewsBar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 40) { // 40pxスクロールしたら非表示
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNewsBar);
    
    return () => {
      window.removeEventListener('scroll', controlNewsBar);
    };
  }, [lastScrollY]);

  return (
    <div className={cn(
      "fixed top-8 left-0 right-0 z-40 transition-transform duration-300",
      !isVisible && "-translate-y-full"
    )}>
      <NewsTicker 
        items={newsItems}
        className="bg-white border-b border-pink-400/30 text-sm h-8"
        textClassName="text-orange-500"
      />
    </div>
  );
}