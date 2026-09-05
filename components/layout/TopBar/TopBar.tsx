import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="w-full bg-blue-600 text-white py-1.5 px-4 sm:px-6 lg:px-8 z-[60] relative">
      <div className="max-w-7xl mx-auto flex justify-end items-center text-xs font-medium tracking-wide">
        <Link href="/breach" className="flex items-center hover:text-white/80 transition-colors">
          <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
          Experiencing a Breach?
        </Link>
        <span className="mx-3 text-white/50">|</span>
        <Link href="/newsletter" className="hover:text-white/80 transition-colors">
          Newsletter
        </Link>
      </div>
    </div>
  );
}
