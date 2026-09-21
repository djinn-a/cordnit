import Image from "next/image";

export type ActionCardData = {
  id: string;
  imageSrc: string;
  category: string;
  label?: string;
  title: string;
  description: string;
  metadata?: string;
};

export type ActionCardProps = {
  card: ActionCardData;
};

export default function ActionCard({ card }: Readonly<ActionCardProps>) {
  return (
    <div className="flex flex-row items-center gap-[12px] sm:gap-[20px] px-[12px] pb-[12px] pt-space-20 sm:p-[16px] w-full sm:h-[180px] bg-[#E9EFFF] rounded-[13px] border border-white overflow-hidden">
      {/* Image Container */}
      <div className="w-[84px] h-[84px] sm:w-[220px] sm:h-[148px] relative rounded-[12px] overflow-hidden flex-shrink-0">
        <Image
          src={card.imageSrc}
          alt={card.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center sm:justify-between flex-grow w-full h-full self-stretch sm:py-1">
        <div className="flex flex-col gap-space-4 sm:gap-space-8 w-full">
          {/* Header Row */}
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-card-detail-mobile sm:text-about-eyebrow-desktop lg:text-link-card-mobile text-brand-primary uppercase leading-tight">
              {card.category}
            </p>
            {card.label && (
              <p className="text-[8px] sm:text-[10px] md:text-about-eyebrow-desktop font-medium text-ink-muted uppercase leading-tight">
                {card.label}
              </p>
            )}
          </div>
          
          {/* Title and Description */}
          <div className="flex flex-col gap-[2px] sm:gap-space-4">
            <h4 className="text-section-title-head-mobile sm:text-help-card-title-desktop lg:text-link-desktop text-ink leading-tight">
              {card.title}
            </h4>
            <p className="text-[10px] sm:text-card-desc-mobile md:text-card-desc lg:text-card-desc-mobile text-ink-muted leading-tight">
              {card.description}
            </p>
          </div>
        </div>

        {/* Metadata */}
        {card.metadata && (
          <div className="mt-[4px] sm:mt-auto sm:pt-space-8">
            <p className="text-[8px] sm:text-card-desc-mobile text-ink-muted leading-tight">
              {card.metadata}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
