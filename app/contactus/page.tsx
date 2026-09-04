import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ContactHero from '../../components/ContactHero/ContactHero';
import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import CtaSection from '../../components/CtaSection/CtaSection';

export default function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <main className="flex-grow flex flex-col w-full bg-white pt-[72px]">
        <ContactHero />
        <ContactFormSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
