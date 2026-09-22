import type { DataSecurityOverviewData } from "./types";
import { DataSecurityCard } from "./DataSecurityCard";

export type DataSecurityCardSectionProps = DataSecurityOverviewData["cardSection"];

export function DataSecurityCardSection({ sectionTag, sectionTitle, footerText, footerHighlight, cards }: DataSecurityCardSectionProps) {
  return (
    <div className="flex flex-col w-full bg-grad-3 border border-border-card rounded-card pt-space-24 pb-space-24 px-space-40">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-space-24 gap-space-12">
        <div className="w-fit bg-surface border border-border-card rounded-full px-space-10 py-space-4 flex items-center justify-center">
          <span className="text-link-card-mobile font-semibold text-brand-primary font-mulish uppercase tracking-widest">
            {sectionTag}
          </span>
        </div>
        <span className="text-footer-heading-desktop text-ink-muted font-mulish uppercase tracking-wider font-semibold">
          {sectionTitle}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col md:flex-row gap-space-24 w-full">
        {cards.map((card, idx) => (
          <DataSecurityCard key={idx} {...card} />
        ))}
      </div>

      {/* Bottom Footer Row */}
      <div className="flex w-full justify-between items-center mt-space-24 border-t border-border-card pt-space-24">
        <span className="text-footer-heading-desktop text-ink-muted font-mulish uppercase tracking-wider font-semibold">
          {footerText}
        </span>
        <span className="text-footer-heading-desktop text-brand-primary font-mulish tracking-wider font-semibold">
          {footerHighlight}
        </span>
      </div>
    </div>
  );
}
