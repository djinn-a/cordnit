import { FC } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section/Section";
import Container from "@/components/ui/Container/Container";
import { combinationData } from "./solutionsCombinationData";

const SolutionsCombination: FC = () => {
  return (
    <Section spacing="none" className="pt-space-0 pb-space-80 px-4 sm:px-6 lg:px-space-60">
      <Container className="!px-0">
        <h2 className="text-section-title-mobile sm:text-section-title text-ink mb-8 sm:mb-12">
          {combinationData.heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {combinationData.cards.map((card, index) => (
            <div
              key={index}
              className="bg-gradient-contact-soft border border-border-card rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col items-start h-full"
            >
              <div className="flex flex-row items-center gap-4 mb-4 z-10 relative">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  {card.number}
                </div>
                <h3 className="text-[16px] font-semibold sm:text-section-title-head text-primary">
                  {card.title}
                </h3>
              </div>
              <p className="text-section-subtitle-mobile sm:text-section-subtitle text-ink-muted relative z-10 w-full pr-12 sm:pr-14">
                {card.description}
              </p>

              <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:top-auto sm:translate-y-0 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 pointer-events-none">
                <Image
                  src={card.iconPath}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default SolutionsCombination;
