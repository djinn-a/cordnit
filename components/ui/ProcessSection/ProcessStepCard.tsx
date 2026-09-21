import Image from "next/image";

export type ProcessStepItem = {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
};

export type ProcessStepCardProps = {
  step: ProcessStepItem;
};

export default function ProcessStepCard({ step }: ProcessStepCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-space-24 w-full max-w-[280px]">
      <div className="flex items-center justify-center w-[64px] h-[64px] flex-shrink-0 z-10 relative bg-surface">
        <Image
          src={step.iconSrc}
          alt={step.title}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-space-8 w-full">
        <h4 className="text-help-card-title-mobile lg:text-card-title-desktop lg:font-semibold text-ink">
          {step.title}
        </h4>
        <p className="text-help-card-desc-mobile lg:text-section-title-h text-ink-muted">
          {step.description}
        </p>
      </div>
    </div>
  );
}
