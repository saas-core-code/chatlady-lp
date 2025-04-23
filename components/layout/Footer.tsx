'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <MessageCircle className="h-6 w-6 text-pink-500 group-hover:rotate-12 transition-all duration-300" />
              <span className="font-mincho font-bold text-xl text-white group-hover:text-pink-400 transition-colors">福岡チャットレディ</span>
            </Link>
            <p className="text-sm leading-relaxed">
              福岡エリアの女性向け高収入チャットレディ求人。
              安心・安全な環境で、あなたのペースで働けます。
              未経験者歓迎、日払い可能です。
            </p>
          </div>
          
          <div>
            <h3 className="font-mincho text-lg mb-4 text-white">サイトマップ</h3>
            <ul className="space-y-2">
              {['特徴', '報酬', '環境', 'よくある質問', '応募'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item}`}
                    className={cn(
                      'text-white/70 hover:text-pink-400 transition-colors',
                      'hover:translate-x-1 inline-block transition-transform'
                    )}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-mincho text-lg mb-4 text-white">お問い合わせ</h3>
            <p className="mb-2 text-sm">お気軽にお問い合わせください。</p>
            <p className="text-white text-lg font-semibold">080-XXXX-XXXX</p>
            <p className="text-sm mt-4">
              営業時間: 10:00〜22:00<br />
              定休日: 年中無休
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8 text-center text-xs text-white/60">
          <p>&copy; {currentYear} 福岡チャットレディ. All Rights Reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/privacy" className="hover:text-pink-400 transition-colors">プライバシーポリシー</Link>
            <Link href="/terms" className="hover:text-pink-400 transition-colors">利用規約</Link>
            <Link href="/company" className="hover:text-pink-400 transition-colors">運営会社</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}