'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Palette, CreditCard, Smile, Shield, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';
import Image from 'next/image';

const benefits = [
  {
    icon: Coffee,
    title: 'フリードリンクおかし無料',
    description: '疲れた時には甘いもので ほっと一休み♪',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg'
  },
  {
    icon: Palette,
    title: 'コスメ・美容家電レンタル',
    description: '可愛くなれるグッズは全てご用意！',
    image: 'https://images.pexels.com/photos/2688991/pexels-photo-2688991.jpeg'
  },
  {
    icon: CreditCard,
    title: '日払いOK!',
    description: '今月ピンチ！なときは日払いがあるから安心！',
    image: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg'
  },
  {
    icon: Smile,
    title: 'ノルマー切なし',
    description: 'ノルマがないからプレッシャーもなし♪',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg'
  },
  {
    icon: Shield,
    title: '安心の環境',
    description: '完全個室でプライバシー保護も万全！',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
  },
  {
    icon: Heart,
    title: '充実のサポート',
    description: '女性スタッフが親身になってサポート！',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
  }
];

function BenefitsContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: i * 0.1
      }
    }),
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  };

  const merit05Variants = {
    initial: { 
      opacity: 0,
      x: -200,
      scale: 0.8,
      rotate: -10
    },
    animate: { 
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 90,
        mass: 1,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      rotate: 2,
      filter: "brightness(1.1)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 200
      }
    }
  };

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      x: -100
    },
    animate: {
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.1, 1],
      x: 0,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="特徴"
      className="py-24 bg-[#AEE8D0] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute -top-24 right-0 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/20 -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Image
            src="/images/merit_ttl.webp"
            alt="チャットレディの6つの魅力"
            width={800}
            height={267}
            className="w-full h-auto"
            priority
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatePresence>
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                onHoverStart={() => setActiveCard(idx)}
                onHoverEnd={() => setActiveCard(-1)}
                className={cn(
                  "bg-white/80 backdrop-blur-sm rounded-[24px] overflow-hidden",
                  "border-2 border-[#AEE8D0]/50",
                  "transition-all duration-300",
                  "hover:shadow-[0_10px_40px_-15px_rgba(174,232,208,0.7)]",
                  "group relative"
                )}
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(174,232,208,0.2))"
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AEE8D0] via-[#9EDEC0] to-[#AEE8D0] opacity-50" />
                <div className="absolute top-1 left-0 w-full h-1 bg-gradient-to-r from-[#AEE8D0] via-[#9EDEC0] to-[#AEE8D0] opacity-30" />
                
                <div className="relative h-32 overflow-hidden">
                  <motion.div
                    variants={imageVariants}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#AEE8D0]/40 to-transparent" />
                  </motion.div>
                  <div className="absolute -bottom-4 left-4">
                    <div className="bg-white shadow-lg rounded-2xl p-3 border-2 border-[#AEE8D0]/30 transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
                      <benefit.icon className="h-6 w-6 text-[#7BC5A3]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-6">
                  <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-[#7BC5A3] to-[#AEE8D0] bg-clip-text text-transparent group-hover:from-[#69B491] group-hover:to-[#9EDEC0] transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#AEE8D0] via-[#9EDEC0] to-[#AEE8D0] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center flex justify-start pl-4">
          <div className="w-[calc(50%-12px)] relative">
            <motion.div
              variants={glowVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="absolute -inset-4 bg-[#AEE8D0] rounded-3xl blur-xl z-0"
            />
            <motion.div
              variants={merit05Variants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              onHoverStart={() => setIsImageHovered(true)}
              onHoverEnd={() => setIsImageHovered(false)}
              className="relative z-10"
            >
              <Image
                src="/images/merit05.webp"
                alt="メリット5"
                width={600}
                height={200}
                className="w-full h-auto rounded-2xl shadow-lg"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BenefitsSection() {
  return (
    <ClientAnimationProvider>
      <BenefitsContent />
    </ClientAnimationProvider>
  );
}