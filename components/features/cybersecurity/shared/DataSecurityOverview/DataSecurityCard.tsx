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
      <div className="bg-white border border-[#DCE6F5] rounded-[8px] md:rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-[calc(50%-6px)] md:w-[204px] min-h-[140px] md:h-[216px] flex-none p-[16px] md:p-[21px] flex flex-col justify-start items-start">
        <div className="flex flex-col gap-[8px] md:gap-[12px] w-full h-full justify-between">
          {/* Step Number with Dot */}
          <div className="relative w-full h-[18px] md:h-[22px] flex items-center">
            <span className="text-[#2251FF] text-[10px] md:text-[12px] leading-[14px] md:leading-[18px] font-semibold z-10 font-mulish">
              {stepNumber}
            </span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full bg-[#2251FF]/30"></div>
          </div>
          
          {/* Title */}
          <h3 className="text-[#000000] text-[12px] md:text-[20px] leading-[16px] md:leading-[28px] font-semibold md:font-bold font-mulish">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-[#555555] text-[10px] md:text-[16px] leading-[14px] md:leading-[24px] font-mulish">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white border border-border-card rounded-card-sm shadow-help-card p-space-12 md:p-space-21 flex flex-col justify-start items-start self-stretch",
      "w-[calc(50%-6px)] md:w-[calc(25%-18px)] md:flex-none md:min-h-space-59"
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
