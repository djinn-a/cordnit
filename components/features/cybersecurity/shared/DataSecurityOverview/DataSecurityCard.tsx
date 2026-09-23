type DataSecurityCardProps = {
  stepNumber: string;
  title: string;
  description: string;
};

export function DataSecurityCard({ stepNumber, title, description }: Readonly<DataSecurityCardProps>) {
  return (
    <div className="bg-white border border-border-card rounded-card-sm shadow-help-card w-[calc(50%-6px)] md:w-space-51 h-full md:min-h-space-59 p-space-12 md:p-space-21 flex flex-col justify-start items-start">
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
