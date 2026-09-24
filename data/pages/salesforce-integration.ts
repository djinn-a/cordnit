import type { PageDocument } from "@/lib/cms/types";

export const salesforceIntegrationPage: PageDocument = {
  slug: "salesforce/integration",
  title: "Salesforce - Integration",
  layout: "default",
  seo: {
    title: "Salesforce Integration | Cordinit",
    description: "Connect Salesforce to the business ecosystem.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "integration-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Salesforce", href: "/salesforce" },
        { label: "Integration", href: "/salesforce/integration" },
      ],
    },
    {
      _type: "contentMedia",
      _key: "integration-hero",
      eyebrow: "INTEGRATION",
      title: "Connect Salesforce to the\u00A0business\u00A0ecosystem.",
      description: "Connect Salesforce with the systems, data and processes your teams rely on — creating a more consistent flow of information across the business.",
      cta: {
        label: "Discuss your integration priority",
        href: "/contact",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Integration Visualization",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Integration metrics abstract visualization",
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "integration-use-case",
      header: {
        eyebrow: "USE CASE",
        title: "Start with the bigger picture.",
        description: "Good marketing starts with knowing who you are trying to reach. Bring relevant customer information together so teams can create more useful audiences and more meaningful engagement.",
        highlightPrefix: "The goal is simple:",
        highlightText: "help your team spend time on the prospects that matter.",
      },
      flow: {
        eyebrowLeft: "LEAD QUALIFICATION FLOW",
        eyebrowRight: "3 SIMPLE STEPS",
        steps: [
          {
            id: "business-need",
            title: "BUSINESS NEED",
            description: "Prospect engagement verified",
          },
          {
            id: "salesforce",
            title: "SALESFORCE",
            description: "Need & budget confirmed",
          },
          {
            id: "business-systems",
            title: "BUSINESS SYSTEMS",
            description: "Active sales pipeline",
          },
          {
            id: "connected-ecosystem",
            title: "CONNECTED ECOSYSTEM",
            description: "Immediate clear milestone",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "integration-systems",
      variant: "right",
      header: {
        eyebrow: "INTEGRATION",
        title: "Connect systems in the right way.",
        description: "Different systems need different ways of working together. We help identify practical integration patterns that allow information to move between Salesforce and the platforms your teams already depend on.",
        highlightText: "Give sales teams a clearer understanding of what they are pursuing and what needs to happen next.",
      },
      flow: {
        eyebrowLeft: "DEAL EVOLUTION SEQUENCE",
        eyebrowRight: "CONNECTED PROCESS",
        steps: [
          {
            id: "data",
            numberStr: "01",
            title: "DATA",
            description: "Collect information",
          },
          {
            id: "context",
            numberStr: "02",
            title: "CONTEXT",
            description: "Understand the potential",
          },
          {
            id: "ready-to-use",
            numberStr: "03",
            title: "READY TO USE",
            description: "Know who to follow up with",
          },
          {
            id: "ai-enablement",
            numberStr: "04",
            title: "AI ENABLEMENT",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "integration-data",
      header: {
        eyebrow: "DATA",
        title: "Make connected data more useful.",
        description: "A lead is a person or company that could become a customer. Salesforce helps teams capture and organize potential customers so they can understand who to follow up with and where to focus.",
        highlightPrefix: "The goal is simple:",
        highlightText: "help your team spend time on the prospects that matter.",
      },
      flow: {
        eyebrowLeft: "LEAD QUALIFICATION FLOW",
        eyebrowRight: "3 SIMPLE STEPS",
        steps: [
          {
            id: "source-data",
            numberStr: "01",
            title: "Source Data",
            description: "Collect information",
          },
          {
            id: "validate",
            numberStr: "02",
            title: "Validate",
            description: "Understand the potential",
          },
          {
            id: "connect",
            numberStr: "03",
            title: "Connect",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "journeyStepsBlock",
      _key: "integration-monitoring",
      variant: "pipeline",
      header: {
        eyebrow: "MONITORING",
        title: "Know when your connections\u00A0need\u00A0attention.",
        description: "A pipeline gives your team a clear view of active opportunities. It shows where deals stand, what is progressing and where action may be needed.",
      },
      flowHeaderLeft: "ACTIVE PIPELINE STAGES",
      flowHeaderRight: "STAGE PROGRESSION",
      footerLeft: "Active opportunity marker moving forward",
      footerRight: "Transparent Pipeline Visibility",
      cards: [
        {
          id: "stage-1",
          numberStr: "STAGE 01",
          title: "Salesforce",
          footerText: "2 Deals",
          dots: ["blue", "gray"],
        },
        {
          id: "stage-2",
          numberStr: "STAGE 02",
          title: "Data Flow",
          footerText: "3 Deals",
          dots: ["blue", "blue", "gray"],
        },
        {
          id: "stage-3",
          numberStr: "STAGE 03",
          title: "Validation",
          footerText: "In Review",
          dots: ["blue", "blue"],
        },
        {
          id: "stage-4",
          numberStr: "STAGE 04",
          title: "Monitoring",
          footerText: "Final Terms",
          dots: ["blue"],
        },
        {
          id: "stage-5",
          numberStr: "STAGE 05",
          title: "Response",
          footerText: "Secured",
          dots: ["blue"],
        },
      ],
    },
    {
      _type: "leadQualificationBlock",
      _key: "integration-ownership",
      variant: "right",
      header: {
        eyebrow: "OWNERSHIP",
        title: "Keep responsibility clear.",
        description: "When teams know who to focus on, which opportunities matter and what may come next, they can make better decisions and execute with greater confidence.",
        highlightText: "Give sales teams a clearer understanding of what they are pursuing and what needs to happen next.",
      },
      flow: {
        eyebrowLeft: "EXECUTION TO IMPACT",
        eyebrowRight: "CONTINUOUS LOOP",
        isGrid: true,
        steps: [
          {
            id: "connect",
            numberStr: "01",
            title: "CONNECT",
            description: "Concentrate on high-fit accounts",
          },
          {
            id: "own",
            numberStr: "02",
            title: "OWN",
            description: "Informed by accurate pipeline health",
          },
          {
            id: "monitor",
            numberStr: "03",
            title: "MONITOR",
            description: "Consistent velocity at each stage",
          },
          {
            id: "improve",
            numberStr: "04",
            title: "IMPROVE",
            description: "Predictable, compounding revenue",
            theme: "blue",
          },
        ],
      },
    },
  ],
};
