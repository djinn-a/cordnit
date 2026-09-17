import Image from "next/image";

type PageHeroImageProps = {
  src: string;
  alt: string;
};

export default function PageHeroImage({
  src,
  alt,
}: PageHeroImageProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[393px] rounded-page-hero overflow-hidden shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 1320px"
      />
    </div>
  );
}
