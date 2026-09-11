import React from "react";
import type { HelpService } from "./helpServices";
import HelpServiceCard from "./HelpServiceCard";

export type HelpServiceGridProps = {
  services: HelpService[];
};

export default function HelpServiceGrid({ services }: Readonly<HelpServiceGridProps>) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        // 3-column desktop layout calculations
        const isLgBottomBorder = index < 3;
        const isLgRightBorder = (index + 1) % 3 !== 0;

        return (
          <HelpServiceCard
            key={service.num}
            service={service}
            isLgBottomBorder={isLgBottomBorder}
            isLgRightBorder={isLgRightBorder}
          />
        );
      })}
    </div>
  );
}
