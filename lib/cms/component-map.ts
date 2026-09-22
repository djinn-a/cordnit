import type { SectionComponent, SectionType } from "./types";
//import PageHero from "@/components/ui/PageHero/PageHero";
//import SplitContentSection from "@/components/ui/SplitContentSection/SplitContentSection";
import { WhyChooseSection } from "@/components/ui/WhyChooseSection";

import HeroSection from "@/components/features/home/HeroSection/HeroSection";
import HelpSection from "@/components/features/home/HelpSection/HelpSection";
import InsightsSection from "@/components/features/home/InsightsSection/InsightsSection";
import MethodologySection from "@/components/features/home/MethodologySection/MethodologySection";
import RecognitionSection from "@/components/features/home/RecognitionSection/RecognitionSection";
import TestimonialsSection from "@/components/features/home/TestimonialsSection/TestimonialsSection";
import CtaSection from "@/components/features/home/CtaSection/CtaSection";
import AboutHero from "@/components/features/about/AboutHero/AboutHero";
import AboutContent from "@/components/features/about/AboutContent/AboutContent";
import AboutPrinciples from "@/components/features/about/AboutPrinciples/AboutPrinciples";
import AboutTeam from "@/components/features/about/AboutTeam/AboutTeam";
import ContactHero from "@/components/features/contact/ContactHero/ContactHero";
import ContactFormSection from "@/components/features/contact/ContactFormSection/ContactFormSection";
import ContentMediaSection from "@/components/features/shared/ContentMediaSection/ContentMediaSection";
import ContextApproachSection from "@/components/features/shared/ContextApproachSection/ContextApproachSection";
import PerspectiveSection from "@/components/features/shared/PerspectiveSection/PerspectiveSection";
import ContentInsights from "@/components/features/shared/ContentInsights/ContentInsights";
import IndustryCardsSection from "@/components/features/shared/IndustryCardsSection/IndustryCardsSection";
import { CybersecurityHero } from "@/components/features/cybersecurity/CybersecurityHero";
import { CybersecuritySplitContent } from "@/components/features/cybersecurity/CybersecuritySplitContent";
import { CardGridSection, CredentialsSection, ProcessSection, SplitActionCardsSection, PageHero, Breadcrumb, SplitContentSection } from "@/components/ui";
import SolutionsHero from "@/components/features/solutions/SolutionsHero/SolutionsHero";
import SolutionsCapabilities from "@/components/features/solutions/SolutionsCapabilities/SolutionsCapabilities";
import SolutionsDelivery from "@/components/features/solutions/SolutionsDelivery/SolutionsDelivery";
import SolutionsCombination from "@/components/features/solutions/SolutionsCombination/SolutionsCombination";
/**
 * Maps CMS / page-document `_type` values to presentational section components.
 * Add a new section type here when introducing a new block — never hard-wire in page.tsx.
 */
import { CybersecurityWhyChoose } from "@/components/features/cybersecurity/CybersecurityWhyChoose";
import { SalesforceHero } from "@/components/features/salesforce/SalesforceHero";
import { SalesforceSplitContent } from "@/components/features/salesforce/SalesforceSplitContent";
import { SalesforceCredentials } from "@/components/features/salesforce/SalesforceCredentials";
import { SalesforceCapabilities } from "@/components/features/salesforce/SalesforceCapabilities";
import { SalesforceApproach } from "@/components/features/salesforce/SalesforceApproach";
import { SalesforceSpecialists } from "@/components/features/salesforce/SalesforceSpecialists";
import { SalesforceWhyChoose } from "@/components/features/salesforce/SalesforceWhyChoose";
import { AiAutomationHero } from "@/components/features/ai-automation/AiAutomationHero";
import { AiAutomationSplitContent } from "@/components/features/ai-automation/AiAutomationSplitContent";
import { AiAutomationCredentials } from "@/components/features/ai-automation/AiAutomationCredentials";
import { AiAutomationApproach } from "@/components/features/ai-automation/AiAutomationApproach";
import { AiAutomationSpecialists } from "@/components/features/ai-automation/AiAutomationSpecialists";
import { AiAutomationWhyChoose } from "@/components/features/ai-automation/AiAutomationWhyChoose";
import { AiAutomationWhereWeHelp } from "@/components/features/ai-automation/AiAutomationWhereWeHelp";
import { CloudInfrastructureHero } from "@/components/features/cloud-infrastructure/CloudInfrastructureHero";

import { DataSecurityOverview } from "@/components/features/shared/cybersecurity/DataSecurityOverview/DataSecurityOverview";

export const componentMap: Record<SectionType, SectionComponent> = {
  hero: HeroSection as SectionComponent,
  help: HelpSection as SectionComponent,
  insights: InsightsSection as SectionComponent,
  methodology: MethodologySection as SectionComponent,
  recognition: RecognitionSection as SectionComponent,
  testimonials: TestimonialsSection as SectionComponent,
  cta: CtaSection as SectionComponent,
  aboutHero: AboutHero as SectionComponent,
  aboutContent: AboutContent as SectionComponent,
  aboutPrinciples: AboutPrinciples as SectionComponent,
  aboutTeam: AboutTeam as SectionComponent,
  contactHero: ContactHero as SectionComponent,
  contactForm: ContactFormSection as SectionComponent,
  contentMedia: ContentMediaSection as unknown as SectionComponent,
  contextApproach: ContextApproachSection as unknown as SectionComponent,
  perspective: PerspectiveSection as unknown as SectionComponent,
  contentInsights: ContentInsights as unknown as SectionComponent,
  industryCards: IndustryCardsSection as unknown as SectionComponent,
  cybersecurityHero: CybersecurityHero as SectionComponent,
  cybersecuritySplitContent: CybersecuritySplitContent as SectionComponent,
  cardGridSection: CardGridSection as SectionComponent,
  credentialsSection: CredentialsSection as SectionComponent,
  processSection: ProcessSection as SectionComponent,
  splitActionCards: SplitActionCardsSection as SectionComponent,
  whyChooseSection: CybersecurityWhyChoose as SectionComponent,
  salesforceHero: SalesforceHero as SectionComponent,
  salesforceSplitContent: SalesforceSplitContent as SectionComponent,
  salesforceCredentials: SalesforceCredentials as SectionComponent,
  salesforceCapabilities: SalesforceCapabilities as SectionComponent,
  salesforceApproach: SalesforceApproach as SectionComponent,
  salesforceSpecialists: SalesforceSpecialists as SectionComponent,
  salesforceWhyChoose: SalesforceWhyChoose as SectionComponent,
  aiAutomationHero: AiAutomationHero as SectionComponent,
  aiAutomationSplitContent: AiAutomationSplitContent as SectionComponent,
  aiAutomationCredentials: AiAutomationCredentials as SectionComponent,
  aiAutomationApproach: AiAutomationApproach as SectionComponent,
  aiAutomationSpecialists: AiAutomationSpecialists as SectionComponent,
  aiAutomationWhyChoose: AiAutomationWhyChoose as SectionComponent,
  aiAutomationWhereWeHelp: AiAutomationWhereWeHelp as SectionComponent,
  solutionsHero: SolutionsHero as SectionComponent,
  solutionsCapabilities: SolutionsCapabilities as SectionComponent,
  solutionsDelivery: SolutionsDelivery as SectionComponent,
  solutionsCombination: SolutionsCombination as SectionComponent,
  cloudInfrastructureHero: CloudInfrastructureHero as SectionComponent,
  pageHero: PageHero as SectionComponent,
  splitContent: SplitContentSection as SectionComponent,
  whyChoose: WhyChooseSection as SectionComponent,
  breadcrumb: Breadcrumb as SectionComponent,
 // pageHero: PageHero as SectionComponent,
  splitContentSection: SplitContentSection as SectionComponent,
  dataSecurityOverview: DataSecurityOverview as SectionComponent,
};
