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
    <div className="flex flex-col bg-brand-pale rounded-card-sm p-space-12 md:p-space-24 w-full h-full">
      <div className="flex items-center justify-between w-full mb-space-4 md:mb-space-12">
        {/* Step Number Circle */}
        <div className="w-space-24 h-space-24 md:w-11 md:h-11 rounded-full bg-white md:bg-surface flex items-center justify-center shadow-sm md:shadow-sm">
          <span className="text-brand-primary text-link-mobile md:text-lg md:font-semibold md:leading-normal font-mulish">
            {stepNumber}
          </span>
        </div>
        <span className="text-ink-muted md:text-brand-primary text-stat-desc-mobile md:text-sm md:font-semibold md:leading-normal uppercase tracking-widest font-mulish">
          {phase}
        </span>
      </div>
      
      <h3 className="text-ink text-section-title-head-mobile md:text-help-card-title-mobile md:font-semibold font-mulish mb-space-4 md:mb-space-12 uppercase">
        {title}
      </h3>
      
      <p className="text-ink-muted text-card-desc-mobile md:text-help-card-desc-mobile md:font-normal font-mulish mb-space-12 md:mb-space-24 grow">
        {description}
      </p>
      
      <div className="bg-transparent md:bg-surface rounded-none md:rounded-lg p-0 md:py-space-8 md:px-space-12 w-full mt-auto">
        <p className="text-ink-muted md:text-ink text-stat-desc-mobile md:text-card-desc-mobile md:font-normal tracking-widest md:tracking-normal font-mulish">
          {subDescription}
        </p>
      </div>
    </div>
  );
}
