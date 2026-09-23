import React from "react";
import type { DataSecurityOverviewProps } from "./types";
import { DataSecurityHeader } from "./DataSecurityHeader";
import { DataSecurityCardSection } from "./DataSecurityCardSection";
import { DataSecurityProcessCard } from "./DataSecurityProcessCard";

export function DataSecurityOverview({ data }: Readonly<DataSecurityOverviewProps>) {
  if (!data) return null;
  
  const gapClass = data.processCards ? "gap-space-64" : "gap-space-80";
  
  return (
    <section className={`w-full flex flex-col ${gapClass}`}>
      <DataSecurityHeader {...data.header} />
      {data.cardSection && <DataSecurityCardSection {...data.cardSection} />}
      {data.processCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-24 w-full">
          {data.processCards.map((card) => (
            <DataSecurityProcessCard key={card.title} {...card} />
          ))}
        </div>
      )}
    </section>
  );
}
