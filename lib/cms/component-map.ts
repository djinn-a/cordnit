import type { SectionComponent, SectionType } from "./types";
import { WhyChooseSection } from "@/components/ui/WhyChooseSection";

import HeroSection from "@/components/features/home/HeroSection/HeroSection";
import HelpSection from "@/components/features/home/HelpSection/HelpSection";
import InsightsSection from "@/components/features/home/InsightsSection/InsightsSection";
import MethodologySection from "@/components/features/home/MethodologySection/MethodologySection";
import RecognitionSection from "@/components/features/home/RecognitionSection/RecognitionSection";
import TestimonialsSection from "@/components/features/home/TestimonialsSection/TestimonialsSection";
import { CtaSection } from "@/components/layout/CtaSection";
import AboutHero from "@/components/features/about/AboutHero/AboutHero";
import AboutContent from "@/components/features/about/AboutContent/AboutContent";
import AboutPrinciples from "@/components/features/about/AboutPrinciples/AboutPrinciples";
import AboutTeam from "@/components/features/about/AboutTeam/AboutTeam";
import ContactHero from "@/components/features/contact/ContactHero/ContactHero";
import ContactFormSection from "@/components/features/contact/ContactFormSection/ContactFormSection";
import ContentMediaSection from "@/components/blocks/ContentMediaSection/ContentMediaSection";
import ContextApproachSection from "@/components/blocks/ContextApproachSection/ContextApproachSection";
import PerspectiveSection from "@/components/blocks/PerspectiveSection/PerspectiveSection";
import ContentInsights from "@/components/blocks/ContentInsights/ContentInsights";
import IndustryCardsSection from "@/components/blocks/IndustryCardsSection/IndustryCardsSection";

import { CardGridSection, CredentialsSection, ProcessSection, SplitActionCardsSection, PageHero, Breadcrumb, SplitContentSection } from "@/components/ui";
import SolutionsHero from "@/components/features/solutions/SolutionsHero/SolutionsHero";
import SolutionsCapabilities from "@/components/features/solutions/SolutionsCapabilities/SolutionsCapabilities";
import SolutionsDelivery from "@/components/features/solutions/SolutionsDelivery/SolutionsDelivery";
import SolutionsCombination from "@/components/features/solutions/SolutionsCombination/SolutionsCombination";

import { AiAutomationWhereWeHelp } from "@/components/features/ai-automation/AiAutomationWhereWeHelp";

import { DataSecurityOverview } from "@/components/features/cybersecurity/shared/DataSecurityOverview";
import { DataDiscovery } from "@/components/features/cybersecurity/shared/DataDiscovery";
import AuthenticationGovernance from "@/components/features/cybersecurity/shared/AuthenticationGovernance/AuthenticationGovernance";
import LifecycleManagement from "@/components/features/cybersecurity/shared/LifecycleManagement/LifecycleManagement";
import SecureDataOperations from "@/components/features/cybersecurity/shared/SecureDataOperations/SecureDataOperations";
import { JourneyStepsBlock } from "@/components/blocks/JourneyStepsBlock";
import LeadQualificationBlock from "@/components/blocks/LeadQualificationBlock/LeadQualificationBlock";
import NewsletterSection from "@/components/ui/NewsletterSection/NewsletterSection";

/** Section type -> component. Adding a type: extend SECTION_TYPES, this map and the catalog. */

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
  cybersecurityHero: PageHero as SectionComponent,
  cybersecuritySplitContent: SplitContentSection as SectionComponent,
  cardGridSection: CardGridSection as SectionComponent,
  credentialsSection: CredentialsSection as SectionComponent,
  processSection: ProcessSection as SectionComponent,
  splitActionCards: SplitActionCardsSection as SectionComponent,
  whyChooseSection: WhyChooseSection as SectionComponent,
  salesforceHero: PageHero as SectionComponent,
  salesforceSplitContent: SplitContentSection as SectionComponent,
  salesforceCredentials: CredentialsSection as SectionComponent,
  salesforceCapabilities: CardGridSection as SectionComponent,
  salesforceApproach: ProcessSection as SectionComponent,
  salesforceSpecialists: SplitActionCardsSection as SectionComponent,
  salesforceWhyChoose: WhyChooseSection as SectionComponent,
  aiAutomationHero: PageHero as SectionComponent,
  aiAutomationSplitContent: SplitContentSection as SectionComponent,
  aiAutomationCredentials: CredentialsSection as SectionComponent,
  aiAutomationApproach: ProcessSection as SectionComponent,
  aiAutomationSpecialists: SplitActionCardsSection as SectionComponent,
  aiAutomationWhyChoose: WhyChooseSection as SectionComponent,
  aiAutomationWhereWeHelp: AiAutomationWhereWeHelp as SectionComponent,
  solutionsHero: SolutionsHero as SectionComponent,
  solutionsCapabilities: SolutionsCapabilities as SectionComponent,
  solutionsDelivery: SolutionsDelivery as SectionComponent,
  solutionsCombination: SolutionsCombination as SectionComponent,
  cloudInfrastructureHero: PageHero as SectionComponent,
  pageHero: PageHero as SectionComponent,
  splitContent: SplitContentSection as SectionComponent,
  whyChoose: WhyChooseSection as SectionComponent,
  breadcrumb: Breadcrumb as SectionComponent,
  splitContentSection: SplitContentSection as SectionComponent,
  dataSecurityOverview: DataSecurityOverview as SectionComponent,
  dataDiscovery: DataDiscovery as SectionComponent,
  authenticationGovernance: AuthenticationGovernance as SectionComponent,
  lifecycleManagement: LifecycleManagement as SectionComponent,
  secureDataOperations: SecureDataOperations as SectionComponent,
  journeyStepsBlock: JourneyStepsBlock as SectionComponent,
  leadQualificationBlock: LeadQualificationBlock as unknown as SectionComponent,
  newsletter: NewsletterSection as SectionComponent,
};
