import Image from "next/image";
import type { PerspectiveSectionProps } from "./PerspectiveSection.types";

export default function PerspectiveSection({
  eyebrow,
  title,
  description,
  image,
}: Readonly<PerspectiveSectionProps>) {
  return (
    <section className="w-full pt-space-80 px-space-60">
      <div className="w-full mx-auto max-w-7xl h-83.25 px-10 py-8 bg-grad-3 border border-primary/20 rounded-4xl">
        <div className="flex items-center gap-8 h-full">
          {/* Left Content */}
          <div className="flex-[0_1_692px] flex flex-col justify-center">
            {eyebrow && (
              <span className="text-eyebrow-desktop text-primary uppercase tracking-[1px] mb-4">
                {eyebrow}
              </span>
            )}
            
            <h2 className="text-section-title leading-17 text-ink mb-5">
              {title}
            </h2>
            
            <p className="text-section-subtitle text-ink-muted w-156.75">
              {description}
            </p>
          </div>
          
          {/* Right Media */}
          <div className="relative flex-[0_1_474px] h-66.75 shrink-0 overflow-hidden rounded-card">
            <Image 
              src={image.src} 
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
