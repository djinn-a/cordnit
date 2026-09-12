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
    <Section spacing="sm" className="py-8 sm:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-8 sm:mb-12 lg:mb-16 gap-4 sm:gap-8">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            titleClassName="font-800"
            className="lg:w-1/2"
          />
          <div className="lg:w-1/2 lg:pt-8">
            <p className="text-body-lg lg:text-[20px] max-w-lg">{description}</p>
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
