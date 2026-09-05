'use client';
import React from 'react';
import Image from 'next/image';
import { useContactModal } from '../../contact/ContactModal/ContactModalProvider';

export default function CtaSection() {
  const { openModal } = useContactModal();
  return (
    <section className="relative w-auto mx-4 md:mx-0 md:w-full pt-16 pb-16 md:pt-14 md:pb-28 lg:pt-16 lg:pb-32 bg-white mb-8 sm:mb-20 overflow-hidden rounded-[32px] md:rounded-none">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cta-bg.png"
          alt="Abstract Background"
          className="w-full h-full object-cover object-left md:object-center scale-[2] md:scale-100 origin-center"
        />
      </div>

      {/* Banner Container */}
      <div className="relative z-10 w-full max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between">

        {/* Left Content */}
        <div className="relative z-10 w-full md:w-3/5 text-white mb-12 md:mb-0">
          <h2 className="text-[32px] leading-[1.25] md:text-4xl lg:text-5xl font-medium md:leading-tight mb-5 md:mb-4">
            Ready to move your<br />
            technology forward?
          </h2>
          <p className="text-white/90 md:text-white/80 text-[17px] leading-relaxed md:text-base font-light pr-4 md:pr-0">
            Let's talk about your next milestone—and how to reach it
          </p>
        </div>

        {/* Right Content - Glass Card */}
        <div className="relative z-10 w-full sm:w-auto">
          <div className="bg-white/10 md:bg-white/20 backdrop-blur-xl md:backdrop-blur-md border border-white/20 rounded-[28px] md:rounded-2xl p-6 md:p-5 flex flex-col shadow-lg">
            <div className="flex items-center mb-8 md:mb-5">
              {/* Expert Image */}
              <div className="w-[88px] h-[88px] md:w-14 md:h-14 rounded-[22px] md:rounded-xl overflow-hidden mr-5 md:mr-4 shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
                  alt="Cordinit Expert"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col justify-center">
                <p className="text-[17px] md:text-sm font-normal md:font-medium leading-snug mb-1 md:mb-0 text-white/90 md:text-white">Talk to</p>
                <p className="text-[19px] md:text-sm font-medium leading-snug">Cordinit Expert</p>
              </div>
            </div>

            <button onClick={openModal} className="w-full py-4 md:py-2.5 px-4 bg-white text-gray-900 text-[17px] md:text-sm font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              Schedule a Call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
