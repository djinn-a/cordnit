import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui";
import JourneyStepsCard from "./JourneyStepsCard";
import { PipelineFlowCard } from "./PipelineFlowCard";
import type { JourneyStepsBlockProps } from "./types";

export default function JourneyStepsBlock({ 
  header, 
  cards, 
  variant = "default",
  flowHeaderLeft,
  flowHeaderRight,
  footerLeft,
  footerRight,
  className 
}: Readonly<JourneyStepsBlockProps>) {
  
  if (variant === "pipeline") {
    return (
      <section className={cn("w-full pt-space-80 pb-space-60 lg:pb-[100px]", className)}>
        <Container className="flex flex-col">
          {/* Top Header - Pipeline Variant */}
          <div className="flex flex-col lg:flex-row justify-between w-full mt-space-64 mb-space-64 gap-space-24">
            <div className="flex flex-col w-full lg:w-1/2 gap-space-8 md:gap-space-16">
              <p className="text-eyebrow-desktop text-brand-primary uppercase font-mulish">
                {header.eyebrow}
              </p>
              <h2 className="text-split-section-title text-ink font-mulish pr-8">
                {header.title}
              </h2>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-end">
              <p className="text-page-hero-subtitle text-ink-muted font-mulish">
                {header.description}
              </p>
            </div>
          </div>

          {/* White Container */}
          <div className="bg-white border border-border-card rounded-2xl w-full px-space-24 lg:px-space-32 py-space-32 lg:py-[48px] shadow-sm">
            {/* Inner Header */}
            {(flowHeaderLeft || flowHeaderRight) && (
              <div className="flex justify-between w-full mb-space-32 uppercase text-about-eyebrow-desktop text-ink-muted">
                <span>{flowHeaderLeft}</span>
                <span>{flowHeaderRight}</span>
              </div>
            )}
            
            {/* Cards Row */}
            <div className="flex flex-col lg:flex-row w-full gap-space-16 items-stretch mb-space-32">
              {cards.map((card, idx) => (
                <div key={card.id || `pipeline-card-${idx}`} className="flex-1 min-w-[200px]">
                  <PipelineFlowCard card={card} />
                </div>
              ))}
            </div>

            {/* Legend Row */}
            {(footerLeft || footerRight) && (
              <div className="flex flex-col md:flex-row justify-between md:items-center text-sm font-normal text-ink-muted gap-4">
                <div className="flex items-center gap-2">
                  {footerLeft && (
                    <>
                      <span className="block w-2 h-2 rounded-full bg-brand-primary" />
                      <span>{footerLeft}</span>
                    </>
                  )}
                </div>
                {footerRight && <span>{footerRight}</span>}
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  // Default Variant
  return (
    <section className={cn("w-screen relative left-1/2 -translate-x-1/2 bg-brand-pale py-space-40 md:py-space-60", className)}>
      <div className="w-full max-w-container-1440 mx-auto px-space-16 md:px-space-32 lg:px-space-60 flex flex-col">
        {/* Split Header */}
        <div className="flex flex-col lg:flex-row justify-between w-full mb-space-24 md:mb-space-64 gap-space-16 md:gap-space-24 lg:gap-space-60">
          <div className="flex flex-col w-full lg:w-3/5 xl:w-2/3 gap-space-8 md:gap-space-16">
            <p className="text-eyebrow-mobile tracking-widest text-brand-primary uppercase md:text-page-hero-eyebrow md:tracking-wider font-mulish">
              {header.eyebrow}
            </p>
            <h2 className="text-section-title-mobile text-ink md:text-split-section-title font-mulish">
              {header.title}
            </h2>
          </div>
          <div className="w-full lg:w-2/5 xl:w-1/3 lg:mt-auto flex flex-col justify-end">
            <p className="text-section-subtitle-mobile text-ink-muted md:text-help-card-title-mobile font-mulish">
              {header.description}
            </p>
          </div>
        </div>

        {/* Horizontal Row / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-space-12 gap-y-space-16 md:gap-x-space-24 md:gap-y-space-24 w-full items-stretch">
          {cards.map((card, idx) => (
            <JourneyStepsCard key={card.id || `default-card-${idx}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
