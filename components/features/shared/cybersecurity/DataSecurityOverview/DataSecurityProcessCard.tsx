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
    <div className="flex flex-col bg-brand-pale rounded-card-sm p-space-24 w-full h-full">
      <div className="flex items-center justify-between w-full mb-space-12">
        {/* Step Number Circle */}
        <div className="w-11 h-11 rounded-full bg-surface flex items-center justify-center shadow-sm">
          <span className="text-brand-primary text-lg font-semibold font-mulish">
            {stepNumber}
          </span>
        </div>
        <span className="text-brand-primary text-sm font-semibold uppercase tracking-widest font-mulish">
          {phase}
        </span>
      </div>
      
      <h3 className="text-ink text-card-title-desktop font-mulish mb-space-12 uppercase">
        {title}
      </h3>
      
      <p className="text-ink-muted text-card-desc font-mulish mb-space-24 grow">
        {description}
      </p>
      
      <div className="bg-surface rounded-lg py-space-8 px-space-12 w-full mt-auto">
        <p className="text-ink text-sm leading-5 font-mulish">
          {subDescription}
        </p>
      </div>
    </div>
  );
}
