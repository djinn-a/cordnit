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
      <p className="text-page-hero-eyebrow uppercase text-primary mb-[16px]">{eyebrow}</p>
      
      <h1 className="text-page-hero-title text-black mb-[20px]">
        {title}
      </h1>

      <p className="text-page-hero-subtitle max-w-[1024px] text-ink-muted mb-[20px]">
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
