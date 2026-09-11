'use client';

import React, { useState } from 'react';
import { useContactModal } from '../../features/contact/ContactModal/ContactModalProvider';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { navbarContent } from './navbarContent';
import MegaMenu from './MegaMenu';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useContactModal();

  return (
    <nav className="w-full relative z-50 bg-gradient-to-r from-primary to-surface-darker">

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Mobile Logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={navbarContent.logoAltText} className="h-12 w-auto" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-white transition-colors"
          aria-label={navbarContent.mobileMenuToggleAriaLabel}
        >
          {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7 stroke-2" />}
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:block max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Desktop Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt={navbarContent.logoAltText} className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            {navbarContent.navLinks.map((link) => {
              if (link.label === 'Solutions') {
                return (
                  <div key={link.label} className="group h-20 flex items-center">
                    <Link
                      href={link.href}
                      className="text-white hover:text-white/80 font-medium text-sm transition-colors flex items-center gap-1.5 py-6"
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <MegaMenu 
                      content={navbarContent.megaMenu} 
                      solutions={navbarContent.solutionsDropdown} 
                    />
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white hover:text-white/80 font-medium text-sm transition-colors py-6 flex items-center"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Get in Touch Button */}
          <div className="flex items-center">
            <button
              onClick={openModal}
              className="flex items-center px-6 py-2 border border-white/80 rounded-md text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              {navbarContent.getInTouchLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Wrapper */}
      <div className="lg:hidden absolute top-full left-0 right-0 overflow-hidden pointer-events-none">
        {/* Animated Drawer */}
        <div 
          className={`bg-gradient-to-r from-primary to-surface-darker rounded-b-3xl shadow-2xl border-t border-white/10 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-6 py-6 pb-10 flex flex-col">
            {navbarContent.navLinks.map((link) => (
              <div key={link.label} className="border-b border-white/20">
                <Link
                  href={link.href}
                  className="flex items-center justify-between py-4 text-white hover:text-white/80 font-medium text-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  {link.label === 'Solutions' && <ChevronDown className="h-4 w-4" />}
                </Link>
              </div>
            ))}
            
            <div className="pt-8">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal();
                }}
                className="inline-flex items-center justify-center px-6 py-3 border border-primary bg-primary/20 text-white rounded-lg font-medium hover:bg-primary/40 transition-colors"
              >
                {navbarContent.getInTouchLabel} <ArrowRight className="ml-3 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
