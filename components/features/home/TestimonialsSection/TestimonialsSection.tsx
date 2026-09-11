"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui";

export type TestimonialItem = {
  id: string | number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
};

export type TestimonialsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: TestimonialItem[];
};

const defaultItems: TestimonialItem[] = [
  {
    id: 1,
    name: "Michelle Pieszko",
    role: "VP, Cybersecurity Operations",
    company: "Company Name",
    quote:
      '"Security isn\'t just about protection. It\'s about creating the confidence to move faster."',
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Nitin Raina",
    role: "Chief Information Security Officer",
    company: "Global Financial Services",
    quote:
      '"The architectural clarity Cordinit brings has transformed how our board understands risk posture."',
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Rohit Kohli",
    role: "Deputy CISO",
    company: "Enterprise Tech Solutions",
    quote:
      '"Scalability without compromise. It\'s rare to find a platform that delivers both operational rigor and agility."',
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Igor Tsygan...",
    role: "President & CTO",
    company: "Innovate Data Corp",
    quote:
      '"We deployed their framework in weeks, not months. The precision is unmatched."',
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function TestimonialsSection({
  eyebrow = "TESTIMONIALS",
  title = "The technology partner trusted by security teams worldwide",
  description = "Hear from industry leaders who have used our expertise to strengthen their security architecture.",
  items = defaultItems,
}: TestimonialsSectionProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Section spacing="md" className="py-8 sm:py-20 lg:py-24 overflow-hidden">
      <Container width="wide">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={description}
          align="center"
          className="items-start sm:items-center text-left sm:text-center mb-10 sm:mb-16 max-w-3xl mx-auto"
        />

        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-6 sm:pb-8 snap-x snap-mandatory hide-scrollbar mb-4 sm:mb-8"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-none w-full sm:w-[320px] md:w-[380px] snap-start flex flex-col bg-surface border border-primary-muted rounded-card-lg overflow-hidden"
            >
              <div className="relative h-[280px] sm:h-[380px] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-4 left-4">
                  <button
                    type="button"
                    className="flex items-center justify-center w-12 h-10 bg-surface rounded-lg shadow-sm hover:bg-primary-pale transition-colors"
                    aria-label={`Play testimonial from ${item.name}`}
                  >
                    <Play
                      className="h-4 w-4 text-primary ml-0.5"
                      fill="currentColor"
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-h4 font-normal sm:font-bold mb-1">
                  {item.name}
                </h3>
                <p className="text-caption mb-0.5">{item.role}</p>
                <p className="text-caption mb-4 sm:mb-5">{item.company}</p>
                <p className="text-body-sm text-ink mb-6 flex-grow">
                  {item.quote}
                </p>
                <a
                  href="#"
                  className="flex items-center text-primary text-body-sm font-medium hover:text-primary-hover transition-colors mt-auto"
                >
                  Watch testimonial <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ink" />
            <div className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
            <div className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-subtle text-ink-muted hover:text-ink hover:border-ink transition-colors"
              aria-label="Scroll testimonials left"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-subtle text-ink-muted hover:text-ink hover:border-ink transition-colors"
              aria-label="Scroll testimonials right"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
