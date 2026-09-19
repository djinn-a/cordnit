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
  | "contactForm"
  | "cybersecurityHero"
  | "cybersecuritySplitContent"
  | "cardGridSection"
  | "credentialsSection"
  | "processSection"
  | "splitActionCards"
  | "whyChooseSection"
  | "salesforceHero"
  | "salesforceSplitContent"
  | "salesforceCredentials"
  | "salesforceCapabilities"
  | "salesforceApproach"
  | "salesforceSpecialists"
  | "salesforceWhyChoose"
  | "aiAutomationHero"
  | "aiAutomationSplitContent"
  | "aiAutomationCredentials"
  | "aiAutomationApproach"
  | "aiAutomationSpecialists"
  | "aiAutomationWhyChoose"
  | "aiAutomationWhereWeHelp"
  | "solutionsHero"
  | "solutionsCapabilities"
  | "solutionsDelivery"
  | "solutionsCombination"
  | "cloudInfrastructureHero";

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
