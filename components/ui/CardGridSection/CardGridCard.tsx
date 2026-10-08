import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Cta } from "@/lib/cta";
import CtaButton from "@/components/ui/Button/CtaButton";

export type CardGridItem = {
  id: string;
  code: string;
  category: string;
  title: string;
  description: string;
  cta: Cta;
  featured?: boolean;
};

type CardGridCardProps = {
  card: CardGridItem;
};

export default function CardGridCard({ card }: Readonly<CardGridCardProps>) {
  return (
    <article
      className={cn(
        "group relative flex flex-col min-h-47.5 h-full w-full max-w-71.5 rounded-card-grid border p-space-12 lg:p-[30.597px_24px] transition-all duration-300 mx-auto",
        "bg-surface border-border-card",
        "hover:bg-primary-pale hover:border-transparent hover:shadow-card-active focus-within:shadow-card-active"
      )}
    >
      {/* Metadata Row */}
      <div className="flex justify-between items-center w-full mb-space-24 lg:mb-space-56">
        <span className="text-ink-muted text-stat-desc-mobile tracking-[0.6px] lg:text-card-desc lg:text-brand-primary">{card.code}</span>
        <span className="text-ink-muted text-stat-desc-mobile tracking-[0.6px] lg:text-card-desc lg:text-brand-primary uppercase">
          {card.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col grow">
        <h3 className="text-[16px] font-semibold lg:text-card-title-desktop text-ink mb-space-8">{card.title}</h3>
        <p className="text-card-desc-mobile lg:text-card-desc text-ink-muted mb-space-16 lg:mb-space-24 grow leading-relaxed">
          {card.description}
        </p>

        {/* Stretched CTA: its ::after covers the card so the whole card is clickable. */}
        <CtaButton
          cta={card.cta}
          variant="link"
          ctaLocation="card-grid"
          className="mt-auto !px-0 gap-space-8 font-normal text-card-desc-mobile lg:text-link-mobile text-brand-primary group-hover:text-primary-hover after:absolute after:inset-0 after:rounded-card-grid after:content-['']"
          rightIcon={<ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />}
        />
      </div>
    </article>
  );
}
