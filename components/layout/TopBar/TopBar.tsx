"use client";

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { useNewsletterModal } from '../../features/newsletter/NewsletterModal/NewsletterModalProvider';
import type { NavbarCmsContent } from '../Navbar/navbarContent';

export default function TopBar({ content }: Readonly<{ content?: NavbarCmsContent }>) {
  const { openModal } = useNewsletterModal();

  return (
    <div className="w-full bg-primary text-white py-1.5 px-4 sm:px-6 lg:px-8 z-50 relative">
      <div className="max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto flex justify-end items-center text-xs font-medium tracking-wide">
        {content?.topBarBreachHref ? (
          <Link href={content.topBarBreachHref} className="flex items-center hover:text-white/80 transition-colors">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            {content.topBarBreachLabel}
          </Link>
        ) : (
          <span className="flex items-center text-white/70">
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            {content?.topBarBreachLabel ?? "Experiencing a Breach?"}
          </span>
        )}
        <span className="mx-3 text-white/50">|</span>
        <button 
          onClick={openModal}
          className="hover:text-white/80 transition-colors bg-transparent border-none p-0 cursor-pointer text-xs font-medium tracking-wide text-white"
        >
          {content?.topBarNewsletterLabel ?? "Newsletter"}
        </button>
      </div>
    </div>
  );
}
