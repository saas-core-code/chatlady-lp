'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const mangaImages = [
  '/images/anime-section/mng01.webp',
  '/images/anime-section/mng02.webp',
  '/images/anime-section/mng03.webp',
  '/images/anime-section/mng04.webp',
  '/images/anime-section/mng05.webp'
];

function MangaGuideContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="manga-chat-lady-guide"
      className="pt-2 pb-[58px] bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[linear-gradient(to_bottom,rgba(255,192,203,0.1),transparent)]" />
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-100/30 blur-3xl" />
      </div>

      <div className="w-full relative z-10 px-[6px]">
        {/* SEO用の非表示テキスト */}
        <div className="sr-only">
          <h2>マンガで分かるチャットレディ</h2>
          <p>初めての方でも安心！マンガでチャットレディのお仕事をご紹介。チャットレディの仕事内容、報酬システム、安全な職場環境、充実したサポート体制について漫画で詳しく解説しています。</p>
        </div>
        
        <div className="w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-0"
          >
            {mangaImages.map((image, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="w-full"
              >
                <Image
                  src={image}
                  alt={`チャットレディのお仕事マンガ ${idx + 1}: ${idx === 0 ? 'お仕事の流れ' : idx === 1 ? '報酬システム' : idx === 2 ? '安心の環境' : idx === 3 ? 'サポート体制' : '充実の待遇'}`}
                  width={800}
                  height={idx === mangaImages.length - 1 ? 550 : 600}
                  className="w-full block"
                  style={idx === mangaImages.length - 1 ? { marginBottom: "-50px", maxHeight: "550px" } : {}}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function MangaGuideSection() {
  return (
    <ClientAnimationProvider>
      <MangaGuideContent />
    </ClientAnimationProvider>
  );
}