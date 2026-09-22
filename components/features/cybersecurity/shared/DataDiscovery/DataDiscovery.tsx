import React from "react";
import type { DataDiscoveryProps } from "./types";
import { DataDiscoveryLeft } from "./DataDiscoveryLeft";
import { DataDiscoveryRight } from "./DataDiscoveryRight";

export function DataDiscovery({ data }: Readonly<DataDiscoveryProps>) {
  if (!data) return null;

  return (
    <section className="w-full pt-space-80 max-w-[1440px] mx-auto px-space-24 md:px-space-60">
      <div className="flex flex-col md:flex-row gap-space-40 items-stretch justify-between w-full">
        <DataDiscoveryLeft {...data.leftSection} />
        <DataDiscoveryRight {...data.rightSection} />
      </div>
    </section>
  );
}
