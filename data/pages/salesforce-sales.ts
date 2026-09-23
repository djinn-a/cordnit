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

export const salesforceSalesPage: PageDocument = {
  slug: "salesforce/sales",
  title: "Salesforce - Sales",
  layout: "default",
  seo: {
    title: "Salesforce Sales | Cordinit",
    description: "Make selling more focused and predictable.",
  },
  sections: [
    {
      _type: "breadcrumb",
      _key: "sales-breadcrumb",
      items: [
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: "Salesforce", href: "/salesforce" },
        { label: "Sales", href: "/salesforce/sales" },
      ],
    },
    {
      _type: "contentMedia",
      _key: "sales-hero",
      eyebrow: "SALES",
      title: "Make selling more focused and predictable",
      description: "Create a clearer sales journey from lead to opportunity, improve pipeline visibility, and help revenue leaders forecast and sell with absolute institutional confidence.",
      cta: {
        label: "Discuss your sales priority",
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
    }
  ],
};
