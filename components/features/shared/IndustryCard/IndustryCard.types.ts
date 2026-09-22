import type { ReactNode } from "react";

export interface IndustryCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}
