import React from 'react';

export default function AboutContent() {
  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col lg:flex-row tablet-only:flex-row gap-16 lg:gap-24 tablet-only:gap-8 items-center tablet-only:items-start">

        {/* Left Content Area */}
        <div className="w-full lg:w-1/2 tablet-only:w-[55%] flex flex-col items-start tablet-only:pr-2">
          <h4 className="text-[#2251ff] md:text-[#2251ff] font-bold text-[10px] tracking-[0.15em] uppercase mb-2 md:mb-4">
            ABOUT CORDINIT
          </h4>
          <h2 className="text-[26px] md:text-4xl lg:text-5xl tablet-only:text-[34px] font-bold md:font-extrabold text-black leading-[1.2] md:leading-[1.15] mb-5 md:mb-10 tablet-only:mb-5">
            <span className="md:hidden">Making technology work for<br />what matters</span>
            <span className="hidden md:inline tablet-only:hidden">Making technology work for what matters.</span>
            <span className="hidden tablet-only:inline">Making<br />technology work<br />for what matters.</span>
          </h2>

          {/* Tabs/Pills */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10 tablet-only:mb-6">
            <button className="bg-[#2563eb] text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[13px] md:text-sm font-normal md:font-medium transition-colors shadow-sm">
              Our Story
            </button>
            <button className="bg-white border border-gray-200 md:border-blue-200 text-gray-700 md:text-[#2251ff] hover:bg-gray-50 md:hover:bg-blue-50 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[13px] md:text-sm font-normal md:font-medium transition-colors">
              Our Mission
            </button>
            <button className="bg-white border border-gray-200 md:border-blue-200 text-gray-700 md:text-[#2251ff] hover:bg-gray-50 md:hover:bg-blue-50 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[13px] md:text-sm font-normal md:font-medium transition-colors">
              Our Vision
            </button>
          </div>

          <h3 className="text-[22px] md:text-2xl font-semibold md:font-bold text-black mb-4 md:mb-5 tablet-only:mb-3">
            Our Story
          </h3>

          <p className="text-[#555555] md:text-gray-500 text-[15px] md:text-base tablet-only:text-[14px] leading-[1.6] md:leading-relaxed font-normal md:font-light mb-5 tablet-only:mb-4">
            Cordinit exists to make <span className="md:hidden">technology</span><span className="hidden md:inline">that</span> change more useful:<br className="hidden md:block tablet-only:hidden" />
            connecting clear thinking, capable delivery and long-term<br className="hidden md:block tablet-only:hidden" />
            operational support around the outcomes our clients need.
          </p>

          <p className="text-[#555555] md:text-gray-500 text-[15px] md:text-base tablet-only:text-[14px] leading-[1.6] md:leading-relaxed font-normal md:font-light">
            We believe successful transformation is not just about<br className="hidden md:block tablet-only:hidden" />
            introducing new tools. It is about creating the conditions<br className="hidden md:block tablet-only:hidden" />
            for <span className="font-normal md:font-semibold md:text-gray-700">people, processes and technology</span> to work better<br className="hidden md:block tablet-only:hidden" />
            together.
          </p>
        </div>

        {/* Right Image Area */}
        <div className="w-full lg:w-1/2 tablet-only:w-[45%] relative flex justify-end tablet-only:justify-center tablet-only:mt-2">
          <div className="relative w-full max-w-[550px] tablet-only:max-w-full h-[400px] md:h-[500px] tablet-only:h-auto tablet-only:aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="Cordinit team working in modern office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}


