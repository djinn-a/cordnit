import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { ArrowRight } from "lucide-react";
import { ContentMediaSectionProps } from "./ContentMediaSection.types";

export default function ContentMediaText({
  eyebrow,
  title,
  description,
  cta,
}: Readonly<Pick<ContentMediaSectionProps, "eyebrow" | "title" | "description" | "cta">>) {
  return (
    <div className="flex flex-col w-full lg:w-[48%]">
      {eyebrow && (
        <span className="text-eyebrow-mobile leading-[16px] md:text-eyebrow-desktop md:leading-none uppercase tracking-[1px] text-primary mb-space-8 md:mb-space-16">
          {eyebrow}
        </span>
      )}
      
      <h2 className="text-section-title-mobile leading-[32px] md:text-hero-header-eb md:leading-[70px] text-ink mb-space-12 md:mb-space-20 text-balance md:max-w-[18ch] lg:max-w-[20ch]">
        {title}
      </h2>
      
      <p className="text-section-subtitle-mobile md:text-section-subtitle text-ink-muted mb-0 md:mb-space-20">
        {description}
      </p>
      
      {cta && (
        <div className="mt-space-12 md:mt-space-20">
          <Link href={cta.href}>
            <Button 
              variant="primary" 
              className="w-fit h-space-48 rounded-lg px-space-24 py-space-12 text-[16px] font-semibold leading-[24px]"
              rightIcon={<ArrowRight size={16} />}
            >
              {cta.label}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
