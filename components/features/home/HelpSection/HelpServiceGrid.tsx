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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => {
        // 4-column desktop layout calculations
        // Bottom border for all rows EXCEPT the last row
        const isLastRowStart = Math.floor((services.length - 1) / 4) * 4;
        const isLgBottomBorder = index < isLastRowStart;
        const isLgRightBorder = (index + 1) % 4 !== 0;

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
