import React from "react";
import { Check } from "lucide-react";
import type { DataDiscoveryData } from "./types";

type DataDiscoveryLeftProps = DataDiscoveryData["leftSection"];

export function DataDiscoveryLeft({ eyebrow, title, description, features }: Readonly<DataDiscoveryLeftProps>) {
  return (
    <div className="flex flex-col items-start w-full md:w-1/2 pr-0 md:pr-space-40 gap-space-24">
      <div className="w-fit flex items-center justify-center">
        <span className="text-page-hero-eyebrow text-brand-primary font-mulish uppercase">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-split-section-title text-ink font-mulish">
        {title}
      </h2>
      <p className="text-page-hero-subtitle text-ink-muted font-mulish">
        {description}
      </p>
      
      <div className="flex flex-col gap-space-12 mt-space-12 w-full">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-space-12">
            <div className="mt-[2px] min-w-[20px]">
              <Check className="w-5 h-5 text-brand-primary" strokeWidth={3} />
            </div>
            <span className="text-card-desc text-ink font-mulish">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
