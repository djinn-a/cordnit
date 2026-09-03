import React from 'react';
import Image from 'next/image';

export default function CtaSection() {
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white mb-8 sm:mb-20">
      {/* Banner Container */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between p-10 md:p-16 lg:p-20">
        
        {/* Background Mesh Gradient Image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop" 
            alt="Colorful Abstract Background"
            className="w-full h-full object-cover"
          />
          
          {/* Base linear gradient for warmth and readability */}
          <div 
            className="absolute inset-0 z-10" 
            style={{
              background: 'linear-gradient(90deg, rgba(35, 35, 35, 0.82) 0%, rgba(73, 57, 32, 0.55) 35%, rgba(214, 143, 18, 0.45) 70%, rgba(255, 153, 35, 0.5) 100%)'
            }}
          ></div>

          {/* Subtle warm radial glow on the right */}
          <div 
            className="absolute inset-0 z-20"
            style={{
              background: 'radial-gradient(circle at 75% 45%, rgba(255, 179, 35, 0.3), transparent 45%)'
            }}
          ></div>
        </div>

        {/* Left Content */}
        <div className="relative z-10 md:w-3/5 text-white mb-10 md:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4">
            Ready to move your<br />
            technology forward?
          </h2>
          <p className="text-white/80 text-sm md:text-base font-light">
            Let's talk about your next milestone—and how to reach it
          </p>
        </div>

        {/* Right Content - Glass Card */}
        <div className="relative z-10 w-full sm:w-auto">
          <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col shadow-lg">
            <div className="flex items-center mb-5">
              {/* Expert Image */}
              <div className="w-14 h-14 rounded-xl overflow-hidden mr-4 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" 
                  alt="Cordinit Expert"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <p className="text-sm font-medium leading-snug">Talk to</p>
                <p className="text-sm font-medium leading-snug">Cordinit Expert</p>
              </div>
            </div>
            
            <button className="w-full py-2.5 px-4 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              Schedule a Call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
