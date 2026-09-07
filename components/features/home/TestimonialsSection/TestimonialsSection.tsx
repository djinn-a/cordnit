'use client';

import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Play, ArrowRight as ArrowRightSmall } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Michelle Pieszko',
    role: 'VP, Cybersecurity Operations',
    company: 'Company Name',
    quote: '"Security isn\'t just about protection. It\'s about creating the confidence to move faster."',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Nitin Raina',
    role: 'Chief Information Security Officer',
    company: 'Global Financial Services',
    quote: '"The architectural clarity Cordinit brings has transformed how our board understands risk posture."',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Rohit Kohli',
    role: 'Deputy CISO',
    company: 'Enterprise Tech Solutions',
    quote: '"Scalability without compromise. It\'s rare to find a platform that delivers both operational rigor and agility."',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Igor Tsygan...',
    role: 'President & CTO',
    company: 'Innovate Data Corp',
    quote: '"We deployed their framework in weeks, not months. The precision is unmatched."',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
  }
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-8 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-start sm:items-center text-left sm:text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
        <h3 className="text-[#2251ff] font-bold text-section-subtitle-sm sm:text-section-subtitle tracking-[0.15em] uppercase mb-3 sm:mb-4">
          TESTIMONIALS
        </h3>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold sm:font-extrabold text-black leading-tight sm:leading-[1.15] mb-4 sm:mb-6 pr-4 sm:pr-0">
          The technology partner trusted by security teams worldwide        </h2>
        <p className="text-gray-600 sm:text-gray-500 text-sm sm:text-lg">
          Hear from industry leaders who have used our expertise to<br className="hidden sm:block" />
          <span className="sm:hidden"> </span> strengthen their security architecture.
        </p>
      </div>

      {/* Testimonials Carousel/Grid Container */}
      {/* We use a flex container that can scroll horizontally or just show the items if space permits */}
      <div
        ref={scrollRef}
        className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-6 sm:pb-8 snap-x snap-mandatory hide-scrollbar mb-4 sm:mb-8"
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="flex-none w-full sm:w-[320px] md:w-[380px] snap-start flex flex-col bg-white border border-brand-light rounded-[1.25rem] sm:rounded-2xl overflow-hidden"
          >
            {/* Image area with play button */}
            <div className="relative h-[280px] sm:h-[380px] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-4 left-4">
                <button className="flex items-center justify-center w-12 h-10 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  <Play className="h-4 w-4 text-[#2251ff] ml-0.5" fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Content area */}
            <div className="flex flex-col flex-grow p-6 pt-6 sm:p-6 sm:pt-5">
              <h3 className="text-[1.05rem] sm:text-[1.1rem] font-normal sm:font-bold text-gray-900 mb-1">
                {item.name}
              </h3>
              <p className="text-body-xs sm:text-[0.75rem] text-slate-500 sm:text-gray-400 mb-0.5">
                {item.role}
              </p>
              <p className="text-body-xs sm:text-[0.75rem] text-slate-500 sm:text-gray-400 mb-4 sm:mb-5">
                {item.company}
              </p>

              <p className="text-body-medium sm:text-[0.9rem] text-slate-700 sm:text-gray-700 leading-relaxed mb-6 flex-grow">
                {item.quote}
              </p>

              <a
                href="#"
                className="flex items-center text-[#2251ff] text-sm sm:text-xs font-normal sm:font-medium hover:text-[#2251ff] transition-colors mt-auto"
              >
                Watch testimonial <ArrowRightSmall className="ml-1 h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between px-2 max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto">
        {/* Dots */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        {/* Arrows */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => scroll('left')}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 text-gray-600 sm:text-gray-400 hover:text-black hover:border-black transition-colors"
          >
            {/* Reusing ArrowRight rotated for mobile ArrowLeft */}
            <ArrowRight className="h-4 w-4 sm:hidden rotate-180" />
            <ArrowLeft className="h-5 w-5 hidden sm:block" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 text-gray-600 sm:text-gray-400 hover:text-black hover:border-black transition-colors"
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Utility style to hide scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}


