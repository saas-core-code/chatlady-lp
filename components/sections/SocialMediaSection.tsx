'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';
import Image from 'next/image';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const socialLinks = [
  {
    name: 'X (Twitter)',
    url: 'https://twitter.com/your-handle',
    gradient: 'bg-[#1DA1F2]',
    hoverGradient: 'hover:bg-[#0d8bd9]',
    icon: '/x-logo.svg',
    iconDark: true
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/your-handle',
    gradient: 'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    hoverGradient: 'hover:opacity-90',
    icon: '/instagram-logo.svg',
    iconDark: false
  }
];

function SocialMediaContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(cards.children,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6,
        stagger: 0.2
      },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-pink-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[linear-gradient(to_bottom,rgba(255,192,203,0.1),transparent)]" />
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-100/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-50 px-6 py-2 rounded-full mb-4">
            <Share2 className="h-5 w-5 text-pink-500" />
            <span className="text-pink-700 font-medium">SOCIAL MEDIA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            チャットレディー<span className="text-pink-500">関連情報</span>
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-pink-400 mb-4">
            SNSで配信中!!
          </p>
          <p className="text-lg text-gray-600">
            最新情報やお得な情報を配信中<br />
            フォローして見逃さないようチェックしてください
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                "transition-all duration-300 transform",
                "hover:-translate-y-1 hover:shadow-xl",
                social.gradient,
                social.hoverGradient
              )}
            >
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-white/20 backdrop-blur-sm"
                  )}>
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110",
                        social.iconDark ? "brightness-0 invert" : ""
                      )}
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {social.name}
                  </span>
                </div>
                <div className="text-white/80 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SocialMediaSection() {
  return (
    <ClientAnimationProvider>
      <SocialMediaContent />
    </ClientAnimationProvider>
  );
}