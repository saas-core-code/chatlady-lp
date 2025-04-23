'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Clock, Award, MapPin, UserCheck } from 'lucide-react';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const achievements = [
  {
    icon: Clock,
    value: '10年',
    label: '運営実績',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Award,
    value: 'No.1',
    label: '国内実績',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    icon: MapPin,
    value: '40店舗',
    label: '全国展開',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    icon: UserCheck,
    value: '3万名',
    label: '女性登録数',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    gradient: 'from-emerald-500 to-teal-500'
  }
];

function CorporatePhilosophyContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-blue-500 to-blue-400 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-blue-300/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="space-y-8 relative">
            <div>
              <h3 className="text-2xl font-klee font-bold mb-4 text-gray-800 flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full" />
                企業理念
              </h3>
              <p className="text-gray-600 leading-relaxed font-klee">
                ネットやSNSで情報が溢れる中、当グループのHPをご覧頂きありがとうございます。
                私たちは、女性一人一人の夢や目標の実現をサポートし、
                安心・安全な環境で働ける場所を提供することを使命としています。
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-klee font-bold mb-4 text-gray-800 flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full" />
                在籍女性への想い
              </h3>
              <p className="text-gray-600 leading-relaxed font-klee">
                チャットレディとして働く女性たちの夢や目標は、一人一人異なります。
                私たちは、それぞれの目標に寄り添い、実現のためのサポートを惜しみません。
                安心して働ける環境づくりと、充実した待遇を通じて、
                皆様の成長と成功をお手伝いさせていただきます。
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "relative bg-white rounded-2xl p-4 sm:p-8 text-center",
                "border-2 border-blue-100 shadow-lg",
                "transition-all duration-500",
                "hover:shadow-xl hover:-translate-y-2",
                "group overflow-hidden"
              )}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
              
              <div className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl mb-4 sm:mb-6 mx-auto",
                "flex items-center justify-center",
                "bg-gradient-to-br",
                achievement.gradient,
                "transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
              )}>
                <achievement.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              
              <div className="relative">
                <p className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{achievement.value}</p>
                <p className="text-sm sm:text-base text-gray-600">{achievement.label}</p>
                <div className={cn(
                  "absolute bottom-0 left-1/2 h-1 rounded-full transition-all duration-500",
                  "bg-gradient-to-r",
                  achievement.gradient,
                  "w-12 group-hover:w-3/4 -translate-x-1/2"
                )} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CorporatePhilosophySection() {
  return (
    <ClientAnimationProvider>
      <CorporatePhilosophyContent />
    </ClientAnimationProvider>
  );
}