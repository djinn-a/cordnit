import Navbar from '../components/Navbar/Navbar';
import HeroSlider from '../components/Hero/HeroSlider';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      <Navbar />
      <main className="flex-grow flex flex-col w-full">
        <HeroSlider />
      </main>
      <Footer />
    </div>
  );
}
