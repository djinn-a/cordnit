import { Container, Section } from "@/components/ui";
import { aboutHeroData } from "./aboutHeroData";
import AboutHeroContent from "./AboutHeroContent";

export type AboutHeroProps = {
  title?: string;
  bodyMobile?: string;
  bodyDesktop?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function AboutHero({
  title = aboutHeroData.title,
  bodyMobile = aboutHeroData.bodyMobile,
  bodyDesktop = aboutHeroData.bodyDesktop,
  imageSrc = aboutHeroData.imageSrc,
  imageAlt = aboutHeroData.imageAlt,
}: AboutHeroProps = {}) {
  return (
    <Section spacing="sm" className="py-8">
      <Container>
        <div className="sm:hidden text-center mb-6">
          <h2 className="text-h2">
            {title.split("made more").map((part, index) =>
              index === 0 ? (
                <span key={index}>
                  {part}
                  <br />
                </span>
              ) : (
                <span key={index}>made more{part}</span>
              )
            )}
          </h2>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-[420px] xs:h-[480px] sm:h-[500px] md:h-[550px] lg:h-[650px]">
          <div className="absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/20" />
          </div>

          <AboutHeroContent
            title={title}
            bodyMobile={bodyMobile}
            bodyDesktop={bodyDesktop}
          />
        </div>
      </Container>
    </Section>
  );
}
