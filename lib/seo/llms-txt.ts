import type { SiteSeo } from "@/lib/cms/document";
import { slugToPath } from "@/lib/cms/document";
import type { SectionContentMap } from "@/lib/cms/registry";
import { internalPath } from "@/lib/cms/site-chrome";
import { PRODUCTION_SITE_URL } from "./site";

type PageSummary = { slug: string; title: string; description?: string; noindex: boolean };

const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

/**
 * llms.txt (https://llmstxt.org): a Markdown map of the site for AI answer engines,
 * grouped the way the site navigation groups it. Only indexable, published pages appear.
 */
export function buildLlmsTxt(input: {
  site: SiteSeo;
  navbar: SectionContentMap["navbar"];
  footer: SectionContentMap["footer"];
  pages: readonly PageSummary[];
}): string {
  const { site, navbar, footer } = input;
  const pages = new Map(input.pages.filter((p) => !p.noindex).map((p) => [slugToPath(p.slug), p]));
  const listed = new Set<string>();

  const entry = (href: string, label: string, fallbackDescription?: string): string | null => {
    const path = internalPath(href);
    const page = path ? pages.get(path) : undefined;
    if (!path || !page || listed.has(path)) return null;
    listed.add(path);
    const description = page.description || fallbackDescription;
    return `- [${oneLine(label || page.title)}](${PRODUCTION_SITE_URL}${path === "/" ? "" : path})${description ? `: ${oneLine(description)}` : ""}`;
  };
  const section = (title: string, lines: (string | null)[]) => {
    const kept = lines.filter((l): l is string => l !== null);
    return kept.length ? [`## ${oneLine(title)}`, "", ...kept, ""] : [];
  };

  const home = entry("/", "Home");
  const solutions = section(navbar.solutionsMenu.label, [
    entry(navbar.solutionsMenu.href, navbar.solutionsMenu.label, navbar.solutionsMenu.panelDescription),
    ...navbar.solutionsMenu.items.map((i) => entry(i.href, i.title, i.description)),
  ]);
  const company = section("Company", navbar.navLinks.map((l) => entry(l.href, l.label)));
  const columns = footer.navColumns.flatMap((col) =>
    section(col.title.charAt(0) + col.title.slice(1).toLowerCase(), col.links.map((l) => entry(l.href, l.label))),
  );
  const rest = section(
    "Other pages",
    [...pages.keys()].sort().map((path) => entry(path, pages.get(path)!.title)),
  );

  const contact = [footer.contact.email && `- Email: ${footer.contact.email}`, footer.contact.phone && `- Phone: ${footer.contact.phone}`].filter(Boolean);

  return [
    `# ${site.siteName}`,
    "",
    `> ${oneLine(site.defaultDescription)}`,
    "",
    oneLine(footer.branding.tagline),
    "",
    ...(home ? [home, ""] : []),
    ...solutions,
    ...company,
    ...columns,
    ...rest,
    ...(contact.length ? ["## Contact", "", ...contact, ""] : []),
  ].join("\n");
}
