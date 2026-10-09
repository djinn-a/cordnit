import { buildLlmsTxt } from "@/lib/seo/llms-txt";
import { cms } from "@/server/cms";
import { getSiteChrome } from "@/server/cms/queries/site-chrome";

/** Rebuilt when pages, the Navbar/Footer or site SEO are published (via their cache tags). */
export async function GET() {
  const [site, chrome, pages] = await Promise.all([
    cms.published.getSiteSeo(),
    getSiteChrome(),
    cms.published.listPublishedPageSummaries(),
  ]);
  if (site.robots.discourageAll) return new Response("Not found", { status: 404 });
  return new Response(buildLlmsTxt({ site, ...chrome, pages }), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
