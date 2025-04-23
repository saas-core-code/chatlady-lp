import HeroSection from '@/components/sections/HeroSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import WorkEnvironmentSection from '@/components/sections/WorkEnvironmentSection';
import InterviewSection from '@/components/sections/InterviewSection';
import CorporatePhilosophySection from '@/components/sections/CorporatePhilosophySection';
import StaffCommentsSection from '@/components/sections/StaffCommentsSection';
import CountermeasureSection from '@/components/sections/CountermeasureSection';
import QuestionnaireSection from '@/components/sections/QuestionnaireSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import BlogSection from '@/components/sections/BlogSection';
import SocialMediaSection from '@/components/sections/SocialMediaSection';
import FaqSection from '@/components/sections/FaqSection';
import ApplicationSection from '@/components/sections/ApplicationSection';
import CtaSection from '@/components/sections/CtaSection';
import JobPosting from '@/components/schema/JobPosting';
import { banners } from '@/lib/banners';
import Banner from '@/components/Banner';
import NewsSection from '@/components/sections/NewsSection';
import MangaGuideSection from '@/components/sections/MangaGuideSection';
import ChatLadyConcernsSection from '@/components/sections/ChatLadyConcernsSection';
import RecruitmentCallSection from '@/components/sections/RecruitmentCallSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '福岡の高収入チャットレディ求人 | 月収50万円以上可能',
  description: '福岡エリアの女性向け高収入チャットレディ求人。安心・安全な環境で、あなたのペースで働けます。未経験者歓迎、日払い可、月収50万円以上も可能です。',
  openGraph: {
    title: '福岡の高収入チャットレディ求人 | 月収50万円以上可能',
    description: '福岡エリアの女性向け高収入チャットレディ求人。安心・安全な環境で、あなたのペースで働けます。未経験者歓迎、日払い可、月収50万円以上も可能です。',
    images: ['/og-image.jpg'],
  },
};

export default function HomePage() {
  return (
    <>
      <JobPosting />
      <NewsSection />
      <HeroSection />
      <WorkEnvironmentSection />
      <MangaGuideSection />
      <ChatLadyConcernsSection />
      <RecruitmentCallSection />
      <CorporatePhilosophySection />

      {/* First Banner */}
      <section className="py-12 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Banner {...banners[0]} />
          </div>
        </div>
      </section>

      <InterviewSection />
      <BenefitsSection />

      {/* Second Banner */}
      <section className="py-12 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Banner {...banners[1]} />
          </div>
        </div>
      </section>

      <StaffCommentsSection />
      <CountermeasureSection />
      <QuestionnaireSection />
      <ComparisonSection />
      <BlogSection />
      <SocialMediaSection />
      <CtaSection />
      <FaqSection />
      <ApplicationSection />
    </>
  );
}