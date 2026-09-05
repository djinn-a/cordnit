"use client";

import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Jenkins',
    role: 'HEAD OF CLOUD ARCHITECTURE',
    description: 'Guiding organizations through pragmatic AI adoption, focusing on tangible operational improvements and ethical implementation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
  },
  {
    name: 'Elena Rostova',
    role: 'LEAD AI STRATEGIST',
    description: 'Guiding organizations through pragmatic AI adoption, focusing on tangible operational improvements and ethical implementation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
  },
  {
    name: 'Elena Rostova',
    role: 'LEAD AI STRATEGIST',
    description: 'Guiding organizations through pragmatic AI adoption, focusing on tangible operational improvements and ethical implementation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
  }
];

export default function AboutTeam() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const itemWidth = clientWidth * 0.8; // Match the w-[80%] of cards
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < teamMembers.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
  };

  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-4 md:gap-16">
        <div className="md:w-3/5">
          <h4 className="text-blue-600 md:text-blue-500 font-bold text-[10px] tracking-[0.15em] uppercase mb-2 md:mb-4">
            THE PEOPLE BEHIND THE WORK
          </h4>
          <h2 className="text-[24px] md:text-4xl lg:text-5xl font-bold md:font-extrabold text-black leading-[1.2] md:leading-tight">
            <span className="md:hidden">Specialist brought together<br />around the problem.</span>
            <span className="hidden md:inline">Specialists brought together<br className="hidden md:block" />around the problem.</span>
          </h2>
        </div>
        <div className="md:w-2/5">
          <p className="text-[#555555] md:text-gray-500 text-[15px] md:text-base leading-[1.6] md:leading-relaxed font-normal md:font-medium">
            Cordinit brings together specialists across security, cloud, engineering, data, Salesforce, AI and managed services.
          </p>
        </div>
      </div>

      {/* Team Cards Grid / Carousel */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex md:grid flex-nowrap md:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 md:gap-6 mb-8 md:mb-12 snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar scroll-smooth"
      >
        {teamMembers.map((member, index) => (
          <div key={index} className="relative shrink-0 w-[80%] md:w-full snap-start h-[400px] lg:h-[500px] rounded-[24px] overflow-hidden shadow-md group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Glassmorphism Info Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm border border-white/40">
              <h3 className="text-[20px] md:text-lg font-medium md:font-bold text-black mb-1">
                {member.name}
              </h3>
              <p className="text-[10px] md:text-[9px] font-semibold md:font-extrabold text-blue-500 uppercase tracking-widest">
                {member.role}
              </p>
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                <div className="overflow-hidden">
                  <p className="text-[11px] md:text-xs text-gray-700 leading-relaxed font-medium pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="flex md:hidden justify-between items-center px-2">
        {/* Dots */}
        <div className="flex space-x-2">
          {teamMembers.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? 'bg-black' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
        
        {/* Arrows */}
        <div className="flex space-x-3">
          <button 
            onClick={scrollLeft}
            disabled={activeIndex === 0}
            className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${activeIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-black hover:border-black'}`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={scrollRight}
            disabled={activeIndex === teamMembers.length - 1}
            className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${activeIndex === teamMembers.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-black hover:border-black'}`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
    </section>
  );
}
