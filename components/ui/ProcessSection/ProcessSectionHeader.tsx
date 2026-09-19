export type ProcessSectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function ProcessSectionHeader({
  eyebrow,
  title,
  subtitle,
}: ProcessSectionHeaderProps) {
  return (
    <div className="flex flex-col w-full gap-space-16">
      {eyebrow && (
        <p className="text-eyebrow-mobile lg:text-page-hero-eyebrow text-brand-primary uppercase tracking-wider">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-col lg:flex-row items-start gap-space-24 lg:gap-[27px] w-full">
        <div className="w-full lg:w-162.5 xl:w-175 lg:flex-none">
          <h2 className="text-section-title-mobile lg:text-section-title text-ink">
            {title}
          </h2>
        </div>
        <div className="w-full lg:w-auto lg:flex-1 lg:max-w-[500px] lg:mt-[47px]">
          <p className="text-section-subtitle-mobile lg:text-section-subtitle text-ink-muted">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
