'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const carouselImages = [
  {
    src: "https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg",
    alt: "モダンなオフィス環境"
  },
  {
    src: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    alt: "チームでのミーティング"
  },
  {
    src: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg",
    alt: "プライベートルーム"
  },
  {
    src: "https://images.pexels.com/photos/5699459/pexels-photo-5699459.jpeg",
    alt: "ラウンジエリア"
  },
  {
    src: "https://images.pexels.com/photos/3182831/pexels-photo-3182831.jpeg",
    alt: "スタッフのサポート"
  }
];

function CarouselContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 1.25,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.5, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.5, spacing: 24 },
      },
    },
  });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const section = sectionRef.current;
    
    if (!section) return;
    
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);
  
  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent opacity-70" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent opacity-50" />
      <div className="absolute top-0 left-0 w-full h-64 bg-[radial-gradient(circle_at_top_left,rgba(255,102,153,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            <span className="text-pink-500">安心・安全</span>な環境で働けます
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            プライバシーに配慮した清潔な専用個室、休憩スペース、メイクルームを完備。
            女性スタッフが常駐し、安心してお仕事に集中できる環境をご用意しています。
          </p>
        </div>
        
        <div className="relative">
          <div ref={sliderRef} className="keen-slider overflow-visible">
            {carouselImages.map((image, idx) => (
              <div key={idx} className="keen-slider__slide">
                <div className={cn(
                  "relative overflow-hidden rounded-xl shadow-lg transition-all duration-500",
                  "aspect-[4/3] transform hover:scale-[1.02]"
                )}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <p className="font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {loaded && instanceRef.current && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => instanceRef.current?.prev()}
                disabled={currentSlide === 0}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "border border-pink-200 bg-white text-pink-500",
                  "transition-all hover:bg-pink-50",
                  currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
                )}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => instanceRef.current?.next()}
                disabled={
                  currentSlide === 
                  (instanceRef.current.track.details.slides.length - 1)
                }
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "border border-pink-200 bg-white text-pink-500",
                  "transition-all hover:bg-pink-50",
                  currentSlide === (instanceRef.current.track.details.slides.length - 1)
                    ? "opacity-50 cursor-not-allowed" : ""
                )}
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function CarouselSection() {
  return (
    <ClientAnimationProvider>
      <CarouselContent />
    </ClientAnimationProvider>
  );
}