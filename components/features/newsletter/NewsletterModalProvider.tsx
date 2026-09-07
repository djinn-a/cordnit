"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface NewsletterModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const NewsletterModalContext = createContext<NewsletterModalContextType | undefined>(undefined);

export function useNewsletterModal() {
  const context = useContext(NewsletterModalContext);
  if (!context) {
    throw new Error('useNewsletterModal must be used within a NewsletterModalProvider');
  }
  return context;
}

export function NewsletterModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'validating' | 'success'>('idle');

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStatus('idle');
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
    <NewsletterModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#050811]/70 transition-opacity"
            onClick={closeModal}
          ></div>

          {/* Modal Container */}
          <div
            className="relative w-full max-w-[1000px] bg-cover bg-center rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center min-h-[600px] my-auto border border-white/5"
            style={{ backgroundImage: 'url(/popup-bg.jpg)' }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner Card */}
            <div className="relative z-10 w-full max-w-[540px] p-8 sm:p-12 rounded-3xl bg-[#0a1122]/80 backdrop-blur-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col my-12 mx-4">

              {status === 'idle' && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
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

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[13px] text-[#a1a1aa]">
                        Work email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="balamia@gmail.com"
                        className="w-full px-4 py-3.5 bg-[#050811]/50 border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition-colors"
                      />
                    </div>

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

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-[15px] rounded-xl transition-colors mt-2"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              )}

              {status === 'validating' && (
                <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in-95 duration-500">
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
                  <div className="w-16 h-16 mb-6 relative flex items-center justify-center">
                    <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M40 14H8C5.8 14 4 15.8 4 18V34C4 36.2 5.8 38 8 38H40C42.2 38 44 36.2 44 34V18C44 15.8 42.2 14 40 14Z" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M44 18L24 30L4 18" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="38" cy="10" r="11" fill="#0a1122" />
                      <circle cx="38" cy="10" r="9" fill="#00e676" />
                      <path d="M33 10.5L36 13.5L43 6.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
                    <button onClick={closeModal} className="flex-1 py-3.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] sm:text-[14px] font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center">
                      Explore solution <span className="ml-1.5 font-bold">→</span>
                    </button>
                    <button onClick={closeModal} className="flex-1 py-3.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] sm:text-[14px] font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center">
                      View latest insights <span className="ml-1.5 font-bold">→</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </NewsletterModalContext.Provider>
  );
}

