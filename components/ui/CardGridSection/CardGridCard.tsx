import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type CardGridItem = {
  id: string;
  code: string;
  category: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  featured?: boolean;
};

type CardGridCardProps = {
  card: CardGridItem;
};

export default function CardGridCard({ card }: CardGridCardProps) {
  return (
    <Link
      href={card.href}
      className={cn(
        "group relative flex flex-col min-h-[190px] h-full w-full max-w-[286px] rounded-card-grid border p-[16px] transition-all duration-300 mx-auto",
        "bg-surface border-border-card",
        "hover:bg-primary-pale hover:border-transparent hover:shadow-card-active"
      )}
    >
      {/* Metadata Row */}
      <div className="flex justify-between items-center w-full mb-space-24 lg:mb-[56px]">
        <span className="text-link-card-mobile lg:text-card-desc text-brand-primary">{card.code}</span>
        <span className="text-link-card-mobile lg:text-card-desc text-brand-primary uppercase">
          {card.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-[16px] font-semibold lg:text-card-title-desktop text-ink mb-space-8">{card.title}</h3>
        <p className="text-card-desc-mobile lg:text-card-desc text-ink-muted mb-space-16 lg:mb-space-24 flex-grow leading-relaxed">
          {card.description}
        </p>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-space-8 text-link-mobile text-brand-primary group-hover:text-primary-hover transition-colors mt-auto">
          {card.ctaLabel}
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
