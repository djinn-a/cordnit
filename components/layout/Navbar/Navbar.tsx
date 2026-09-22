'use client';

import React, { useState, useRef } from 'react';
import { useContactModal } from '../../features/contact/ContactModal/ContactModalProvider';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { navbarContent } from './navbarContent';
import MegaMenu from './MegaMenu';


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openModal } = useContactModal();

  const handleMenuEnter = (menuName: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDesktopMenu(menuName);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDesktopMenu(null);
    }, 150);
  };

  const handleLinkClick = () => {
    setActiveDesktopMenu(null);
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-linear-to-r from-primary to-surface-darker">

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Mobile Logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.webp" alt={navbarContent.logoAltText} className="h-12 w-auto" />
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

          {/* Left Group */}
          <div className="flex items-center gap-16">
            {/* Desktop Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.webp" alt={navbarContent.logoAltText} className="h-16 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6">
              {navbarContent.navLinks.map((link) => {
                if (link.label === 'Solutions') {
                  const isOpen = activeDesktopMenu === 'Solutions';
                  return (
                    <div 
                      key={link.label} 
                      className="h-20 flex items-center"
                      onMouseEnter={() => handleMenuEnter('Solutions')}
                      onMouseLeave={handleMenuLeave}
                    >
                      <Link
                        href={link.href}
                        className="text-white hover:text-white/80 font-semibold text-base transition-colors flex items-center gap-1.5 py-6"
                        onClick={handleLinkClick}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </Link>

                      {/* Mega Menu Dropdown */}
                      <MegaMenu
                        content={navbarContent.megaMenu}
                        solutions={navbarContent.solutionsDropdown}
                        isOpen={isOpen}
                        onLinkClick={handleLinkClick}
                      />
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-white hover:text-white/80 font-semibold text-base transition-colors py-6 flex items-center"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right CTA Button */}
          <div className="flex items-center">
            <button
              onClick={openModal}
              className="flex items-center px-6 py-2 border border-white rounded-lg opacity-80 hover:opacity-100 hover:bg-white/10 text-white font-semibold text-sm transition-all cursor-pointer"
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
          className={`bg-gradient-mobile-nav rounded-b-4xl shadow-2xl transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
            }`}
        >
          <div className="px-6 py-6 pb-10 flex flex-col">
            {navbarContent.navLinks.map((link) => {
              if (link.label === 'Solutions') {
                return (
                  <div key={link.label} className="border-b border-white/20 flex flex-col">
                    <button
                      className="flex items-center justify-between py-4 text-white hover:text-white/80 font-medium text-lg transition-colors w-full text-left"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileSolutionsOpen(!isMobileSolutionsOpen);
                      }}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileSolutionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Expandable sub-menu */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileSolutionsOpen ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                      <div className="flex flex-col gap-4 pl-4 pt-2">
                        {navbarContent.solutionsDropdown.map((solution) => (
                          <Link
                            key={solution.slug}
                            href={`/${solution.slug}`}
                            className="text-white/90 hover:text-white font-medium text-base transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {solution.title}
                          </Link>
                        ))}
                        <Link
                          href={navbarContent.megaMenu.exploreAllHref}
                          className="text-white font-bold text-base flex items-center mt-2 hover:opacity-80 transition-opacity"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {navbarContent.megaMenu.exploreAllLabel} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={link.label} className="border-b border-white/20">
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 text-white hover:text-white/80 font-medium text-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}

            <div className="pt-8">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal();
                }}
                className="inline-flex items-center justify-center px-6 py-3 border border-white/80 rounded-md text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
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
