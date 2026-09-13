import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

export type UnderDevelopmentPageProps = {
  /** Optional label for which section is unfinished (e.g. "Solutions"). */
  pageLabel?: string;
};

const ctaClass = {
  primary:
    "bg-primary hover:bg-primary-hover text-white border border-transparent shadow-sm",
  outline:
    "bg-white border border-border-subtle text-ink hover:border-primary hover:text-primary",
} as const;

const ctaBase =
  "inline-flex items-center justify-center gap-1.5 sm:gap-2 font-medium transition-colors whitespace-nowrap px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-btn text-[16px] font-semibold leading-[24px]";

export default function UnderDevelopmentPage({
  pageLabel,
}: UnderDevelopmentPageProps) {
  const title = pageLabel
    ? `${pageLabel} is under development`
    : "This page is under development";

  return (
    <Section
      spacing="md"
      className="flex-grow flex items-center py-16 sm:py-24 lg:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-8">
          <SectionHeader
            eyebrow="COMING SOON"
            title={title}
            titleAs="h1"
            subtitle="We're building this page now. In the meantime, explore what we already have live or get in touch."
            align="center"
            className="items-center text-center"
          />

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/" className={cn(ctaBase, ctaClass.primary)}>
              Home
            </Link>
            <Link href="/aboutus" className={cn(ctaBase, ctaClass.outline)}>
              About
            </Link>
            <Link href="/contactus" className={cn(ctaBase, ctaClass.outline)}>
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
