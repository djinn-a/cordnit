import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IndustryCardProps } from "./IndustryCard.types";

export default function IndustryCard({
  icon,
  title,
  description,
  ctaLabel,
  ctaLink,
}: Readonly<IndustryCardProps>) {
  return (
    <div className="flex flex-col p-4 md:p-8 bg-grad-3 border border-border-card rounded-lg backdrop-blur-[20px]">
      <div className="flex flex-col gap-3">
        {icon}
        <h3 className="text-[14px] font-bold leading-5.5 md:text-2xl md:font-semibold md:leading-8 text-ink">{title}</h3>
        <p className="text-[12px] font-normal leading-4 md:text-base md:leading-6 text-ink line-clamp-3">{description}</p>
        <Link 
          href={ctaLink}
          className="inline-flex items-center gap-1 text-primary text-[10px] font-semibold leading-3.5 md:text-sm md:leading-5 hover:text-primary-hover transition-colors mt-1"
        >
          {ctaLabel}
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
}
