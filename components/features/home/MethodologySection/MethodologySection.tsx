import { Container, Section, SectionHeader } from "@/components/ui";
import { methodologyData, MethodologyStep } from "./methodologyData";
import MethodologyCard from "./MethodologyCard";

export type MethodologySectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: MethodologyStep[];
};

export default function MethodologySection({
  eyebrow = "METHODOLOGY",
  title = "Building Resilient Foundations for Modern Enterprise Operations",
  description = "Bridging strategic vision and technical execution through structured governance, seamless integration, and continuous operational improvement.",
  steps = methodologyData,
}: MethodologySectionProps = {}) {
  return (
    <Section spacing="none" className="">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 lg:mb-16 gap-4 sm:gap-8">
          <SectionHeader
            eyebrow={eyebrow}
            eyebrowClassName="font-extrabold md:text-eyebrow-desktop md:font-semibold"
            title={title}
            titleClassName="text-section-title-mobile sm:text-section-title !font-extrabold"
            className="md:w-1/2"
          />
          <div className="md:w-1/2">
            <p className="text-ink-muted text-section-subtitle-mobile sm:text-section-subtitle max-w-lg md:ml-auto">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-1.5 sm:gap-4">
          {steps.map((step) => (
            <MethodologyCard key={step.num} step={step} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
