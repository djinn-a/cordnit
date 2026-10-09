import type { MetadataRoute } from "next";
import type { SiteSeo } from "@/lib/cms/document";
import { SYSTEM_DISALLOW, absoluteUrl } from "./site";

export function buildRobots(site: SiteSeo): MetadataRoute.Robots {
  if (site.robots.discourageAll) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...new Set([...SYSTEM_DISALLOW, ...site.robots.extraDisallow])],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
