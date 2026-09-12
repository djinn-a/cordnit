import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { HelpService } from "./helpServices";

type HelpServiceCardProps = {
  service: HelpService;
  isLgRightBorder: boolean;
  isLgBottomBorder: boolean;
};

export default function HelpServiceCard({
  service,
  isLgRightBorder,
  isLgBottomBorder,
}: Readonly<HelpServiceCardProps>) {
  return (
    <div
      className={cn(
        // Base / Mobile wrapper
        "flex items-start py-4 border-b border-border-subtle group cursor-pointer hover:bg-primary-pale/50 transition-colors",
        // Desktop wrapper
        "sm:block sm:relative sm:p-6 md:p-8 lg:p-12 sm:border-primary sm:border-b sm:hover:bg-primary-pale sm:cursor-auto",
        isLgRightBorder && "lg:border-r",
        !isLgBottomBorder && "lg:border-b-0"
      )}
    >
      {/* Icon & Number Area */}
      <div
        className={cn(
          // Mobile styling
          "mr-3 mt-0.5 shrink-0",
          // Desktop styling
          "sm:mr-0 sm:mt-0 sm:shrink sm:w-full sm:flex sm:justify-between sm:items-start sm:mb-10 lg:mb-12"
        )}
      >
        <div className="hidden sm:block">
          <Image
            src={service.iconPath}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
        <div
          className={cn(
            "text-primary font-medium text-body-sm",
            "sm:text-caption sm:font-semibold sm:text-ink"
          )}
        >
          {service.num}
        </div>
      </div>

      {/* Title & Description Area */}
      <div className={cn("flex-1 pr-3", "sm:pr-0 sm:w-full")}>
        <h3
          className={cn(
            "text-h4 mb-1 transition-colors",
            // Mobile specifics
            "font-medium group-hover:text-primary",
            // Desktop specifics
            "sm:text-primary sm:mb-3 lg:mb-4 sm:font-700"
          )}
        >
          {service.title}
        </h3>
        <p className="text-body-sm">{service.desc}</p>
      </div>

      {/* Mobile Arrow Area */}
      <div className="mt-1.5 shrink-0 sm:hidden">
        <ArrowRight className="w-4 h-4 text-primary" />
      </div>
    </div>
  );
}
