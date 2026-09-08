import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import ContactHero from '@/components/features/contact/ContactHero/ContactHero';
import ContactFormSection from '@/components/features/contact/ContactFormSection/ContactFormSection';
import CtaSection from '@/components/features/home/CtaSection/CtaSection';

export default function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <main className="flex-grow flex flex-col w-full bg-white pt-[72px]">
        <ContactHero />
        <ContactFormSection />
        <CtaSection />
      </main>
    </div>
  );
}
