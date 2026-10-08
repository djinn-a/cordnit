export type WhyChooseSectionHeaderProps = {
  eyebrow: string;
  title: string;
};

export default function WhyChooseSectionHeader({
  eyebrow,
  title,
}: WhyChooseSectionHeaderProps) {
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-space-16 text-center">
      <h2 className="text-eyebrow-mobile uppercase tracking-wider text-brand-primary lg:text-page-hero-eyebrow">
        {eyebrow}
      </h2>

      <h3 className="w-full max-w-142 text-balance text-section-title-mobile text-ink lg:max-w-190 lg:text-split-section-title">
        {title}
      </h3>
    </div>
  );
}