'use client';

import { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

ChartJS.register(ArcElement, Tooltip, Legend);

// SSRを無効化してクライアントでのみロード
const Doughnut = dynamic(
  () => import('react-chartjs-2').then(mod => mod.Doughnut),
  { ssr: false }
);

function SimpleChartContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderColor: Array(5).fill('#ffffff'),
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 14,
            weight: 'bold',
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const value = context.raw || 0;
            return `値: ${value}%`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
      easing: 'easeOutElastic',
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMounted]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,rgba(255,102,153,0.05),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(255,102,153,0.08),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={cn(
            "bg-white rounded-2xl shadow-xl p-8 transition-all duration-500",
            "hover:shadow-2xl"
          )}>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
                <span className="text-pink-500">収入内訳</span>の詳細
              </h1>
              <p className="text-lg text-gray-700">
                チャットレディのお仕事は、お客様とのチャットやビデオ通話の時間に応じて報酬が発生します。
                さらに投げ銭やアイテム購入などの追加収入も。あなたの頑張り次第で収入アップが可能です。
              </p>
            </div>

            <div className="h-[400px]">
              {isMounted && inView && <Doughnut data={data} options={options} />}
            </div>

            <div className="space-y-4 mt-8">
              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="font-bold text-pink-800 mb-2">基本報酬について</h3>
                <p className="text-gray-700">
                  チャット時間に応じて基本報酬が発生。経験や実績に応じて時給が上がっていきます。
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-6">
                <h3 className="font-bold text-pink-800 mb-2">追加収入について</h3>
                <p className="text-gray-700">
                  お客様からの投げ銭やアイテム購入による収入は、全て還元率75%で還元されます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SimpleChartSection() {
  return (
    <ClientAnimationProvider>
      <SimpleChartContent />
    </ClientAnimationProvider>
  );
}