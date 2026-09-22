type DataSecurityCardProps = {
  stepNumber: string;
  title: string;
  description: string;
};

export function DataSecurityCard({ stepNumber, title, description }: Readonly<DataSecurityCardProps>) {
  return (
    <div className="bg-white border border-[#DCE6F5] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-[204px] h-[236px] p-[21px] flex flex-col justify-start items-start">
      <div className="flex flex-col gap-[12px] w-full">
        {/* Step Number with Dot */}
        <div className="relative w-full h-[22px] flex items-center">
          <span className="text-brand-primary text-[12px] font-semibold leading-[18px] font-mulish z-10">
            {stepNumber}
          </span>
          <div className="absolute right-0 w-[8px] h-[8px] rounded-full bg-[rgba(34,81,255,0.3)]"></div>
        </div>
        
        {/* Title */}
        <h3 className="text-black text-[20px] font-bold leading-[28px] font-mulish">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-[#555555] text-[16px] leading-[24px] font-mulish">
          {description}
        </p>
      </div>
    </div>
  );
}
