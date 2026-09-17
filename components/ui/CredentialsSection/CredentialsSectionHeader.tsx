export type CredentialsSectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function CredentialsSectionHeader({
  eyebrow,
  title,
  subtitle,
}: CredentialsSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-space-16 lg:gap-space-24 w-full">
      <p className="text-page-hero-eyebrow text-brand-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="text-section-title text-ink w-full">
        {title}
      </h2>
      <p className="text-section-subtitle text-ink-muted w-full">
        {subtitle}
      </p>
    </div>
  );
}
