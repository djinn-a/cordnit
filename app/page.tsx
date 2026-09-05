import Navbar from '../components/layout/Navbar/Navbar';
import HeroSection from '../components/features/home/Hero/HeroSection';
import HelpSection from '../components/features/home/HelpSection/HelpSection';
import InsightsSection from '../components/features/home/InsightsSection/InsightsSection';
import MethodologySection from '../components/features/home/MethodologySection/MethodologySection';
import RecognitionSection from '../components/features/home/RecognitionSection/RecognitionSection';
import TestimonialsSection from '../components/features/home/TestimonialsSection/TestimonialsSection';
import CtaSection from '../components/features/home/CtaSection/CtaSection';
import Footer from '../components/layout/Footer/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <main className="flex-grow flex flex-col w-full bg-white">
        <HeroSection />
        <HelpSection />
        <InsightsSection />
        <MethodologySection />
        <RecognitionSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </div>
  );
}
