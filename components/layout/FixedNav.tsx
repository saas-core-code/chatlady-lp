'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function FixedNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="grid grid-cols-2">
        <a 
          href="https://line.me/R/ti/p/@your-line-id"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center justify-center gap-2 py-4",
            "bg-[#00B900] hover:bg-[#00A000] transition-colors",
            "text-white font-bold text-lg"
          )}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
            alt="LINE"
            width={28}
            height={28}
            className="brightness-0 invert"
          />
          <span>LINE</span>
        </a>
        
        <Link 
          href="/blog"
          className={cn(
            "flex items-center justify-center gap-2 py-4",
            "bg-pink-500 hover:bg-pink-600 transition-colors",
            "text-white font-bold text-lg"
          )}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/1187/1187544.png"
            alt="ブログ"
            width={28}
            height={28}
            className="brightness-0 invert"
          />
          <span>BLOG</span>
        </Link>
      </div>
    </div>
  );
}