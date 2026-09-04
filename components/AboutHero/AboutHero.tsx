import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Mobile Title (Above image) */}
      <div className="sm:hidden text-center mb-6">
        <h2 className="text-3xl font-extrabold text-black leading-[1.2]">
          Technology change<br />made more useful.
        </h2>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-[450px] md:h-[500px] lg:h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2000&auto=format&fit=crop" 
            alt="Cordinit Office"
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay for better text readability if needed */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Glassmorphism Card */}
        <div className="absolute bottom-0 left-0 w-full md:w-[450px] lg:w-[500px] bg-white/30 backdrop-blur-xl p-8 sm:p-10 rounded-tr-3xl md:rounded-tr-[40px] border-t border-r border-white/40">
          <h4 className="text-white/90 text-[10px] font-bold tracking-widest uppercase mb-3">
            About Cordinit
          </h4>
          <h2 className="hidden sm:block text-3xl md:text-4xl font-normal text-white leading-tight mb-5">
            Technology change<br />made more useful.
          </h2>
          <p className="text-white/90 text-sm font-light leading-relaxed mb-8 pr-4">
            We help organisations make confident progress through technology securely, thoughtfully and with a focus on what will make a real difference.
          </p>
          
          <div className="flex flex-row gap-3">
            <button className="flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm">
              Talk to Us <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </button>
            <button className="flex items-center justify-center px-5 py-2.5 bg-transparent border border-gray-400 hover:bg-white/20 text-gray-800 text-xs font-medium rounded-lg transition-colors">
              Explore how we work <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
