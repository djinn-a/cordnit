import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { InsightCardData } from "./ContentInsights.types";
import Link from "next/link";

export default function InsightCard({
  metadata,
  title,
  description,
  dateInfo,
  image,
  cta,
}: Readonly<InsightCardData>) {
  return (
    <div className="flex flex-col self-stretch bg-surface border border-border-card rounded-xl overflow-hidden transition-shadow hover:shadow-card group h-auto">
      {/* Image */}
      <div className="relative w-full h-23.25 md:h-auto aspect-162/93 md:aspect-16/10 shrink-0 overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 justify-between w-full p-4 md:p-6">
        
        {/* Top Content (Meta, Title, Desc) */}
        <div className="flex flex-col">
          {/* Metadata Row */}
          <div className="flex items-center gap-2 mb-2">
            <span className="uppercase text-link-card-mobile text-primary">
              {metadata.label}
            </span>
            <span className="px-2 py-0.5 bg-surface border border-border-card rounded-full text-card-detail-mobile text-ink-muted">
              {metadata.pill}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-bold text-ink mb-2 md:mb-3">
            {title}
          </h4>

          {/* Description */}
          <p className="text-sm font-normal text-ink-muted line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom Content (Date, CTA) */}
        <div className="flex flex-col gap-3 md:gap-4 mt-3 md:mt-4">
          {/* Date Info */}
          <span className="text-card-desc-mobile font-semibold text-ink-muted">
            {dateInfo}
          </span>
          
          {/* CTA Link */}
          <Link
            href={cta.href}
            className="flex items-center gap-1 md:gap-1.5 text-link-mobile md:text-link-desktop text-primary hover:text-primary-hover transition-colors w-fit"
          >
            {cta.label}
            <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
