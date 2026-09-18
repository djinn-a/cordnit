import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container/Container";
import Button from "@/components/ui/Button/Button";
import { ContentMediaSectionProps } from "./ContentMediaSection.types";

export default function ContentMediaSection({
  eyebrow,
  title,
  description,
  cta,
  mainImage,
  secondaryImage,
}: Readonly<ContentMediaSectionProps>) {
  return (
    <section className="w-full pt-14 px-0 md:pt-space-80 md:px-15">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-15">
          {/* Left Content */}
          <div className="flex-1 flex flex-col">
            {eyebrow && (
              <span className="text-eyebrow-mobile leading-4 md:text-eyebrow-desktop md:leading-none uppercase tracking-[1px] text-primary mb-2 md:mb-space-16">
                {eyebrow}
              </span>
            )}
            
            <h2 className="text-section-title-mobile leading-8 md:text-hero-header-eb md:leading-[70px] text-ink mb-3 md:mb-5">
              {title}
            </h2>
            
            <p className="text-section-subtitle-mobile md:text-section-subtitle text-ink-muted mb-0 md:mb-5">
              {description}
            </p>
            
            {cta && (
              <div className="mt-3 md:mt-5">
                <Link href={cta.href}>
                  <Button 
                    variant="primary" 
                    className="w-[260px] md:w-cta-button h-11 md:h-12 rounded-lg px-6 py-3 justify-between text-sm md:text-button"
                    rightIcon={<Image src="/images/content-media/arrow.svg" alt="" width={9} height={9} className="ml-auto" />}
                  >
                    {cta.label}
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Right Media Wrapper */}
          <div className="relative w-full h-[289px] md:w-150 md:h-121 shrink-0">
            {/* Main Image Container */}
            <div className="absolute right-0 top-0 w-[271px] h-[251px] md:w-113.5 md:h-105 rounded-card overflow-hidden">
              <Image 
                src={mainImage.src} 
                alt={mainImage.alt}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Secondary Image */}
            {secondaryImage && (
              <div className="absolute left-[11px] bottom-[10px] w-[153px] h-[143px] rounded-[13px] border-[2px] md:left-0 md:bottom-0 md:w-[256px] md:h-60 md:rounded-[21px] md:border-[3.5px] border-surface overflow-hidden shadow-card">
                <Image 
                  src={secondaryImage.src} 
                  alt={secondaryImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
