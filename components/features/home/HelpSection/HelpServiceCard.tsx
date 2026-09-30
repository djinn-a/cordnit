import { ArrowRight } from "lucide-react";
import { Image } from '@/components/ui/Image';
import { cn } from "@/lib/utils/cn";
import type { HelpService } from "./helpServices";

type HelpServiceCardProps = {
  service: HelpService;
  borderClasses: string;
};

export default function HelpServiceCard({
  service,
  borderClasses,
}: Readonly<HelpServiceCardProps>) {
  return (
    <div
      className={cn(
        // Base / Mobile wrapper
        "flex items-start py-space-16 border-b border-border-subtle group cursor-pointer hover:bg-primary-pale/50 transition-colors",
        // Desktop wrapper
        "md:relative md:p-space-32 md:border-primary md:hover:bg-primary-pale md:cursor-auto md:flex md:flex-col md:items-start md:gap-space-32",
        borderClasses
      )}
    >
      {/* Icon & Number Area */}
      <div
        className={cn(
          // Mobile styling
          "mr-space-12 mt-space-2 shrink-0",
          // Desktop styling
          "md:mr-0 md:mt-0 md:shrink md:w-full md:flex md:justify-between md:items-start md:mb-0 lg:mb-0"
        )}
      >
        <div className="hidden md:block">
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
            "md:text-caption md:font-semibold"
          )}
        >
          <span className="text-primary md:text-ink">{service.num}</span>
        </div>
      </div>

      {/* Title & Description Area */}
      <div className={cn("flex-1 pr-space-12", "md:pr-0 md:w-full")}>
        <h3
          className={cn(
            "text-link-desktop md:text-[20px] md:font-bold md:leading-space-32 mb-space-4 transition-colors",
            // Mobile specifics
            "group-hover:text-primary",
            // Desktop specifics
            "md:text-primary md:mb-space-12 lg:mb-space-16"
          )}
        >
          {service.title}
        </h3>
        <p className="text-ink-muted text-section-subtitle-mobile md:text-card-desc">{service.desc}</p>
      </div>

      {/* Mobile Arrow Area */}
      <div className="mt-space-6 shrink-0 md:hidden">
        <ArrowRight className="w-space-16 h-space-16 text-primary" />
      </div>
    </div>
  );
}
