"use client";

import React from 'react';
import { useNewsletterModal } from './NewsletterModalProvider';
import { defaultNewsletterContent } from './newsletterContent';

export default function NewsletterSuccess() {
  const { closeModal } = useNewsletterModal();
  const { success } = defaultNewsletterContent;

  return (
    <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-16 h-16 mb-6 relative flex items-center justify-center">
        <img src="/success-icon.svg" alt="Success" width={60} height={60} />
      </div>

      <h3 className="text-success text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
        {success.eyebrow}
      </h3>
      <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.2] mb-3">
        {success.heading}
      </h2>
      <p className="text-ink-subtle text-[15px] sm:text-base leading-relaxed mb-6">
        {success.description1}
      </p>

      <p className="text-ink-subtle text-[11px] sm:text-[12px] leading-relaxed mb-10 max-w-[280px] mx-auto">
        {success.description2}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <button onClick={closeModal} className="flex-1 py-3.5 px-4 bg-primary hover:bg-primary-hover text-white text-[13px] sm:text-[14px] font-medium rounded-xl transition-colors shadow-lg shadow-glow-primary flex items-center justify-center">
          {success.button1}
        </button>
        <button onClick={closeModal} className="flex-1 py-3.5 px-4 bg-primary hover:bg-primary-hover text-white text-[13px] sm:text-[14px] font-medium rounded-xl transition-colors shadow-lg shadow-glow-primary flex items-center justify-center">
          {success.button2}
        </button>
      </div>
    </div>
  );
}
