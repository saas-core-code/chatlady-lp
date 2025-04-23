'use client';

import { Inter, Noto_Sans_JP, Noto_Serif_JP, Klee_One } from 'next/font/google';
import { cn } from '@/lib/utils';

// Font definitions
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSans = Noto_Sans_JP({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  variable: '--font-gothic'
});
const notoSerif = Noto_Serif_JP({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  variable: '--font-mincho'
});
const kleeOne = Klee_One({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-klee'
});

export default function FontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn(
      inter.variable, 
      notoSans.variable, 
      notoSerif.variable,
      kleeOne.variable,
      'font-gothic text-foreground antialiased'
    )}>
      {children}
    </div>
  );
}