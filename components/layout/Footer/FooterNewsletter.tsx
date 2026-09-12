"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!email.trim() || !valid) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setEmail('');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 w-full lg:w-auto mx-auto lg:ml-auto lg:mr-0 max-w-3xl">

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-ink text-white px-5 py-3.5 rounded-xl shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <span className="text-[14px] font-medium">Subscribed!</span>
        </div>
      )}

      <div className="flex flex-col max-w-[280px]">
        <h4 className="text-black text-h4 mb-1">Stay Ahead</h4>
        <p className="text-gray-500 text-caption">Receive occasional perspectives on the technology topics that matter to you.</p>
      </div>

      <form
        className="flex flex-col w-full lg:w-auto gap-1.5"
        aria-label="Newsletter subscription form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex w-full lg:w-auto gap-2 lg:gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
            placeholder="Work email"
            aria-label="Work email address"
            className={`border rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-body-sm flex-1 lg:flex-none lg:w-[240px] focus:outline-none focus:ring-1 shadow-sm min-w-0 transition-colors ${
              emailError
                ? 'border-red-400 focus:ring-red-400 bg-red-50'
                : 'border-gray-200 focus:ring-primary'
            }`}
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white text-button px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg shadow-sm whitespace-nowrap cursor-pointer"
          >
            Subscribe
          </Button>
        </div>
        {emailError && (
          <p className="text-red-500 text-[11px] pl-1">Please enter a valid email address.</p>
        )}
      </form>
    </div>
  );
}
