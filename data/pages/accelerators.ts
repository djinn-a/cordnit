import type { PageDocument } from "@/lib/cms/types";

export const acceleratorsPage: PageDocument = {
  slug: "accelerators",
  title: "Accelerators",
  layout: "default",
  seo: {
    title: "Accelerators | Cordinit",
    description:
      "Cordinit accelerators are repeatable, outcome-focused offers designed to help you make progress faster without starting every initiative from a blank page.",
  },
  sections: [
    {
      _type: "contentMedia",
      _key: "accelerators-content-media",
      eyebrow: "ACCELERATORS",
      title: "Accelerate the path from idea to impact",
      description:
        "Cordinit accelerators are repeatable, outcome-focused offers designed to help you make progress faster without starting every initiative from a blank page.",
      cta: {
        label: "Find the right accelerator",
        href: "#",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "People looking at accelerators screen",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Hand interacting with digital interface",
      },
    },
    {
      _type: "contextApproach",
      _key: "accelerators-context-approach",
      eyebrow: "OUR APPROACH",
      title: "A faster route to a useful starting point",
      description:
        "Some challenges are common enough to benefit from a proven approach, but important enough to deserve thoughtful adaptation. Our accelerators bring together reusable methods, assets and expertise to help you move quickly while staying focused on your context.",
    },
    {
      _type: "industryCards",
      _key: "accelerators-grid",
      headerLayout: "horizontal",
      title: "Explore accelerators",
      description:
        "Browse accelerators by challenge, capability or platform fit. Each entry explains who it is for, what it helps achieve and what is involved.",
      cards: [
        {
          id: "cybersecurity-quick-start",
          iconName: "Shield",
          title: "Cybersecurity Quick Start",
          description:
            "Strengthen your security posture and reduce key risks fast.",
          ctaLabel: "Explore accelerator",
          ctaLink: "#",
        },
        {
          id: "cloud-foundation",
          iconName: "Server",
          title: "Cloud Foundation Accelerator",
          description:
            "Build a secure, scalable cloud foundation the right way.",
          ctaLabel: "Explore accelerator",
          ctaLink: "#",
        },
        {
          id: "salesforce-experience",
          iconName: "Cloud",
          title: "Salesforce Experience Kickstart",
          description:
            "Launch connected customer experiences that drive adoption and value.",
          ctaLabel: "Explore accelerator",
          ctaLink: "#",
        },
        {
          id: "ai-opportunity",
          iconName: "Bot",
          title: "AI Opportunity Discovery",
          description:
            "Identify high-value AI use cases and create a clear path forward.",
          ctaLabel: "Explore accelerator",
          ctaLink: "#",
        },
        {
          id: "data-analytics",
          iconName: "Code",
          title: "Data & Analytics Foundation",
          description:
            "Unify data and create a trusted foundation for insight.",
          ctaLabel: "Explore accelerator",
          ctaLink: "#",
        },
        {
          id: "managed-services",
          iconName: "UserCog",
          title: "Managed Services Readiness",
          description:
            "Establish the right foundation for reliable, proactive operations.",
          ctaLabel: "Explore accelerator",
          ctaLink: "#",
        },
      ],
    },
    {
      _type: "perspective",
      _key: "accelerators-perspective",
      className: "mb-20",
      eyebrow: "OUR PERSPECTIVE",
      title: "Designed to create momentum",
      description:
        "An accelerator is not a one-size-fits-all product. It is a focused starting point: a way to clarify the opportunity, reduce time spent on repeatable work and get to an informed next decision sooner.",
      image: {
        src: "/images/content-media/main.png",
        alt: "Abstract digital network lines over a city",
      },
    },
  ],
};
