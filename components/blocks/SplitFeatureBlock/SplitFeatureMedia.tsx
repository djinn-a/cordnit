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
        {cards.map((card, index) => (
          <React.Fragment key={`${card.title}-${index}`}>
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
                  <span className="text-help-card-prefix text-brand-primary md:text-link-desktop md:font-normal font-mulish mb-space-4 md:mb-space-8">
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
            
            {mediaStyle === "icon-cards" && index < cards.length - 1 && (
              <div className="flex justify-center w-full -mt-space-12 md:-my-space-8 z-10 mb-0">
                <ArrowDown className="hidden md:block w-5 h-5 text-brand-primary opacity-50" />
                <svg className="block md:hidden w-space-14 h-space-24 text-brand-primary opacity-60" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L7 23M7 23L1 17M7 23L13 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {footerBadges && footerBadges.length > 0 && (
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
