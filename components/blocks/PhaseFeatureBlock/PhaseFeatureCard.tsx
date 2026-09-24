import type { PhaseFeatureCardData } from "./types";
import { cn } from "@/lib/utils/cn";

interface PhaseFeatureCardProps {
  card: PhaseFeatureCardData;
  cardStyle?: "default" | "pale-blue" | "pale-blue-compact" | "clean";
}

export default function PhaseFeatureCard({ card, cardStyle = "default" }: Readonly<PhaseFeatureCardProps>) {
  const isPaleBlueCompact = cardStyle === "pale-blue-compact";

  if (isPaleBlueCompact) {
    return (
      <div className="flex flex-col h-full bg-[rgba(220,230,245,0.40)] border border-[#DCE6F5] rounded-xl p-6 shadow-[0_10px_12px_6px_rgba(0,0,0,0.05)] transition-all duration-300 w-full max-w-95 items-start gap-2">
        <div className="flex justify-between items-baseline w-full">
          <span className="text-[#2251FF] font-bold text-[12px] leading-4 font-mulish">
            {card.numberStr}
          </span>
          <span className="text-[#2251FF] uppercase font-bold text-[12px] leading-4 font-mulish">
            {card.phaseLabel}
          </span>
        </div>
        
        <h3 className="text-black font-bold text-[20px] leading-7 font-mulish mt-0 mb-0">
          {card.title}
        </h3>
        
        <p className="text-[#555] font-normal text-[14px] leading-snug font-mulish m-0">
          {card.description}
        </p>

        {card.footerText && (
          <div className="flex flex-col mt-auto w-full pt-2">
            <p className="text-[#555] font-normal text-[12px] leading-4 font-mulish m-0">
              {card.footerText}
            </p>
          </div>
        )}
      </div>
    );
  }

  const isClean = cardStyle === "clean";

  if (isClean) {
    return (
      <div 
        className={cn(
          "flex flex-col h-full border border-[#DCE6F5] rounded-xl p-6 transition-all duration-300 w-full items-start gap-4",
          card.highlighted 
            ? "bg-[rgba(220,230,245,0.40)] shadow-[0_10px_12px_6px_rgba(0,0,0,0.05)]" 
            : "bg-white shadow-sm hover:shadow-md"
        )}
      >
        <div className="flex justify-between items-baseline w-full">
          <span className="text-[#2251FF] font-bold text-[12px] leading-4 font-mulish">
            {card.numberStr}
          </span>
          {card.phaseLabel && (
            <span className="text-[#2251FF] uppercase font-bold text-[12px] leading-4 font-mulish">
              {card.phaseLabel}
            </span>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="text-black font-bold text-[20px] leading-7 font-mulish m-0">
            {card.title}
          </h3>
          
          <p className="text-[#555] font-normal text-[14px] leading-snug font-mulish m-0">
            {card.description}
          </p>
        </div>

        {card.footerText && (
          <div className="flex flex-col mt-auto w-full pt-4 border-t border-[#F0F4F8]">
            <p className="text-[#555] font-normal text-[12px] leading-4 font-mulish m-0">
              {card.footerText}
            </p>
          </div>
        )}
      </div>
    );
  }

  const isPaleBlue = cardStyle === "pale-blue";
  
  return (
    <div 
      className={cn(
        "flex flex-col h-full border border-border-card p-space-12 md:p-space-32 hover:border-brand-primary md:hover:border-brand-primary/30 transition-all duration-300 w-full items-start",
        isPaleBlue 
          ? "bg-[rgba(203,224,255,0.40)] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]" 
          : "bg-white md:bg-surface rounded-xl hover:shadow-sm"
      )}
    >
      {/* Top Row: Number & Phase */}
      <div className="flex justify-between items-baseline w-full">
        <span className="text-link-mobile md:text-section-title-head text-brand-primary font-semibold font-mulish">
          {card.numberStr}
        </span>
        <span className="text-stat-desc-mobile md:text-help-card-prefix uppercase text-ink-muted tracking-wider md:tracking-widest font-normal md:font-semibold font-mulish">
          {card.phaseLabel}
        </span>
      </div>

      {/* Divider */}
      <hr className="my-space-24 border-border-card" />

      {/* Content Area */}
      <div className="flex flex-col">
        <h3 className={cn(
          "font-bold md:font-semibold mt-0 mb-space-4 md:mb-space-12 font-mulish",
          isPaleBlue 
            ? "text-black text-[20px] leading-7 md:text-help-card-title-mobile md:text-ink" 
            : "text-section-title-head-mobile md:text-help-card-title-mobile text-ink"
        )}>
          {card.title}
        </h3>
        <p className={cn(
          "font-normal font-mulish m-0",
          isPaleBlue 
            ? "text-[#555] text-[14px] leading-[21px] md:text-help-card-desc-mobile md:text-ink-muted" 
            : "text-card-desc-mobile md:text-help-card-desc-mobile text-ink-muted"
        )}>
          {card.description}
        </p>
      </div>

      {/* Footer Text */}
      {card.footerText && (
        <div className={cn(
          "flex flex-col mt-auto w-full",
          isPaleBlue
            ? "bg-white rounded-lg p-space-12 md:p-space-16 mt-space-16 md:mt-space-24"
            : "grow mt-space-12 md:mt-space-24 border-t border-border-card pt-space-12 md:pt-space-24"
        )}>
          <p className={cn(
            "font-normal font-mulish m-0",
            isPaleBlue 
              ? "text-[#555] text-[12px] leading-[16px] md:text-card-desc-mobile md:text-ink" 
              : "text-[#555] text-[10px] leading-[14px] tracking-[0.6px] md:text-card-desc-mobile md:text-ink md:tracking-normal mt-auto"
          )}>
            {card.footerText}
          </p>
        </div>
      )}
    </div>
  );
}
