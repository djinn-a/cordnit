import { ROUTES } from "@/lib/config/routes";
import type { PageDocument } from "@/lib/cms/types";

export const salesforceServicePage: PageDocument = {
  slug: "salesforce/service",
  title: "Salesforce - Service",
  layout: "default",
  seo: {
    title: "Salesforce Service | Cordinit",
    description: "Deliver connected, efficient customer service.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "service-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Salesforce", href: "/salesforce" },
        { label: "Service", href: "/salesforce/service" },
      ],
    },
    {
      _type: "contentMedia",
      _key: "service-hero",
      eyebrow: "SERVICE",
      title: "Deliver connected, efficient customer service.",
      description: "Help customers get the right support, while giving service teams the tools, information, and visibility they need to resolve issues effectively.",
      cta: {
        label: "Discuss your service priority",
        href: ROUTES.contact,
      },
      mainImage: {
        src: "/images/content-media/frame_1984077885.webp",
        alt: "Customer Service Visualization",
      },
    },
    {
      _type: "journeyStepsBlock",
      _key: "service-journey",
      header: {
        eyebrow: "THE SERVICE JOURNEY",
        title: "From customer issue to better service.",
        description: "Good service starts with understanding the customer's need and continues through resolution, support, and learning.",
      },
      cards: [
        {
          id: "case",
          numberStr: "01",
          title: "CASE",
          description: "Understand the customer's issue from the first point of contact.",
          footerText: "INTAKE",
        },
        {
          id: "knowledge",
          numberStr: "02",
          title: "KNOWLEDGE",
          description: "Give teams the verified information and guidance they need.",
          footerText: "GUIDANCE",
        },
        {
          id: "self-service",
          numberStr: "03",
          title: "SELF-SERVICE",
          description: "Understand the customer's issue from the first point of contact.",
          footerText: "INTAKE",
        },
        {
          id: "agent-experience",
          numberStr: "04",
          title: "AGENT EXPERIENCE",
          description: "Understand the customer's issue from the first point of contact.",
          footerText: "INTAKE",
        },
        {
          id: "service-insight",
          numberStr: "05",
          title: "SERVICE INSIGHT",
          description: "Understand the customer's issue from the first point of contact.",
          footerText: "INTAKE",
        },
      ],
    },
    {
      _type: "leadQualificationBlock",
      _key: "service-case-management",
      header: {
        eyebrow: "CASE MANAGMENT",
        title: "Start with a clear view of every customer issue.",
        description: "A lead is a person or company that could become a customer. Salesforce helps teams capture and organize potential customers so they can understand who to follow up with and where to focus.",
        highlightPrefix: "The goal is simple:",
        highlightText: "help your team spend time on the prospects that matter.",
      },
      flow: {
        eyebrowLeft: "LEAD QUALIFICATION FLOW",
        eyebrowRight: "3 SIMPLE STEPS",
        steps: [
          {
            id: "customer-issue",
            numberStr: "01",
            title: "CUSTOMER ISSUE",
            description: "Collect information",
          },
          {
            id: "case-record",
            numberStr: "02",
            title: "CASE RECORD",
            description: "Understand the potential",
          },
          {
            id: "assign-route",
            numberStr: "03",
            title: "ASSIGN & ROUTE",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "service-knowledge-architecture",
      variant: "right",
      header: {
        eyebrow: "KNOWLEDGE ARCHITECTURE",
        title: "Give your teams the answers they need.",
        description: "Service teams work better when verified information is immediate to locate. Salesforce brings relevant knowledge articles, policy guidance, and proven resolution paths directly adjacent to the active customer record.",
        highlightText: "Give sales teams a clearer understanding of what they are pursuing and what needs to happen next.",
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
            id: "knowledge-flow",
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
      _key: "service-case-management-duplicate",
      header: {
        eyebrow: "CASE MANAGMENT",
        title: "Start with a clear view of every customer issue.",
        description: "A lead is a person or company that could become a customer. Salesforce helps teams capture and organize potential customers so they can understand who to follow up with and where to focus.",
        highlightPrefix: "The goal is simple:",
        highlightText: "help your team spend time on the prospects that matter.",
      },
      flow: {
        eyebrowLeft: "LEAD QUALIFICATION FLOW",
        eyebrowRight: "3 SIMPLE STEPS",
        steps: [
          {
            id: "customer-issue-2",
            numberStr: "01",
            title: "CUSTOMER ISSUE",
            description: "Collect information",
          },
          {
            id: "case-record-2",
            numberStr: "02",
            title: "CASE RECORD",
            description: "Understand the potential",
          },
          {
            id: "assign-route-2",
            numberStr: "03",
            title: "ASSIGN & ROUTE",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "service-workspace-dynamics",
      variant: "right",
      header: {
        eyebrow: "WORKSPACE DYNAMICS",
        title: "Give agents what they need to help customers.",
        description: "Once you can see what is happening in the pipeline, you can make a clearer assessment of what may come next. Salesforce brings sales information together to support better forecasting and planning.",
        highlightText: "Help sales leaders make decisions using a clearer view of current opportunities.",
        highlightStyle: "white",
      },
      flow: {
        eyebrowLeft: "PREDICTIVE PROGRESSION",
        eyebrowRight: "ZERO GUESSWORK",
        steps: [
          {
            id: "customer-context",
            title: "CUSTOMER CONTEXT",
            description: "Current active deals",
          },
          {
            id: "integrated-knowledge",
            title: "INTEGRATED KNOWLEDGE",
            description: "Objective qualification",
          },
          {
            id: "orchestrated-tools",
            title: "ORCHESTRATED TOOLS",
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
      _key: "service-growth",
      header: {
        eyebrow: "GROWTH",
        title: "Turn better visibility into growth.",
        description: "When teams know who to focus on, which opportunities matter and what may come next, they can make better decisions and execute with greater confidence.",
        highlightText: "A clearer sales process creates a stronger foundation for sustainable growth.",
      },
      flow: {
        eyebrowLeft: "LEAD QUALIFICATION FLOW",
        eyebrowRight: "3 SIMPLE STEPS",
        steps: [
          {
            id: "service-interactions",
            numberStr: "01",
            title: "SERVICE INTERACTIONS",
            description: "Collect information",
          },
          {
            id: "systemic-insight",
            numberStr: "02",
            title: "SYSTEMIC INSIGHT",
            description: "Understand the potential",
          },
          {
            id: "system-improvement",
            numberStr: "03",
            title: "SYSTEM IMPROVEMENT",
            description: "Know who to follow up with",
          },
        ],
      },
    },
  ],
};
