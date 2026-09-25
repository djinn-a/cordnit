import type { PageDocument } from "@/lib/cms/types";
import { aiAutomationCredentialsData, aiAutomationApproachData } from "@/components/features/ai-automation/data";

export const dataIntegrationPage: PageDocument = {
  slug: "data-integration",
  title: "Data Integration",
  layout: "default",
  seo: {
    title: "Data Integration | Cordinit",
    description: "Connected data. Better decisions. Stronger operations.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Data Integration", href: "/data-integration" },
  ],
  sections: [
    {
      _type: "pageHero",
      _key: "data-integration-hero",
      data: {
        eyebrow: "DATA INTEGRATION",
        title: "Connected data. Better decisions. Stronger operations.",
        description:
          "When information and systems do not connect, people spend time bridging the gaps. Cordinit helps create a more reliable data and integration foundation so that insight and action can move where they are needed.",
        cta: {
          label: "Discuss your data and integration priorities",
          href: "/contactus",
        },
        image: {
          src: "/solutions/Modernise.webp",
          alt: "Server racks showing data integration infrastructure",
        },
      },
    },
    {
      _type: "splitContentSection",
      _key: "data-integration-split-content",
      data: {
        eyebrow: "ABOUT DATA INTEGRATION",
        title: "Make information work across the business",
        paragraphs: [
          "Organisations rarely lack data. The challenge is making it trustworthy, accessible and connected to the moments where it can improve a decision, experience or process.",
          "We help bring together data strategy, integration architecture, delivery and governance so that your technology ecosystem works as a whole."
        ],
        image: {
          src: "/ai-automation/ai-business-value-diagram.webp",
          alt: "Data Integration Business Value Diagram",
        }
      }
    },
    {
      _type: "credentialsSection",
      _key: "data-integration-credentials",
      data: aiAutomationCredentialsData
    },
    {
      _type: "processSection",
      _key: "data-integration-approach",
      data: aiAutomationApproachData
    }
  ],
};
