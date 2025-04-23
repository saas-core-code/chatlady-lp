'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';
import Image from 'next/image';

function ChatLadyConcernsContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chat-lady-concerns"
      className="pt-0 pb-0 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* SEO用の非表示テキスト */}
      <div className="sr-only">
        <h2>チャットレディの不安や心配事を解決</h2>
        <p>
          身バレの心配、プライバシー保護、安全面の不安、未経験者でも安心、コミュニケーションの悩み、時間の融通など、
          チャットレディを始める際の一般的な悩みに対する解決策を提供しています。
          安心・安全の職場環境で高収入を得るための情報と対策を詳しく解説。
          福岡のチャットレディ求人情報と合わせて、安心して働ける環境づくりに取り組んでいます。
        </p>
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Image
            src="/images/chat-lady-concerns-section/bg_trouble.webp"
            alt="チャットレディが抱える6つの不安と解決策 - 身バレ、安全性、未経験、働き方についての完全ガイド"
            width={800}
            height={400}
            className="w-full"
            priority
          />
          
          {/* Trouble Resolution Images */}
          <div className="absolute inset-0">
            <Image
              src="/images/chat-lady-concerns-section/tr01.webp"
              alt="身バレが心配"
              width={200}
              height={200}
              className="absolute top-[22%] left-[10%] w-[40%] h-auto"
              priority
            />
            <Image
              src="/images/chat-lady-concerns-section/tr02.webp"
              alt="周りの目が気になる"
              width={200}
              height={200}
              className="absolute top-[25%] right-[8%] w-[40%] h-auto"
              priority
            />
            <Image
              src="/images/chat-lady-concerns-section/tr03.webp"
              alt="安全面が不安"
              width={200}
              height={200}
              className="absolute bottom-[33%] left-[10%] w-[40%] h-auto"
              priority
            />
            <Image
              src="/images/chat-lady-concerns-section/tr04.webp"
              alt="未経験でも大丈夫？"
              width={200}
              height={200}
              className="absolute bottom-[25%] right-[5%] w-[40%] h-auto"
              priority
            />
            <Image
              src="/images/chat-lady-concerns-section/tr05.webp"
              alt="時間の融通は効く？"
              width={200}
              height={200}
              className="absolute bottom-[2%] right-[15%] w-[40%] h-auto"
              priority
            />
          </div>

          {/* Girl Illustration - 位置を下に、左に移動 */}
          <Image
            src="/images/chat-lady-concerns-section/girl_illust.webp"
            alt="チャットレディのイラスト"
            width={200}
            height={200}
            className="absolute bottom-[0%] left-[22%] transform -translate-x-1/2 w-[30%] h-auto z-10"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

export default function ChatLadyConcernsSection() {
  return (
    <ClientAnimationProvider>
      <ChatLadyConcernsContent />
    </ClientAnimationProvider>
  );
}
