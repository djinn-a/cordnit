import type { SectionComponent, SectionType } from "./types";

import HeroSection from "@/components/features/home/Hero/HeroSection";
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

/**
 * Maps CMS / page-document `_type` values to presentational section components.
 * Add a new section type here when introducing a new block — never hard-wire in page.tsx.
 */
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
};
