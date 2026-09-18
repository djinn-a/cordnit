import WhyChooseSectionHeader from "./WhyChooseSectionHeader";
import WhyChooseCard, { type WhyChooseCardData } from "./WhyChooseCard";

export type WhyChooseSectionData = {
  eyebrow: string;
  title: string;
  cards: WhyChooseCardData[];
};

export type WhyChooseSectionProps = {
  data: WhyChooseSectionData;
};

export default function WhyChooseSection({ data }: WhyChooseSectionProps) {
  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 bg-brand-primary/10">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-space-24 lg:px-space-100 pt-space-24 pb-space-60 lg:py-space-60 flex flex-col gap-space-32 lg:gap-space-64">
        <WhyChooseSectionHeader eyebrow={data.eyebrow} title={data.title} />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-[12px] gap-y-space-24 lg:gap-x-space-36 lg:gap-y-space-32 justify-items-center">
          {data.cards.map((card) => (
            <WhyChooseCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
