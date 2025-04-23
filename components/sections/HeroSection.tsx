'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

function HeroContent() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // ここにフェードインやスクロールアニメーションのロジックを追加
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden pt-[72px] px-[0px]"
    >
      <div className="mx-auto max-w-[960px] w-full">
        <Image
          src="/images/hero.webp"
          alt="チャットレディの仕事風景"
          width={960}
          height={1282}
          priority
          quality={75}
          className="object-contain object-center"
        />
      </div>
    </section>
  );
}

export default function HeroSection() {
  return (
    <ClientAnimationProvider>
      <HeroContent />
    </ClientAnimationProvider>
  );
}