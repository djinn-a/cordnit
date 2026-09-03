import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/Hero/HeroSection';
import HelpSection from '../components/HelpSection/HelpSection';
import InsightsSection from '../components/InsightsSection/InsightsSection';
import MethodologySection from '../components/MethodologySection/MethodologySection';
import RecognitionSection from '../components/RecognitionSection/RecognitionSection';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import CtaSection from '../components/CtaSection/CtaSection';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <main className="flex-grow flex flex-col w-full bg-white">
        <HeroSection />
        <HelpSection />
        <InsightsSection />
        <MethodologySection />
        <RecognitionSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
