import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

export type PrincipleItem = {
  number: string;
  title: string;
  description: string;
};

export type AboutPrinciplesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  principles?: PrincipleItem[];
};

const defaultPrinciples: PrincipleItem[] = [
  {
    number: "01",
    title: "STAY CLOSE TO THE REAL PROBLEM",
    description:
      "We avoid getting lost in technical abstraction. Every decision is anchored to the practical outcomes our clients need to achieve.",
  },
  {
    number: "02",
    title: "MAKE COMPLEXITY USABLE",
    description:
      "Enterprise technology is inherently complex. Our job is to abstract that complexity so teams can focus on their work, not their tools.",
  },
  {
    number: "03",
    title: "BUILD FOR THE LONG TERM",
    description:
      "We design solutions that can adapt and scale. Short-term fixes often create long-term debt; we architect for endurance.",
  },
  {
    number: "04",
    title: "WORK AS ONE TEAM",
    description:
      "Transformation happens when internal knowledge meets external expertise. We integrate seamlessly with your people to drive change together.",
  },
];

export default function AboutPrinciples({
  eyebrow = "HOW WE WORK",
  title = "Four Principles. One way of working",
  description = "We combine clear thinking, practical delivery and long-term partnership to make technology change work in the real world.",
  principles = defaultPrinciples,
}: AboutPrinciplesProps = {}) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 lg:mb-20 gap-4 md:gap-16">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            className="md:w-1/2"
          />
          <div className="md:w-1/2 md:pl-8">
            <p className="text-body">{description}</p>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-16 lg:gap-y-20">
          {principles.map((principle, index) => (
            <div
              key={principle.number}
              className={cn(
                "relative flex flex-row md:flex-col items-start py-8 md:py-0 md:pl-10",
                index !== principles.length - 1 &&
                  "border-b border-border-subtle md:border-b-0"
              )}
            >
              <div className="text-[64px] xs:text-[75px] md:absolute md:top-[-28px] md:left-[-15px] md:text-[120px] font-bold text-primary-pale leading-[0.8] md:leading-none select-none z-0 tracking-tighter mr-5 md:mr-0 shrink-0 mt-[-5px] md:mt-0">
                {principle.number}
              </div>
              <div className="relative z-10 flex flex-col pt-1 md:pt-0">
                <h3 className="text-body-sm md:text-body font-bold text-ink uppercase tracking-wide mb-2 md:mb-3 md:mt-6">
                  {principle.title}
                </h3>
                <p className="text-body-sm">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
