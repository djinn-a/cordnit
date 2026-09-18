import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { IndustryCardProps } from "./IndustryCard.types";

export default function IndustryCard({
  icon,
  title,
  description,
  ctaLabel,
  ctaLink,
}: IndustryCardProps) {
  return (
    <div className="flex flex-col p-8 bg-grad-3 border border-border-card rounded-lg backdrop-blur-[20px]">
      <div className="flex flex-col gap-3">
        {icon}
        <h3 className="text-2xl font-semibold leading-8 text-ink">{title}</h3>
        <p className="text-base font-normal leading-6 text-ink line-clamp-3">{description}</p>
        <Link 
          href={ctaLink}
          className="inline-flex items-center gap-1 text-primary text-sm font-semibold leading-5 hover:text-primary-hover transition-colors mt-1"
        >
          {ctaLabel}
          <ChevronRight size={14} className="stroke-[3]" />
        </Link>
      </div>
    </div>
  );
}
