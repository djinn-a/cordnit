import Image from "next/image";
import { ContentMediaSectionProps } from "./ContentMediaSection.types";

export default function ContentMediaImages({
  mainImage,
  secondaryImage,
}: Readonly<Pick<ContentMediaSectionProps, "mainImage" | "secondaryImage">>) {
  return (
    <div className="relative w-full lg:w-[45%] max-w-media-wrap aspect-media-wrap shrink-0 mx-auto lg:mx-0">
      {/* Main Image Container */}
      <div className={secondaryImage ? "absolute right-0 top-0 w-media-main md:w-3/4 aspect-media-main rounded-card overflow-hidden" : "relative w-full h-full"}>
        <Image 
          src={mainImage.src} 
          alt={mainImage.alt}
          fill
          sizes={secondaryImage ? "(min-width: 768px) 450px, 236px" : "(min-width: 640px) 600px, 100vw"}
          className={secondaryImage ? "object-cover" : "object-contain"}
        />
      </div>
      
      {/* Secondary Image */}
      {secondaryImage && (
        <div className="absolute left-0 top-media-sec md:top-auto md:bottom-space-24 w-media-sec md:w-5/12 aspect-media-sec rounded-card-sm md:rounded-card-md border-2 md:border-4 border-surface overflow-hidden shadow-card">
          <Image 
            src={secondaryImage.src} 
            alt={secondaryImage.alt}
            fill
            sizes="(min-width: 768px) 250px, 153px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
