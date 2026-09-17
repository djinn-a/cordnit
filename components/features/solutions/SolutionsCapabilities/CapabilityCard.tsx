"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { CapabilityData } from "./solutionsCapabilitiesData";

export type CapabilityCardProps = {
  capability: CapabilityData;
  className?: string;
};

export default function CapabilityCard({
  capability,
  className,
}: CapabilityCardProps) {
  const isBlue = capability.theme === "blue";

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between w-full h-full min-h-56 lg:min-h-80 rounded-card-lg p-4 sm:p-6 lg:p-8 overflow-hidden",
        isBlue ? "bg-primary text-white" : "bg-surface-dark text-white",
        className
      )}
    >
      {/* Content Top */}
      <div className="flex flex-col gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-8 h-8 flex-shrink-0">
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
        <p className="text-card-desc-mobile lg:text-card-desc text-white pr-2 line-clamp-4">
          {capability.description}
        </p>
      </div>

      {/* Button Cutout Area */}
      {/* The main white cutout wrapper */}
      <div className="absolute bottom-0 left-0 z-10 bg-surface rounded-tr-3xl p-2 pr-3 pt-3">
        {/* Inner curve top-left */}
        <div className="absolute bottom-full left-0 w-5 h-5 pointer-events-none bg-cutout-curve" />

        {/* Inner curve bottom-right */}
        <div className="absolute bottom-0 left-full w-5 h-5 pointer-events-none bg-cutout-curve" />

        <Link
          href={capability.href}
          className={cn(
            "w-full lg:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-link-mobile lg:text-link-desktop font-bold transition-transform hover:scale-105",
            isBlue ? "bg-primary text-white" : "bg-surface-dark text-white"
          )}
        >
          Explore Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
