import Section from "../Section/Section";
import Container from "../Container/Container";
import SectionHeader from "../SectionHeader/SectionHeader";
import IndustryCard from "../IndustryCard/IndustryCard";
import type { IndustryCardsSectionProps } from "./IndustryCardsSection.types";
import * as LucideIcons from "lucide-react";

export default function IndustryCardsSection({
  eyebrow,
  title,
  description,
  cards,
}: IndustryCardsSectionProps) {
  return (
    <Section background="white" spacing="md">
      <Container>
        {(eyebrow || title || description) && (
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={description}
            className="mb-12"
            titleClassName="text-[24px] font-extrabold leading-[32px] md:text-[48px] md:leading-[68px] text-ink"
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const IconComponent = (LucideIcons as any)[card.iconName] || LucideIcons.Circle;
            return (
              <IndustryCard
                key={card.id}
                icon={<IconComponent size={32} className="text-primary" />}
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
