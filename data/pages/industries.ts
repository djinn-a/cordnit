import type { PageDocument } from "@/lib/cms/types";
import type { ContentMediaSectionProps } from "@/components/ui/ContentMediaSection/ContentMediaSection.types";

const industryContent: ContentMediaSectionProps = {
  eyebrow: "INDUSTRIES",
  title: "Technology progress in your industry context",
  description: "Every industry faces a different combination of customer expectations, operating pressures, regulation and technology change. Cordinit brings relevant capabilities together around the challenges that matter in your world.",
  cta: {
    label: "Discuss your industry priorities",
    href: "/contact",
  },
  mainImage: {
    src: "/images/content-media/main.png",
    alt: "Industry main image",
  },
  secondaryImage: {
    src: "/images/content-media/secondary.png",
    alt: "Industry secondary image",
  },
};

export const industriesPage: PageDocument = {
  slug: "industries",
  title: "Industries",
  layout: "default",
  seo: {
    title: "Industries | Cordinit",
    description: "Explore our industry-specific solutions and digital transformation strategies.",
  },
  sections: [
    {
      _type: "contentMedia",
      _key: "industries-hero",
      ...industryContent,
    },
  ],
};
