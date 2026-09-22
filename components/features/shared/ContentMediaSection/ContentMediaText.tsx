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
        <span className="text-eyebrow-mobile leading-4 md:text-eyebrow-desktop md:leading-none uppercase tracking-[1px] text-primary mb-2 md:mb-space-16">
          {eyebrow}
        </span>
      )}
      
      <h2 className="text-section-title-mobile leading-8 md:text-hero-header-eb md:leading-[70px] text-ink mb-3 md:mb-5 text-balance md:max-w-[18ch] lg:max-w-[20ch]">
        {title}
      </h2>
      
      <p className="text-section-subtitle-mobile md:text-section-subtitle text-ink-muted mb-0 md:mb-5">
        {description}
      </p>
      
      {cta && (
        <div className="mt-3 md:mt-5">
          <Link href={cta.href}>
            <Button 
              variant="primary" 
              className="w-fit h-12 rounded-lg px-6 py-3 text-[16px] font-semibold leading-[24px]"
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
