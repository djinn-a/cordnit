import type { PageDocument } from "@/lib/cms/types";

export const aboutPage: PageDocument = {
  slug: "aboutus",
  title: "About Us",
  layout: "default",
  seo: {
    title: "About Cordinit",
    description: "Technology change made more useful.",
  },
  sections: [
    { _type: "aboutHero", _key: "about-hero" },
    { _type: "aboutContent", _key: "about-content" },
    { _type: "aboutPrinciples", _key: "about-principles" },
    { _type: "aboutTeam", _key: "about-team" },
  ],
};
