import React from 'react';

const principles = [
  {
    number: '01',
    title: 'STAY CLOSE TO THE REAL PROBLEM',
    description: 'We avoid getting lost in technical abstraction. Every decision is anchored to the practical outcomes our clients need to achieve.',
  },
  {
    number: '02',
    title: 'MAKE COMPLEXITY USABLE',
    description: 'Enterprise technology is inherently complex. Our job is to abstract that complexity so teams can focus on their work, not their tools.',
  },
  {
    number: '03',
    title: 'BUILD FOR THE LONG TERM',
    description: 'We design solutions that can adapt and scale. Short-term fixes often create long-term debt; we architect for endurance.',
  },
  {
    number: '04',
    title: 'WORK AS ONE TEAM',
    description: 'Transformation happens when internal knowledge meets external expertise. We integrate seamlessly with your people to drive change together.',
  }
];

export default function AboutPrinciples() {
  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-20 gap-4 md:gap-16">
        <div className="md:w-1/2">
          <h4 className="text-blue-600 md:text-blue-500 font-bold text-[10px] tracking-[0.15em] uppercase mb-2 md:mb-4">
            HOW WE WORK
          </h4>
          <h2 className="text-[24px] md:text-4xl lg:text-5xl font-bold md:font-extrabold text-black leading-[1.2] md:leading-tight">
            <span className="md:hidden">Four Principle one way<br />of working</span>
            <span className="hidden md:inline">Four Principles . One<br />way of working</span>
          </h2>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <p className="text-[#555555] md:text-gray-500 text-[15px] md:text-base leading-[1.6] md:leading-relaxed font-normal md:font-light">
            We combine clear thinking, practical delivery and<br className="hidden lg:block" />
            long-term partnership to make technology change<br className="hidden lg:block" />
            work in the real world.
          </p>
        </div>
      </div>

      {/* Principles Grid */}
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-16 lg:gap-y-20">
        {principles.map((principle, index) => (
          <div key={index} className={`relative flex flex-row md:flex-col items-start py-8 md:py-0 md:pl-10 ${index !== principles.length - 1 ? 'border-b border-gray-200 md:border-b-0' : ''}`}>
            {/* Background Number */}
            <div className="text-[75px] md:absolute md:top-[-28px] md:left-[-15px] md:text-[120px] font-bold text-gray-100 md:text-gray-50 leading-[0.8] md:leading-none select-none z-0 tracking-tighter mr-5 md:mr-0 shrink-0 mt-[-5px] md:mt-0">
              {principle.number}
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col pt-1 md:pt-0">
              <h3 className="text-[13px] md:text-base font-bold text-black uppercase tracking-wide mb-2 md:mb-3 md:mt-6">
                {principle.title}
              </h3>
              <p className="text-[#555555] md:text-gray-500 text-[14px] md:text-sm leading-[1.6] md:leading-relaxed font-normal md:font-light">
                {principle.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
