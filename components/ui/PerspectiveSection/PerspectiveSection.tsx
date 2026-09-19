import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PerspectiveSectionProps } from "./PerspectiveSection.types";

import Container from "../Container/Container";

export default function PerspectiveSection({
  className,
  eyebrow,
  title,
  description,
  image,
  cta,
}: Readonly<PerspectiveSectionProps>) {
  return (
    <section className={`w-full ${className || ""}`}>
      <Container>
        <div className="w-full h-auto p-6 md:p-12 md:h-83.25 bg-grad-3 border border-border-card rounded-[20px] md:rounded-4xl shadow-sm md:shadow-none">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0 h-auto md:h-full">
          {/* Left Content */}
          <div className="w-full md:flex-[0_1_692px] flex flex-col justify-center">
            {eyebrow && (
              <span className="text-eyebrow-mobile leading-4 md:text-eyebrow-desktop text-primary uppercase tracking-[1px] mb-2 md:mb-4">
                {eyebrow}
              </span>
            )}
            
            <h2 className="text-card-title-mobile leading-7 md:text-section-title md:leading-17 text-ink mb-4 md:mb-5">
              {title}
            </h2>
            
            {/* Mobile Divider */}
            <div className="w-35 h-px bg-border-card md:hidden shrink-0 mb-4"></div>

            <p className="text-section-subtitle-mobile leading-5.5 md:text-section-subtitle md:leading-7 text-ink-muted w-full md:w-156.75">
              {description}
            </p>

            {/* Mobile CTA */}
            {cta && (
              <Link 
                href={cta.href} 
                className="flex items-center justify-between w-33 h-11 bg-primary rounded-btn px-5 text-white text-link-mobile md:hidden shadow-sm mt-4"
              >
                {cta.label}
                <ArrowRight size={12} strokeWidth={3} />
              </Link>
            )}
          </div>
          
          {/* Right Media */}
          <div className="relative w-full md:flex-[0_1_474px] max-w-77 h-43.25 md:max-w-none md:h-66.75 shrink-0 overflow-hidden rounded-[14px] md:rounded-card isolate mx-auto md:mx-0">
            <Image 
              src={image.src} 
              alt={image.alt}
              fill
              className="object-cover"
            />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
