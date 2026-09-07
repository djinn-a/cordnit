"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'validating' | 'success'>('idle');

  useEffect(() => {
    if (status === 'validating') {
      const timer = setTimeout(() => {
        setStatus('success');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('validating');
  };

  return (
    <div 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(90.96deg, #1645FF 0%, #0B1B55 38%, #05070D 100%)',
        backdropFilter: 'blur(100px)',
        WebkitBackdropFilter: 'blur(100px)'
      }}
    >
      {/* Abstract Background Waves (SVG representation) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" fill="none" stroke="#2563eb" strokeWidth="0.5" className="opacity-30" />
          <path d="M0,60 Q25,35 50,60 T100,60 L100,100 L0,100 Z" fill="none" stroke="#2563eb" strokeWidth="0.5" className="opacity-20" />
          <path d="M0,70 Q25,45 50,70 T100,70 L100,100 L0,100 Z" fill="none" stroke="#2563eb" strokeWidth="0.5" className="opacity-10" />
          <path d="M0,40 Q25,15 50,40 T100,40 L100,0 L0,0 Z" fill="none" stroke="#2563eb" strokeWidth="0.5" className="opacity-30" />
          <path d="M0,30 Q25,5 50,30 T100,30 L100,0 L0,0 Z" fill="none" stroke="#2563eb" strokeWidth="0.5" className="opacity-20" />
        </svg>
      </div>

      <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-[540px] mx-4 p-8 sm:p-12 rounded-3xl bg-[#0a1122]/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] min-h-[460px] flex flex-col justify-center">
        
        {status === 'idle' && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="mb-8">
              <h3 className="text-[#2251ff] text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
                NEWSLETTER
              </h3>
              <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.2] mb-4">
                Stay ahead of<br />what's next.
              </h2>
              <p className="text-[#a1a1aa] text-[15px] sm:text-base leading-relaxed">
                Get occasional insights from Cordinit on technology,
                security and transformation.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[13px] text-[#a1a1aa]">
                  Work email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="balamia@gmail.com"
                  className="w-full px-4 py-3.5 bg-transparent border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-colors"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="consent"
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded border-white/20 bg-transparent text-[#2251ff] focus:ring-[#3b82f6] focus:ring-offset-[#0a1122]"
                  />
                </div>
                <label htmlFor="consent" className="text-[13px] text-[#a1a1aa] leading-snug cursor-pointer">
                  I agree to receive updated from cordinit.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-[15px] rounded-xl transition-colors shadow-lg shadow-blue-500/20 mt-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        )}

        {status === 'validating' && (
          <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in-95 duration-500">
            {/* Spinning Arc */}
            <div className="w-10 h-10 mb-6 animate-spin">
              <svg viewBox="0 0 100 100" fill="none">
                <path d="M50 10 A 40 40 0 0 1 90 50" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
            
            <h3 className="text-[#2251ff] text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
              VALIDATION
            </h3>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.2] mb-3">
              Almost there...
            </h2>
            <p className="text-[#a1a1aa] text-[15px] sm:text-base leading-relaxed mb-8">
              We're just validating your details
            </p>

            <div className="flex flex-col items-start space-y-3 mb-10 mx-auto">
              <div className="flex items-center text-sm text-gray-300">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#2251ff] mr-3" />
                Email format looks good.
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <CheckCircle2 className="w-[18px] h-[18px] text-[#2251ff] mr-3" />
                Consent confirmed
              </div>
            </div>

            <p className="text-[#a1a1aa] text-[11px] sm:text-[13px] leading-relaxed">
              This will only take a moment. Please don't<br className="hidden sm:block" />
              refresh or close this window
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in-95 duration-500">
            {/* Custom Envelope & Check Icon */}
            <div className="w-16 h-16 mb-6 relative flex items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 14H8C5.8 14 4 15.8 4 18V34C4 36.2 5.8 38 8 38H40C42.2 38 44 36.2 44 34V18C44 15.8 42.2 14 40 14Z" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M44 18L24 30L4 18" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Background mask for circle to cut through the envelope */}
                <circle cx="38" cy="10" r="11" fill="#0a1122" />
                
                <circle cx="38" cy="10" r="9" fill="#00e676"/>
                <path d="M33 10.5L36 13.5L43 6.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h3 className="text-[#00e676] text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
              SUBSCRIPTION SUCCESSFUL
            </h3>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.2] mb-3">
              You're subscribed
            </h2>
            <p className="text-[#a1a1aa] text-[15px] sm:text-base leading-relaxed mb-6">
              Thank you for subscribing to Cordinit newsletter.
            </p>

            <p className="text-[#a1a1aa] text-[11px] sm:text-[12px] leading-relaxed mb-10 max-w-[280px] mx-auto">
              You'll receive the latest insights and perspectives<br />straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <button className="flex-1 py-3.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] sm:text-[14px] font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center">
                Explore solution <span className="ml-1.5 font-bold">→</span>
              </button>
              <button className="flex-1 py-3.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] sm:text-[14px] font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center">
                View latest insights <span className="ml-1.5 font-bold">→</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

