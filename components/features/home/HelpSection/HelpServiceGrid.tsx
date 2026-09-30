import React from "react";
import type { HelpService } from "./helpServices";
import HelpServiceCard from "./HelpServiceCard";

export type HelpServiceGridProps = {
  services: HelpService[];
};

const getGridBorderClasses = (index: number, total: number) => {
  const isMdRightEdge = (index + 1) % 2 === 0;
  const isLgRightEdge = (index + 1) % 3 === 0;
  const isXlRightEdge = (index + 1) % 4 === 0;

  const isMdBottomEdge = Math.floor(index / 2) === Math.ceil(total / 2) - 1;
  const isLgBottomEdge = Math.floor(index / 3) === Math.ceil(total / 3) - 1;
  const isXlBottomEdge = Math.floor(index / 4) === Math.ceil(total / 4) - 1;

  return [
    isMdRightEdge ? "md:border-r-0" : "md:border-r-2",
    isLgRightEdge ? "lg:border-r-0" : "lg:border-r-2",
    isXlRightEdge ? "xl:border-r-0" : "xl:border-r-2",
    isMdBottomEdge ? "md:border-b-0" : "md:border-b-2",
    isLgBottomEdge ? "lg:border-b-0" : "lg:border-b-2",
    isXlBottomEdge ? "xl:border-b-0" : "xl:border-b-2",
  ].join(" ");
};

export default function HelpServiceGrid({ services }: Readonly<HelpServiceGridProps>) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {services.map((service, index) => (
        <HelpServiceCard
          key={service.num}
          service={service}
          borderClasses={getGridBorderClasses(index, services.length)}
        />
      ))}
    </div>
  );
}
