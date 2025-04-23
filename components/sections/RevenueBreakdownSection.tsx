'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { cn } from '@/lib/utils';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

function RevenueBreakdownContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const doughnutData = {
    labels: ['ビデオチャット', 'テキストチャット', '投げ銭', 'アイテム売上', 'その他'],
    datasets: [{
      data: [40, 25, 15, 10, 10],
      backgroundColor: chartColors,
      borderColor: Array(5).fill('#ffffff'),
      borderWidth: 2,
      hoverOffset: 20,
      hoverBorderWidth: 4,
      hoverBorderColor: chartColors,
    }],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: { size: 14, weight: 'bold' },
          color: '#374151',
          usePointStyle: true,
          pointStyle: 'circle',
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => ({
                text: `${label} ${data.datasets[0].data[i]}%`,
                fillStyle: chartColors[i],
                strokeStyle: chartColors[i],
                lineWidth: 2,
                hidden: false,
                index: i,
              }));
            }
            return [];
          }
        },
        onClick: () => {}, // 凡例クリックを無効化
      },
      tooltip: {
        enabled: false,
      },
    },
    onHover: (event: any, elements: any[]) => {
      if (elements.length) {
        setActiveIndex(elements[0].index);
      } else {
        setActiveIndex(-1);
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeOutElastic',
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const chart = chartRef.current;

    if (!section || !title || !chart) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(chart,
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95,
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <section
      ref={sectionRef}
      id="報酬"
      className="py-24 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,rgba(255,102,153,0.05),transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(255,102,153,0.08),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            <span className="text-pink-500">収入内訳</span>の詳細
          </h2>
          <p className="text-lg text-gray-700">
            チャットレディのお仕事は、お客様とのチャットやビデオ通話の時間に応じて報酬が発生します。
            さらに投げ銭やアイテム購入などの追加収入も。あなたの頑張り次第で収入アップが可能です。
          </p>
        </div>

        <div ref={chartRef} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl">
            <div className="relative h-[400px]">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-4xl font-bold text-gray-800">100%</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-center text-gray-600">
                ビデオチャットが最も収入が高く、チャット時間に比例して報酬が発生します。
                お客様からの投げ銭やアイテム購入も重要な収入源です。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-lg p-4">
                  <h4 className="font-bold text-pink-800 mb-2">基本報酬について</h4>
                  <p className="text-sm text-gray-700">
                    チャット時間に応じて基本報酬が発生。経験や実績に応じて時給が上がっていきます。
                  </p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4">
                  <h4 className="font-bold text-pink-800 mb-2">追加収入について</h4>
                  <p className="text-sm text-gray-700">
                    お客様からの投げ銭やアイテム購入による収入は、全て還元率75%で還元されます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RevenueBreakdownSection() {
  return (
    <ClientAnimationProvider>
      <RevenueBreakdownContent />
    </ClientAnimationProvider>
  );
}