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
    { 
      _type: "contentMedia", 
      _key: "home-content-media",
      eyebrow: "INDUSTRIES",
      title: "Technology progress in your industry context",
      description: "Every industry faces unique regulatory, competitive, and technological pressures. We tailor our digital transformation strategies to the specific realities of your sector, ensuring compliance while driving meaningful innovation.",
      cta: {
        label: "Explore industries",
        href: "/industries"
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "People looking at a tablet in a modern office"
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Data visualization on a tablet screen"
      }
    },
  ],
};
