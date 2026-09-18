import Image from "next/image";

export type WhyChooseCardData = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type WhyChooseCardProps = {
  card: WhyChooseCardData;
};

export default function WhyChooseCard({ card }: WhyChooseCardProps) {
  return (
    <div className="relative flex flex-col items-center bg-surface w-full sm:w-[172px] lg:w-full lg:max-w-[380px] h-[217px] lg:h-[422px] overflow-hidden rounded-[16px] lg:rounded-[20px] shadow-sm hover:shadow-md transition-shadow duration-300 mx-auto">
      <div className="flex flex-col items-center p-[12px] lg:p-0 lg:pt-[48px] lg:px-space-24 gap-[8px] lg:gap-space-24 w-full relative z-10 h-full">
        <h3 className="text-base font-semibold lg:text-card-title lg:font-bold text-ink text-center w-full max-w-[280px]">
          {card.title}
        </h3>
        <p className="text-card-desc-mobile lg:text-section-subtitle text-[#555555] text-center w-full">
          {card.description}
        </p>
      </div>

      {/* Illustration Area positioned bottom-right */}
      <div className="absolute -bottom-4 -right-4 lg:-bottom-8 lg:-right-8 w-[90px] h-[90px] lg:w-[180px] lg:h-[180px] sm:w-[120px] sm:h-[120px] z-0 pointer-events-none">
        <div className="relative w-full h-full rounded-full bg-brand-primary/10 flex items-center justify-center">
          <div className="relative w-[50%] h-[50%]">
            <Image
              src={card.image}
              alt={card.imageAlt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
