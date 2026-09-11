import { TeamMember } from "./teamData";

export type TeamMemberCardProps = {
  member: TeamMember;
  className?: string;
};

export default function TeamMemberCard({ member, className = "" }: TeamMemberCardProps) {
  return (
    <div
      className={`relative shrink-0 snap-start rounded-card overflow-hidden shadow-md group ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-4 left-4 right-4 bg-surface/70 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm border border-surface/40">
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
  );
}
