'use client';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

function RecruitmentCallContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recruitment-call"
      className="w-full relative overflow-hidden"
    >
      {/* SEO用の非表示テキスト */}
      <div className="sr-only">
        <h2>チャットレディ募集 - 高収入アルバイト求人</h2>
        <p>
          チャットキューブでチャットレディとして働いてみませんか？未経験者歓迎、日払い可能、
          自由な働き方で高収入が得られます。女性スタッフによるサポート体制も充実。
          安心・安全な環境で、あなたのペースで働けるチャットレディのお仕事です。
          福岡エリアで月収50万円以上も可能な女性向け高収入チャットレディ求人情報をご紹介します。
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full"
      >
        <div className="relative w-full flex justify-center pt-[5px]">
          <Image
            src="/images/recruitment-call-section/chance.webp"
            alt="今がチャットレディを始めるチャンス！未経験からの高収入求人"
            width={800}
            height={400}
            className="w-3/4 h-auto object-contain"
            priority
          />
          <Image
            src="/images/recruitment-call-section/bg_chance.webp"
            alt="チャットレディ募集の背景画像"
            width={800}
            height={400}
            className="w-full h-auto object-contain absolute top-0 left-0 z-[-1]"
            priority
          />
        </div>
        <div className="pb-[30px]">
          <Image
            src="/images/recruitment-call-section/together.webp"
            alt="チャットキューブで一緒に働きませんか？女性向け高収入チャットレディ募集中"
            width={800}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        
        {/* Manga sequence - with improved SEO alt text */}
        <div className="w-full flex flex-col items-center">
          <Image
            src="/images/recruitment-call-section/mng06.webp"
            alt="チャットレディの仕事内容を漫画で解説 - パート1：面接から研修まで"
            width={800}
            height={400}
            className="w-full h-auto object-contain"
          />
          <Image
            src="/images/recruitment-call-section/mng_pt01.webp"
            alt="チャットレディ漫画ガイド - パート1のインデックス"
            width={800}
            height={400}
            className="w-[15%] h-auto object-contain mx-auto mt-[10px]"
          />
          <Image
            src="/images/recruitment-call-section/mng07.webp"
            alt="チャットレディの仕事内容を漫画で解説 - パート2：接客テクニックとコツ"
            width={800}
            height={400}
            className="w-full h-auto object-contain"
          />
          <Image
            src="/images/recruitment-call-section/mng_pt02.webp"
            alt="チャットレディ漫画ガイド - パート2のインデックス"
            width={800}
            height={400}
            className="w-[15%] h-auto object-contain mx-auto mt-[10px]"
          />
          <Image
            src="/images/recruitment-call-section/mng08.webp"
            alt="チャットレディの仕事内容を漫画で解説 - パート3：報酬システムと働き方"
            width={800}
            height={400}
            className="w-full h-auto object-contain"
          />
          <Image
            src="/images/recruitment-call-section/mng_pt03.webp"
            alt="チャットレディ漫画ガイド - パート3のインデックス"
            width={800}
            height={400}
            className="w-[15%] h-auto object-contain mx-auto mt-[10px]"
          />
          <Image
            src="/images/recruitment-call-section/mng09.webp"
            alt="チャットレディの仕事内容を漫画で解説 - パート4：実際の収入例と体験談"
            width={800}
            height={400}
            className="w-full h-auto object-contain"
          />
          <Image
            src="/images/recruitment-call-section/mng10.webp"
            alt="チャットレディの仕事内容を漫画で解説 - パート5：よくある質問と応募方法"
            width={800}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default function RecruitmentCallSection() {
  return (
    <ClientAnimationProvider>
      <RecruitmentCallContent />
    </ClientAnimationProvider>
  );
}
