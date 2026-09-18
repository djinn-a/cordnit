import type { PageDocument } from "@/lib/cms/types";
import { salesforceHeroData, salesforceSplitContentData, salesforceCredentialsData } from "@/components/features/salesforce/data";

export const salesforcePage: PageDocument = {
  slug: "salesforce",
  title: "Salesforce",
  layout: "default",
  seo: {
    title: "Salesforce | Cordinit",
    description: "Salesforce experience that connects your business.",
  },
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
    }
  ],
};
