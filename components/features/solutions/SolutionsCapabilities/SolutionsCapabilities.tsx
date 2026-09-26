import { Container, Section, SectionHeader } from "@/components/ui";
import { capabilitiesData, type CapabilityData } from "./solutionsCapabilitiesData";
import CapabilityCard from "./CapabilityCard";

import { cn } from "@/lib/utils/cn";

export type SolutionsCapabilitiesProps = {
  title?: string;
  capabilities?: CapabilityData[];
};

export default function SolutionsCapabilities({
  title = "Find the capability you need",
  capabilities = capabilitiesData,
}: SolutionsCapabilitiesProps = {}) {
  const items = Array.isArray(capabilities) ? capabilities : [];
  return (
    <Section spacing="none">
      <Container className="!px-0">
        <div className="mb-8 md:mb-12">
          <SectionHeader
            title={title}
            titleAs="h2"
            titleClassName="text-card-title-mobile font-extrabold sm:text-section-title"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-8 gap-4 lg:gap-6">
          {items.map((capability, index) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
              index={index}
              className={cn(
                "lg:col-span-2",
                index === 4 && "lg:col-start-2"
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
