import React from "react";
import type { ProcessCardData } from "./types";

export function DataSecurityProcessCard({
  stepNumber,
  phase,
  title,
  description,
  subDescription,
}: Readonly<ProcessCardData>) {
  return (
    <div className="flex flex-col bg-[#EEF4FF] md:bg-brand-pale rounded-[10px] md:rounded-card-sm p-[12px] md:p-space-24 w-full h-full">
      <div className="flex items-center justify-between w-full mb-[12px] md:mb-space-12">
        {/* Step Number Circle */}
        <div className="w-[24px] h-[24px] md:w-11 md:h-11 rounded-full bg-white md:bg-surface flex items-center justify-center shadow-sm">
          <span className="text-[#2251FF] md:text-brand-primary text-[10px] md:text-lg font-[400] md:font-semibold font-mulish">
            {stepNumber}
          </span>
        </div>
        <span className="text-[#2251FF] md:text-brand-primary text-[10px] md:text-sm font-[400] md:font-semibold uppercase tracking-normal md:tracking-widest font-mulish">
          {phase}
        </span>
      </div>
      
      <h3 className="text-[#000] md:text-ink text-[14px] md:text-card-title-desktop font-[700] md:font-bold leading-[22px] md:leading-normal font-mulish mb-[8px] md:mb-space-12 uppercase">
        {title}
      </h3>
      
      <p className="text-[#555] md:text-ink-muted text-[10px] md:text-card-desc font-[400] md:font-normal leading-[14px] md:leading-normal font-mulish mb-[12px] md:mb-space-24 grow">
        {description}
      </p>
      
      <div className="bg-white md:bg-surface rounded-[6px] md:rounded-lg p-[8px] md:py-space-8 md:px-space-12 w-full mt-auto">
        <p className="text-[#000] md:text-ink text-[10px] md:text-sm font-[400] md:font-normal leading-[14px] md:leading-5 font-mulish">
          {subDescription}
        </p>
      </div>
    </div>
  );
}
