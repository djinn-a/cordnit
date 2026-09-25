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
        "flex items-start py-space-16 border-b border-border-subtle group cursor-pointer hover:bg-primary-pale/50 transition-colors",
        // Desktop wrapper
        "sm:block sm:relative sm:p-space-24 md:p-space-32 lg:p-space-48 sm:border-primary sm:border-b-2 sm:hover:bg-primary-pale sm:cursor-auto",
        isLgRightBorder && "lg:border-r-2",
        !isLgBottomBorder && "lg:border-b-0"
      )}
    >
      {/* Icon & Number Area */}
      <div
        className={cn(
          // Mobile styling
          "mr-space-12 mt-space-2 shrink-0",
          // Desktop styling
          "sm:mr-0 sm:mt-0 sm:shrink sm:w-full sm:flex sm:justify-between sm:items-start sm:mb-space-40 lg:mb-space-48"
        )}
      >
        <div className="hidden sm:block">
          <Image
            src={service.iconPath}
            alt=""
            width={32}
            height={32}
            className="w-space-32 h-space-32"
          />
        </div>
        <div
          className={cn(
            "text-link-mobile",
            "sm:text-caption sm:font-semibold"
          )}
        >
          <span className="text-primary sm:text-ink">{service.num}</span>
        </div>
      </div>

      {/* Title & Description Area */}
      <div className={cn("flex-1 pr-space-12", "sm:pr-0 sm:w-full")}>
        <h3
          className={cn(
            "text-link-desktop sm:text-help-card-title-desktop mb-space-4 transition-colors",
            // Mobile specifics
            "group-hover:text-primary",
            // Desktop specifics
            "sm:text-primary sm:mb-space-12 lg:mb-space-16"
          )}
        >
          {service.title}
        </h3>
        <p className="text-ink-muted text-section-subtitle-mobile sm:text-card-desc">{service.desc}</p>
      </div>

      {/* Mobile Arrow Area */}
      <div className="mt-space-6 shrink-0 sm:hidden">
        <ArrowRight className="w-space-16 h-space-16 text-primary" />
      </div>
    </div>
  );
}
