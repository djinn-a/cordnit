import { Container, Section } from "@/components/ui";
import { defaultHeroContent, type HeroContent as HeroContentType } from "./heroContent";
import HeroHeading from "./HeroHeading";
import HeroMedia from "./HeroMedia";
import HeroOverlayCard from "./HeroOverlayCard";

export type HeroSectionProps = Partial<HeroContentType>;

export default function HeroSection(props: HeroSectionProps = {}) {
  const content = { ...defaultHeroContent, ...props };

  return (
    <Section 
      spacing="none" 
      background="transparent" 
      className="pt-12 xs:pt-14 sm:pt-16 pb-6 sm:pb-16 md:pb-20 lg:pb-24"
    >
      <Container className="flex flex-col items-center">
        <HeroHeading 
          eyebrow={content.eyebrow}
          titleDesktop={content.titleDesktop}
        />

        <HeroMedia 
          imageSrc={content.imageSrc}
          imageAlt={content.imageAlt}
        >
          <HeroOverlayCard 
            cardEyebrow={content.cardEyebrow}
            cardTitle={content.cardTitle}
            cardBody={content.cardBody}
            primaryCta={content.primaryCta}
            secondaryCta={content.secondaryCta}
          />
        </HeroMedia>
      </Container>
    </Section>
  );
}
