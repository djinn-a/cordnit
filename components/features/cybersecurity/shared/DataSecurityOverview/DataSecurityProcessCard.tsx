import React from "react";
import type { ProcessCardData } from "./types";

export function DataSecurityProcessCard({
  stepNumber,
  phase,
  title,
  description,
  subDescription,
  variant,
  isSpecialCard,
}: Readonly<ProcessCardData>) {
  if (variant === "cloud-configuration") {
    return (
      <div className={`flex flex-col rounded-[8px] md:rounded-[12px] border border-[var(--border,#DCE6F5)] p-space-16 md:p-space-24 w-[calc(50%-6px)] md:w-full h-full ${
        isSpecialCard ? "bg-[rgba(220,230,245,0.40)] shadow-[0_10px_12px_6px_rgba(0,0,0,0.05)]" : "bg-white"
      }`}>
        <div className="flex items-center justify-between w-full mb-space-12 md:mb-space-24">
          <span className="text-brand-primary text-[10px] md:text-about-eyebrow-desktop leading-[14px] md:leading-normal font-semibold font-mulish">
            {stepNumber}
          </span>
          <span className="text-brand-primary text-[10px] md:text-about-eyebrow-desktop leading-[14px] md:leading-normal uppercase font-mulish tracking-widest md:tracking-normal">
            {phase}
          </span>
        </div>
        
        <h3 className="text-ink text-[12px] md:text-help-card-title-desktop leading-[16px] md:leading-normal font-semibold font-mulish mb-space-8 md:mb-space-12 uppercase">
          {title}
        </h3>
        
        <p className="text-ink-muted text-[10px] md:text-card-desc leading-[14px] md:leading-normal font-normal font-mulish mb-space-16 md:mb-space-32 grow">
          {description}
        </p>
        
        <div className="hidden md:block w-full mt-auto border-t border-[var(--border,#DCE6F5)] pt-space-16 md:pt-space-24">
          <p className="text-ink-muted text-stat-desc-mobile md:text-card-desc-mobile md:font-normal font-mulish">
            {subDescription.split('-').map(s => s.trim()).join(' · ')}
          </p>
        </div>
      </div>
    );
  }

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
      
      <div className="bg-white rounded-[4.58px] py-space-8 px-space-12 w-full mt-auto">
        <p className="text-ink-muted md:text-ink text-stat-desc-mobile md:text-card-desc-mobile md:font-normal tracking-widest md:tracking-normal font-mulish">
          {subDescription}
        </p>
      </div>
    </div>
  );
}
