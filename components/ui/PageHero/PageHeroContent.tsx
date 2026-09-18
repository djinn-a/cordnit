import Button from "@/components/ui/Button/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { PageHeroData } from "./PageHero";

type PageHeroContentProps = Omit<PageHeroData, "image">;

export default function PageHeroContent({
  eyebrow,
  title,
  description,
  cta,
}: PageHeroContentProps) {
  return (
    <div className="flex flex-col items-start text-left">
      <p className="text-eyebrow-mobile md:text-page-hero-eyebrow uppercase text-primary mb-space-16">{eyebrow}</p>
      
      <h1 className="text-section-title-mobile md:text-page-hero-title text-black mb-space-20">
        {title}
      </h1>

      <p className="text-section-subtitle-mobile md:text-page-hero-subtitle max-w-[1024px] text-ink-muted mb-space-24">
        {description}
      </p>

      {cta.href ? (
        <Link href={cta.href}>
          <Button 
            variant="primary" 
            size="md" 
            rightIcon={<ArrowRight className="w-4 h-4 ml-2" />}
          >
            {cta.label}
          </Button>
        </Link>
      ) : (
        <Button 
          variant="primary" 
          size="md" 
          rightIcon={<ArrowRight className="w-4 h-4 ml-2" />}
        >
          {cta.label}
        </Button>
      )}
    </div>
  );
}
