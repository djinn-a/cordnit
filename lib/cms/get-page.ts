import type { PageDocument } from "./types";
import { homePage } from "@/data/pages/home";
import { aboutPage } from "@/data/pages/about";
import { contactPage } from "@/data/pages/contact";

const pages: Record<string, PageDocument> = {
  home: homePage,
  aboutus: aboutPage,
  contactus: contactPage,
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
