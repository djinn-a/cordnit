import type { PageDocument } from "./types";
import { homePage } from "@/data/pages/home";
import { aboutPage } from "@/data/pages/about";
import { contactPage } from "@/data/pages/contact";
import { industriesPage } from "@/data/pages/industries";
import { acceleratorsPage } from "@/data/pages/accelerators";
import { insightsPage } from "@/data/pages/insights";
import { cybersecurityPage } from "@/data/pages/cybersecurity";
import { salesforcePage } from "@/data/pages/salesforce";
import { aiAutomationPage } from "@/data/pages/ai-automation";
import { solutionsPage } from "@/data/pages/solutions";
import { cloudInfrastructurePage } from "@/data/pages/cloud-infrastructure";
import { applicationEngineeringPage } from "@/data/pages/application-engineering";

const pages: Record<string, PageDocument> = {
  home: homePage,
  aboutus: aboutPage,
  contactus: contactPage,
  industries: industriesPage,
  accelerators: acceleratorsPage,
  insights: insightsPage,
  cybersecurity: cybersecurityPage,
  salesforce: salesforcePage,
  "ai-automation": aiAutomationPage,
  solutions: solutionsPage,
  "cloud-infrastructure": cloudInfrastructurePage,
  "application-engineering": applicationEngineeringPage,
};

/**
 * Temporary static page loader. Replace body with GraphQL / Sanity fetch
 * while keeping the same PageDocument return shape.
 */
export async function getPage(slug: string): Promise<PageDocument | null> {
  return pages[slug] ?? null;
}

export async function getAllPageSlugs(): Promise<string[]> {
  return Object.keys(pages);
}
