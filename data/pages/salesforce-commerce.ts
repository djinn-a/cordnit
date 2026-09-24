import type { PageDocument } from "@/lib/cms/types";
import { JourneyStepsBlockProps } from "@/components/blocks/JourneyStepsBlock/types";

const commerceJourneyData: JourneyStepsBlockProps = {
  header: {
    eyebrow: "THE COMMERCE JOURNEY",
    title: "From product discovery to a better buying experience.",
    description: "Digital commerce works best when customers can easily find what they need, understand their options, complete their purchase and receive a consistent experience along the way.",
  },
  cards: [
    {
      id: "product",
      numberStr: "01",
      title: "PRODUCT",
      description: "Understand who you want to reach with precision and verified consent boundaries.",
      footerText: "Stage 01 // Cohort"
    },
    {
      id: "customer",
      numberStr: "02",
      title: "CUSTOMER",
      description: "Understand who you want to reach with precision and verified consent boundaries.",
      footerText: "Stage 01 // Cohort"
    },
    {
      id: "order",
      numberStr: "03",
      title: "ORDER",
      description: "Create relevant experiences across all touchpoints in real time.",
      footerText: "Stage 01 // Cohort"
    },
    {
      id: "connect",
      numberStr: "04",
      title: "CONNECT",
      description: "Understand who you want to reach with precision and verified consent boundaries.",
      footerText: "Stage 01 // Cohort"
    },
    {
      id: "optimise",
      numberStr: "05",
      title: "OPTIMISE",
      description: "Understand who you want to reach with precision and verified consent boundaries.",
      footerText: "Stage 01 // Cohort"
    }
  ]
};

export const salesforceCommercePage: PageDocument = {
  slug: "salesforce/commerce",
  title: "Salesforce - Commerce",
  layout: "default",
  seo: {
    title: "Salesforce Commerce | Cordinit",
    description: "Build connected digital commerce experiences.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "commerce-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Salesforce", href: "/salesforce" },
        { label: "Commerce", href: "/salesforce/commerce" },
      ],
    },
    {
      _type: "contentMedia",
      _key: "commerce-hero",
      eyebrow: "COMMERCE",
      title: "Build connected digital\ncommerce experiences.",
      description: "Help customers get the right support, while giving service teams the tools, information, and visibility they need to resolve issues effectively.",
      cta: {
        label: "Discuss your commerce priority",
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
      _key: "commerce-journey",
      ...commerceJourneyData
    },
    {
      _type: "leadQualificationBlock",
      _key: "commerce-use-case",
      variant: "left",
      header: {
        eyebrow: "USE CASE",
        title: "Make it easier to find and understand what you offer.",
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
            id: "products",
            numberStr: "01",
            title: "PRODUCTS",
            description: "Ingestion, CRM, ERP, Product & Consent",
          },
          {
            id: "catalogue",
            numberStr: "02",
            title: "CATALOGUE",
            description: "Ingestion, CRM, ERP, Product & Consent",
          },
          {
            id: "easy-to-find",
            numberStr: "03",
            title: "EASY TO FIND",
            description: "Ingestion, CRM, ERP, Product & Consent",
          },
          {
            id: "easy-to-understand",
            numberStr: "04",
            title: "EASY TO UNDERSTAND",
            description: "Ingestion, CRM, ERP, Product & Consent",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "commerce-customer-experience",
      variant: "right",
      header: {
        eyebrow: "CUSTOMER & ACCOUNT EXPERIENCE",
        title: "Create a more connected customer experience.",
        description: "Service teams work better when verified information is immediate to locate. Salesforce brings relevant knowledge articles, policy guidance, and proven resolution paths directly adjacent to the active customer record.",
        highlightText: "Give sales teams a clearer understanding of what they are pursuing and what needs to happen next.",
        highlightStyle: "outline",
      },
      flow: {
        eyebrowLeft: "DEAL EVOLUTION SEQUENCE",
        eyebrowRight: "CONNECTED PROCESS",
        steps: [
          {
            id: "customer",
            numberStr: "01",
            title: "CUSTOMER",
            description: "Collect information",
          },
          {
            id: "account",
            numberStr: "02",
            title: "ACCOUNT",
            description: "Understand the potential",
          },
          {
            id: "personalised-experience",
            numberStr: "03",
            title: "PERSONALISED EXPERIENCE",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "commerce-ordering",
      variant: "left",
      header: {
        eyebrow: "ORDERING",
        title: "Make buying simple from start to finish.",
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
            id: "select",
            numberStr: "01",
            title: "SELECT",
            description: "Collect information",
          },
          {
            id: "order",
            numberStr: "02",
            title: "ORDER",
            description: "Understand the potential",
          },
          {
            id: "confirm",
            numberStr: "03",
            title: "CONFIRM",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "commerce-integration",
      variant: "right",
      header: {
        eyebrow: "INTEGRATION",
        title: "Connect commerce with the rest of your business.",
        description: "Relevant marketing also means respecting customer preferences. Keep consent and communication choices in mind as you plan and deliver customer engagement.",
        highlightText: "Help sales leaders make decisions using a clearer view of current opportunities.",
        highlightStyle: "outline",
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
      _key: "commerce-optimisation",
      variant: "left",
      header: {
        eyebrow: "OPTIMISATION",
        title: "Keep improving the experience.",
        description: "When teams know who to focus on, which opportunities matter and what may come next, they can make better decisions and execute with greater confidence.",
        highlightText: "A clearer sales process creates a stronger foundation for sustainable growth.",
        highlightStyle: "blue",
      },
      flow: {
        eyebrowLeft: "EXECUTION TO IMPACT",
        eyebrowRight: "CONTINUOUS LOOP",
        steps: [
          {
            id: "experience",
            numberStr: "01",
            title: "EXPERIENCE",
            description: "Collect information",
          },
          {
            id: "learn",
            numberStr: "02",
            title: "LEARN",
            description: "Understand the potential",
          },
          {
            id: "improve",
            numberStr: "03",
            title: "IMPROVE",
            description: "Know who to follow up with",
          },
          {
            id: "better-experience",
            numberStr: "04",
            title: "BETTER EXPERIENCE",
            description: "Know who to follow up with",
          },
        ],
      },
    }
  ]
};
