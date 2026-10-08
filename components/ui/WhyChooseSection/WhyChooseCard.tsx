import { Image } from '@/components/ui/Image';

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
      <div className="flex flex-col items-center px-space-8 py-space-12 sm:p-space-12 lg:p-0 lg:pt-space-24 lg:px-space-24 gap-space-8 lg:gap-space-24 w-full relative z-10 h-full">
        <h3 className="text-base tracking-tight sm:tracking-normal font-semibold lg:text-[32px] lg:leading-space-40 lg:font-bold text-ink text-center w-full max-w-[280px] lg:max-w-none">
          {card.title}
        </h3>
        <p className="text-card-desc-mobile lg:text-[20px] lg:leading-space-28 text-[#555555] text-center w-full">
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
              sizes="90px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
