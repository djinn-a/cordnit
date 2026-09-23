import React from "react";
import { getLucideIcon } from "@/lib/utils/icons";
import { ArrowDown } from "lucide-react";
import type { SplitFeatureBlockProps } from "./types";

type SplitFeatureMediaProps = SplitFeatureBlockProps["mediaSection"] & {
  mediaStyle?: SplitFeatureBlockProps["mediaStyle"];
};

export function SplitFeatureMedia({
  eyebrow,
  statusText,
  cards,
  footerBadges,
  mediaStyle = "icon-cards",
}: Readonly<SplitFeatureMediaProps>) {
  return (
    <div className={`flex flex-col md:w-full lg:flex-1 md:ml-0 md:p-space-32 bg-[#EEF4FF] md:bg-brand-pale md:rounded-4xl ${
      mediaStyle === "numbered-steps" 
        ? "w-full p-[20px] rounded-[10px]" 
        : "w-[calc(100%+32px)] -ml-4 px-[16px] py-[20px] rounded-none"
    }`}>
      <div className={`flex flex-col md:flex-row items-start md:items-center md:justify-between gap-[8px] md:gap-0 ${
        mediaStyle === "numbered-steps" ? "mb-[24px]" : "mb-[12px]"
      } md:mb-space-24`}>
        <span className="text-[12px] md:text-footer-heading-desktop text-[#555] md:text-ink-muted font-[600] md:font-bold leading-[16px] md:leading-normal uppercase font-mulish">
          {eyebrow}
        </span>
        <span className="bg-[#2251FF]/10 md:bg-brand-primary/10 rounded-[6px] md:rounded px-[10px] py-[4px] md:px-2 md:py-1 text-[12px] md:text-link-card-mobile text-[#2251FF] md:text-brand-primary font-[600] md:font-semibold uppercase tracking-normal md:tracking-widest leading-[16px] md:leading-normal">
          {statusText}
        </span>
      </div>

      <div className="flex flex-col gap-[12px] md:gap-space-16 relative items-center w-full">
        {cards.map((card, index) => (
          <React.Fragment key={card.title}>
            <div
              className={`w-full bg-white md:bg-surface p-[16px] md:p-space-16 flex items-start gap-[16px] md:gap-space-16 shadow-help-card ${
                mediaStyle === "numbered-steps" ? "rounded-[10px] md:rounded-card-sm" : "border border-border-card md:border-border-card rounded-[10px] md:rounded-card-sm"
              }`}
            >
              <div className="shrink-0 w-[40px] h-[40px] md:w-space-40 md:h-space-40 rounded md:rounded bg-brand-pale flex items-center justify-center">
                {mediaStyle === "numbered-steps" ? (
                  <span className="text-[12px] md:text-link-desktop text-[#2251FF] md:text-brand-primary font-[600] md:font-normal font-mulish">
                    {card.stepNumber}
                  </span>
                ) : (
                  card.icon && React.createElement(getLucideIcon(card.icon), { className: "w-[20px] h-[20px] md:w-5 md:h-5 text-brand-primary" })
                )}
              </div>
              <div className="flex flex-col gap-[2px] md:gap-space-4 w-full pt-[2px] md:pt-0.5">
                <h3 className="text-[14px] md:text-footer-heading-desktop text-[#000] md:text-ink font-[700] md:font-bold leading-[22px] md:leading-normal uppercase font-mulish">
                  {card.title}
                </h3>
                <p className="text-[10px] md:text-[12px] md:text-card-desc font-[400] md:font-normal leading-[14px] md:leading-[16px] text-[#555] md:text-ink-muted font-mulish">
                  {card.description}
                </p>
              </div>
            </div>
            
            {mediaStyle === "numbered-steps" && index < cards.length - 1 && (
              <div className="flex justify-center w-full -mt-[12px] md:-my-space-8 z-10 mb-0">
                <ArrowDown className="hidden md:block w-5 h-5 text-brand-primary opacity-50" />
                <svg className="block md:hidden w-[14px] h-[24px] text-[#2251FF] opacity-60" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L7 23M7 23L1 17M7 23L13 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {footerBadges && footerBadges.length > 0 && (
        <div className="flex flex-wrap items-center gap-[8px] md:gap-space-12 mt-[16px] md:mt-space-24">
          {footerBadges.map((badge) => (
            <span
              key={badge}
              className="bg-white md:bg-surface rounded-[4px] md:rounded px-[10px] py-[6px] md:px-space-12 md:py-space-6 text-[10px] md:text-card-desc-mobile text-[#000] md:text-ink-muted font-[500] font-mulish shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
