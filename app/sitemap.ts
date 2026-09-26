import type { MetadataRoute } from "next";
import { unstable_rethrow } from "next/navigation";
import { HOME_SLUG, slugToPath } from "@/lib/cms/document";
import { absoluteUrl } from "@/lib/seo/site";
import { cms } from "@/server/cms";
import { logger } from "@/server/logger";

/** Published, indexable CMS pages only. Invalidated with the page-list cache tag on publish. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const routes = await cms.published.listPublishedRoutes();
    return routes
      .filter((r) => !r.noindex)
      .sort((a, b) => (a.slug === HOME_SLUG ? -1 : b.slug === HOME_SLUG ? 1 : a.slug.localeCompare(b.slug)))
      .map((r) => {
        const depth = r.slug === HOME_SLUG ? 0 : r.slug.split("/").length;
        return {
          url: absoluteUrl(slugToPath(r.slug)),
          lastModified: new Date(r.publishedAt),
          changeFrequency: depth === 0 ? "weekly" : "monthly",
          priority: depth === 0 ? 1 : depth === 1 ? 0.8 : 0.6,
        };
      });
  } catch (err) {
    unstable_rethrow(err);
    logger.error("sitemap generation failed", { err });
    return [{ url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 }];
  }
}
