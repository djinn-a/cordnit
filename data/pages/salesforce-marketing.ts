import type { PageDocument } from "@/lib/cms/types";
import { JourneyStepsBlockProps } from "@/components/blocks/JourneyStepsBlock/types";

const marketingJourneyData: JourneyStepsBlockProps = {
  header: {
    eyebrow: "THE MARKETING JOURNEY",
    title: "From understanding your audience to improving every campaign.",
    description: "Effective marketing starts with knowing who you are communicating with. The right data helps create relevant journeys, coordinated campaigns.",
  },
  cards: [
    {
      id: "audience",
      numberStr: "01",
      title: "AUDIENCE",
      description: "Understand who you want to reach with precision and verified consent boundaries.",
      footerText: "Stage 01 // Cohort"
    },
    {
      id: "data",
      numberStr: "02",
      title: "DATA",
      description: "Understand who you want to reach with precision and verified consent boundaries.",
      footerText: "Stage 01 // Cohort"
    },
    {
      id: "journey",
      numberStr: "03",
      title: "JOURNEY",
      description: "Create relevant experiences across all touchpoints in real time.",
      footerText: "Stage 01 // Cohort"
    },
    {
      id: "campaign",
      numberStr: "04",
      title: "CAMPAIGN",
      description: "Understand who you want to reach with precision and verified consent boundaries.",
      footerText: "Stage 01 // Cohort"
    },
    {
      id: "measurement",
      numberStr: "05",
      title: "MEASUREMENT",
      description: "Understand who you want to reach with precision and verified consent boundaries.",
      footerText: "Stage 01 // Cohort"
    }
  ]
};

export const salesforceMarketingPage: PageDocument = {
  slug: "salesforce/marketing",
  title: "Salesforce - Marketing",
  layout: "default",
  seo: {
    title: "Salesforce Marketing | Cordinit",
    description: "Create relevant, connected customer engagement.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "marketing-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Salesforce", href: "/salesforce" },
        { label: "Marketing", href: "/salesforce/marketing" },
      ],
    },
    {
      _type: "contentMedia",
      _key: "marketing-hero",
      eyebrow: "MARKETING",
      title: "Create relevant,\nconnected customer\nengagement.",
      description: "Help customers get the right support, while giving service teams the tools, information, and visibility they need to resolve issues effectively.",
      cta: {
        label: "Discuss your marketing priority",
        href: "/contact",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Professionals looking at a digital dashboard",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Abstract digital network data visualization",
      },
    },
    {
      _type: "journeyStepsBlock",
      _key: "marketing-journey",
      ...marketingJourneyData
    },
    {
      _type: "leadQualificationBlock",
      _key: "marketing-audience-data",
      header: {
        eyebrow: "AUDIENCE & DATA",
        title: "Start with a clearer understanding of your audience.",
        description: "Good marketing starts with knowing who you are trying to reach. Bring relevant customer information together so teams can create more useful audiences and more meaningful engagement.",
        highlightPrefix: "The goal is simple:",
        highlightText: "help your team spend time on the prospects that matter.",
        highlightStyle: "blue",
      },
      flow: {
        eyebrowLeft: "LEAD QUALIFICATION FLOW",
        eyebrowRight: "3 SIMPLE STEPS",
        steps: [
          {
            id: "customer-data",
            numberStr: "01",
            title: "CUSTOMER DATA",
            description: "Ingestion, CRM, ERP, Product & Consent",
          },
          {
            id: "understand",
            numberStr: "02",
            title: "UNDERSTAND",
            description: "Ingestion, CRM, ERP, Product & Consent",
          },
          {
            id: "audience",
            numberStr: "03",
            title: "AUDIENCE",
            description: "Ingestion, CRM, ERP, Product & Consent",
          },
          {
            id: "relevant-engagement",
            numberStr: "04",
            title: "RELEVANT ENGAGEMENT",
            description: "Ingestion, CRM, ERP, Product & Consent",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "marketing-journeys",
      variant: "right",
      header: {
        eyebrow: "JOURNEYS",
        title: "Create journeys that feel more relevant.",
        description: "Service teams work better when verified information is immediate to locate. Salesforce brings relevant knowledge articles, policy guidance, and proven resolution paths directly adjacent to the active customer record.",
        highlightText: "Give sales teams a clearer understanding of what they are pursuing and what needs to happen next.",
        highlightStyle: "white",
      },
      flow: {
        eyebrowLeft: "DEAL EVOLUTION SEQUENCE",
        eyebrowRight: "CONNECTED PROCESS",
        steps: [
          {
            id: "question",
            numberStr: "01",
            title: "QUESTION",
            description: "Collect information",
          },
          {
            id: "knowledge",
            numberStr: "02",
            title: "KNOWLEDGE",
            description: "Understand the potential",
          },
          {
            id: "answer",
            numberStr: "03",
            title: "ANSWER",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "marketing-campaign-operations",
      header: {
        eyebrow: "CAMPAIGN OPERATIONS",
        title: "Make campaigns easier to plan and manage.",
        description: "A lead is a person or company that could become a customer. Salesforce helps teams capture and organize potential customers so they can understand who to follow up with and where to focus.",
        highlightPrefix: "The goal is simple:",
        highlightText: "help your team spend time on the prospects that matter.",
        highlightStyle: "blue",
      },
      flow: {
        eyebrowLeft: "LEAD QUALIFICATION FLOW",
        eyebrowRight: "3 SIMPLE STEPS",
        steps: [
          {
            id: "plan",
            numberStr: "01",
            title: "PLAN",
            description: "Collect information",
          },
          {
            id: "create",
            numberStr: "02",
            title: "CREATE",
            description: "Understand the potential",
          },
          {
            id: "launch",
            numberStr: "03",
            title: "LAUNCH",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "marketing-consent-trust",
      variant: "right",
      header: {
        eyebrow: "CONSENT & TRUST",
        title: "Build engagement on trust.",
        description: "Relevant marketing also means respecting customer preferences. Keep consent and communication choices in mind as you plan and deliver customer engagement.",
        highlightText: "Help sales leaders make decisions using a clearer view of current opportunities.",
        highlightStyle: "white",
      },
      flow: {
        eyebrowLeft: "PREDICTIVE PROGRESSION",
        eyebrowRight: "ZERO GUESSWORK",
        steps: [
          {
            id: "customer-preference",
            title: "CUSTOMER PREFERENCE",
            description: "Current active deals",
          },
          {
            id: "consent-architecture",
            title: "CONSENT ARCHITECTURE",
            description: "Objective qualification",
          },
          {
            id: "responsible-engagement",
            title: "RESPONSIBLE ENGAGEMENT",
            description: "Reliable outlook",
          },
          {
            id: "better-support",
            title: "BETTER SUPPORT",
            description: "Confident resource allocation",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "marketing-performance-measurement",
      variant: "left",
      header: {
        eyebrow: "PERFORMANCE MEASUREMENT",
        title: "Understand what is working.",
        description: "When teams know who to focus on, which opportunities matter and what may come next, they can make better decisions and execute with greater confidence.",
        highlightText: "A clearer sales process creates a stronger foundation for sustainable growth.",
        highlightStyle: "blue",
      },
      flow: {
        eyebrowLeft: "EXECUTION TO IMPACT",
        eyebrowRight: "CONTINUOUS LOOP",
        isGrid: true,
        steps: [
          {
            id: "campaign",
            numberStr: "01",
            title: "CAMPAIGN",
            description: "Concentrate on high-fit accounts",
          },
          {
            id: "performance",
            numberStr: "02",
            title: "PERFORMANCE",
            description: "Informed by accurate pipeline health",
          },
          {
            id: "learn",
            numberStr: "03",
            title: "LEARN",
            description: "Consistent velocity at each stage",
          },
          {
            id: "improvement",
            numberStr: "04",
            title: "IMPROVEMENT",
            description: "Predictable, compounding revenue",
            theme: "blue",
          },
        ],
      },
    }
  ]
};
