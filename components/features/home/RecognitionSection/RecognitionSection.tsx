'use client';

import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const recognitions = [
  {
    id: 1,
    category: '01 — AWARD',
    title: 'Stevie® Gold Winner',
    desc: 'Recognized for outstanding achievement in enterprise technology innovation and...',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop', // A nice abstract/glass object
  },
  {
    id: 2,
    category: '02 — AWARD',
    title: 'AI Excellence Award',
    desc: 'Awarded for our groundbreaking work in machine learning integration for core...',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    category: '03 — CERTIFICATION',
    title: '#1 for Deep Research',
    desc: 'Ranked top provider for deep learning research capabilities by independent...',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop',
  }
];

export default function RecognitionSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-8 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto bg-white">
      {/* Header Area */}
      <div className="flex flex-col items-start sm:items-center text-left sm:text-center mb-8 sm:mb-16">
        <h3 className="text-[#2251ff] font-bold text-section-subtitle-sm sm:text-section-subtitle tracking-[0.15em] uppercase mb-2 sm:mb-4">
          ENGINE CLOCK / ACTIVE
        </h3>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold sm:font-extrabold text-black mb-3 sm:mb-6">
          Industry Recognition
        </h2>
        <p className="text-gray-500 text-sm sm:text-lg max-w-2xl leading-relaxed">
          Independent recognition of our AI platforms, services,
          and the <br />
          business outcomes they deliver.
        </p>
      </div>

      {/* Cards Area (Carousel on mobile, Grid on desktop) */}
      <div
        ref={scrollRef}
        className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-4 sm:pb-0 mb-6 sm:mb-0"
      >
        {recognitions.map((item) => (
          <div
            key={item.id}
            className="flex-none w-full sm:w-auto snap-start flex flex-col bg-white border border-brand-pale rounded-[14px] sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
          >
            {/* Image Placeholder */}
            <div className="w-full h-48 sm:h-48 rounded-lg overflow-hidden mb-5 bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col flex-grow px-1 sm:px-2 pb-2">
              <span className="text-[#2251ff] font-medium text-section-subtitle-sm tracking-widest uppercase mb-2">
                {item.category}
              </span>

              <h3 className="text-xl sm:text-2xl font-normal sm:font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-500 text-body-small sm:text-sm leading-relaxed mb-6 flex-grow">
                {item.desc}
              </p>

              <a
                href="#"
                className="flex items-center text-[#2251ff] text-sm sm:text-xs font-medium hover:text-[#2251ff] transition-colors"
              >
                View recognition <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Footer Navigation */}
      <div className="flex sm:hidden items-center justify-between mt-2">
        {/* Dots */}
        <div className="flex items-center space-x-1.5 ml-1">
          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        {/* Arrows */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => scroll('left')}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:text-black transition-colors"
          >
            {/* Using text content or a smaller icon for arrow since ArrowLeft isn't imported, let's just use ArrowRight rotated */}
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
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


