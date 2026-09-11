import { Container, Section, SectionHeader } from "@/components/ui";

export type ContactHeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function ContactHero({
  eyebrow = "CONTACT US",
  title = "Let's talk about what's next.",
  description = "Whether you are exploring an idea, tackling a technology challenge or looking for a long-term delivery partner, we would like to hear from you.",
  imageSrc = "/contact-hero-bg.png",
  imageAlt = "Cordinit Office Contact",
}: ContactHeroProps = {}) {
  return (
    <Section spacing="md" className="pt-2 pb-12 sm:pb-16 lg:pt-4 lg:pb-24">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-16 items-center">
          <div className="w-full lg:w-[42%] flex flex-col items-center md:items-start text-center md:text-left">
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              titleAs="h1"
              subtitle={description}
              align="left"
              className="items-center md:items-start text-center md:text-left"
              titleClassName="mb-6"
            />
          </div>

          <div className="w-full lg:w-[55%] relative flex justify-end mt-2 lg:mt-0">
            <div className="relative w-full h-[400px] xs:h-[450px] md:h-[500px] lg:h-[420px] xl:h-[460px] rounded-card-lg overflow-hidden shadow-xl">
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
