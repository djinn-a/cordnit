'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigation } from '../../data/navigation';
import styles from './Navbar.module.css';
import MegaMenu from './MegaMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMegaMenus, setOpenMegaMenus] = useState<Record<string, boolean>>({});

  const toggleMegaMenu = (id: string, isOpen: boolean) => {
    setOpenMegaMenus(prev => ({
      ...prev,
      [id]: isOpen
    }));
  };

  const toggleMobileMegaMenu = (id: string) => {
    setOpenMegaMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <nav className={styles.navbar}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo-placeholder.png" 
                alt="Company Logo" 
                width={150} 
                height={45} 
                className="h-10 w-auto object-contain" 
              />
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.megaMenu) {
                return (
                  <div 
                    key={item.id}
                    className="group h-full flex items-center"
                    onMouseEnter={() => toggleMegaMenu(item.id, true)}
                    onMouseLeave={() => toggleMegaMenu(item.id, false)}
                  >
                    <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium py-8">
                      {item.label} <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {openMegaMenus[item.id] && (
                      <div className="absolute top-full left-0 w-full pt-0">
                        <MegaMenu isMobile={false} columns={item.megaMenu} />
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link 
                  key={item.id} 
                  href={item.href || '#'} 
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.label}
                </Link>
              );
            })}
            
            <Link href="/get-started" className="ml-2 px-6 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>
          
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navigation.map((item) => {
              if (item.megaMenu) {
                const isOpen = openMegaMenus[item.id];
                return (
                  <div key={item.id}>
                    <button 
                      onClick={() => toggleMobileMegaMenu(item.id)}
                      className="flex w-full items-center justify-between px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                      {item.label} <ChevronDown className={`ml-1 h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-3">
                        <MegaMenu isMobile={true} columns={item.megaMenu} />
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link 
                  key={item.id} 
                  href={item.href || '#'} 
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              );
            })}
            
            <div className="pt-4">
              <Link href="/get-started" className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
