"use client";

import { useState } from "react";
import { TeamMember } from "./teamData";

export type TeamMemberCardProps = {
  member: TeamMember;
  className?: string;
};

export default function TeamMemberCard({ member, className = "" }: TeamMemberCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative shrink-0 snap-start rounded-card overflow-hidden shadow-md group cursor-pointer ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.image}
        alt={member.name}
        className={`w-full h-full object-cover transition-transform duration-700 ${
          isExpanded ? "scale-105" : "lg:group-hover:scale-105"
        }`}
      />
      <div className="absolute bottom-4 left-4 right-4 bg-surface/70 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm border border-surface/40">
        <h3 className="text-section-title-head mb-1">{member.name}</h3>
        <p className="text-about-eyebrow-desktop text-primary">{member.role}</p>
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p
              className={`text-section-subtitle-mobile text-ink-muted leading-relaxed font-medium pt-3 transition-opacity duration-500 delay-100 ${
                isExpanded ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"
              }`}
            >
              {member.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
