'use client';

import React, { useState } from 'react';
import { useContactModal } from '../../features/contact/ContactModal/ContactModalProvider';
import Link from 'next/link';
import {
  Menu, X, ArrowRight, Network, ChevronDown,
  Shield, Cloud, Brain, Code, Database, Briefcase
} from 'lucide-react';

const navLinks = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/aboutus' },
  { label: 'Industries', href: '/industries' },
  { label: 'Accelerators', href: '/accelerators' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contactus' },
];

const solutionsDropdown = [
  {
    title: 'Cybersecurity',
    description: 'Comprehensive protection for digital assets and risk mitigation.',
    icon: Shield,
    iconColor: 'text-primary',
    iconBg: 'bg-ink',
  },
  {
    title: 'Cloud & Infrastructure',
    description: 'Secure, scalable, high-performing architectures.',
    icon: Cloud,
    iconColor: 'text-orange-400',
    iconBg: 'bg-ink',
  },
  {
    title: 'AI & Automation',
    description: 'Optimize operations and make smarter, faster decisions.',
    icon: Brain,
    iconColor: 'text-purple-400',
    iconBg: 'bg-ink',
  },
  {
    title: 'Application Engineering',
    description: 'Design and modernize applications for business agility.',
    icon: Code,
    iconColor: 'text-cyan-400',
    iconBg: 'bg-ink',
  },
  {
    title: 'Data & Integration',
    description: 'Unify systems to drive actionable insights.',
    icon: Database,
    iconColor: 'text-green-400',
    iconBg: 'bg-ink',
  },
  {
    title: 'Salesforce Solutions',
    description: 'Transform customer experiences with the power of Salesforce.',
    icon: Briefcase,
    iconColor: 'text-indigo-400',
    iconBg: 'bg-ink',
  }
];

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
          <img src="/logo.png" alt="Cordinit Logo" className="h-12 w-auto" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7 stroke-[2]" />}
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:block max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Desktop Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Cordinit Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => {
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
                    <div className="absolute top-20 left-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out border-t border-white/5 shadow-2xl bg-gradient-to-r from-primary to-surface-darker pointer-events-none group-hover:pointer-events-auto">
                      <div className="max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto px-4 sm:px-6 lg:px-8 flex">

                        {/* Left Panel */}
                        <div className="w-[30%] py-12 pr-12 flex flex-col items-start border-r border-white/10 relative">
                          <h3 className="text-white font-bold text-[11px] tracking-widest uppercase mb-6 opacity-90">Our Capabilities</h3>
                          <p className="text-white text-[15px] font-medium leading-relaxed mb-8 opacity-90">
                            End-to-end digital transformation tailored to complex enterprise environments.
                          </p>
                          <Link href="/solutions" className="flex items-center text-white font-bold text-[11px] uppercase tracking-widest hover:opacity-80 transition-opacity mt-auto">
                            Explore All Solutions <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>

                        {/* Right Panel */}
                        <div className="w-[70%] py-12 pl-12 grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                          {solutionsDropdown.map((item, idx) => (
                            <Link href={`/solutions#${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} key={idx} className="group/item flex flex-col items-start hover:opacity-80 transition-opacity">
                              <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 ${item.iconBg}`}>
                                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                              </div>
                              <h4 className="text-white font-semibold text-[15px] mb-2">{item.title}</h4>
                              <p className="text-white/70 text-[13px] leading-relaxed">
                                {item.description}
                              </p>
                            </Link>
                          ))}
                        </div>

                      </div>
                    </div>
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
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </button>
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
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal();
                }}
                className="flex items-center justify-center w-full px-4 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-hover"
              >
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


