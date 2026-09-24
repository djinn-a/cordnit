import { cn } from "@/lib/utils/cn";
import Container from "@/components/ui/Container/Container";
import LeadQualificationFlowCard from "./LeadQualificationFlowCard";
import type { LeadQualificationBlockProps } from "./types";

export default function LeadQualificationBlock({
  header,
  flow,
  variant = "left",
  className,
}: Readonly<LeadQualificationBlockProps & { className?: string }>) {
  const isWhiteStyle =
    (header.highlightStyle || (variant === "right" ? "white" : "blue")) ===
    "white";

  return (
    <section className={cn("w-full", className)}>
      <Container className={cn(
        "flex flex-col justify-between items-center gap-space-40 lg:gap-space-80",
        variant === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
      )}>
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col w-full lg:w-[45%] xl:w-1/2 shrink-0">
          <p className="text-[10px] leading-[16px] font-extrabold md:text-eyebrow-desktop md:font-semibold tracking-[1px] text-[#2251FF] uppercase font-mulish mb-space-16">
            {header.eyebrow}
          </p>
          <h2 className="text-section-title-mobile leading-[32px] md:text-split-section-title md:leading-[1.417] text-ink font-mulish mb-space-20">
            {header.title}
          </h2>
          <p className="text-section-subtitle-mobile leading-[22px] md:text-page-hero-subtitle md:leading-[1.4] text-ink-muted font-mulish mb-space-20">
            {header.description}
          </p>
          
          {(header.highlightPrefix || header.highlightText) && (
            <div className={cn(
              "rounded-xl p-space-16 mt-space-20",
              isWhiteStyle
                ? "bg-white border border-border-card shadow-sm" 
                : "bg-(--card-2,rgba(203,224,255,0.40)) border-l-4 border-brand-primary"
            )}>
              <p className="text-base text-ink-muted font-mulish">
                {header.highlightPrefix && (
                  <span className="text-brand-primary font-semibold mr-1">{header.highlightPrefix}</span>
                )}
                {header.highlightText}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Flow Container */}
        <div className="flex flex-col w-full lg:w-[55%] xl:w-1/2 bg-brand-pale rounded-2xl p-space-24 md:p-space-40 border border-border-card">
          
          {/* Header Row */}
          <div className="flex justify-between items-center mb-space-24 w-full">
            <span className="text-about-eyebrow-desktop text-ink-muted uppercase font-mulish">
              {flow.eyebrowLeft}
            </span>
            <span className="text-about-eyebrow-desktop text-brand-primary uppercase font-mulish">
              {flow.eyebrowRight}
            </span>
          </div>

          {/* Cards & Arrows */}
          <div className={cn(
            "w-full",
            flow.isGrid 
              ? "grid grid-cols-2 gap-[12px] md:gap-space-16 items-stretch"
              : "flex flex-col items-center"
          )}>
            {flow.steps.map((step, idx) => {
              const isLast = idx === flow.steps.length - 1;
              return (
                <div key={step.id || `step-${idx}`} className={cn("flex flex-col items-center w-full", flow.isGrid ? "h-full" : "")}>
                  <LeadQualificationFlowCard step={step} isGrid={flow.isGrid} />
                  
                  {/* Down Arrow between cards (only if not grid) */}
                  {!flow.isGrid && !isLast && (
                    <div className="py-space-16 text-brand-primary">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1V11M6 11L2 7M6 11L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </Container>
    </section>
  );
}
