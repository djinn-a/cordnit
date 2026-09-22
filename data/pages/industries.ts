import type { PageDocument } from "@/lib/cms/types";
import type { ContentMediaSectionProps } from "@/components/blocks/ContentMediaSection/ContentMediaSection.types";

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
      _type: "industryCards",
      _key: "industries-grid",
      title: "From direction to durable delivery",
      cards: [
        {
          id: "ind-finance",
          iconName: "Landmark",
          title: "Financial Services",
          description: "Strengthen trust, manage risk and deliver secure, modern experiences at scale.",
          ctaLabel: "Explore",
          ctaLink: "#",
        },
        {
          id: "ind-health",
          iconName: "HeartPulse",
          title: "Healthcare",
          description: "Improve outcomes and experiences while navigating regulation and operational complexity.",
          ctaLabel: "Explore",
          ctaLink: "#",
        },
        {
          id: "ind-retail",
          iconName: "ShoppingCart",
          title: "Retail & Consumer",
          description: "Meet rising expectations with connected customer experiences and agile operations.",
          ctaLabel: "Explore",
          ctaLink: "#",
        },
        {
          id: "ind-manufacturing",
          iconName: "Factory",
          title: "Manufacturing",
          description: "Modernise operations, strengthen resilience and build a smarter, more connected future.",
          ctaLabel: "Explore",
          ctaLink: "#",
        },
        {
          id: "ind-education",
          iconName: "GraduationCap",
          title: "Education",
          description: "Enable better learning and administrative experiences through smart technology.",
          ctaLabel: "Explore",
          ctaLink: "#",
        },
        {
          id: "ind-public",
          iconName: "Users",
          title: "Public Sector",
          description: "Deliver better citizen services with secure, efficient and transparent digital solutions.",
          ctaLabel: "Explore",
          ctaLink: "#",
        },
      ],
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
      cta: {
        label: "Book a call",
        href: "/contact",
      },
    },
    {
      _type: "contentInsights",
      _key: "industries-content-insights",
      eyebrow: "FEATURED CONTENT",
      featured: {
        image: {
          src: "/images/content-media/main.png",
          alt: "Featured content image",
        },
        articleLabel: "ARTICLE",
        category: "Cybersecurity",
        title: "The evolving threat landscape in a connected world",
        description: "A practical look at the threats organisations face today — and the actions that strengthen resilience.",
        cta: {
          label: "Read article",
          href: "#",
        },
      },
      exploreByTopic: {
        eyebrow: "EXPLORE BY TOPIC",
        topics: [
          { id: "all", label: "All", isActive: true },
          { id: "cybersecurity", label: "Cybersecurity" },
          { id: "salesforce", label: "Salesforce" },
          { id: "cloud", label: "Cloud" },
          { id: "ai-automation", label: "AI & Automation" },
          { id: "data-integration", label: "Data & Integration" },
          { id: "industries", label: "Industries" },
          { id: "case-studies", label: "Case Studies" },
        ],
      },
      insightCards: [
        {
          id: "card-1",
          topic: "cloud",
          metadata: {
            label: "ARTICLE",
            pill: "Cloud",
          },
          title: "Building cloud foundations that scale with you",
          description: "Key considerations for creating secure, resilient and future-ready cloud environments.",
          dateInfo: "14 May 2025 · 6 min read",
          image: {
            src: "/images/content-media/main.png",
            alt: "Cloud foundation",
          },
          cta: {
            label: "Read article",
            href: "#",
          },
        },
        {
          id: "card-2",
          topic: "cybersecurity",
          metadata: {
            label: "ARTICLE",
            pill: "Cybersecurity",
          },
          title: "Securing the enterprise in a hyperconnected era",
          description: "Explore advanced strategies to protect critical assets against emerging cyber threats.",
          dateInfo: "12 Apr 2025 · 5 min read",
          image: {
            src: "/images/content-media/secondary.png",
            alt: "Cybersecurity landscape",
          },
          cta: {
            label: "Read article",
            href: "#",
          },
        },
        {
          id: "card-3",
          topic: "cloud",
          metadata: {
            label: "CASE STUDY",
            pill: "Cloud",
          },
          title: "Migrating legacy systems without downtime",
          description: "How we helped a leading financial institution migrate securely to the public cloud.",
          dateInfo: "03 Mar 2025 · 8 min read",
          image: {
            src: "/images/content-media/main.png",
            alt: "Cloud migration",
          },
          cta: {
            label: "Read case study",
            href: "#",
          },
        },
        {
          id: "card-4",
          topic: "salesforce",
          metadata: {
            label: "ARTICLE",
            pill: "Salesforce",
          },
          title: "Maximizing ROI from your CRM investment",
          description: "Practical steps to improve user adoption and drive value from Salesforce.",
          dateInfo: "21 Feb 2025 · 4 min read",
          image: {
            src: "/images/content-media/secondary.png",
            alt: "Salesforce CRM",
          },
          cta: {
            label: "Read article",
            href: "#",
          },
        },
      ],
    },
  ],
};
