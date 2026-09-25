import type { PageDocument } from "@/lib/cms/types";
import { salesforceHeroData, salesforceSplitContentData, salesforceCredentialsData, salesforceCapabilitiesData, salesforceApproachData, salesforceSpecialistsData, salesforceWhyChooseData } from "@/components/features/salesforce/data";

export const salesforcePage: PageDocument = {
  slug: "salesforce",
  title: "Salesforce",
  layout: "default",
  seo: {
    title: "Salesforce | Cordinit",
    description: "Salesforce experience that connects your business.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Salesforce", href: "/salesforce" },
  ],
  sections: [
    { 
      _type: "salesforceHero", 
      _key: "salesforce-hero",
      data: salesforceHeroData
    },
    {
      _type: "salesforceSplitContent",
      _key: "salesforce-split-content",
      data: salesforceSplitContentData
    },
    {
      _type: "salesforceCredentials",
      _key: "salesforce-credentials",
      data: salesforceCredentialsData
    },
    {
      _type: "salesforceCapabilities",
      _key: "salesforce-capabilities",
      data: salesforceCapabilitiesData
    },
    {
      _type: "salesforceApproach",
      _key: "salesforce-approach",
      data: salesforceApproachData
    },
    {
      _type: "salesforceSpecialists",
      _key: "salesforce-specialists",
      data: salesforceSpecialistsData
    },
    {
      _type: "salesforceWhyChoose",
      _key: "salesforce-why-choose",
      data: salesforceWhyChooseData
    }
  ],
};
