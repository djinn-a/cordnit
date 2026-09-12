"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { teamData, TeamMember } from "./teamData";
import TeamMemberCard from "./TeamMemberCard";

export type AboutTeamProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  members?: TeamMember[];
};

export default function AboutTeam({
  eyebrow = "THE PEOPLE BEHIND THE WORK",
  title = "Specialists brought together around the problem.",
  description = "Cordinit brings together specialists across security, cloud, engineering, data, Salesforce, AI and managed services.",
  members = teamData,
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
            titleClassName="text-20px font-800 md:text-48px"
            className="md:w-3/5"
          />
          <div className="md:w-2/5">
            <p className="text-black text-14px font-400 md:text-20px md:font-normal">{description}</p>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid flex-nowrap md:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 md:gap-6 mb-8 md:mb-12 snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar scroll-smooth"
        >
          {members.map((member, index) => (
            <TeamMemberCard
              key={`${member.name}-${member.role}-${index}`}
              member={member}
              className="w-[80%] md:w-full h-[400px] lg:h-[500px]"
            />
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
