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
    <div className="flex flex-col w-full lg:w-1/2 p-space-32 bg-brand-pale rounded-4xl">
      <div className="flex items-center justify-between mb-space-24">
        <span className="text-footer-heading-desktop text-ink-muted uppercase font-mulish">
          {eyebrow}
        </span>
        <span className="bg-brand-primary/10 rounded px-2 py-1 text-link-card-mobile text-brand-primary font-semibold uppercase tracking-widest">
          {statusText}
        </span>
      </div>

      <div className="flex flex-col gap-space-16 relative items-center w-full">
        {cards.map((card, index) => (
          <React.Fragment key={card.title}>
            <div
              className={`w-full bg-surface p-space-16 flex items-start gap-space-16 shadow-help-card ${
                mediaStyle === "numbered-steps" ? "rounded-card-sm" : "border border-border-card rounded-card-sm"
              }`}
            >
              <div className="shrink-0 w-space-40 h-space-40 rounded bg-brand-pale flex items-center justify-center">
                {mediaStyle === "numbered-steps" ? (
                  <span className="text-link-desktop text-brand-primary font-mulish">
                    {card.stepNumber}
                  </span>
                ) : (
                  card.icon && React.createElement(getLucideIcon(card.icon), { className: "w-5 h-5 text-brand-primary" })
                )}
              </div>
              <div className="flex flex-col gap-space-4 w-full pt-0.5">
                <h3 className="text-footer-heading-desktop text-ink uppercase font-mulish">
                  {card.title}
                </h3>
                <p className="text-card-desc-mobile md:text-card-desc text-ink-muted font-mulish">
                  {card.description}
                </p>
              </div>
            </div>
            
            {mediaStyle === "numbered-steps" && index < cards.length - 1 && (
              <div className="flex justify-center w-full -my-space-8">
                <ArrowDown className="w-5 h-5 text-brand-primary opacity-50" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {footerBadges && footerBadges.length > 0 && (
        <div className="flex flex-wrap items-center gap-space-12 mt-space-24">
          {footerBadges.map((badge) => (
            <span
              key={badge}
              className="bg-surface rounded px-space-12 py-space-6 text-card-desc-mobile text-ink-muted font-mulish shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
