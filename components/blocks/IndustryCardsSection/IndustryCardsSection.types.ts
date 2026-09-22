export interface IndustryCardData {
  id: string;
  iconName: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface IndustryCardsSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  cards: IndustryCardData[];
  headerLayout?: "default" | "horizontal";
}
