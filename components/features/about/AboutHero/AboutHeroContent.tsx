import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export type AboutHeroContentProps = {
  title: string;
  bodyMobile: string;
  bodyDesktop: string;
};

export default function AboutHeroContent({
  title,
  bodyMobile,
  bodyDesktop,
}: AboutHeroContentProps) {
  // We explicitly split the title based on the exact visual layout from the data.
  // Alternatively we could just use the title as is if it naturally wraps,
  // but preserving the explicit break logic matching the previous hardcoded markup.
  return (
    <div className="absolute bottom-4 sm:bottom-12 left-4 sm:left-12 w-[calc(100%-2rem)] sm:w-auto md:w-[480px] lg:w-[560px] bg-surface/30 sm:bg-surface/20 backdrop-blur-md p-6 sm:p-12 rounded-card border border-surface/20 shadow-2xl">
      <p className="hidden sm:block text-surface/90 text-caption tracking-wide mb-6">
        About Cordinit
      </p>
      <h2 className="hidden sm:block text-h2 text-surface font-normal mb-3 sm:mb-4">
        {title.split("made more").map((part, index) =>
          index === 0 ? (
            <span key={index}>
              {part}
              <br />
            </span>
          ) : (
            <span key={index}>made more{part}</span>
          )
        )}
      </h2>
      <p className="sm:hidden text-surface/90 text-body font-light mb-8">
        {bodyMobile}
      </p>
      <p className="hidden sm:block text-surface/90 text-body font-light mb-10 pr-2">
        {bodyDesktop}
      </p>

      <div className="flex flex-row gap-3 sm:gap-4 w-full">
        <Button
          className="flex-1 sm:flex-none"
          rightIcon={<ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        >
          <span className="sm:hidden">Book a call</span>
          <span className="hidden sm:inline">Talk to Us</span>
        </Button>
        <Button
          variant="secondary"
          className="flex-1 sm:flex-none"
          rightIcon={
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          }
        >
          <span className="sm:hidden">Explore solutions</span>
          <span className="hidden sm:inline">Explore how we work</span>
        </Button>
      </div>
    </div>
  );
}
