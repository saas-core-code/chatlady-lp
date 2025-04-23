'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

type BannerProps = {
  src: string;
  href: string;
  alt: string;
  className?: string;
};

export default function Banner({ src, href, alt, className }: BannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    gsap.fromTo(
      banner,
      { 
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: banner,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className={cn(
        "overflow-hidden rounded-2xl shadow-lg transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1",
        "border-2 border-pink-100",
        className
      )}
    >
      <Link 
        href={href}
        className="block relative aspect-[3/1] w-full overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
    </div>
  );
}