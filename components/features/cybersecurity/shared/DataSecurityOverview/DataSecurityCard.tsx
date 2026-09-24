import { cn } from "@/lib/utils/cn";

type DataSecurityCardProps = {
  variant?: string;
  stepNumber: string;
  title: string;
  description: string;
};

export function DataSecurityCard({ variant, stepNumber, title, description }: Readonly<DataSecurityCardProps>) {
  if (variant === "cloud-security") {
    return (
      <div className="bg-white border border-border-card rounded-(--spacing-space-8) md:rounded-(--spacing-space-12) shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-[calc(50%-theme(spacing.space-6))] md:w-space-51 min-h-[140px] md:h-[216px] flex-none p-space-16 md:p-space-21 flex flex-col justify-start items-start">
        <div className="flex flex-col gap-space-8 md:gap-space-12 w-full h-full justify-between">
          {/* Step Number with Dot */}
          <div className="relative w-full h-[18px] md:h-space-22 flex items-center">
            <span className="text-brand-primary text-space-10 md:text-space-12 leading-space-14 md:leading-[18px] font-semibold z-10 font-mulish">
              {stepNumber}
            </span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-space-6 h-space-6 md:w-space-8 md:h-space-8 rounded-full bg-brand-primary/30"></div>
          </div>
          
          {/* Title */}
          <h3 className="text-ink text-[12px] md:text-[20px] leading-space-16 md:leading-[28px] font-semibold md:font-bold font-mulish">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-ink-muted text-[10px] md:text-[16px] leading-space-14 md:leading-space-24 font-mulish">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white border border-border-card rounded-card-sm shadow-help-card p-space-12 md:p-space-21 flex flex-col justify-start items-start self-stretch",
      "w-[calc(50%-(var(--spacing-space-6)))] md:w-[calc(25%-18px)] md:flex-none md:min-h-space-59"
    )}>
      <div className="flex flex-col gap-space-10 md:gap-space-12 w-full">
        {/* Step Number with Dot */}
        <div className="relative w-full h-space-14 md:h-space-22 flex items-center">
          <span className="text-brand-primary text-stat-desc-mobile md:text-help-card-prefix z-10 font-mulish">
            {stepNumber}
          </span>
          <div className="absolute right-0 w-space-7 h-space-7 md:w-space-8 md:h-space-8 rounded-full bg-brand-primary/30"></div>
        </div>
        
        {/* Title */}
        <h3 className="text-black text-heading2-sb-mobile md:text-help-card-title-mobile font-mulish">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-ink-muted text-help-card-desc-mobile md:text-card-desc font-mulish">
          {description}
        </p>
      </div>
    </div>
  );
}
