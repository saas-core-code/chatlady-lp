'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';
import ContinuousTicker from '@/components/ContinuousTicker';

function WorkEnvironmentContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="環境"
      className="pt-8 pb-12 relative overflow-hidden bg-[#F5AEBD] bg-[radial-gradient(rgba(128,64,64,0.25)_1px,transparent_1px)] [background-size:10px_10px]"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* シンプルに画像を表示 */}
          <Image
            src="/images/WorkEnvironment.webp"
            alt="ライブリンクスの職場風景"
            width={800}
            height={500}
            className="w-full"
          />
        </div>
        <div className="max-w-5xl mx-auto mt-8">
          <ContinuousTicker />
        </div>
      </div>
    </section>
  );
}

export default function WorkEnvironmentSection() {
  return (
    <ClientAnimationProvider>
      <WorkEnvironmentContent />
    </ClientAnimationProvider>
  );
}