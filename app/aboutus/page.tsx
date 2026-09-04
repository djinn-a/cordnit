import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AboutHero from '../../components/AboutHero/AboutHero';
import AboutContent from '../../components/AboutContent/AboutContent';
import AboutPrinciples from '../../components/AboutPrinciples/AboutPrinciples';
import AboutTeam from '../../components/AboutTeam/AboutTeam';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Navbar />
      <main className="flex-grow flex flex-col w-full bg-white">
        <AboutHero />
        <AboutContent />
        <AboutPrinciples />
        <AboutTeam />
      </main>
      <Footer />
    </div>
  );
}
