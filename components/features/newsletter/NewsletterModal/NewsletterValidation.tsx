"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { defaultNewsletterContent } from './newsletterContent';

export default function NewsletterValidation() {
  const { validation } = defaultNewsletterContent;

  return (
    <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-10 h-10 mb-6 animate-spin">
      </div>

      <h3 className="text-primary text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
        {validation.eyebrow}
      </h3>
      <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.2] mb-3">
        {validation.heading}
      </h2>
      <p className="text-ink-subtle text-[15px] sm:text-base leading-relaxed mb-8">
        {validation.description}
      </p>

      <div className="flex flex-col items-start space-y-3 mb-10 mx-auto">
        <div className="flex items-center text-sm text-gray-300">
          <CheckCircle2 className="w-[18px] h-[18px] text-primary mr-3" />
          {validation.emailFormatValid}
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <CheckCircle2 className="w-[18px] h-[18px] text-primary mr-3" />
          {validation.consentConfirmed}
        </div>
      </div>

      <p className="text-ink-subtle text-[11px] sm:text-[13px] leading-relaxed">
        {validation.waitMessage}
      </p>
    </div>
  );
}
