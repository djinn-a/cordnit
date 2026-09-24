import React from "react";
import { getLucideIcon } from "@/lib/utils/icons";
import type { SplitFeatureBlockProps } from "./types";

type SplitFeatureMediaProps = SplitFeatureBlockProps["mediaSection"] & {
  mediaStyle?: NonNullable<SplitFeatureBlockProps["mediaStyle"]>;
};

export function SplitFeatureMedia({
  eyebrow,
  statusText,
  cards,
  footerBadges,
  mediaStyle = "icon-cards",
}: Readonly<SplitFeatureMediaProps>) {
  return (
    <div className={`flex flex-col w-full lg:flex-1 md:ml-0 md:p-space-32 bg-primary-pale md:bg-brand-pale md:rounded-4xl p-space-20 rounded-card-sm`}>
      {(eyebrow || statusText) && (
        <div className={`flex flex-col md:flex-row items-start md:items-center md:justify-between gap-space-8 md:gap-0 ${
          mediaStyle === "numbered-steps" ? "mb-space-24" : "mb-space-12"
        } md:mb-space-24`}>
          {eyebrow && (
            <span className="text-help-card-prefix text-ink-muted md:text-footer-heading-desktop md:font-bold md:leading-normal uppercase font-mulish">
              {eyebrow}
            </span>
          )}
          {statusText && (
            <span className="bg-primary/10 md:bg-brand-primary/10 rounded-md md:rounded px-space-10 py-space-4 md:px-2 md:py-1 text-help-card-prefix text-brand-primary md:text-link-card-mobile md:font-semibold uppercase md:tracking-widest md:leading-normal">
              {statusText}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-space-12 md:gap-space-16 relative items-center w-full">
        {mediaStyle === "flowchart-cards" ? (
          <div className="flex flex-col items-center w-full gap-space-16 md:gap-space-24">
            <div className="grid grid-cols-3 gap-space-8 md:gap-space-12 w-full">
              {cards.slice(0, 3).map((card, idx) => (
                <div key={idx} className="bg-white rounded-[8px] p-space-12 md:p-space-16 flex flex-col items-center text-center shadow-sm border border-[var(--border,#DCE6F5)] w-full">
                  {card.stepNumber && (
                    <span className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.6px] lg:tracking-normal font-normal text-brand-primary font-mulish uppercase mb-space-4">
                      {card.stepNumber}
                    </span>
                  )}
                  <h3 className="text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] font-semibold lg:font-bold text-ink font-mulish uppercase mb-space-4">
                    {card.title}
                  </h3>
                  <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] font-normal text-ink-muted font-mulish">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center w-full z-10 my-[-16px] md:my-[-24px]">
              <svg className="w-[16px] h-[32px] text-brand-primary" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L8 31M8 31L2 25M8 31L14 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="flex justify-center w-full">
              {cards[3] && (
                <div className="bg-white rounded-[8px] p-space-16 md:p-space-24 flex flex-col items-center text-center shadow-sm border border-[var(--border,#DCE6F5)] w-full md:w-[70%]">
                  {cards[3].stepNumber && (
                    <span className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.6px] lg:tracking-normal font-normal text-brand-primary font-mulish uppercase mb-space-4">
                      {cards[3].stepNumber}
                    </span>
                  )}
                  <h3 className="text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] font-semibold lg:font-bold text-ink font-mulish uppercase mb-space-4">
                    {cards[3].title}
                  </h3>
                  <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] font-normal text-ink-muted font-mulish">
                    {cards[3].description}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center w-full z-10 my-[-16px] md:my-[-24px]">
              <svg className="w-[16px] h-[32px] text-brand-primary" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L8 31M8 31L2 25M8 31L14 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="flex justify-center w-full">
              {cards[4] && (
                <div className="bg-white rounded-[8px] p-space-16 md:p-space-24 flex flex-col items-center text-center shadow-sm border border-[var(--border,#DCE6F5)] w-full">
                  {cards[4].stepNumber && (
                    <span className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.6px] lg:tracking-normal font-normal text-brand-primary font-mulish uppercase mb-space-4">
                      {cards[4].stepNumber}
                    </span>
                  )}
                  <h3 className="text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] font-semibold lg:font-bold text-ink font-mulish uppercase mb-space-4">
                    {cards[4].title}
                  </h3>
                  <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] font-normal text-ink-muted font-mulish">
                    {cards[4].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : mediaStyle === "loop-cards" ? (
          <div className="flex flex-col items-center w-full mt-space-16 md:mt-0 relative z-10">
            <div className="grid grid-cols-2 gap-space-12 md:gap-space-16 w-full">
              {cards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-[12px] p-space-16 md:p-space-24 flex flex-col items-start shadow-sm border border-[var(--border,#DCE6F5)] w-full relative z-20">
                  {card.stepNumber && (
                    <span className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] tracking-[0.6px] lg:tracking-normal font-normal text-brand-primary font-mulish uppercase mb-space-4">
                      {card.stepNumber}
                    </span>
                  )}
                  <h3 className="text-[12px] lg:text-[16px] leading-[16px] lg:leading-[24px] font-semibold lg:font-bold text-ink font-mulish uppercase mb-space-4">
                    {card.title}
                  </h3>
                  <p className="text-[10px] lg:text-[12px] leading-[14px] lg:leading-[16px] font-normal text-ink-muted font-mulish">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
            
            {footerBadges && footerBadges.length > 0 && (
              <div className="w-full flex items-center justify-center pt-space-20 md:pt-space-24 mt-space-20 md:mt-space-24 border-t border-[var(--border,#DCE6F5)] relative z-20">
                <div className="flex items-center gap-space-8 text-brand-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M2.13 15.57a10 10 0 1 0 3.39-10.23L2.5 8" />
                    <path d="M2.5 22v-6h6M21.87 8.43a10 10 0 1 0-3.39 10.23L21.5 16" />
                  </svg>
                  <span className="text-[12px] lg:text-[14px] uppercase font-mulish font-medium">
                    {footerBadges[0]}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          cards.map((card, index) => (
            <React.Fragment key={`${card.title}-${index}`}>
              {mediaStyle === "stacked-cards" ? (
                <div className="w-full bg-white rounded-[12px] p-space-16 md:p-space-24 flex flex-col gap-space-4 shadow-[0_10px_12px_6px_rgba(0,0,0,0.05)] border border-[var(--border,#DCE6F5)]">
                  {card.stepNumber && (
                    <span className="text-[12px] leading-[16px] font-normal text-brand-primary font-mulish uppercase">
                      {card.stepNumber}
                    </span>
                  )}
                  <h3 className="text-[16px] leading-[24px] font-bold text-ink font-mulish uppercase mt-space-4">
                    {card.title}
                  </h3>
                  <p className="text-[12px] leading-[16px] font-normal text-ink-muted font-mulish">
                    {card.description}
                  </p>
                </div>
              ) : (
                <div
                  className={`w-full bg-white md:bg-surface p-space-16 md:p-space-16 flex ${
                    mediaStyle === "numbered-steps" && card.stepNumber && card.stepNumber.length > 3 ? "flex-col" : "items-start"
                  } gap-space-16 md:gap-space-16 shadow-help-card ${
                    mediaStyle === "numbered-steps" ? "rounded-card-sm md:rounded-card-sm" : "border border-border-card md:border-border-card rounded-card-sm md:rounded-card-sm"
                  }`}
                >
                  {!(mediaStyle === "numbered-steps" && card.stepNumber && card.stepNumber.length > 3) && (
                    <div className="shrink-0 w-space-40 h-space-40 md:w-space-40 md:h-space-40 rounded md:rounded bg-brand-pale flex items-center justify-center">
                      {mediaStyle === "numbered-steps" ? (
                        <span className="text-help-card-prefix text-brand-primary md:text-link-desktop md:font-normal font-mulish">
                          {card.stepNumber}
                        </span>
                      ) : (
                        card.icon && React.createElement(getLucideIcon(card.icon), { className: "w-space-20 h-space-20 md:w-5 md:h-5 text-brand-primary" })
                      )}
                    </div>
                  )}
                  <div className="flex flex-col gap-space-2 md:gap-space-4 w-full pt-space-2 md:pt-0.5">
                    {(mediaStyle === "numbered-steps" && card.stepNumber && card.stepNumber.length > 3) && (
                      <span className="text-help-card-prefix text-ink-muted md:text-link-desktop md:font-normal font-mulish mb-space-4 md:mb-space-8 uppercase">
                        {card.stepNumber}
                      </span>
                    )}
                    <h3 className="text-section-title-head-mobile text-ink md:text-footer-heading-desktop md:font-bold md:leading-normal uppercase font-mulish">
                      {card.title}
                    </h3>
                    <p className="text-stat-desc-mobile md:text-card-desc-mobile lg:text-card-desc text-ink-muted md:font-normal font-mulish">
                      {card.description}
                    </p>
                  </div>
                </div>
              )}
              
              {(mediaStyle === "icon-cards" || mediaStyle === "numbered-steps") && index < cards.length - 1 && !cards[index + 1]?.stepNumber?.includes("OUTCOME") && (
                <div className="flex justify-center w-full z-10">
                  <svg className="w-[14px] h-[24px] text-brand-primary" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L7 23M7 23L1 17M7 23L13 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>

      {footerBadges && footerBadges.length > 0 && mediaStyle !== "loop-cards" && (
        <div className="flex flex-wrap items-center gap-space-8 md:gap-space-12 mt-space-16 md:mt-space-24">
          {footerBadges.map((badge) => (
            <span
              key={badge}
              className="bg-white md:bg-surface rounded md:rounded px-space-10 py-space-6 md:px-space-12 md:py-space-6 text-card-detail-mobile md:text-card-desc-mobile font-medium text-ink md:text-ink-muted font-mulish shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
