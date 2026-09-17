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
  title: "Industry Hub - Cordinit",
  layout: "default",
  seo: {
    title: "Industries | Cordinit",
    description: "Explore Cordinit's industry-specific capabilities.",
  },
  sections: [
    {
      _type: "contentMedia",
      _key: "industries-content-media",
      ...industryContent,
    },
    {
      _type: "contextApproach",
      _key: "industries-context-approach",
      eyebrow: "OUR APPROACH",
      title: "Start with the context, not the technology",
      description: "The same platform or security decision can have very different implications depending on your customers, operating model and risk profile. We take time to understand the forces shaping your industry, then help identify a practical response.",
    },
    {
      _type: "perspective",
      _key: "industries-perspective",
      eyebrow: "OUR PERSPECTIVE",
      title: "The challenges often connect",
      description: "Improving a customer journey can require better data and integration. Modernising a service can call for cloud, application engineering and security. We help connect those disciplines so you can make progress without losing the wider context.",
      image: {
        src: "/images/content-media/main.png",
        alt: "Challenges connect",
      },
    },
  ],
};
