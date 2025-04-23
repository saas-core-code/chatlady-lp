import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FixedNav from '@/components/layout/FixedNav';
import { Toaster } from '@/components/ui/toaster';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';
import FontProvider from '@/components/providers/FontProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | 福岡チャットレディ求人',
    default: '福岡の高収入チャットレディ求人 | 月収50万円以上可能',
  },
  description: '福岡エリアの女性向け高収入チャットレディ求人。安心・安全な環境で、あなたのペースで働けます。未経験者歓迎、日払い可、月収50万円以上も可能です。',
  keywords: 'チャットレディ, 求人, 福岡, 高収入, 在宅, 副業, 女性向け, アルバイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body>
        <FontProvider>
          <ClientAnimationProvider>
            <div className="flex min-h-screen flex-col pb-[72px]">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <FixedNav />
            </div>
            <Toaster />
          </ClientAnimationProvider>
        </FontProvider>
      </body>
    </html>
  );
}