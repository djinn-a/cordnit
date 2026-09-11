"use client";

import { ArrowRight } from "lucide-react";
import { useContactModal } from "../../contact/ContactModal/ContactModalProvider";
import { Button, Container, Section } from "@/components/ui";

export type HeroSectionProps = {
  eyebrow?: string;
  titleDesktop?: string;
  titleMobile?: string;
  cardEyebrow?: string;
  cardTitle?: string;
  cardBody?: string;
  primaryCta?: string;
  secondaryCta?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const defaults: Required<HeroSectionProps> = {
  eyebrow: "WELCOME TO CORDINIT",
  titleDesktop: "Simplifying Complexity. Enabling Meaningful Transformation.",
  titleMobile: "Technology change made more useful.",
  cardEyebrow: "SECURE DIGITAL TRANSFORMATION",
  cardTitle: "Simplifying Complexity. Enabling Meaningful Transformation.",
  cardBody:
    "By partnering with us you can accelerate growth, strengthen performance and turn digital challenges into genuine competitive advantages.",
  primaryCta: "Book a call",
  secondaryCta: "Explore solutions",
  imageSrc:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
  imageAlt: "Corporate Digital Transformation",
};

export default function HeroSection(props: HeroSectionProps = {}) {
  const content = { ...defaults, ...props };
  const { openModal } = useContactModal();

  return (
    <Section spacing="none" background="transparent" className="pt-12 xs:pt-14 sm:pt-16 pb-6 sm:pb-16 md:pb-20 lg:pb-24">
      <Container className="flex flex-col items-center">
        <div className="text-center mb-6 sm:mb-8">
          <p className="hidden sm:block text-eyebrow mb-3">{content.eyebrow}</p>
          <h1 className="hidden sm:block text-display text-center">
            {content.titleDesktop.includes("Enabling") ? (
              <>
                Simplifying Complexity. Enabling <br />
                Meaningful Transformation.
              </>
            ) : (
              content.titleDesktop
            )}
          </h1>
          <h1 className="sm:hidden text-display text-center px-2">
            Technology change
            <br />
            made more useful.
          </h1>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-[480px] xs:h-[520px] sm:h-[550px] lg:h-[600px] mb-0 sm:mb-8">
          <div className="absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.imageSrc}
              alt={content.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 max-w-[420px] sm:max-w-[540px] w-[94%] md:w-[90%] lg:w-full bg-white/30 backdrop-blur-xl border border-white/40 p-5 xs:p-6 sm:p-8 rounded-2xl shadow-card">
            <p className="hidden sm:block text-white/90 text-caption tracking-widest uppercase mb-2 sm:mb-3">
              {content.cardEyebrow}
            </p>
            <h2 className="hidden sm:block text-h4 text-white font-normal mb-3 sm:mb-4 leading-[1.3]">
              Simplifying Complexity. Enabling <br />
              Meaningful Transformation.
            </h2>
            <p className="text-white/90 text-body font-medium sm:font-light mb-5 sm:mb-6">
              By partnering with us you can accelerate growth,
              <br />
              strengthen performance and turn digital challenges into <br />
              genuine competitive advantages.
            </p>

            <div className="flex flex-row gap-3 sm:gap-4 w-full">
              <Button
                onClick={openModal}
                className="flex-1"
                rightIcon={<ArrowRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" />}
              >
                {content.primaryCta}
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                rightIcon={
                  <ArrowRight className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-primary" />
                }
              >
                {content.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
