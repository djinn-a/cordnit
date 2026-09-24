import { Container, Section, SectionHeader } from "@/components/ui";

export type ContactHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function ContactHero({
  eyebrow = "LET'S TALK",
  title = "Tell us what you’re building.",
  description = "Whether you’re looking to modernise your technology, strengthen security, adopt AI orbuild a new digital solution, tell us what you’re working on. Our team will connect you with the right specialists.",
  imageSrc = "/contact-hero-bg.webp",
  imageAlt = "Cordinit Office Contact",
}: ContactHeroProps = {}) {
  return (
    <Section spacing="none" className="">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-16 items-center">
          <div className="w-full lg:w-[42%] flex flex-col items-center md:items-start text-center md:text-left">
            <SectionHeader
              eyebrow={eyebrow}
              eyebrowClassName="lg:text-eyebrow-desktop"
              title={title}
              titleAs="h1"
              subtitle={description}
              align="left"
              className="items-center md:items-start text-center md:text-left"
              titleClassName="mb-6 max-md:!text-[24px]"
              subtitleClassName="text-section-subtitle-mobile md:text-section-subtitle text-ink-muted max-md:!text-[14px]"
            />
          </div>

          <div className="w-full lg:w-[55%] relative flex justify-end mt-2 lg:mt-0">
            <div className="relative w-full h-[238px] md:h-[500px] lg:h-[420px] xl:h-[460px] rounded-card-lg overflow-hidden shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
