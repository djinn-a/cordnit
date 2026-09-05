import React from 'react';

const steps = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'Understand priorities, constraints and opportunities.',
    color: 'blue',
  },
  {
    num: '02',
    title: 'DESIGN',
    desc: 'Shape the right technology and operating model.',
    color: 'black',
  },
  {
    num: '03',
    title: 'IMPLEMENT',
    desc: 'Build, integrate and modernise the solution.',
    color: 'blue',
  },
  {
    num: '04',
    title: 'OPTIMISE',
    desc: 'Continuously improve performance, security and value.',
    color: 'black',
  },
  {
    num: '05',
    title: 'OPERATE',
    desc: 'Keep technology resilient, scalable and ready for change.',
    color: 'blue',
  },
];

export default function MethodologySection() {
  return (
    <section className="w-full py-8 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto bg-white">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-8 sm:mb-16 gap-4 sm:gap-8">
        <div className="lg:w-1/2">
          <h3 className="text-blue-600 font-bold text-section-subtitle-sm sm:text-section-subtitle tracking-[0.15em] uppercase mb-3 sm:mb-4">
            METHODOLOGY
          </h3>
          <h2 className="text-hero-title sm:text-4xl md:text-5xl font-bold sm:font-extrabold text-black leading-[1.3] sm:leading-[1.15]">
            From transformation strategy to<br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>everyday operations.
          </h2>
        </div>
        <div className="lg:w-1/2 lg:pt-8 mt-2 sm:mt-0">
          <p className="text-gray-600 text-body-small sm:text-lg leading-relaxed max-w-lg">
            We orchestrate high-impact business evolution
            through a highly communicative, cyclical blueprint
            model built on collaboration and alignment.
          </p>
        </div>
      </div>

      {/* Cards Area */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-1.5 sm:gap-4">
        {steps.map((step) => {
          const isBlue = step.color === 'blue';
          
          return (
            <div 
              key={step.num}
              className={`
                flex flex-col h-[240px] sm:h-panel p-4 sm:p-8 rounded-[2px] sm:rounded-sm
                ${isBlue ? 'bg-blue-600 text-white' : 'bg-black text-white'}
              `}
            >
              {/* Top Row: Title and Dot */}
              <div className="flex justify-between items-start mb-auto">
                <span className="text-section-subtitle-xs sm:text-section-subtitle font-bold tracking-widest uppercase">
                  {step.title}
                </span>
                <div 
                  className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${isBlue ? 'bg-white' : 'bg-gray-500'}`} 
                ></div>
              </div>
              
              {/* Bottom Area: Large Number and Description */}
              <div className="mt-auto">
                <div className="text-4xl sm:text-6xl font-bold mb-2 sm:mb-4 leading-none">
                  {step.num}
                </div>
                <p className={`text-section-subtitle sm:text-sm leading-relaxed ${isBlue ? 'text-white/90' : 'text-gray-400'}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
