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
      <div className="w-fit flex items-center justify-center mb-space-8">
        <span className="text-page-hero-eyebrow text-brand-primary font-mulish uppercase tracking-widest">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-split-section-title text-ink font-mulish mb-space-20">
        {title}
      </h2>
      <p className="text-page-hero-subtitle text-ink-muted font-mulish mb-space-20">
        {description}
      </p>

      {features.length > 0 && (
        <div
          className={`flex flex-col w-full ${
            textFeatureStyle === "cards" ? "gap-space-16" : "gap-space-12 mt-space-12"
          }`}
        >
          {features.map((feature) => (
            <div
              key={feature.title || feature.text}
              className={
                textFeatureStyle === "cards"
                  ? "bg-brand-pale rounded-card p-space-24 flex flex-col gap-space-8 w-full"
                  : "flex items-start gap-space-12 w-full"
              }
            >
              {textFeatureStyle === "checkmarks" && (
                <div className="mt-space-2 min-w-5">
                  <Check className="w-5 h-5 text-brand-primary" strokeWidth={3} />
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
                      : "text-card-desc text-ink font-mulish"
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
