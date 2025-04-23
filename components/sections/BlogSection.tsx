'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { BookOpen, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const blogPosts = [
  {
    title: '「植欲の春」NO GREEN NO LIFE 緑あふれるボタニカルライフ',
    date: '2025年4月18日',
    image: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg',
    link: '#'
  },
  {
    title: 'SNSを使うメリット・デメリット。どちらが大きいと思いますか？',
    date: '2025年4月11日',
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    link: '#'
  },
  {
    title: '心斎橋のチャットレディの特徴。できない言い訳より、できる理由を考える',
    date: '2025年4月7日',
    image: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg',
    link: '#'
  }
];

function BlogContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const posts = postsRef.current;

    if (!section || !title || !posts) return;

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
    ).fromTo(posts.children,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
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
            <BookOpen className="h-5 w-5 text-pink-500" />
            <span className="text-pink-700 font-medium">BLOG</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            代表の<span className="text-pink-500">ブログ一覧</span>
          </h2>
        </div>

        <div 
          ref={postsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {blogPosts.map((post, idx) => (
            <Link
              key={idx}
              href={post.link}
              className={cn(
                "group bg-white rounded-2xl overflow-hidden",
                "border border-pink-100 shadow-lg",
                "transition-all duration-300",
                "hover:-translate-y-2 hover:shadow-xl"
              )}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white/90 text-sm">{post.date}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center text-pink-500 text-sm font-medium">
                  <span>記事を読む</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3",
              "border-2 border-gray-800 rounded-full",
              "text-gray-800 font-medium",
              "transition-all duration-300",
              "hover:bg-gray-800 hover:text-white"
            )}
          >
            <span>VIEW ALL</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function BlogSection() {
  return (
    <ClientAnimationProvider>
      <BlogContent />
    </ClientAnimationProvider>
  );
}