'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MessageSquare, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = ['特徴', '報酬', '環境', 'よくある質問'] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-[#eabec9]/90 backdrop-blur-md py-0' : 'bg-[#eabec9] py-0'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-white" />
          <span className="font-mincho font-bold text-sm text-white">
            Live-Links
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className="relative text-white/90 hover:text-white text-sm transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </Link>
          ))}
          <Button asChild className="h-8 text-sm bg-white text-[#eabec9] hover:bg-white/90">
            <Link href="#応募">今すぐ応募</Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-1.5 text-white"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          'fixed left-0 w-full bg-[#eabec9]/95 backdrop-blur-md transition-height duration-300 ease-in-out md:hidden overflow-hidden',
          mobileOpen ? 'top-8 h-auto opacity-100' : 'top-8 h-0 opacity-0 pointer-events-none'
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={`#${item}`}
              className="text-white/90 hover:text-white py-2 border-b border-white/10 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Button
            asChild
            className="w-full h-8 text-sm bg-white text-[#eabec9] hover:bg-white/90"
          >
            <Link href="#応募" onClick={() => setMobileOpen(false)}>
              今すぐ応募
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
