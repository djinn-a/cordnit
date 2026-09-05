import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="w-full pt-2 pb-16 lg:pt-4 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto bg-white">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Left Content Area */}
        <div className="w-full lg:w-5/12 flex flex-col items-center md:items-start text-center md:text-left lg:-mt-12">
          <h4 className="text-blue-600 font-bold text-[10px] tracking-widest uppercase mb-4">
            CONTACT US
          </h4>
          <h2 className="text-[20px] md:text-5xl lg:text-[56px] font-extrabold text-black leading-[35px] md:leading-[1.1] tracking-[-1.2px] md:tracking-normal mb-6">
            Let's talk about<span className="hidden md:inline"><br /></span> <span className="md:hidden"></span>what's next.
          </h2>
          <p className="text-gray-600 text-[15px] md:text-base leading-relaxed font-normal">
            Whether you are exploring an idea, tackling a technology challenge
            or looking for a long-term delivery partner, we would like to hear
            from you.
          </p>
        </div>

        {/* Right Image/Card Area */}
        <div className="w-full lg:w-7/12 relative flex justify-end mt-8 lg:mt-0">
          <div className="relative w-full h-[450px] md:h-[500px] lg:h-[550px] rounded-[32px] overflow-hidden shadow-xl">
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/contact-hero-bg.png"
              alt="Cordinit Office Contact"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
