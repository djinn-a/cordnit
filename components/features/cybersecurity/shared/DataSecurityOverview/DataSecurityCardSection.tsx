import type { DataSecurityOverviewData } from "./types";
import { DataSecurityCard } from "./DataSecurityCard";

export type DataSecurityCardSectionProps = NonNullable<DataSecurityOverviewData["cardSection"]>;

export function DataSecurityCardSection({ sectionTag, sectionTitle, footerText, footerHighlight, cards }: Readonly<DataSecurityCardSectionProps>) {
  return (
    <div className="flex flex-col w-[calc(100%+32px)] -ml-4 px-4 md:w-full md:ml-0 md:px-space-40 bg-[#EEF4FF] md:bg-grad-3 md:border md:border-border-card md:rounded-card py-[20px] md:pt-space-24 md:pb-space-24 gap-[24px] md:gap-0">
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full md:mb-space-24 gap-[12px] md:gap-space-12 border-b border-[#DCE6F5] md:border-none pb-[13px] md:pb-0">
        <span className="text-[#555] md:text-ink-muted text-[12px] md:text-footer-heading-desktop font-mulish font-semibold leading-[16px] uppercase tracking-wider md:order-2">
          {sectionTitle}
        </span>
        <div className="w-fit bg-[#2251FF]/10 md:bg-surface border-none md:border md:border-border-card rounded-[6px] md:rounded-full px-[10px] py-[4px] md:px-space-10 md:py-space-4 flex items-center justify-center md:order-1">
          <span className="text-[12px] md:text-link-card-mobile font-semibold text-[#2251FF] md:text-brand-primary font-mulish uppercase leading-[16px] tracking-widest">
            {sectionTag}
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-row flex-wrap justify-center gap-x-[12px] gap-y-[16px] md:gap-space-24 w-full">
        {cards.map((card) => (
          <DataSecurityCard key={card.title} {...card} />
        ))}
      </div>

      {/* Bottom Footer Row */}
      <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center mt-[24px] md:mt-space-24 border-t border-[#DCE6F5] md:border-border-card pt-[16px] md:pt-space-24 gap-[16px] md:gap-0">
        <span className="text-[#555] md:text-ink-muted text-[10px] md:text-footer-heading-desktop font-mulish uppercase tracking-wider font-semibold leading-[14px] md:leading-normal">
          {footerText}
        </span>
        <div className="w-fit bg-[#2251FF]/10 md:bg-transparent rounded-[6px] md:rounded-none px-[10px] py-[4px] md:p-0 flex items-center justify-center">
          <span className="text-[10px] md:text-footer-heading-desktop text-[#2251FF] md:text-brand-primary font-mulish tracking-wider font-semibold uppercase md:normal-case">
            {footerHighlight}
          </span>
        </div>
      </div>
    </div>
  );
}
