"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useContactModal } from '../../features/contact/ContactModal/ContactModalProvider';

import FooterNewsletter from './FooterNewsletter';
import FooterMediaFeature from './FooterMediaFeature';
import { FOOTER_NAV_COLUMNS, SOCIAL_LINKS } from './footerData';

export default function Footer() {
  const { openModal } = useContactModal();

  return (
    <footer className="w-full relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/footer-bg.png')" }}
      >
      </div>

      {/* Main Container */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl p-6 md:p-12 lg:p-16 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto flex flex-col min-h-[400px]">

        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8">
          {/* Logo and Tagline (Left Side) */}
          <div className="lg:w-1/4 shrink-0 mb-4 lg:mb-0">
            <div className="flex flex-col gap-4 mb-6 lg:mb-8">
              <Link href="/" className="shrink-0">
                <Image
                  src="/logo.png"
                  alt="Cordinit Logo"
                  width={180}
                  height={52}
                  className="h-10 lg:h-14 w-auto brightness-0"
                />
              </Link>
              <p className="text-ink text-body-sm max-w-[200px] lg:max-w-[240px]">
                Let&apos;s talk about your next milestone—and how to reach it
              </p>
            </div>
            <Button
              onClick={openModal}
              className="bg-primary hover:bg-primary-hover text-white text-button px-5 py-2.5 rounded-lg flex items-center w-max cursor-pointer"
            >
              Book a call <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Links Grid (Right Side) */}
          <div className="lg:w-3/4 grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8 lg:gap-8">
            {FOOTER_NAV_COLUMNS.map((col) => (
              <div key={col.id} className={col.orderClasses}>
                <h4 className="text-black text-eyebrow lg:text-12px xl:text-12px font-700 mb-4 lg:mb-5">{col.title}</h4>
                <ul className="space-y-3 lg:space-y-4">
                  {col.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-black hover:text-black text-body-sm">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-12 lg:mt-20 pt-8 border-t border-gray-100/0">
          {/* Social Icons */}
          <div className="flex space-x-3 mb-8 lg:mb-0">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.id} href={social.href} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors" aria-label={social.label}>
                <Image src={social.icon} alt={social.label} width={14} height={14} />
              </a>
            ))}
          </div>

          {/* Stay Ahead Form */}
          <FooterNewsletter />
        </div>
      </div>

      {/* Latest from Cordinit Section */}
      <FooterMediaFeature />
    </footer>
  );
}
