'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MessageSquare, Clock, UserCheck, Gift, CalendarCheck, BadgeCheck } from 'lucide-react';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const steps = [
  {
    icon: MessageSquare,
    title: 'お問い合わせ',
    description: 'LINEまたはお電話でお気軽にお問い合わせください。ご不明な点も丁寧にお答えします。',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-100',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Clock,
    title: '面接日時の調整',
    description: 'ご都合の良い日時をお選びいただけます。土日祝日も対応可能です。',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    icon: UserCheck,
    title: '面接・カウンセリング',
    description: '女性スタッフが丁寧に説明します。不安な点や質問もお気軽にどうぞ。',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    icon: Gift,
    title: '体験入店',
    description: '3時間の体験で最大3万円をその日にお支払い。体験ボーナス1万円も支給！',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    icon: CalendarCheck,
    title: '勤務開始',
    description: 'あなたのペースで働けます。研修制度も充実しているので安心してスタートできます。',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    gradient: 'from-amber-500 to-orange-500'
  }
];

const features = [
  {
    icon: BadgeCheck,
    title: '履歴書不要',
    description: '面接時に履歴書は必要ありません。私服でお越しください。'
  },
  {
    icon: BadgeCheck,
    title: '即日勤務OK',
    description: '面接当日から勤務可能です。日払いにも対応しています。'
  },
  {
    icon: BadgeCheck,
    title: '交通費支給',
    description: '面接交通費として2,000円を支給いたします。'
  }
];

function InterviewContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  const lineVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100%',
      transition: {
        duration: 0.8,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#FFF5F7] to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[linear-gradient(to_bottom,rgba(255,192,203,0.1),transparent)]" />
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-100/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
              面接から採用まで
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            お仕事開始までの流れをご説明します。<br />
            不安な方も、まずはお気軽にお問い合わせください。
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onHoverStart={() => setActiveStep(idx)}
                onHoverEnd={() => setActiveStep(-1)}
                className={cn(
                  "relative bg-white rounded-2xl p-6",
                  "border-2 shadow-lg transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-2",
                  step.borderColor,
                  activeStep === idx ? "scale-105" : ""
                )}
              >
                <div className="absolute -top-3 -left-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    "text-white font-bold text-lg",
                    "bg-gradient-to-br",
                    step.gradient
                  )}>
                    {idx + 1}
                  </div>
                </div>

                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                  "transform transition-all duration-500",
                  step.bgColor,
                  activeStep === idx ? "scale-110 rotate-6" : ""
                )}>
                  <step.icon className={cn(
                    "h-7 w-7 transition-transform duration-500",
                    step.color,
                    activeStep === idx ? "scale-110" : ""
                  )} />
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>

                {idx < steps.length - 1 && (
                  <motion.div
                    variants={lineVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10"
                  >
                    <div className={cn(
                      "w-8 h-0.5 bg-gradient-to-r",
                      step.gradient
                    )} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-xl"
                >
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <feature.icon className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function InterviewSection() {
  return (
    <ClientAnimationProvider>
      <InterviewContent />
    </ClientAnimationProvider>
  );
}