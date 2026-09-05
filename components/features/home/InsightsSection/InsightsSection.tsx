'use client';

import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightSmall } from 'lucide-react';

const insights = [
  {
    id: 1,
    tag: 'CYBERSECURITY',
    date: 'Aug 26, 2026',
    type: 'Article',
    title: 'Why Security Must Be the Foundation of Digital Transformation',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'SALESFORCE',
    date: 'Aug 26, 2026',
    type: 'Article',
    title: 'Why Security Must Be the Foundation of Digital Transformation',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'AI & AUTOMATION',
    date: 'Aug 26, 2026',
    type: 'Article',
    title: 'Why Security Must Be the Foundation of Digital Transformation',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 4,
    tag: 'CLOUD & INFRASTRUCTURE',
    date: 'Aug 26, 2026',
    type: 'Article',
    title: 'Why Security Must Be the Foundation of Digital Transformation',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
  }
];

export default function InsightsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full pt-8 pb-8 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="mb-12">
        <h3 className="text-blue-600 font-bold text-section-subtitle tracking-[0.15em] uppercase mb-4">
          INSIGHTS & PERSPECTIVE
        </h3>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold sm:font-extrabold text-black leading-tight sm:leading-[1.15]">
          Ideas that move<br />
          transformation forward.
        </h2>
      </div>

      {/* Cards Grid / Carousel */}
      <div 
        ref={scrollRef}
        className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-0"
      >
        {insights.map((item) => (
          <div 
            key={item.id} 
            className="group relative h-panel flex-none w-[88%] sm:w-auto snap-start overflow-hidden flex flex-col justify-between cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Top Tag */}
            <div className="relative z-10 p-4">
              <span className="inline-block bg-black text-white text-section-subtitle-sm font-semibold tracking-wider px-3 py-1.5 uppercase">
                {item.tag}
              </span>
            </div>

            {/* Bottom Content with Gradient */}
            <div className="relative z-10 p-6 pt-24 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="flex items-center text-gray-300 text-xs mb-2">
                <span>{item.type}</span>
                <span className="mx-2">•</span>
                <span>{item.date}</span>
              </div>
              
              <h3 className="text-white font-medium text-lg leading-snug mb-4 line-clamp-3">
                {item.title}
              </h3>
              
              <div className="flex items-center text-blue-500 text-sm font-medium">
                Read more <ArrowRightSmall className="ml-1.5 h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        {/* Arrows */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => scroll('left')}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-400 hover:text-black hover:border-black transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-400 hover:text-black hover:border-black transition-colors"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Utility style to hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
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
