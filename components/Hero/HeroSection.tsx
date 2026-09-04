import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center pt-16 pb-6 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Titles */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="hidden sm:block text-blue-600 font-bold text-section-subtitle-sm sm:text-section-subtitle tracking-[0.15em] uppercase mb-3">
          WELCOME TO CORDINIT
        </h3>
        <h1 className="hidden sm:block font-mulish text-[26px] sm:text-hero-main font-extrabold text-black text-center align-middle leading-[1.3] tracking-tight">
          Secure Digital Transformation.<br />
          Meaningful Progress.
        </h1>
        <h1 className="sm:hidden font-mulish text-[28px] font-extrabold text-black text-center align-middle leading-[1.2] tracking-tight px-2">
          Technology change<br />made more useful.
        </h1>
      </div>

      {/* Main Image and Card Container */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-[550px] lg:h-[600px] mb-0 sm:mb-8">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Corporate Digital Transformation"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Glassmorphism Card */}
        <div className="absolute bottom-4 sm:top-auto sm:translate-y-0 sm:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 lg:left-16 lg:translate-x-0 max-w-[420px] w-[94%] md:w-[90%] lg:w-full bg-white/30 backdrop-blur-xl border border-white/40 p-6 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <h4 className="hidden sm:block text-white/90 text-section-subtitle-xs sm:text-section-subtitle font-medium tracking-widest uppercase mb-3">
            SECURE DIGITAL TRANSFORMATION
          </h4>
          <h2 className="hidden sm:block text-hero-title sm:text-[1.75rem] font-normal text-white leading-[1.3] mb-4 sm:mb-5">
            Turning Technology Complexity<br />
            Into Meaningful Progress
          </h2>
          <p className="text-white/90 text-[15px] sm:text-sm font-medium sm:font-light leading-[1.6] sm:leading-relaxed mb-6 sm:mb-8">
            From secure foundations to connected<br className="hidden sm:block" />
            experiences and smarter operations, we help<br className="hidden sm:block" />
            organisations turn technology change into.
          </p>
          
          <div className="flex flex-row gap-3 sm:gap-4 w-full">
            <button className="flex-1 flex items-center justify-center px-2 sm:px-6 py-3 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[15px] sm:text-xs font-medium sm:font-normal rounded-xl sm:rounded-btn transition-colors shadow-sm whitespace-nowrap">
              Book a call <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-3.5 sm:w-3.5" />
            </button>
            <button className="flex-1 flex items-center justify-center px-2 sm:px-6 py-3 sm:py-2.5 bg-transparent border border-blue-500 hover:bg-white/10 text-blue-500 text-[15px] sm:text-xs font-medium sm:font-normal rounded-xl sm:rounded-btn transition-colors whitespace-nowrap">
              Explore solutions <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-3.5 sm:w-3.5 text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
