import Image from "next/image";
import { ContentMediaSectionProps } from "./ContentMediaSection.types";

export default function ContentMediaImages({
  mainImage,
  secondaryImage,
}: Readonly<Pick<ContentMediaSectionProps, "mainImage" | "secondaryImage">>) {
  return (
    <div className="relative w-full h-cm-wrap-mob md:w-1/2 lg:w-cm-wrap-dt md:h-auto md:aspect-media-wrap lg:aspect-auto lg:h-cm-wrap-h-dt shrink-0">
      {/* Main Image Container */}
      <div className="absolute right-0 top-0 w-cm-main-w-mob h-cm-main-h-mob md:w-3/4 md:h-auto md:aspect-media-main lg:w-cm-main-w-dt lg:h-cm-main-h-dt lg:aspect-auto rounded-card overflow-hidden">
        <Image 
          src={mainImage.src} 
          alt={mainImage.alt}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Secondary Image */}
      {secondaryImage && (
        <div className="absolute left-cm-sec-left bottom-space-10 w-cm-sec-w-mob h-cm-sec-h-mob rounded-card-sm border-2 md:left-0 md:bottom-0 md:w-5/12 md:h-auto md:aspect-media-sec lg:w-cm-sec-w-dt lg:h-cm-sec-h-dt lg:aspect-auto md:rounded-card-md md:border-4 border-surface overflow-hidden shadow-card">
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
