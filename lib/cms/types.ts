import type { ComponentType } from "react";

/** Every section type the renderer knows. Adding a type = add here + component-map + catalog. */
export const SECTION_TYPES = [
  "hero",
  "help",
  "insights",
  "methodology",
  "recognition",
  "testimonials",
  "cta",
  "aboutHero",
  "aboutContent",
  "aboutPrinciples",
  "aboutTeam",
  "contactHero",
  "contactForm",
  "contentMedia",
  "contextApproach",
  "perspective",
  "contentInsights",
  "industryCards",
  "cybersecurityHero",
  "cybersecuritySplitContent",
  "cardGridSection",
  "credentialsSection",
  "processSection",
  "splitActionCards",
  "whyChooseSection",
  "salesforceHero",
  "salesforceSplitContent",
  "salesforceCredentials",
  "salesforceCapabilities",
  "salesforceApproach",
  "salesforceSpecialists",
  "salesforceWhyChoose",
  "aiAutomationHero",
  "aiAutomationSplitContent",
  "aiAutomationCredentials",
  "aiAutomationApproach",
  "aiAutomationSpecialists",
  "aiAutomationWhyChoose",
  "aiAutomationWhereWeHelp",
  "solutionsHero",
  "solutionsCapabilities",
  "solutionsDelivery",
  "solutionsCombination",
  "cloudInfrastructureHero",
  "pageHero",
  "splitContent",
  "whyChoose",
  "breadcrumb",
  "splitContentSection",
  "dataSecurityOverview",
  "dataDiscovery",
  "authenticationGovernance",
  "lifecycleManagement",
  "secureDataOperations",
  "journeyStepsBlock",
  "leadQualificationBlock",
  "newsletter",
] as const;

export type SectionType = (typeof SECTION_TYPES)[number];

const SECTION_TYPE_SET: ReadonlySet<string> = new Set(SECTION_TYPES);

export function isSectionType(value: unknown): value is SectionType {
  return typeof value === "string" && SECTION_TYPE_SET.has(value);
}

export type SectionComponent = ComponentType<Record<string, unknown>>;
