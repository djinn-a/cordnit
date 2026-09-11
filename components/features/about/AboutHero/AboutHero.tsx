import { ArrowRight } from "lucide-react";
import { Button, Container, Section } from "@/components/ui";

export type AboutHeroProps = {
  title?: string;
  bodyMobile?: string;
  bodyDesktop?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function AboutHero({
  title = "Technology change made more useful.",
  bodyMobile = "From secure foundations to connected experiences and smarter operations, we help organisations turn technology change into.",
  bodyDesktop = "We help organisations make confident progress through technology securely, thoughtfully and with a focus on what will make a real difference.",
  imageSrc = "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2000&auto=format&fit=crop",
  imageAlt = "Cordinit Office",
}: AboutHeroProps = {}) {
  return (
    <Section spacing="sm" className="py-8">
      <Container>
        <div className="sm:hidden text-center mb-6">
          <h2 className="text-h2">
            Technology change
            <br />
            made more useful.
          </h2>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-[420px] xs:h-[480px] sm:h-[500px] md:h-[550px] lg:h-[650px]">
          <div className="absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="absolute bottom-4 sm:bottom-12 left-4 sm:left-12 w-[calc(100%-2rem)] sm:w-auto md:w-[480px] lg:w-[560px] bg-white/30 sm:bg-white/20 backdrop-blur-md p-6 sm:p-12 rounded-card border border-white/20 shadow-2xl">
            <p className="hidden sm:block text-white/90 text-caption tracking-wide mb-6">
              About Cordinit
            </p>
            <h2 className="hidden sm:block text-h2 text-white font-normal mb-3 sm:mb-4">
              Technology change
              <br />
              made more useful.
            </h2>
            <p className="sm:hidden text-white/90 text-body font-light mb-8">
              {bodyMobile}
            </p>
            <p className="hidden sm:block text-white/90 text-body font-light mb-10 pr-2">
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
        </div>
      </Container>
    </Section>
  );
}
