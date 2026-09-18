import { Container, Section, SectionHeader } from "@/components/ui";
import { capabilitiesData } from "./solutionsCapabilitiesData";
import CapabilityCard from "./CapabilityCard";

import { cn } from "@/lib/utils/cn";

export type SolutionsCapabilitiesProps = {
  title?: string;
};

export default function SolutionsCapabilities({
  title = "Find the capability you need",
}: SolutionsCapabilitiesProps = {}) {
  return (
    <Section spacing="none" className="pt-space-80 pb-space-0 px-4 sm:px-6 lg:px-space-60">
      <Container className="!px-0">
        <div className="mb-8 md:mb-12">
          <SectionHeader
            title={title}
            titleAs="h2"
            titleClassName="text-mobile-heading-1-eb font-extrabold sm:text-section-title"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-8 gap-4 lg:gap-6">
          {capabilitiesData.map((capability, index) => (
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
