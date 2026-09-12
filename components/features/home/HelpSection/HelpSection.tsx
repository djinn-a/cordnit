import React from "react";
import { Container, Section } from "@/components/ui";
import { HelpService, defaultHelpServices } from "./helpServices";
import HelpServiceGrid from "./HelpServiceGrid";

export type HelpSectionProps = {
  title?: string;
  description?: string;
  services?: HelpService[];
};

export default function HelpSection({
  title = "Where we can help",
  description = "Structured methodologies applied to complex technological challenges. We architect solutions designed for scalability, security, and operational endurance.",
  services = defaultHelpServices,
}: HelpSectionProps = {}) {
  // Ensure services is an array even if malformed data is passed
  const safeServices = Array.isArray(services) ? services : [];

  return (
    <Section spacing="sm" className="pt-8 pb-4 sm:py-16 lg:py-20">
      <Container width="narrow">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 sm:mb-12 lg:mb-16 gap-3 sm:gap-8">
          <h2 className="text-h2 font-800 md:w-1/2">{title}</h2>
          <p className="text-body-lg lg:text-[20px] md:w-1/2 max-w-[95%]">{description}</p>
        </div>

        {safeServices.length > 0 && (
          <HelpServiceGrid services={safeServices} />
        )}
      </Container>
    </Section>
  );
}
