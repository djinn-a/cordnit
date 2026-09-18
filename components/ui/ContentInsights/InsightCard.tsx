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
    <div className="flex flex-col bg-surface border border-border-card rounded-xl overflow-hidden transition-shadow hover:shadow-card group h-[474px]">
      {/* Image */}
      <div className="relative w-full h-[173px] shrink-0 overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col p-5 flex-1 justify-between">
        
        {/* Top Content (Meta, Title, Desc) */}
        <div className="flex flex-col gap-[7.2px] pb-4">
          {/* Metadata Row */}
          <div className="flex items-center gap-2">
            <span className="uppercase text-insight-label text-primary">
              {metadata.label}
            </span>
            <span className="px-2 py-0.5 bg-surface border border-border-card rounded-full text-card-detail-mobile text-ink-muted">
              {metadata.pill}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-[16px] font-bold leading-6 text-ink">
            {title}
          </h4>

          {/* Description */}
          <p className="text-[14px] leading-5 text-ink-muted line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom Content (Date, CTA) */}
        <div className="flex flex-col gap-4 mt-auto">
          {/* Date Info */}
          <span className="text-[12px] font-semibold leading-[18px] text-ink-muted">
            {dateInfo}
          </span>
          
          {/* CTA Link */}
          <Link
            href={cta.href}
            className="flex items-center gap-1.5 text-[14px] font-semibold leading-5 text-primary hover:text-primary-hover transition-colors w-fit"
          >
            {cta.label}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
