'use client';
import React from 'react';
import Image from 'next/image';
import { useContactModal } from '../../contact/ContactModal/ContactModalProvider';

export default function CtaSection() {
  const { openModal } = useContactModal();
  return (
    <section className="relative w-[calc(100%-2rem)] md:w-full mx-auto md:max-w-[1120px] md:h-[232px] pt-16 pb-20 md:py-8 px-6 md:px-[60px] bg-[#0a1122] mb-8 sm:mb-12 md:mb-24 overflow-hidden rounded-[32px] md:rounded-3xl shadow-lg">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cta-bg.png"
          alt="Abstract Background"
          className="w-full h-full object-cover object-[60%_40%] md:object-center scale-[2.5] md:scale-100 -translate-y-[15%] md:translate-y-0 origin-[60%_40%] md:origin-center"
        />
      </div>

      {/* Banner Container */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between">

        {/* Left Content */}
        <div className="relative z-10 w-full md:w-[615px] text-white mb-12 md:mb-0">
          {/* Mobile Text */}
          <div className="md:hidden flex flex-col w-full">
            <h2 className="text-[36px] leading-[1.25] font-medium mb-5 tracking-tight">
              Let’s find the right<br />
              starting point
            </h2>
            <p className="text-white/90 text-[18px] leading-[1.6] font-light max-w-[340px]">
              Tell us what you are trying to achieve. We will help identify the most useful next step.
            </p>
          </div>

          {/* Desktop Text */}
          <div className="hidden md:flex flex-col justify-center w-full">
            <h2 className="text-[32px] leading-[1.25] md:text-3xl lg:text-[36px] font-medium md:leading-[1.2] mb-2 md:mb-3">
              Ready to move your<br />
              technology forward?
            </h2>
            <p className="text-white/90 md:text-white/80 text-[17px] leading-relaxed md:text-[15px] font-light">
              Let's talk about your next milestone—and how to reach it
            </p>
          </div>
        </div>

        {/* Right Content - Glass Card */}
        <div className="relative z-10 w-full sm:w-auto">
          {/* Mobile Card */}
          <div className="md:hidden bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-6 flex flex-col shadow-2xl w-full">
            <div className="flex items-center mb-6">
              <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden mr-4 shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/expert-portrait.jpg"
                  alt="Cordinit Expert"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col justify-center">
                <p className="text-[17px] font-normal leading-snug mb-0.5 text-white/90">Talk to</p>
                <p className="text-[19px] font-medium leading-snug">Cordinit Expert</p>
              </div>
            </div>
            <button onClick={openModal} className="w-full py-[18px] px-4 bg-white text-gray-900 text-[18px] font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              Schedule a Call
            </button>
          </div>

          {/* Desktop Card */}
          <div className="hidden md:flex flex-col justify-between gap-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-4 w-[260px] h-[156px] shadow-lg shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/expert-portrait.jpg"
                  alt="Cordinit Expert"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col justify-center gap-1">
                <p className="text-xs font-normal leading-none text-white/90">Talk to</p>
                <p className="text-sm font-medium leading-tight">Cordinit Expert</p>
              </div>
            </div>
            <button onClick={openModal} className="w-full py-2.5 px-4 bg-white text-gray-900 text-[13px] font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm mt-auto">
              Schedule a Call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

