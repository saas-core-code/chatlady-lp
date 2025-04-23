import { Metadata } from 'next';
import BlogSection from '@/components/sections/BlogSection';

export const metadata: Metadata = {
  title: 'ブログ一覧',
  description: 'チャットレディのお仕事や日常に関する情報をお届けします。',
};

export default function BlogPage() {
  return (
    <>
      <BlogSection />
    </>
  );
}