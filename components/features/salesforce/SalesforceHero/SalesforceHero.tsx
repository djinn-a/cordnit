import { PageHero } from "@/components/ui";
import type { PageHeroData } from "@/components/ui";

type SalesforceHeroProps = {
  data: PageHeroData;
};

export default function SalesforceHero({ data }: SalesforceHeroProps) {
  // Salesforce-specific composition or feature logic can happen here.
  // We delegate the generic presentation to the reusable UI component.
  return <PageHero data={data} />;
}
