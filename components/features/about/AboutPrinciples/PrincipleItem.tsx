import { cn } from "@/lib/utils/cn";
import { PrincipleItemType } from "./principlesData";

export type PrincipleItemProps = {
  principle: PrincipleItemType;
  isLast?: boolean;
};

export default function PrincipleItem({ principle, isLast = false }: PrincipleItemProps) {
  return (
    <div
      className={cn(
        "relative flex flex-row md:flex-col items-start py-8 md:py-0 md:pl-10",
        !isLast && "border-b border-border-subtle md:border-b-0"
      )}
    >
      <div className="text-hero-title xs:text-[75px] md:absolute md:top-[-28px] md:left-[-15px] md:text-[120px] font-bold text-ink-muted opacity-10 leading-[0.8] md:leading-none select-none z-0 tracking-tighter mr-5 md:mr-0 shrink-0 mt-[-5px] md:mt-0">
        {principle.number}
      </div>
      <div className="relative z-10 flex flex-col pt-1 md:pt-0">
        <h3 className="text-mobile-heading-5 md:text-section-title-head text-ink uppercase tracking-wide mb-2 md:mb-3 md:mt-6">
          {principle.title}
        </h3>
        <p className="text-mobile-body-4 sm:text-body-sm sm:card-desc text-ink-muted">{principle.description}</p>
      </div>
    </div>
  );
}
