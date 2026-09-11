import type { PageDocument } from "@/lib/cms/types";

export const homePage: PageDocument = {
  slug: "home",
  title: "Home",
  layout: "default",
  seo: {
    title: "Cordinit | Secure Digital Transformation",
    description:
      "Simplifying complexity and enabling meaningful digital transformation.",
  },
  sections: [
    { _type: "hero", _key: "home-hero" },
    { _type: "help", _key: "home-help" },
    { _type: "insights", _key: "home-insights" },
    { _type: "methodology", _key: "home-methodology" },
    { _type: "recognition", _key: "home-recognition" },
    { _type: "testimonials", _key: "home-testimonials" },
    { _type: "cta", _key: "home-cta" },
  ],
};
