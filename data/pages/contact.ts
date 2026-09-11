import type { PageDocument } from "@/lib/cms/types";

export const contactPage: PageDocument = {
  slug: "contactus",
  title: "Contact Us",
  layout: "contact",
  seo: {
    title: "Contact Cordinit",
    description: "Let's talk about what's next.",
  },
  sections: [
    { _type: "contactHero", _key: "contact-hero" },
    { _type: "contactForm", _key: "contact-form" },
    { _type: "cta", _key: "contact-cta" },
  ],
};
