import { PageHero, PageHeroData } from "@/components/ui/PageHero";

type AiAutomationHeroProps = {
  data: PageHeroData;
};

export default function AiAutomationHero({ data }: AiAutomationHeroProps) {
  return <PageHero data={data} />;
}
