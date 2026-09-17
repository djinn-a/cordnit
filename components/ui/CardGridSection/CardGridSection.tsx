import CardGridCard, { CardGridItem } from "./CardGridCard";

export type CardGridSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: CardGridItem[];
};

export type CardGridSectionProps = {
  data: CardGridSectionData;
};

export default function CardGridSection({ data }: CardGridSectionProps) {
  return (
    <section className="w-full">
      <div className="mx-auto w-full flex flex-col gap-space-64">
        {/* Header - Stacked on Mobile, Split on Desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-24 lg:gap-space-40 w-full h-full">
          <div className="flex flex-col w-full lg:max-w-[704px] gap-space-20">
            <p className="text-page-hero-eyebrow text-brand-primary uppercase">
              {data.eyebrow}
            </p>
            <h2 className="text-section-title text-ink">
              {data.title}
            </h2>
          </div>
          <div className="w-full lg:max-w-[500px] lg:mt-auto flex flex-col justify-end">
            <p className="text-section-subtitle text-ink-muted">
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-24 justify-items-center w-full">
          {data.cards.map((card) => (
            <CardGridCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
