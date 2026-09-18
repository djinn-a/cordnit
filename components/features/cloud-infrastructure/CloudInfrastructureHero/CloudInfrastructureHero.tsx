import { PageHero } from "@/components/ui";
import type { PageHeroData } from "@/components/ui";

type CloudInfrastructureHeroProps = {
  data: PageHeroData;
};

export default function CloudInfrastructureHero({ data }: CloudInfrastructureHeroProps) {
  // Cloud infrastructure-specific composition or feature logic can happen here.
  // We delegate the generic presentation to the reusable UI component.
  return <PageHero data={data} />;
}
