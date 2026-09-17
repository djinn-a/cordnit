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
    <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-end gap-space-24 lg:gap-[94px] w-full">
      <div className="flex flex-col gap-space-16 w-full lg:max-w-[700px]">
        <p className="text-page-hero-eyebrow text-brand-primary uppercase">
          {eyebrow}
        </p>
        <h2 className="text-section-title text-ink">
          {title}
        </h2>
      </div>
      <div className="w-full lg:max-w-[500px]">
        <p className="text-section-subtitle text-ink-muted">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
