import Image from "next/image";
import { ContentMediaSectionProps } from "./ContentMediaSection.types";

export default function ContentMediaImages({
  mainImage,
  secondaryImage,
}: Readonly<Pick<ContentMediaSectionProps, "mainImage" | "secondaryImage">>) {
  return (
    <div className="relative w-full md:w-1/2 max-w-[600px] aspect-[328/350] md:aspect-media-wrap shrink-0 mx-auto md:mx-0">
      {/* Main Image Container */}
      <div className="absolute right-0 top-0 w-[82.5%] md:w-3/4 aspect-[270.693/250.642] md:aspect-media-main rounded-card overflow-hidden">
        <Image 
          src={mainImage.src} 
          alt={mainImage.alt}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Secondary Image */}
      {secondaryImage && (
        <div className="absolute left-0 bottom-0 md:bottom-0 w-[46.5%] md:w-5/12 aspect-[152.698/143.2] md:aspect-media-sec rounded-card-sm md:rounded-card-md border-2 md:border-4 border-surface overflow-hidden shadow-card">
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
