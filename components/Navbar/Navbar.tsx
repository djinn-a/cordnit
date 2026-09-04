'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Network } from 'lucide-react';

const navLinks = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Accelerators', href: '/accelerators' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/aboutus' },
  { label: 'Contact', href: '/contactus' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full relative z-50 lg:bg-gradient-to-r lg:from-blue-600 lg:to-[#040A14]">
      
      {/* Mobile Navbar Island */}
      <div className="lg:hidden p-4 sm:p-6 pb-0">
        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-2 flex items-center w-fit">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-gray-100/80 hover:bg-gray-200 transition-colors p-2.5 rounded-lg mr-4"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 text-black" /> : <Menu className="h-5 w-5 text-black stroke-[2.5]" />}
          </button>
          
          <Link href="/" className="flex flex-col items-center justify-center text-black pr-3">
            <div className="flex items-center relative">
              <Network className="h-[18px] w-[18px] text-black" />
              <div className="absolute top-0 right-0 w-[3px] h-[3px] bg-black rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-[3px] h-[3px] bg-black rounded-full"></div>
            </div>
            <span className="font-bold text-[10px] leading-none mt-1 tracking-wide">Cordinit</span>
            <span className="text-[5px] font-medium leading-none mt-0.5 tracking-wider uppercase opacity-80">Your Cloud Creation</span>
          </Link>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Desktop Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex flex-col items-center justify-center text-white mt-1">
              <div className="flex items-center relative">
                <Network className="h-7 w-7 text-white" />
                <div className="absolute top-1 right-0 w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="absolute bottom-1 left-0 w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span className="font-bold text-xl leading-none mt-1 tracking-wide">Cordinit</span>
              <span className="text-section-subtitle-xs font-medium leading-none mt-1 tracking-wider opacity-90 uppercase">Your Cloud Creation</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white hover:text-white/80 font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Get in Touch Button */}
          <div className="flex items-center">
            <Link 
              href="/contactus" 
              className="flex items-center px-6 py-2 border border-white/80 rounded-md text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="block px-3 py-3 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link 
                href="/contactus" 
                className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
