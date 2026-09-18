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
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 sm:mb-12 lg:mb-16 gap-3 sm:gap-8">
          <h2 className="text-section-title-mobile sm:text-section-title md:w-1/2">{title}</h2>
          <p className="text-ink-muted text-section-subtitle-mobile sm:text-section-subtitle md:w-1/2 max-w-[95%]">{description}</p>
        </div>

        {safeServices.length > 0 && (
          <HelpServiceGrid services={safeServices} />
        )}

        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link href="/solutions">
            <Button 
              variant="primary" 
              className="md:text-link-desktop bg-primary"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Explore all services
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
