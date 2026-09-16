"use client";

import { Container, Section, SectionHeader, CarouselControls } from "@/components/ui";
import { useScrollSnapCarousel } from "@/hooks/useScrollSnapCarousel";
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
  const {
    scrollerRef,
    activeIndex,
    pageCount,
    scrollToIndex,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    onScrollerScroll,
  } = useScrollSnapCarousel({ itemCount: members.length });

  return (
    <Section spacing="lg" className="overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-16">
          <SectionHeader
            eyebrow={eyebrow}
            eyebrowClassName="text-mobile-subhead sm:text-eyebrow-desktop"
            title={title}
            titleClassName="text-mobile-heading-1-eb font-extrabold sm:text-section-title"
            className="md:w-3/5"
          />
          <div className="md:w-2/5">
            <p className="text-mobile-body-1 md:text-section-subtitle text-body">{description}</p>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={onScrollerScroll}
          className="flex md:grid flex-nowrap md:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 md:gap-6 mb-8 md:mb-12 snap-x snap-mandatory pb-4 md:pb-0 hide-scrollbar scroll-smooth"
        >
          {members.map((member, index) => (
            <TeamMemberCard
              key={`${member.name}-${member.role}-${index}`}
              member={member}
              className="flex-none w-[80%] md:w-full h-[400px] lg:h-[500px]"
            />
          ))}
        </div>

        <CarouselControls
          count={pageCount}
          activeIndex={activeIndex}
          onPrev={scrollPrev}
          onNext={scrollNext}
          onDotClick={scrollToIndex}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          prevLabel="Previous team member"
          nextLabel="Next team member"
          className="md:hidden"
        />
      </Container>
    </Section>
  );
}
