import { PageHero } from "@/components/ui/PageHero";
import type { PageHeroData } from "@/components/ui/PageHero";

export type ApplicationEngineeringHeroProps = {
  data: PageHeroData;
};

export default function ApplicationEngineeringHero({
  data,
}: ApplicationEngineeringHeroProps) {
  return <PageHero data={data} />;
}
