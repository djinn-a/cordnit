import React from 'react';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

export default function FooterMediaFeature() {
  return (
    <div className="relative z-10 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto mt-12 lg:mt-16 px-4 sm:px-6 lg:px-16 pb-6">

      <h4 className="text-white/90 text-eyebrow mb-6 lg:hidden">
        LATEST FROM CORDINIT
      </h4>

      <div className="flex flex-row lg:flex-row items-center lg:items-center gap-4 lg:gap-16 mb-12 lg:mb-16">

        {/* Video Column */}
        <div className="w-[40%] lg:w-[35%] flex flex-col gap-4 lg:gap-6 shrink-0">
          <h4 className="hidden lg:block text-white/90 text-eyebrow">
            LATEST FROM CORDINIT
          </h4>
          {/* Video Thumbnail Area */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video">
            <Image
              src="/images/footer/latest-video.jpg"
              alt="Video Thumbnail"
              fill
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer transition-colors hover:bg-black/40">
              <div className="w-8 h-6 lg:w-16 lg:h-12 bg-white rounded-md lg:rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Play className="h-3 w-3 lg:h-5 lg:w-5 text-primary ml-0.5 lg:ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content Area */}
        <div className="w-[60%] lg:w-[65%] text-white flex flex-col justify-center">
          <h3 className="text-[20px] lg:text-[22px] font-normal text-white mb-2 lg:mb-4 leading-snug">
            Technology, security & transformation — in conversation.
          </h3>
          <p className="text-white/80 text-body mb-3 lg:mb-8 lg:max-w-xl">
            Insights from Cordinit&apos;s technology and security experts on building secure, intelligent organisations.
          </p>
          <a href="#" className="inline-flex items-center text-primary text-button uppercase hover:text-white/80 transition-colors">
            WATCH ON YOUTUBE <ArrowRight className="ml-1 h-3 w-3 lg:h-3.5 lg:w-3.5" />
          </a>
        </div>
      </div>

      {/* Very Bottom Footer Text */}
      <div className="flex justify-between items-center text-white text-caption border-t border-white/10 pt-5 lg:pt-6">
        <p>© 2026 — Copyright</p>
        <p className="cursor-pointer text-white hover:text-white transition-colors">Privacy</p>
      </div>
    </div>
  );
}
