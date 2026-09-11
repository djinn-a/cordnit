import type { ComponentType } from "react";

/** Discriminated section types for the page document model (static today, CMS tomorrow). */
export type SectionType =
  | "hero"
  | "help"
  | "insights"
  | "methodology"
  | "recognition"
  | "testimonials"
  | "cta"
  | "aboutHero"
  | "aboutContent"
  | "aboutPrinciples"
  | "aboutTeam"
  | "contactHero"
  | "contactForm";

export type LayoutType = "default" | "contact";

export type BaseSection = {
  _type: SectionType;
  _key: string;
};

export type PageSection = BaseSection & Record<string, unknown>;

export type PageDocument = {
  slug: string;
  title: string;
  layout: LayoutType;
  sections: PageSection[];
  seo?: {
    title?: string;
    description?: string;
  };
};

export type SectionComponent = ComponentType<Record<string, unknown>>;
