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
    <section className="w-full pt-space-80 px-15">
      <Container>
        <div className="flex flex-row items-center gap-15">
          {/* Left Content */}
          <div className="flex-1 flex flex-col">
            {eyebrow && (
              <span className="text-eyebrow-desktop uppercase tracking-[1px] text-primary mb-space-16">
                {eyebrow}
              </span>
            )}
            
            <h2 className="text-hero-header-eb text-ink mb-5">
              {title}
            </h2>
            
            <p className="text-section-subtitle text-ink-muted mb-5">
              {description}
            </p>
            
            {cta && (
              <div className="mt-5">
                <Link href={cta.href}>
                  <Button 
                    variant="primary" 
                    className="w-cta-button h-12 rounded-lg px-6 py-3 justify-between"
                    rightIcon={<Image src="/images/content-media/arrow.svg" alt="" width={9} height={9} className="ml-auto" />}
                  >
                    {cta.label}
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Right Media Wrapper */}
          <div className="relative w-150 h-121 shrink-0">
            {/* Main Image Container */}
            <div className="absolute right-0 top-0 w-113.5 h-105 rounded-card overflow-hidden">
              <Image 
                src={mainImage.src} 
                alt={mainImage.alt}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Secondary Image */}
            {secondaryImage && (
              <div className="absolute left-0 bottom-0 w-[256px] h-60 rounded-[21px] border-[3.5px] border-surface overflow-hidden shadow-card">
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
