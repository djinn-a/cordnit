import { PageHero } from "@/components/ui";
import type { PageHeroData } from "@/components/ui";

type CloudInfrastructureHeroProps = {
  data: PageHeroData;
};

export default function CloudInfrastructureHero({ data }: CloudInfrastructureHeroProps) {
  return <PageHero data={data} />;
}
