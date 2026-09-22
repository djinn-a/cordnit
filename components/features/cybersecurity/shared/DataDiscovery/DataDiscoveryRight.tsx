import React from "react";
import { DataDiscoveryCard } from "./DataDiscoveryCard";
import type { DataDiscoveryData } from "./types";

type DataDiscoveryRightProps = DataDiscoveryData["rightSection"];

export function DataDiscoveryRight({ eyebrow, statusText, cards }: Readonly<DataDiscoveryRightProps>) {
  return (
    <div className="flex flex-col w-full md:w-1/2 bg-brand-pale rounded-card p-space-24 md:p-space-32">
      {/* Header Row */}
      <div className="flex items-center justify-between w-full mb-space-24">
        <span className="text-footer-heading-desktop text-ink-muted uppercase font-mulish">
          {eyebrow}
        </span>
        <div className="bg-brand-primary/10 rounded px-2 py-1 flex items-center justify-center">
          <span className="text-link-card-mobile text-brand-primary font-semibold uppercase tracking-widest">
            {statusText}
          </span>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-space-12 w-full">
        {cards.map((card, idx) => (
          <DataDiscoveryCard key={idx} {...card} />
        ))}
      </div>
    </div>
  );
}
