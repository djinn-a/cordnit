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

export default function CardGridSection({ data }: Readonly<CardGridSectionProps>) {
  return (
    <section className="w-full">
      <div className="mx-auto w-full flex flex-col gap-space-24 lg:gap-space-64">
        {/* Header - Stacked on Mobile, Split on Desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-24 lg:gap-space-40 w-full h-full">
          <div className="flex flex-col w-full lg:max-w-176 gap-space-16 lg:gap-space-20">
            <p className="text-eyebrow-mobile lg:text-page-hero-eyebrow text-brand-primary uppercase tracking-wider">
              {data.eyebrow}
            </p>
            <h2 className="text-section-title-mobile lg:text-section-title text-ink">
              {data.title}
            </h2>
          </div>
          <div className="w-full lg:max-w-125 lg:mt-auto flex flex-col justify-end">
            <p className="text-section-subtitle-mobile lg:text-section-subtitle text-ink-muted">
              {data.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-space-12 gap-y-space-32 lg:gap-space-24 w-full">
          {data.cards.map((card) => (
            <div key={card.id} className="w-43.25 lg:w-[calc(25%-18px)] flex justify-center">
              <CardGridCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
