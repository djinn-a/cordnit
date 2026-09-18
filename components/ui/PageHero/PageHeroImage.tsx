import Image from "next/image";

type PageHeroImageProps = {
  src: string;
  alt: string;
  quoteOverlay?: {
    quote: string;
    author: string;
  };
};

export default function PageHeroImage({
  src,
  alt,
  quoteOverlay,
}: PageHeroImageProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[393px] mb-[60px] md:mb-0">
      <div className="relative w-[90%] md:w-full h-full rounded-page-hero overflow-hidden shadow-lg">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1320px"
        />
      </div>
      {quoteOverlay && (
        <div className="absolute -bottom-[50px] right-0 z-10 md:hidden inline-flex flex-col items-start gap-space-12 p-space-16 rounded-[24px] border border-white/20 bg-gradient-to-b from-white/40 to-black/20 backdrop-blur-[10px] w-[230px] shadow-lg">
          <p className="text-white text-eyebrow-desktop">
            {quoteOverlay.quote}
          </p>
          <p className="text-white text-eyebrow-mobile uppercase tracking-wider">
            {quoteOverlay.author}
          </p>
        </div>
      )}
    </div>
  );
}
