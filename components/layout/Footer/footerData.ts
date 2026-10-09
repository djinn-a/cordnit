import type { SectionContentMap } from "@/lib/cms/registry";

export type FooterCmsContent = SectionContentMap["footer"];

/** Code-owned visuals used when the CMS has no uploaded replacement. */
export const FOOTER_ASSETS = {
  logo: "/CordinitHorizontal%204.svg",
  background: "/footer-bg.webp",
  mediaThumbnail: "/Image-v2.webp",
};
