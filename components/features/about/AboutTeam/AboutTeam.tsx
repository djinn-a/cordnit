"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
};

export type AboutTeamProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  members?: TeamMember[];
};

const defaultMembers: TeamMember[] = [
  {
    name: "Sarah Jenkins",
    role: "HEAD OF CLOUD ARCHITECTURE",
    description:
      "Guiding organizations through pragmatic AI adoption, focusing on tangible operational improvements and ethical implementation.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
  },
  {
    name: "Elena Rostova",
    role: "LEAD AI STRATEGIST",
    description:
      "Guiding organizations through pragmatic AI adoption, focusing on tangible operational improvements and ethical implementation.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
  },
  {
    name: "Elena Rostova",
    role: "LEAD AI STRATEGIST",
    description:
      "Guiding organizations through pragmatic AI adoption, focusing on tangible operational improvements and ethical implementation.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
  },
];

export default function AboutTeam({
  eyebrow = "THE PEOPLE BEHIND THE WORK",
  title = "Specialists brought together around the problem.",
  description = "Cordinit brings together specialists across security, cloud, engineering, data, Salesforce, AI and managed services.",
  members = defaultMembers,
}: AboutTeamProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const itemWidth = clientWidth * 0.8;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (
      newIndex !== activeIndex &&
      newIndex >= 0 &&
      newIndex < members.length
    ) {
      setActiveIndex(newIndex);
    }
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
  };

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-4 md:gap-16">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            className="md:w-3/5"
          />
          <div className="md:w-2/5">
            <p className="text-body">{description}</p>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid flex-nowrap md:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 md:gap-6 mb-8 md:mb-12 snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar scroll-smooth"
        >
          {members.map((member) => (
            <div
              key={`${member.name}-${member.role}`}
              className="relative shrink-0 w-[80%] md:w-full snap-start h-[400px] lg:h-[500px] rounded-card overflow-hidden shadow-md group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm border border-white/40">
                <h3 className="text-h4 mb-1">{member.name}</h3>
                <p className="text-eyebrow">{member.role}</p>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="text-caption text-ink leading-relaxed font-medium pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex md:hidden justify-between items-center px-2">
          <div className="flex space-x-2">
            {members.map((member, i) => (
              <div
                key={`${member.name}-dot-${i}`}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  i === activeIndex ? "bg-ink" : "bg-border-subtle"
                )}
              />
            ))}
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={scrollLeft}
              disabled={activeIndex === 0}
              className={cn(
                "w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center transition-colors",
                activeIndex === 0
                  ? "text-ink-subtle cursor-not-allowed"
                  : "text-ink-muted hover:text-ink hover:border-ink"
              )}
              aria-label="Previous team member"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              disabled={activeIndex === members.length - 1}
              className={cn(
                "w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center transition-colors",
                activeIndex === members.length - 1
                  ? "text-ink-subtle cursor-not-allowed"
                  : "text-ink-muted hover:text-ink hover:border-ink"
              )}
              aria-label="Next team member"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
