import type { Cta } from "@/lib/cta";

export interface IndustryCardData {
  id: string;
  iconName: string;
  title: string;
  description: string;
  cta: Cta;
}

export interface IndustryCardsSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  cards: IndustryCardData[];
  headerLayout?: "default" | "horizontal";
}
