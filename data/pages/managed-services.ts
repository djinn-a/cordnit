import type { PageDocument } from "@/lib/cms/types";
import { aiAutomationCredentialsData, managedServicesWhereWeHelpData, aiAutomationSpecialistsData, aiAutomationApproachData, aiAutomationWhyChooseData } from "@/components/features/ai-automation/data";

export const managedServicesPage: PageDocument = {
  slug: "managed-services",
  title: "Managed Services",
  layout: "default",
  seo: {
    title: "Managed Services | Cordinit",
    description: "Managed services that keep progress moving.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "managed-services-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Managed Services" },
      ],
    },
    {
      _type: "pageHero",
      _key: "managed-services-hero",
      data: {
        eyebrow: "MANAGED SERVICES",
        title: "Managed services that keep progress moving",
        description:
          "Technology value does not end at go-live. Cordinit managed services help you keep important platforms secure, reliable and improving — with clear ownership, proactive support and a focus on what is next.",
        cta: {
          label: "Discuss Managed Support",
          href: "/contactus",
        },
        image: {
          src: "/solutions/Modernise.webp",
          alt: "Server racks showing managed services infrastructure",
        },
      },
    },
    {
      _type: "splitContentSection",
      _key: "managed-services-split-content",
      data: {
        eyebrow: "ABOUT DATA INTEGRATION",
        title: "Make information work across the business",
        paragraphs: [
          "Organisations rarely lack data. The challenge is making it trustworthy, accessible and connected to the moments where it can improve a decision, experience or process.",
          "We help bring together data strategy, integration architecture, delivery and governance so that your technology ecosystem works as a whole."
        ],
        image: {
          src: "/ai-automation/ai-business-value-diagram.webp",
          alt: "Business Value Diagram",
        }
      }
    },
    {
      _type: "credentialsSection",
      _key: "managed-services-credentials",
      data: aiAutomationCredentialsData
    },
    {
      _type: "aiAutomationWhereWeHelp",
      _key: "managed-services-framework",
      data: managedServicesWhereWeHelpData
    },
    {
      _type: "splitActionCards",
      _key: "managed-services-specialists",
      data: aiAutomationSpecialistsData
    },
    {
      _type: "processSection",
      _key: "managed-services-approach",
      data: aiAutomationApproachData
    },
    {
      _type: "aiAutomationWhyChoose",
      _key: "managed-services-why-choose",
      data: aiAutomationWhyChooseData
    },
  ],
};
