import { ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/ui";
import type { IndustryCardProps } from "./IndustryCard.types";

export default function IndustryCard({
  icon,
  title,
  description,
  cta,
}: Readonly<IndustryCardProps>) {
  return (
    <div className="flex flex-col p-3 md:p-8 bg-grad-3 border border-border-card rounded-lg backdrop-blur-[20px]">
      <div className="flex flex-col gap-3">
        {icon}
        <h3 className="text-[14px] font-bold leading-[22px] md:text-2xl md:font-semibold md:leading-8 text-ink">{title}</h3>
        <p className="text-[10px] font-normal leading-[14px] md:text-base md:leading-6 text-ink line-clamp-3">{description}</p>
        <CtaButton
          cta={cta}
          className="inline-flex items-center gap-1 text-primary text-[10px] font-semibold leading-relaxed md:text-sm md:leading-5 hover:text-primary-hover hover:bg-transparent transition-colors mt-1 p-0 h-auto justify-start"
          rightIcon={<ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />}
          analyticsContext="Industry Card"
        />
      </div>
    </div>
  );
}
