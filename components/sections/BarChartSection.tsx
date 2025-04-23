'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { cn } from '@/lib/utils';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

function BarChartContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const barData = {
    labels: ['初心者平均', '3ヶ月目平均', '6ヶ月目平均', 'トップ報酬例'],
    datasets: [{
      label: '月収 (万円)',
      data: [25, 35, 48, 80],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',   // ピンク
        'rgba(54, 162, 235, 0.8)',   // ブルー
        'rgba(255, 206, 86, 0.8)',   // イエロー
        'rgba(75, 192, 192, 0.8)',   // ターコイズ
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1,
      borderRadius: 8,
    }],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#374151',
          callback: (value: number) => `${value}万円`,
          font: { size: 12, weight: 'bold' },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#374151',
          font: { size: 12, weight: 'bold' },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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
            return `月収: ${value}万円`;
          },
        },
      },
    },
    animation: {
      y: {
        from: 0,
        duration: 2000,
        easing: 'easeOutElastic',
        delay(context: any) {
          return context.dataIndex * 300;
        },
      },
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
      className="py-24 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden"
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
              <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
                <span className="text-pink-500">収入</span>の成長例
              </h2>
              <p className="text-lg text-gray-700">
                経験を積むにつれて収入は着実に増加。
                あなたの頑張り次第で、さらなる高収入も可能です。
              </p>
            </div>

            <div className="h-[400px]">
              {isMounted && inView && <Bar data={barData} options={barOptions} />}
            </div>

            <p className="text-center mt-8 text-gray-600">
              経験を積むにつれて収入は増加します。トップパフォーマーは月に
              <span className="font-bold text-pink-600">80万円以上</span>稼いでいます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BarChartSection() {
  return (
    <ClientAnimationProvider>
      <BarChartContent />
    </ClientAnimationProvider>
  );
}