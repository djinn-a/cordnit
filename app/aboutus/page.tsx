import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Footer from '../../components/layout/Footer/Footer';
import AboutHero from '../../components/features/about/AboutHero/AboutHero';
import AboutContent from '../../components/features/about/AboutContent/AboutContent';
import AboutPrinciples from '../../components/features/about/AboutPrinciples/AboutPrinciples';
import AboutTeam from '../../components/features/about/AboutTeam/AboutTeam';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <main className="flex-grow flex flex-col w-full bg-white">
        <AboutHero />
        <AboutContent />
        <AboutPrinciples />
        <AboutTeam />
      </main>
    </div>
  );
}
