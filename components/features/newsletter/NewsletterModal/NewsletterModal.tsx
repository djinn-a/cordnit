"use client";

import React from 'react';
import { X } from 'lucide-react';
import { useNewsletterModal } from './NewsletterModalProvider';
import NewsletterForm from './NewsletterForm';
import NewsletterValidation from './NewsletterValidation';
import NewsletterSuccess from './NewsletterSuccess';

export default function NewsletterModal() {
  const { isOpen, status, closeModal } = useNewsletterModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-surface-darker/70 transition-opacity"
        onClick={closeModal}
      ></div>

      {/* Modal Container */}
      <div
        className="relative w-full max-w-250 bg-cover bg-center rounded-4xl overflow-hidden shadow-2xl flex items-center justify-center min-h-150 my-auto border border-white/5"
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
        <div className="relative z-10 w-full max-w-135 p-8 sm:p-12 rounded-3xl bg-surface-dark/80 backdrop-blur-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col my-12 mx-4">
          {status === 'idle' && <NewsletterForm />}
          {status === 'validating' && <NewsletterValidation />}
          {status === 'success' && <NewsletterSuccess />}
        </div>
      </div>
    </div>
  );
}
