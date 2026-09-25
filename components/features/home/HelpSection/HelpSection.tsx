import React from "react";
import Link from "next/link";
import { Container, Section, Button } from "@/components/ui";
import { HelpService, defaultHelpServices } from "./helpServices";
import HelpServiceGrid from "./HelpServiceGrid";
import { ArrowRight } from "lucide-react";

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
    <Section spacing="none" className="">
      <Container width="narrow">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-space-24 sm:mb-space-48 lg:mb-space-64 gap-space-12 sm:gap-space-32">
          <h2 className="text-section-title-mobile sm:text-section-title md:w-1/2">{title}</h2>
          <p className="text-ink-muted text-section-subtitle-mobile sm:text-section-subtitle md:w-1/2 max-w-[95%]">{description}</p>
        </div>

        {safeServices.length > 0 && (
          <HelpServiceGrid services={safeServices} />
        )}

        <div className="mt-space-40 sm:mt-space-48 flex justify-center">
          <Link href="/solutions">
            <Button 
              variant="primary" 
              className="md:text-link-desktop bg-primary"
              rightIcon={<ArrowRight className="h-space-16 w-space-16" />}
            >
              Explore all services
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
