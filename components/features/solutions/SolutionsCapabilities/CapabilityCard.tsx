"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { CapabilityData } from "./solutionsCapabilitiesData";

export type CapabilityCardProps = {
  capability: CapabilityData;
  className?: string;
  index: number;
};

export default function CapabilityCard({
  capability,
  className,
  index,
}: CapabilityCardProps) {
  const isDesktopBlue = capability.theme === "blue";

  const isMobileBlue = [0, 3, 4, 7].includes(index);

  const mobileBg = isMobileBlue ? "bg-primary" : "bg-surface-dark";
  const desktopBg = isDesktopBlue ? "lg:bg-primary" : "lg:bg-surface-dark";

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between w-full h-full min-h-44 sm:min-h-56 lg:min-h-72 rounded-lg p-4 sm:p-6 lg:p-8 overflow-hidden text-white",
        mobileBg,
        desktopBg,
        className
      )}
    >
      {/* Content Top */}
      <div className="flex flex-col gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-3 h-3 lg:w-8 lg:h-8 flex-shrink-0">
            <Image
              src={capability.iconPath}
              alt={capability.title}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-section-title-head-mobile lg:text-section-title-head text-white break-words hyphens-auto">
            {capability.title}
          </h3>
        </div>
        <p className="text-card-detail-mobile lg:text-card-desc text-white pr-2 line-clamp-4">
          {capability.description}
        </p>
      </div>

      {/* Button Cutout Area */}
      {/* The main white cutout wrapper */}
      <div className="absolute bottom-0 left-0 z-10 bg-surface rounded-tr-lg rounded-bl-lg p-2 shadow-[0_0_0_1px_#ffffff]">
        {/* Inner curve top-left */}
        <div className="absolute bottom-full left-0 w-2 h-2 pointer-events-none bg-[radial-gradient(circle_at_top_right,transparent_8px,var(--color-surface)_0)]" />

        {/* Inner curve bottom-right */}
        <div className="absolute bottom-0 left-full w-2 h-2 pointer-events-none bg-[radial-gradient(circle_at_top_right,transparent_8px,var(--color-surface)_0)]" />

        <Link
          href={capability.href}
          className={cn(
            "whitespace-nowrap inline-flex items-center justify-center transition-transform hover:scale-105 text-white",
            // Mobile specific styles from Figma
            "px-1.5 py-1 gap-1 rounded-[4px] text-link-card-mobile",
            // Desktop specific styles
            "lg:px-4 lg:py-2 lg:gap-2  lg:border-none lg:text-link-mobile",
            mobileBg,
            desktopBg
          )}
        >
          Explore Now <ArrowRight className="w-[16px] h-[20px] lg:w-4 lg:h-4" />
        </Link>
      </div>
    </div>
  );
}
