import React from 'react';
import { Button } from '@/components/ui';

export default function FooterNewsletter() {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 w-full lg:w-auto mx-auto lg:ml-auto lg:mr-0 max-w-3xl">
      <div className="flex flex-col max-w-[280px]">
        <h4 className="text-black text-h4 mb-1">Stay Ahead</h4>
        <p className="text-gray-500 text-caption">Receive occasional perspectives on the technology topics that matter to you.</p>
      </div>
      <form 
        className="flex w-full lg:w-auto gap-2 lg:gap-3" 
        aria-label="Newsletter subscription form"
        onSubmit={(e) => e.preventDefault()}
      >
        <input 
          type="email" 
          placeholder="Work email" 
          aria-label="Work email address"
          required
          className="border border-gray-200 rounded-lg px-3 lg:px-4 py-2.5 lg:py-3 text-body-sm flex-1 lg:flex-none lg:w-[240px] focus:outline-none focus:ring-1 focus:ring-primary shadow-sm min-w-0" 
        />
        <Button 
          type="submit"
          className="bg-primary hover:bg-primary-hover text-white text-button px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg shadow-sm whitespace-nowrap"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
}
