"use client";

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { useNewsletterModal } from '../../features/newsletter/NewsletterModal/NewsletterModalProvider';

export default function TopBar() {
  const { openModal } = useNewsletterModal();

  return (
    <div className="w-full bg-primary text-white py-1.5 px-4 sm:px-6 lg:px-8 z-50 relative">
      <div className="max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto flex justify-end items-center text-xs font-medium tracking-wide">
        <Link href="/breach" className="flex items-center hover:text-white/80 transition-colors">
          <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
          Experiencing a Breach?
        </Link>
        <span className="mx-3 text-white/50">|</span>
        <button 
          onClick={openModal}
          className="hover:text-white/80 transition-colors bg-transparent border-none p-0 cursor-pointer text-xs font-medium tracking-wide text-white"
        >
          Newsletter
        </button>
      </div>
    </div>
  );
}
