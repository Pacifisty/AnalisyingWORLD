import HeroSection from '@/components/home/HeroSection';
import DailyHighlights from '@/components/home/DailyHighlights';
import PopularAnalyses from '@/components/home/PopularAnalyses';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DailyHighlights />
      <PopularAnalyses />
    </>
  );
}
