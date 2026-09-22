import React from "react";
import Section from "@/components/ui/Section/Section";
import Container from "@/components/ui/Container/Container";
import IndustryCard from "../IndustryCard/IndustryCard";
import IndustryCardsHeader from "./IndustryCardsHeader";
import type { IndustryCardsSectionProps } from "./IndustryCardsSection.types";
import { getLucideIcon } from "@/lib/utils/icons";



export default function IndustryCardsSection({
  eyebrow,
  title,
  description,
  cards,
  headerLayout = "default",
}: Readonly<IndustryCardsSectionProps>) {
  return (
    <Section background="white" spacing="none">
      <Container width="narrow" className="max-w-310">
        <IndustryCardsHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          headerLayout={headerLayout}
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-space-24">
          {cards.map((card) => {
            return (
              <IndustryCard
                key={card.id}
                icon={React.createElement(getLucideIcon(card.iconName), { className: "w-space-16 h-space-16 md:w-10 md:h-10 text-primary" })}
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
