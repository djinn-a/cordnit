import type { PageDocument } from "@/lib/cms/types";

export const solutionsPage: PageDocument = {
  slug: "solutions",
  title: "Solutions",
  layout: "default",
  seo: {
    title: "Solutions | Cordinit",
    description: "Solutions for progress that lasts.",
  },
  sections: [
    { _type: "solutionsHero", _key: "solutions-hero" },
    { _type: "solutionsCapabilities", _key: "solutions-capabilities" },
  ],
};
