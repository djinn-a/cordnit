import { Container, Section, SectionHeader } from "@/components/ui";
import { principlesData } from "./principlesData";
import PrincipleItem from "./PrincipleItem";

export type AboutPrinciplesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function AboutPrinciples({
  eyebrow = "HOW WE WORK",
  title = "Four Principles. One way of working",
  description = "We combine clear thinking, practical delivery and long-term partnership to make technology change work in the real world.",
}: AboutPrinciplesProps = {}) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16 lg:mb-20 gap-4 md:gap-16">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            titleClassName="text-20px font-800 md:text-48px"
            className="md:w-1/2"
          />
          <div className="md:w-1/2 md:pl-8">
            <p className="text-black text-14px font-400 md:text-20px md:font-normal">{description}</p>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-16 lg:gap-y-20">
          {principlesData.map((principle, index) => (
            <PrincipleItem
              key={principle.number}
              principle={principle}
              isLast={index === principlesData.length - 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
