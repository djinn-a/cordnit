import type { PageDocument } from "@/lib/cms/types";
import { JourneyStepsBlockProps } from "@/components/blocks/JourneyStepsBlock/types";

const journeyStepsData: JourneyStepsBlockProps = {
  header: {
    eyebrow: "OUR CAPABILITIES",
    title: "From customer strategy to everyday experiences.",
    description: "We bring together strategy, experience, implementation, integration and ongoing improvement to make Salesforce work across your business.",
  },
  cards: [
    {
      id: "lead",
      numberStr: "01",
      title: "LEAD",
      description: "A potential customer shows interest.",
      footerText: "STEP 01 // STARTING POINT",
    },
    {
      id: "opportunity",
      numberStr: "02",
      title: "OPPORTUNITY",
      description: "A qualified lead becomes a real sales possibility.",
      footerText: "STEP 02 // QUALIFIED DEAL",
    },
    {
      id: "pipeline",
      numberStr: "03",
      title: "PIPELINE",
      description: "Active opportunities are organised and tracked.",
      footerText: "STEP 03 // ACTIVE VELOCITY",
    },
    {
      id: "forecast",
      numberStr: "04",
      title: "FORECAST",
      description: "The team gets a clearer view of what may come next.",
      footerText: "STEP 04 // PREDICTABILITY",
    },
    {
      id: "growth",
      numberStr: "05",
      title: "GROWTH",
      description: "Better visibility helps teams make better decisions.",
      footerText: "OUTCOME // COMPOUNDING",
    },
  ],
};

export const salesforceCommercePage: PageDocument = {
  slug: "salesforce/commerce",
  title: "Salesforce - Commerce Cloud",
  layout: "default",
  seo: {
    title: "Salesforce Commerce Cloud | Cordinit",
    description: "Drive sales and improve efficiency with Salesforce Commerce Cloud.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "commerce-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Salesforce", href: "/salesforce" },
        { label: "Commerce Cloud", href: "/salesforce/commerce" },
      ],
    },
    {
      _type: "contentMedia",
      _key: "commerce-hero",
      eyebrow: "COMMERCE",
      title: "Drive sales and improve efficiency",
      description: "Connect Salesforce with the systems, data and processes your teams rely on.",
      cta: {
        label: "Discuss your commerce priority",
        href: "/contact",
      },
      mainImage: {
        src: "/images/content-media/main.png",
        alt: "Data Security Infrastructure",
      },
      secondaryImage: {
        src: "/images/content-media/secondary.png",
        alt: "Technology abstract visualization",
      },
    },
    {
      _type: "journeyStepsBlock",
      _key: "sales-journey",
      ...journeyStepsData
    },
    {
      _type: "leadQualificationBlock",
      _key: "sales-lead-qualification",
      header: {
        eyebrow: "LEAD",
        title: "Start with the right prospects.",
        description: "A lead is a person or company that could become a customer. Salesforce helps teams capture and organize potential customers so they can understand who to follow up with and where to focus.",
        highlightPrefix: "The goal is simple:",
        highlightText: "help your team spend time on the prospects that matter.",
      },
      flow: {
        eyebrowLeft: "LEAD QUALIFICATION FLOW",
        eyebrowRight: "3 SIMPLE STEPS",
        steps: [
          {
            id: "capture",
            numberStr: "01",
            title: "CAPTURE",
            description: "Collect information",
          },
          {
            id: "qualify",
            numberStr: "02",
            title: "QUALIFY",
            description: "Understand the potential",
          },
          {
            id: "focus",
            numberStr: "03",
            title: "FOCUS",
            description: "Know who to follow up with",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "sales-opportunity-qualification",
      variant: "right",
      header: {
        eyebrow: "OPPORTUNITY",
        title: "Know which opportunities are worth pursuing.",
        description: "When a lead shows genuine interest and is a good fit, it becomes an opportunity. Salesforce helps teams keep the customer, requirements, conversations and next steps connected.",
        highlightText: "Give sales teams a clearer understanding of what they are pursuing and what needs to happen next.",
      },
      flow: {
        eyebrowLeft: "DEAL EVOLUTION SEQUENCE",
        eyebrowRight: "CONNECTED PROCESS",
        steps: [
          {
            id: "interest",
            title: "INTEREST",
            description: "Prospect engagement verified",
          },
          {
            id: "qualified",
            title: "QUALIFIED",
            description: "Need & budget confirmed",
          },
          {
            id: "opportunity",
            title: "OPPORTUNITY",
            description: "Active sales pipeline",
          },
          {
            id: "next-step",
            title: "NEXT STEP",
            description: "Immediate clear milestone",
          },
        ],
      },
    },
    {
      _type: "journeyStepsBlock",
      _key: "sales-pipeline-stages",
      variant: "pipeline",
      header: {
        eyebrow: "PIPELINE",
        title: "See what is moving and what needs attention.",
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
          title: "NEW",
          footerText: "2 Deals",
          dots: ["blue", "gray"],
        },
        {
          id: "stage-2",
          numberStr: "STAGE 02",
          title: "QUALIFIED",
          footerText: "3 Deals",
          dots: ["blue", "blue", "gray"],
        },
        {
          id: "stage-3",
          numberStr: "STAGE 03",
          title: "PROPOSAL",
          footerText: "In Review",
          dots: ["blue", "blue"],
        },
        {
          id: "stage-4",
          numberStr: "STAGE 04",
          title: "NEGOTIATION",
          footerText: "Final Terms",
          dots: ["blue"],
        },
        {
          id: "stage-5",
          numberStr: "STAGE 05",
          title: "CLOSED",
          footerText: "Secured",
          dots: ["blue"],
        },
      ],
    },
    {
      _type: "leadQualificationBlock",
      _key: "sales-forecast",
      variant: "left",
      className: "md:-mt-space-80",
      header: {
        eyebrow: "FORECAST",
        title: "Plan ahead with greater confidence.",
        description: "Once you can see what is happening in the pipeline, you can make a clearer assessment of what may come next. Salesforce brings sales information together to support better forecasting and planning.",
        highlightText: "Help sales leaders make decisions using a clearer view of current opportunities.",
        highlightStyle: "white",
      },
      flow: {
        eyebrowLeft: "PREDICTIVE PROGRESSION",
        eyebrowRight: "ZERO GUESSWORK",
        steps: [
          {
            id: "pipeline-forecast",
            title: "PIPELINE",
            description: "Current active deals",
          },
          {
            id: "what-may-close",
            title: "WHAT MAY CLOSE?",
            description: "Objective qualification",
          },
          {
            id: "forecast-forecast",
            title: "FORECAST",
            description: "Reliable outlook",
          },
          {
            id: "plan-forecast",
            title: "PLAN",
            description: "Confident resource allocation",
          },
        ],
      },
    },
    {
      _type: "leadQualificationBlock",
      _key: "sales-growth",
      variant: "right",
      header: {
        eyebrow: "GROWTH",
        title: "Turn better visibility into growth.",
        description: "When teams know who to focus on, which opportunities matter and what may come next, they can make better decisions and execute with greater confidence.",
        highlightPrefix: "A clearer sales process creates a stronger foundation for sustainable growth.",
        highlightStyle: "blue", // Force the blue left-border style even though it's variant: "right"
      },
      flow: {
        eyebrowLeft: "EXECUTION TO IMPACT",
        eyebrowRight: "CONTINUOUS LOOP",
        isGrid: true,
        steps: [
          {
            id: "growth-1",
            numberStr: "01",
            title: "FOCUS",
            description: "Concentrate on high-fit accounts",
          },
          {
            id: "growth-2",
            numberStr: "02",
            title: "BETTER DECISIONS",
            description: "Informed by accurate pipeline health",
          },
          {
            id: "growth-3",
            numberStr: "03",
            title: "BETTER EXECUTION",
            description: "Consistent velocity at each stage",
          },
          {
            id: "growth-4",
            numberStr: "04",
            title: "GROWTH",
            description: "Predictable, compounding revenue",
            theme: "blue", // Apply the blue card styling
          },
        ],
      },
    }
  ],
};
