import type { ReactNode } from "react";
import type { HeroContent } from "./heroContent";

type HeroMediaProps = Pick<HeroContent, "imageSrc" | "imageAlt"> & {
  children?: ReactNode;
};

export default function HeroMedia({
  imageSrc,
  imageAlt,
  children,
}: HeroMediaProps) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl h-[480px] xs:h-[520px] sm:h-[550px] lg:h-[600px] mb-0 sm:mb-8">
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      {children}
    </div>
  );
}
