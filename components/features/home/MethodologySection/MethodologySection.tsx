import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

export type MethodologyStep = {
  num: string;
  title: string;
  desc: string;
  tone: "primary" | "ink";
};

export type MethodologySectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: MethodologyStep[];
};

const defaultSteps: MethodologyStep[] = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Thorough assessment of the company's current condition",
    tone: "primary",
  },
  {
    num: "02",
    title: "DESIGN",
    desc: "Create the right foundation for sustainable business growth",
    tone: "ink",
  },
  {
    num: "03",
    title: "IMPLEMENT",
    desc: "Engineer, Integrate, and Evolve Your Technology Landscape",
    tone: "primary",
  },
  {
    num: "04",
    title: "OPTIMISE",
    desc: "Reinforce security, improve efficiency and increase long-term value",
    tone: "ink",
  },
  {
    num: "05",
    title: "OPERATE",
    desc: "Future-proof your technology with adaptability and resilience",
    tone: "primary",
  },
];

export default function MethodologySection({
  eyebrow = "METHODOLOGY",
  title = "Creating smarter foundations for how businesses operate",
  description = "We turn business ambition into lasting progress through clear communication, continuous collaboration and purposeful execution.",
  steps = defaultSteps,
}: MethodologySectionProps = {}) {
  return (
    <Section spacing="sm" className="py-8 sm:py-16 lg:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-8 sm:mb-12 lg:mb-16 gap-4 sm:gap-8">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            className="lg:w-1/2"
          />
          <div className="lg:w-1/2 lg:pt-8">
            <p className="text-body-lg max-w-lg">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-1.5 sm:gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className={cn(
                "flex flex-col h-[220px] xs:h-[240px] sm:h-panel p-4 sm:p-6 md:p-8 rounded-sm text-white",
                step.tone === "primary" ? "bg-primary" : "bg-ink"
              )}
            >
              <div className="flex justify-between items-start mb-auto">
                <span className="text-caption font-bold tracking-widest uppercase text-white">
                  {step.title}
                </span>
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white" />
              </div>
              <div className="mt-auto">
                <div className="text-h1 text-white mb-2 sm:mb-4 leading-none">
                  {step.num}
                </div>
                <p className="text-caption sm:text-body-sm leading-relaxed text-white/90">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
