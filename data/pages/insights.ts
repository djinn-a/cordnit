import type { PageDocument } from "@/lib/cms/types";

export const insightsPage: PageDocument = {
  slug: "insights",
  title: "Insights",
  seo: {
    title: "Insights | Cordinit",
    description:
      "Explore practical perspectives on cybersecurity, Salesforce, cloud, AI, data and the challenges shaping technology change.",
  },
  layout: "default",
  sections: [
    {
      _key: "insights-hero",
      _type: "contentMedia",
      eyebrow: "INSIGHTS",
      title: "Insights for more confident technology decisions",
      description:
        "Explore practical perspectives on cybersecurity, Salesforce, cloud, AI, data and the challenges shaping technology change.",
      cta: {
        label: "Talk to an expert",
        href: "/contact",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Professional working on technology decisions",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Technology abstract visualization",
      },
    },
    {
      _type: "contextApproach",
      _key: "insights-ideas",
      title: "Ideas you can use",
      description:
        "The best technology decisions are informed by a clear view of what is changing, what matters and what is possible. Our insights bring together perspectives from across Cordinit to help you navigate complex questions with greater confidence.",
    },
    {
      _type: "contentInsights",
      _key: "insights-content-insights",
      eyebrow: "FEATURED CONTENT",
      featured: {
        image: {
          src: "/images/content-media/main.png",
          alt: "The evolving threat landscape in a connected world",
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
          topic: "salesforce",
          metadata: {
            label: "CASE STUDY",
            pill: "Salesforce",
          },
          title: "How a unified Salesforce platform improved customer experiences",
          description: "See how a leading organisation connected sales, service and marketing to deliver measurable outcomes.",
          dateInfo: "8 May 2025 · 8 min read",
          image: {
            src: "/images/content-media/secondary.png",
            alt: "Salesforce experience",
          },
          cta: {
            label: "Read article",
            href: "#",
          },
        },
        {
          id: "card-3",
          topic: "ai-automation",
          metadata: {
            label: "ARTICLE",
            pill: "AI & Automation",
          },
          title: "From AI potential to real business value",
          description: "Turning ideas into governed, scalable AI solutions that improve the way work gets done.",
          dateInfo: "2 May 2025 · 7 min read",
          image: {
            src: "/images/content-media/main.png",
            alt: "AI potential",
          },
          cta: {
            label: "Read article",
            href: "#",
          },
        },
        {
          id: "card-4",
          topic: "data-integration",
          metadata: {
            label: "REPORT",
            pill: "Data & Integration",
          },
          title: "The data advantage: Unlocking insight at scale",
          description: "New trends and practical steps for creating trusted data that drives better decisions.",
          dateInfo: "24 Apr 2025 · 10 min read",
          image: {
            src: "/images/content-media/secondary.png",
            alt: "Data advantage",
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
