import React from "react";
import type { DataSecurityOverviewProps } from "./types";
import { DataSecurityHeader } from "./DataSecurityHeader";
import { DataSecurityCardSection } from "./DataSecurityCardSection";

export function DataSecurityOverview({ data }: DataSecurityOverviewProps) {
  if (!data) return null;
  return (
    <section className="w-full flex flex-col gap-space-80 pt-space-80 max-w-[1440px] mx-auto px-space-24 md:px-space-60">
      <DataSecurityHeader {...data.header} />
      <DataSecurityCardSection {...data.cardSection} />
    </section>
  );
}
