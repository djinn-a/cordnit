import { cn } from "@/lib/utils/cn";
import type { PhaseFeatureCardData } from "./types";

interface PhaseFeatureCardProps {
  card: PhaseFeatureCardData;
}

export default function PhaseFeatureCard({ card }: PhaseFeatureCardProps) {
  return (
    <div className="flex flex-col h-full bg-surface border border-border-card rounded-[12px] p-[32px] hover:border-brand-primary/30 hover:shadow-sm transition-all duration-300">
      {/* Top Row: Number & Phase */}
      <div className="flex justify-between items-baseline">
        <span className="text-[24px] text-brand-primary font-semibold font-mulish">
          {card.numberStr}
        </span>
        <span className="text-[12px] uppercase text-ink-muted tracking-[1px] font-semibold font-mulish">
          {card.phaseLabel}
        </span>
      </div>

      {/* Divider */}
      <hr className="mt-[24px] border-border-card" />

      {/* Content Area (grows to push footer down) */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-[20px] text-ink font-semibold mt-[24px] mb-[12px] font-mulish uppercase">
          {card.title}
        </h3>
        <p className="text-[16px] text-ink-muted leading-[24px] font-mulish">
          {card.description}
        </p>
      </div>

      {/* Footer Text */}
      {card.footerText && (
        <div className="mt-auto pt-[24px]">
          <p className="text-[12px] font-normal leading-[16px] text-ink-muted font-mulish">
            {card.footerText}
          </p>
        </div>
      )}
    </div>
  );
}
