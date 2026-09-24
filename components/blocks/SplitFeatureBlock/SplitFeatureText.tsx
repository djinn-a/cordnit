import { Check } from "lucide-react";
import type { SplitFeatureBlockProps } from "./types";

type SplitFeatureTextProps = SplitFeatureBlockProps["textSection"] & {
  textFeatureStyle?: NonNullable<SplitFeatureBlockProps["textFeatureStyle"]>;
};

export function SplitFeatureText({
  eyebrow,
  title,
  description,
  features,
  textFeatureStyle = "checkmarks",
}: Readonly<SplitFeatureTextProps>) {
  return (
    <div className="flex flex-col items-start w-full lg:w-full lg:max-w-2xl lg:shrink-0 justify-center">
      <div className="w-fit flex items-center justify-center mb-space-8 md:mb-space-8">
        <span className="text-eyebrow-mobile md:text-page-hero-eyebrow md:font-bold md:leading-normal tracking-widest uppercase text-brand-primary font-mulish">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-section-title-mobile md:text-split-section-title text-ink font-mulish mb-space-8 md:mb-space-20">
        {title}
      </h2>
      <p className="text-section-subtitle-mobile md:text-page-hero-subtitle text-ink-muted font-mulish mb-space-8 md:mb-space-20">
        {description}
      </p>

      {features.length > 0 && (
        <div
          className={`flex flex-col w-full ${
            textFeatureStyle === "cards" ? "gap-space-12 md:gap-space-16" : "gap-space-8 md:gap-space-12 mt-0 md:mt-space-12"
          }`}
        >
          {features.map((feature) => (
            <div
              key={feature.title || feature.text}
              className={
                textFeatureStyle === "cards"
                  ? "bg-brand-pale rounded-card-sm md:rounded-card p-space-20 md:p-space-24 flex flex-col gap-space-12 md:gap-space-8 w-full"
                  : "flex items-start gap-space-12 md:gap-space-12 w-full"
              }
            >
              {textFeatureStyle === "checkmarks" && (
                <div className="mt-space-2 w-space-16 md:w-space-24 shrink-0 flex items-start justify-center">
                  {/* Mobile & Desktop Checkbox */}
                  <div className="w-space-16 h-space-16 md:w-6 md:h-6 bg-brand-pale rounded flex items-center justify-center shrink-0">
                    <Check className="w-space-10 h-space-10 md:w-4 md:h-4 text-brand-primary" strokeWidth={3} />
                  </div>
                </div>
              )}
              <div className="flex flex-col w-full">
                {feature.title && textFeatureStyle === "cards" && (
                  <h3 className="text-section-title-head-mobile md:text-help-card-title-mobile md:font-semibold text-ink font-mulish">
                    {feature.title}
                  </h3>
                )}
                <span
                  className={
                    textFeatureStyle === "cards"
                      ? "text-stat-desc-mobile md:text-help-card-desc-mobile md:font-normal text-ink-muted font-mulish"
                      : "text-card-desc-mobile md:text-help-card-desc-mobile md:font-normal text-ink font-mulish"
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
