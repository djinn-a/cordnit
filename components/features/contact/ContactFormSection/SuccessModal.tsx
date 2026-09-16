"use client";

import React from 'react';
import Link from 'next/link';

type SuccessModalProps = {
  isSuccess: boolean;
  setIsSuccess: (value: boolean) => void;
};

export default function SuccessModal({ isSuccess, setIsSuccess }: SuccessModalProps) {
  if (!isSuccess) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
      <div className="w-full max-w-[800px] rounded-card p-10 md:p-14 text-center relative border border-white bg-gradient-success-panel shadow-card">
        <div className="mx-auto w-[44px] h-[44px] bg-primary rounded-full flex items-center justify-center mb-6 shadow-md shadow-glow-primary">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-card-title-mobile md:text-card-title text-ink mb-3 tracking-tight">
          Thank you — we have received your enquiry
        </h2>
        <p className="text-ink-muted text-card-desc-mobile md:text-card-desc mb-8">
          We will be in touch soon. A copy of your request has been sent to your email.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/solutions" onClick={() => setIsSuccess(false)} className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg text-section-subtitle-mobile hover:bg-primary-hover transition-colors flex items-center justify-center shadow-md shadow-glow-primary">
            Explore Solutions <span className="ml-1.5 font-bold">→</span>
          </Link>
          <Link href="/insights" onClick={() => setIsSuccess(false)} className="w-full sm:w-auto px-6 py-2.5 bg-primary-pale border border-primary-muted text-white rounded-lg text-section-subtitle-mobile hover:bg-primary-muted transition-colors flex items-center justify-center">
            View Insights <span className="ml-1.5 font-bold">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
