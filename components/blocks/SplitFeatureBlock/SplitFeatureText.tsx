import React from "react";
import { Check } from "lucide-react";
import type { SplitFeatureBlockProps } from "./types";

type SplitFeatureTextProps = SplitFeatureBlockProps["textSection"] & {
  textFeatureStyle?: SplitFeatureBlockProps["textFeatureStyle"];
};

export function SplitFeatureText({
  eyebrow,
  title,
  description,
  features,
  textFeatureStyle = "checkmarks",
}: Readonly<SplitFeatureTextProps>) {
  return (
    <div className="flex flex-col items-start w-full lg:w-1/2 justify-center">
      <div className="w-fit flex items-center justify-center mb-[8px] md:mb-space-8">
        <span className="text-[10px] md:text-page-hero-eyebrow font-[800] md:font-bold leading-[16px] md:leading-normal tracking-[1px] md:tracking-widest uppercase text-[#2251FF] md:text-brand-primary font-mulish">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-[24px] md:text-split-section-title font-[800] md:font-bold leading-[32px] md:leading-tight text-[#000] md:text-ink font-mulish mb-[8px] md:mb-space-20">
        {title}
      </h2>
      <p className="text-[14px] md:text-page-hero-subtitle font-normal md:font-medium leading-[22px] md:leading-relaxed text-[#555] md:text-ink-muted font-mulish mb-[8px] md:mb-space-20">
        {description}
      </p>

      {features.length > 0 && (
        <div
          className={`flex flex-col w-full ${
            textFeatureStyle === "cards" ? "gap-space-16" : "gap-[8px] md:gap-space-12 mt-0 md:mt-space-12"
          }`}
        >
          {features.map((feature) => (
            <div
              key={feature.title || feature.text}
              className={
                textFeatureStyle === "cards"
                  ? "bg-brand-pale rounded-card p-space-24 flex flex-col gap-space-8 w-full"
                  : "flex items-start gap-[12px] md:gap-space-12 w-full"
              }
            >
              {textFeatureStyle === "checkmarks" && (
                <div className="mt-[2px] md:mt-space-2 min-w-[20px] flex-shrink-0">
                  {/* Mobile Checkbox / Desktop Check */}
                  <div className="w-[16px] h-[16px] md:w-auto md:h-auto bg-[#EEF4FF] md:bg-transparent rounded-[4px] md:rounded-none flex items-center justify-center">
                    <Check className="w-[10px] h-[10px] md:w-5 md:h-5 text-[#2251FF] md:text-brand-primary" strokeWidth={3} />
                  </div>
                </div>
              )}
              <div className="flex flex-col w-full">
                {feature.title && textFeatureStyle === "cards" && (
                  <h3 className="text-[20px] font-bold text-ink font-mulish">
                    {feature.title}
                  </h3>
                )}
                <span
                  className={
                    textFeatureStyle === "cards"
                      ? "text-card-desc text-ink-muted font-mulish"
                      : "text-[12px] md:text-card-desc font-normal leading-[16px] md:leading-normal text-[#000] md:text-ink font-mulish"
                  }
                >
                  {feature.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
