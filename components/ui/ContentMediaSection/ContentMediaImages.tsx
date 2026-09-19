import Image from "next/image";
import { ContentMediaSectionProps } from "./ContentMediaSection.types";

export default function ContentMediaImages({
  mainImage,
  secondaryImage,
}: Readonly<Pick<ContentMediaSectionProps, "mainImage" | "secondaryImage">>) {
  return (
    <div className="relative w-full h-[289px] md:w-1/2 lg:w-150 md:h-auto md:aspect-[600/484] lg:aspect-auto lg:h-121 shrink-0">
      {/* Main Image Container */}
      <div className="absolute right-0 top-0 w-[271px] h-[251px] md:w-[75%] md:h-auto md:aspect-[454/420] lg:w-113.5 lg:h-105 lg:aspect-auto rounded-card overflow-hidden">
        <Image 
          src={mainImage.src} 
          alt={mainImage.alt}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Secondary Image */}
      {secondaryImage && (
        <div className="absolute left-[11px] bottom-[10px] w-[153px] h-[143px] rounded-[13px] border-[2px] md:left-0 md:bottom-0 md:w-[43%] md:h-auto md:aspect-[256/240] lg:w-[256px] lg:h-60 lg:aspect-auto md:rounded-[21px] md:border-[3.5px] border-surface overflow-hidden shadow-card">
          <Image 
            src={secondaryImage.src} 
            alt={secondaryImage.alt}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
