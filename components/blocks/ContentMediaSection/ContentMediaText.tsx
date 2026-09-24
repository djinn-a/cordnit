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
    <div className="flex flex-col w-full lg:w-[50%]">
      {eyebrow && (
        <span className="text-eyebrow-mobile leading-space-16 md:text-eyebrow-desktop md:leading-none uppercase tracking-space-1 text-primary mb-space-8 md:mb-space-16">
          {eyebrow}
        </span>
      )}
      
      <h2 className="text-section-title-mobile md:text-hero-header-eb text-ink mb-space-8 md:mb-space-20 whitespace-pre-line">
        {title}
      </h2>
      
      <p className="text-section-subtitle-mobile leading-space-22 md:text-section-subtitle text-ink-muted mb-0 md:mb-space-20">
        {description}
      </p>
      
      {cta && (
        <div className="mt-space-12 md:mt-space-20">
          <Link href={cta.href}>
            <Button 
              variant="primary" 
              className="w-fit h-10.5 md:h-space-48 rounded-lg px-space-16 py-space-10 md:px-space-24 md:py-space-12 text-[14px] md:text-[16px] font-semibold leading-space-22 md:leading-space-24"
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
