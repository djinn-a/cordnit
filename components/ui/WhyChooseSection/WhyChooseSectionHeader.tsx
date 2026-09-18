export type WhyChooseSectionHeaderProps = {
  eyebrow: string;
  title: string;
};

export default function WhyChooseSectionHeader({ eyebrow, title }: WhyChooseSectionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-space-16 w-full max-w-[568px] text-center mx-auto">
      <h2 className="text-eyebrow-mobile lg:text-page-hero-eyebrow text-brand-primary uppercase tracking-wider">
        {eyebrow}
      </h2>
      <h3 className="text-section-title-mobile lg:text-split-section-title text-ink break-words whitespace-pre-wrap">
        {title}
      </h3>
    </div>
  );
}
