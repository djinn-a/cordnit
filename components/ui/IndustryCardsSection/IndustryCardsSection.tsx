import Section from "../Section/Section";
import Container from "../Container/Container";
import IndustryCard from "../IndustryCard/IndustryCard";
import IndustryCardsHeader from "./IndustryCardsHeader";
import type { IndustryCardsSectionProps } from "./IndustryCardsSection.types";
import { getLucideIcon } from "../../../lib/utils/icons";



export default function IndustryCardsSection({
  eyebrow,
  title,
  description,
  cards,
  headerLayout = "default",
}: Readonly<IndustryCardsSectionProps>) {
  return (
    <Section background="white" spacing="none" className="py-20">
      <Container width="narrow" className="max-w-310">
        <IndustryCardsHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          headerLayout={headerLayout}
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const IconComponent = getLucideIcon(card.iconName);
            
            return (
              <IndustryCard
                key={card.id}
                icon={<IconComponent className="w-4 h-4 md:w-10 md:h-10 text-primary" />}
                title={card.title}
                description={card.description}
                ctaLabel={card.ctaLabel}
                ctaLink={card.ctaLink}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
