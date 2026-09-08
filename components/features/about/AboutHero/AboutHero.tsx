import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto bg-white">
      {/* Mobile Title (Above image) */}
      <div className="sm:hidden text-center mb-6">
        <h2 className="text-3xl font-bold text-black leading-tight">
          Technology change<br />made more useful.
        </h2>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-[500px] md:h-[550px] lg:h-[650px]">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2000&auto=format&fit=crop"
            alt="Cordinit Office"
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Glassmorphism Card */}
        <div className="absolute bottom-4 sm:bottom-12 left-4 sm:left-12 w-[calc(100%-2rem)] sm:w-auto md:w-[480px] lg:w-[560px] bg-white/30 sm:bg-white/20 backdrop-blur-md p-6 sm:p-12 rounded-[20px] border border-white/20 shadow-2xl">
          <h4 className="hidden sm:block text-white/90 text-xs font-normal tracking-wide mb-6">
            About Cordinit
          </h4>
          <h2 className="hidden sm:block text-3xl md:text-[40px] font-normal text-white leading-[1.1] mb-3 sm:mb-4">
            Technology change<br />made more useful.
          </h2>

          {/* Mobile Text */}
          <p className="sm:hidden text-white/90 text-[14px] font-light leading-[1.6] mb-8">
            From secure foundations to connected experiences and smarter operations, we help organisations turn technology change into.
          </p>

          {/* Desktop Text */}
          <p className="hidden sm:block text-white/90 text-[15px] font-light leading-[1.8] mb-10 pr-2">
            We help organisations make confident progress through<br className="hidden sm:block" />
            technology securely, thoughtfully and with a focus on<br className="hidden sm:block" />
            what will make a real difference.
          </p>

          <div className="flex flex-row gap-3 sm:gap-4 w-full">
            <button className="flex-1 sm:flex-none flex items-center justify-center px-2 sm:px-6 py-2.5 sm:py-3 bg-[#2E5CFF] hover:bg-blue-700 text-white text-[13px] sm:text-sm font-medium rounded-lg transition-colors shadow-sm whitespace-nowrap">
              <span className="sm:hidden">Book a call</span>
              <span className="hidden sm:inline">Talk to Us</span> 
              <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center px-2 sm:px-6 py-2.5 sm:py-3 bg-transparent border border-[#2E5CFF] hover:bg-white/10 text-[#2251ff] text-[13px] sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
              <span className="sm:hidden">Explore solutions</span>
              <span className="hidden sm:inline">Explore how we work</span> 
              <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#2251ff]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



