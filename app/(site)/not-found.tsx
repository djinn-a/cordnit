import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

const ctaClass = {
  primary:
    "bg-primary hover:bg-primary-hover text-white border border-transparent shadow-sm",
  outline:
    "bg-white border border-border-subtle text-ink hover:border-primary hover:text-primary",
} as const;

const ctaBase =
  "inline-flex items-center justify-center gap-1.5 sm:gap-2 font-medium transition-colors whitespace-nowrap px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-btn text-[16px] font-semibold leading-[24px]";

export default function NotFound() {
  return (
    <Section
      spacing="md"
      className="grow flex items-center py-16 sm:py-24 lg:py-2"
    >
      <Container>
        <div className="mx-auto w-full max-w-media-wrap flex flex-col items-center text-center gap-space-24">
          <h1 className="text-cta-title-mobile md:text-split-section-title text-primary">
            Page not found
          </h1>
          <Image
            src="/error/error_404.svg"
            alt="A robot surrounded by the numbers 404"
            width={546}
            height={130}
            className="h-auto w-full max-w-media-wrap"
            priority
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
