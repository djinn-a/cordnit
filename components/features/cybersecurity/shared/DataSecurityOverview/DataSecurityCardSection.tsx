import type { DataSecurityOverviewData } from "./types";
import { DataSecurityCard } from "./DataSecurityCard";

export type DataSecurityCardSectionProps = NonNullable<DataSecurityOverviewData["cardSection"]>;

export function DataSecurityCardSection({ sectionTag, sectionTitle, footerText, footerHighlight, cards }: Readonly<DataSecurityCardSectionProps>) {
  return (
    <div className="flex flex-col -mx-4 px-4 md:w-full md:mx-0 md:px-space-40 bg-primary-pale md:bg-grad-3 md:border md:border-border-card md:rounded-card py-space-20 md:pt-space-24 md:pb-space-24 gap-space-24 md:gap-0">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full md:mb-space-24 gap-space-12 md:gap-space-12 border-b border-border-subtle md:border-none pb-space-12 md:pb-0">
        <span className="text-ink-muted text-help-card-prefix md:text-footer-heading-desktop font-mulish uppercase tracking-wider">
          {sectionTitle}
        </span>
        <div className="w-fit bg-primary/10 md:bg-surface border-none md:border md:border-border-card rounded-md md:rounded-full px-space-10 py-space-4 flex items-center justify-center">
          <span className="text-brand-primary text-help-card-prefix md:text-link-card-mobile font-mulish uppercase tracking-widest">
            {sectionTag}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-row flex-wrap justify-center gap-x-space-12 gap-y-space-16 md:gap-space-24 w-full">
        {cards.map((card) => (
          <DataSecurityCard key={card.title} {...card} />
        ))}
      </div>

      {/* Bottom Footer Row */}
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center mt-space-24 md:mt-space-24 border-t border-border-subtle md:border-border-card pt-space-16 md:pt-space-24 gap-space-16 md:gap-0">
        <span className="text-ink-muted text-link-card-mobile md:text-footer-heading-desktop font-mulish uppercase tracking-wider">
          {footerText}
        </span>
        <div className="w-fit bg-primary/10 md:bg-transparent rounded-md md:rounded-none px-space-10 py-space-4 md:p-0 flex items-center justify-center">
          <span className="text-brand-primary text-link-card-mobile md:text-footer-heading-desktop font-mulish tracking-wider uppercase md:normal-case">
            {footerHighlight}
          </span>
        </div>
      </div>
    </div>
  );
}
