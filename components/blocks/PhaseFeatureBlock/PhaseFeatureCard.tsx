import { cn } from "@/lib/utils/cn";
import type { PhaseFeatureCardData } from "./types";

interface PhaseFeatureCardProps {
  card: PhaseFeatureCardData;
}

export default function PhaseFeatureCard({ card }: PhaseFeatureCardProps) {
  return (
    <div className="flex flex-col h-full bg-white md:bg-surface border border-border-card rounded-[12px] p-[20px] md:p-[32px] hover:border-[#2251FF] md:hover:border-brand-primary/30 hover:shadow-sm transition-all duration-300">
      {/* Top Row: Number & Phase */}
      <div className="flex justify-between items-baseline">
        <span className="text-[14px] md:text-[24px] text-[#2251FF] md:text-brand-primary font-[600] md:font-semibold leading-[22px] md:leading-normal font-mulish">
          {card.numberStr}
        </span>
        <span className="text-[10px] md:text-[12px] uppercase text-[#555] md:text-ink-muted tracking-[0.6px] md:tracking-[1px] font-[400] md:font-semibold leading-[14px] md:leading-normal font-mulish">
          {card.phaseLabel}
        </span>
      </div>

      {/* Divider */}
      <hr className="mt-[12px] mb-[12px] md:mt-[24px] md:mb-0 border-border-card" />

      {/* Content Area (grows to push footer down) */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-[14px] md:text-[20px] text-[#000] md:text-ink font-[700] md:font-semibold mt-[0] md:mt-[24px] mb-[4px] md:mb-[12px] leading-[22px] md:leading-normal font-mulish uppercase">
          {card.title}
        </h3>
        <p className="text-[12px] md:text-[16px] text-[#555] md:text-ink-muted leading-[16px] md:leading-[24px] font-[400] font-mulish">
          {card.description}
        </p>
      </div>

      {/* Footer Text */}
      {card.footerText && (
        <div className="mt-[12px] md:mt-auto pt-[12px] md:pt-[24px] border-t border-border-card">
          <p className="text-[10px] md:text-[12px] font-[400] leading-[14px] md:leading-[16px] text-[#555] md:text-ink-muted tracking-[0.6px] md:tracking-normal font-mulish">
            {card.footerText}
          </p>
        </div>
      )}
    </div>
  );
}
