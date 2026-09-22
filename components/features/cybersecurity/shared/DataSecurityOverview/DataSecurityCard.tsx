type DataSecurityCardProps = {
  stepNumber: string;
  title: string;
  description: string;
};

export function DataSecurityCard({ stepNumber, title, description }: Readonly<DataSecurityCardProps>) {
  return (
    <div className="bg-white border border-border-card rounded-xl shadow-sm w-space-51 h-space-59 p-space-21 flex flex-col justify-start items-start">
      <div className="flex flex-col gap-space-12 w-full">
        {/* Step Number with Dot */}
        <div className="relative w-full h-space-22 flex items-center">
          <span className="text-brand-primary text-help-card-prefix z-10">
            {stepNumber}
          </span>
          <div className="absolute right-0 w-space-8 h-space-8 rounded-full bg-brand-primary/30"></div>
        </div>
        
        {/* Title */}
        <h3 className="text-black text-help-card-title-mobile">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-ink-muted text-card-desc">
          {description}
        </p>
      </div>
    </div>
  );
}
