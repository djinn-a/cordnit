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

export default function ActionCard({ card }: ActionCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-[20px] p-[16px] w-full sm:h-[180px] bg-[#E9EFFF] rounded-[13px] border border-white overflow-hidden">
      {/* Image Container */}
      <div className="w-full sm:w-[220px] h-[140px] sm:h-[148px] relative rounded-[12px] overflow-hidden flex-shrink-0">
        <Image
          src={card.imageSrc}
          alt={card.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-grow w-full h-full self-stretch py-1">
        <div className="flex flex-col gap-space-8 w-full">
          {/* Header Row */}
          <div className="flex items-center justify-between w-full">
            <p className="text-about-eyebrow-desktop text-brand-primary uppercase">
              {card.category}
            </p>
            {card.label && (
              <p className="text-[10px] sm:text-about-eyebrow-desktop font-medium text-ink-muted uppercase">
                {card.label}
              </p>
            )}
          </div>
          
          {/* Title and Description */}
          <div className="flex flex-col gap-space-4">
            <h4 className="text-help-card-title-desktop text-ink">
              {card.title}
            </h4>
            <p className="text-card-desc-mobile sm:text-card-desc text-ink-muted">
              {card.description}
            </p>
          </div>
        </div>

        {/* Metadata */}
        {card.metadata && (
          <div className="mt-space-16 sm:mt-auto pt-space-8">
            <p className="text-card-desc-mobile text-ink-muted">
              {card.metadata}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
