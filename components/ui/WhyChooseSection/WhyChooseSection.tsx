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

export default function WhyChooseSection({
  data,
}: WhyChooseSectionProps) {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-brand-primary/10">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-space-32 px-4 pb-space-60 pt-space-24 min-[758px]:px-space-24 lg:gap-space-64 lg:px-space-100 lg:py-space-60">
        <WhyChooseSectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
        />

        <div className="grid grid-cols-2 gap-x-space-12 gap-y-space-24 min-[758px]:grid-cols-3 min-[758px]:gap-x-space-24 min-[758px]:gap-y-space-32 lg:gap-x-space-36">
  {data.cards.map((card) => (
    <WhyChooseCard key={card.id} card={card} />
  ))}
</div>
      </div>
    </section>
  );
}