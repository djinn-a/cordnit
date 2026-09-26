import type { SectionType } from "../types";

export const SECTION_CATEGORIES = [
  "Heroes",
  "Content",
  "Features & Cards",
  "Process & Steps",
  "Social Proof",
  "Conversion",
  "Navigation",
] as const;

export type SectionCategory = (typeof SECTION_CATEGORIES)[number];

export type SectionCatalogEntry = {
  label: string;
  category: SectionCategory;
  description: string;
};

/** Human metadata for the "Add section" picker and the editor. */
export const SECTION_CATALOG: Record<SectionType, SectionCatalogEntry> = {
  hero: { label: "Home Hero", category: "Heroes", description: "Full-width image hero with overlay card and two CTAs." },
  aboutHero: { label: "About Hero", category: "Heroes", description: "Image hero with title and responsive body copy." },
  contactHero: { label: "Contact Hero", category: "Heroes", description: "Split hero with heading, description and image." },
  cybersecurityHero: { label: "Cybersecurity Hero", category: "Heroes", description: "Page hero used on the Cybersecurity pillar." },
  salesforceHero: { label: "Salesforce Hero", category: "Heroes", description: "Page hero used on the Salesforce pillar." },
  aiAutomationHero: { label: "AI & Automation Hero", category: "Heroes", description: "Page hero used on the AI & Automation pillar." },
  cloudInfrastructureHero: { label: "Cloud Hero", category: "Heroes", description: "Page hero used on the Cloud & Infrastructure pillar." },
  solutionsHero: { label: "Solutions Hero", category: "Heroes", description: "Split hero with CTA and image." },
  pageHero: { label: "Generic Page Hero", category: "Heroes", description: "Reusable page hero with eyebrow, title, body and CTA." },
  contentMedia: { label: "Content + Media Hero", category: "Heroes", description: "Eyebrow, title, description and CTA beside an image." },

  help: { label: "Where We Help", category: "Features & Cards", description: "Numbered service grid with CTA." },
  industryCards: { label: "Industry Cards", category: "Features & Cards", description: "Header plus industry cards." },
  cardGridSection: { label: "Card Grid", category: "Features & Cards", description: "Capability cards in a responsive grid." },
  splitActionCards: { label: "Split Action Cards", category: "Features & Cards", description: "Two action cards side by side." },
  whyChooseSection: { label: "Why Choose (Cybersecurity)", category: "Features & Cards", description: "Why-choose reasons for Cybersecurity." },
  whyChoose: { label: "Why Choose", category: "Features & Cards", description: "Generic why-choose reasons grid." },
  salesforceCapabilities: { label: "Salesforce Capabilities", category: "Features & Cards", description: "Capability cards for Salesforce." },
  salesforceWhyChoose: { label: "Why Choose (Salesforce)", category: "Features & Cards", description: "Why-choose reasons for Salesforce." },
  aiAutomationWhyChoose: { label: "Why Choose (AI)", category: "Features & Cards", description: "Why-choose reasons for AI & Automation." },
  aiAutomationWhereWeHelp: { label: "Where We Help (AI)", category: "Features & Cards", description: "Help areas with cards." },
  solutionsCapabilities: { label: "Solutions Capabilities", category: "Features & Cards", description: "Capability tiles linking to pillars." },
  solutionsCombination: { label: "Solutions Combination", category: "Features & Cards", description: "Numbered combination cards." },
  dataSecurityOverview: { label: "Security Overview", category: "Features & Cards", description: "Header with feature and process cards." },
  authenticationGovernance: { label: "Feature Grid (Governance)", category: "Features & Cards", description: "Header plus grid of feature cards." },
  lifecycleManagement: { label: "Feature Grid (Lifecycle)", category: "Features & Cards", description: "Outlined header plus feature cards." },
  secureDataOperations: { label: "Feature Grid (Operations)", category: "Features & Cards", description: "Operations-focused feature cards." },

  contextApproach: { label: "Context & Approach", category: "Content", description: "Eyebrow, title and long description." },
  perspective: { label: "Perspective", category: "Content", description: "Quote-style perspective with image and CTA." },
  contentInsights: { label: "Content Insights", category: "Content", description: "Featured insight, topics and insight cards." },
  insights: { label: "Insights Carousel", category: "Content", description: "Carousel of insight cards." },
  aboutContent: { label: "About Tabs", category: "Content", description: "Tabbed about content with image." },
  aboutPrinciples: { label: "Principles", category: "Content", description: "Numbered principles list." },
  aboutTeam: { label: "Team", category: "Content", description: "Team member carousel." },
  cybersecuritySplitContent: { label: "Split Content (Cybersecurity)", category: "Content", description: "Two-column content block." },
  salesforceSplitContent: { label: "Split Content (Salesforce)", category: "Content", description: "Two-column content block." },
  aiAutomationSplitContent: { label: "Split Content (AI)", category: "Content", description: "Two-column content block." },
  splitContent: { label: "Split Content", category: "Content", description: "Generic two-column content block." },
  splitContentSection: { label: "Split Content Section", category: "Content", description: "Two-column content section variant." },
  solutionsDelivery: { label: "Solutions Delivery", category: "Content", description: "Delivery story with stats." },
  dataDiscovery: { label: "Discovery Block", category: "Content", description: "Discovery steps with variants." },

  methodology: { label: "Methodology", category: "Process & Steps", description: "Five-step methodology cards." },
  processSection: { label: "Process", category: "Process & Steps", description: "Process steps with header." },
  salesforceApproach: { label: "Approach (Salesforce)", category: "Process & Steps", description: "Approach steps for Salesforce." },
  aiAutomationApproach: { label: "Approach (AI)", category: "Process & Steps", description: "Approach steps for AI & Automation." },
  journeyStepsBlock: { label: "Journey Steps", category: "Process & Steps", description: "Numbered journey cards with flow header/footer." },
  leadQualificationBlock: { label: "Qualification Flow", category: "Process & Steps", description: "Header with highlighted flow steps." },

  recognition: { label: "Recognition", category: "Social Proof", description: "Compliance and partnership cards." },
  testimonials: { label: "Testimonials", category: "Social Proof", description: "Testimonial carousel." },
  credentialsSection: { label: "Credentials", category: "Social Proof", description: "Credentials header, logos and certification." },
  salesforceCredentials: { label: "Credentials (Salesforce)", category: "Social Proof", description: "Salesforce credentials." },
  aiAutomationCredentials: { label: "Credentials (AI)", category: "Social Proof", description: "AI & Automation credentials." },
  salesforceSpecialists: { label: "Specialists (Salesforce)", category: "Social Proof", description: "Specialists CTA block." },
  aiAutomationSpecialists: { label: "Specialists (AI)", category: "Social Proof", description: "Specialists CTA block." },

  cta: { label: "Call To Action", category: "Conversion", description: "Full-width CTA with expert portrait." },
  contactForm: { label: "Contact Form", category: "Conversion", description: "Lead form with process steps and contact cards." },
  newsletter: { label: "Newsletter", category: "Conversion", description: "Newsletter signup banner." },

  breadcrumb: { label: "Breadcrumb", category: "Navigation", description: "Breadcrumb trail." },
};
