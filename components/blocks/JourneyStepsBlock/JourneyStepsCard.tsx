import { cn } from "@/lib/utils/cn";
import type { JourneyStepCardData } from "./types";

interface JourneyStepsCardProps {
  card: JourneyStepCardData;
  variant?: "default" | "pipeline" | "ai-cards";
}

export default function JourneyStepsCard({ card, variant = "default" }: Readonly<JourneyStepsCardProps>) {
  if (variant === "ai-cards") {
    return (
      <div className="flex flex-col h-full bg-white border border-[#DCE6F5] rounded-xl px-[21px] py-[25px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all duration-300">
        {/* Content Area (grows to push footer down) */}
        <div className="flex flex-col grow gap-[8px]">
          <span className="text-[#2251FF] text-[12px] font-semibold leading-[18px] font-mulish uppercase">
            {card.numberStr}
          </span>
          <h3 className="text-[#000000] text-[16px] font-semibold leading-[16px] font-mulish">
            {card.title}
          </h3>
          <p className="text-[#555555] text-[12px] font-normal leading-[18px] font-mulish">
            {card.description}
          </p>
        </div>

        {/* Footer Text with 16px Top & Bottom Spacing via Padding/Margin */}
        {card.footerText && (
          <div className="mt-[16px] pt-[16px] border-t border-[#DCE6F5]">
            <p className="text-[#555555] text-[10px] font-normal leading-[14px] font-mulish uppercase">
              {card.footerText}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white border border-border-card rounded-xl p-space-20 md:p-space-32 hover:border-brand-primary md:hover:border-brand-primary/30 hover:shadow-sm transition-all duration-300">
      {/* Top Row: Number Badge & Dot */}
      <div className="flex justify-between items-center">
        <span className="flex items-center justify-center p-space-10 bg-brand-pale text-brand-primary text-stat-desc-mobile md:text-section-title-head md:font-semibold font-mulish rounded-md">
          {card.numberStr}
        </span>
        <div className="w-space-8 h-space-8 bg-brand-primary rounded-full shrink-0" />
      </div>

      {/* Content Area (grows to push footer down) */}
      <div className="flex flex-col grow">
        <h3 className="text-ink text-heading2-sb-mobile md:text-help-card-title-desktop mt-space-16 md:mt-space-24 mb-space-8 font-mulish uppercase">
          {card.title}
        </h3>
        <p className="text-ink-muted text-help-card-desc-mobile font-mulish">
          {card.description}
        </p>
      </div>

      {/* Footer Text with 24px Top & Bottom Spacing via Padding/Margin */}
      {card.footerText && (
        <div className="mt-space-24 pt-space-24 border-t border-border-card">
          <p className="text-ink-muted text-stat-desc-mobile font-mulish uppercase">
            {card.footerText}
          </p>
        </div>
      )}
    </div>
  );
}
