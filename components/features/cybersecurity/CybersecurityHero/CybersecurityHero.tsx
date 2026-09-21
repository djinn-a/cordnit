import { PageHero } from "@/components/ui";
import type { PageHeroData } from "@/components/ui";

type CybersecurityHeroProps = {
  data: PageHeroData;
};

export default function CybersecurityHero({ data }: CybersecurityHeroProps) {
  // Cybersecurity-specific composition or feature logic can happen here.
  // We delegate the generic presentation to the reusable UI component.
  return <PageHero data={data} />;
}
