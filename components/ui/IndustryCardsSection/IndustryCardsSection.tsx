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
  headerLayout = "default",
}: Readonly<IndustryCardsSectionProps>) {
  const renderHeader = () => {
    if (headerLayout === "horizontal" && (title || description)) {
      return (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-12">
          {title && (
            <h2 className="text-[24px] font-extrabold leading-[32px] md:text-[48px] md:leading-[68px] text-ink mb-3 md:mb-0 md:w-[48%] shrink-0">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[14px] leading-[22px] md:text-[20px] md:leading-[28px] font-normal text-ink-muted md:w-[48%] mt-0 md:mt-1">
              {description}
            </p>
          )}
        </div>
      );
    }

    if (eyebrow || title || description) {
      return (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={description}
          className="mb-12"
          titleClassName="text-[24px] font-extrabold leading-[32px] md:text-[48px] md:leading-[68px] text-ink"
        />
      );
    }

    return null;
  };

  return (
    <Section background="white" spacing="none" className="py-20 md:px-15">
      <Container>
        {renderHeader()}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const IconComponent = (LucideIcons[card.iconName as keyof typeof LucideIcons] as LucideIcons.LucideIcon) || LucideIcons.Circle;
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
