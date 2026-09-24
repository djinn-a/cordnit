import React from "react";
import type { DataSecurityOverviewProps } from "./types";
import { DataSecurityHeader } from "./DataSecurityHeader";
import { DataSecurityCardSection } from "./DataSecurityCardSection";
import { DataSecurityProcessCard } from "./DataSecurityProcessCard";

export function DataSecurityOverview({ data }: Readonly<DataSecurityOverviewProps>) {
  if (!data) return null;
  
  const gapClass = data.processCards ? "gap-space-24 md:gap-space-64" : "gap-space-24 md:gap-space-80";
  
  return (
    <section className={`w-full flex flex-col ${gapClass}`}>
      <DataSecurityHeader {...data.header} />
      {data.cardSection && <DataSecurityCardSection {...data.cardSection} />}
      {data.processCards && (
        data.variant === "cloud-configuration" ? (
          <div className="flex flex-col w-full md:border md:border-(--border,#DCE6F5) md:rounded-3xl py-space-20 md:p-space-40 mt-space-12 md:mt-space-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-space-16 md:mb-space-24 gap-space-12 md:gap-0 border-b border-border-subtle md:border-none pb-space-12 md:pb-0">
              <span className="text-[10px] md:text-[12px] leading-space-14 md:leading-space-16 text-ink-muted uppercase font-mulish tracking-wider">
                {data.processSectionInfo?.headerLeft}
              </span>
              <div className="w-fit bg-primary/10 md:bg-transparent rounded-md md:rounded-none px-space-10 py-space-4 md:p-0 flex items-center justify-center">
                <span className="text-[10px] md:text-[12px] leading-space-14 md:leading-space-16 text-brand-primary uppercase font-mulish tracking-widest md:tracking-normal">
                  {data.processSectionInfo?.headerRight}
                </span>
              </div>
            </div>
            
            <div className="flex flex-row flex-wrap justify-center md:grid md:grid-cols-3 gap-2.75 md:gap-space-16 w-full mb-space-24">
              {data.processCards.map((card, idx) => (
                <DataSecurityProcessCard key={card.title} {...card} variant={data.variant} isSpecialCard={idx === 2} />
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full border-t border-border-subtle md:border-(--border,#DCE6F5) pt-space-16 md:pt-space-24 gap-space-16 md:gap-0">
              <div className="flex items-center gap-space-8">
                <div className="hidden md:block w-space-6 h-space-6 rounded-full bg-brand-primary"></div>
                <p className="text-[10px] md:text-card-desc-mobile text-ink-muted font-mulish">
                  {data.processSectionInfo?.footerText}
                </p>
              </div>
              <div className="w-fit bg-primary/10 md:bg-transparent rounded-md md:rounded-none px-space-10 py-space-4 md:p-0 flex items-center justify-center">
                <span className="text-[10px] md:text-[12px] leading-space-14 md:leading-space-16 text-brand-primary uppercase font-mulish tracking-wider md:tracking-normal">
                  {data.processSectionInfo?.footerHighlight}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-12 md:gap-space-24 w-full">
            {data.processCards.map((card) => (
              <DataSecurityProcessCard key={card.title} {...card} variant={data.variant} />
            ))}
          </div>
        )
      )}
    </section>
  );
}
