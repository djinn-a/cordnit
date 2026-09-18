import Image from "next/image";

export type SplitContentSectionData = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
  };
};

export type SplitContentSectionProps = {
  data: SplitContentSectionData;
};

export default function SplitContentSection({ data }: SplitContentSectionProps) {
  return (
    <section className="w-full">
      <div className="mx-auto flex flex-col lg:flex-row items-start justify-between gap-space-40 lg:gap-space-64">
        {/* Image Column */}
        <div className="w-full lg:w-[500px] flex-shrink-0 order-2 lg:order-1">
          <div className="relative w-full aspect-[500/429] mx-auto lg:mx-0 rounded-split-image overflow-hidden">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="w-full lg:w-[704px] flex flex-col lg:items-end flex-shrink-0 order-1 lg:order-2">
          <div className="w-full max-w-[587px] flex flex-col gap-space-20 mx-auto lg:mx-0">
            <p className="text-eyebrow-mobile lg:text-page-hero-eyebrow uppercase text-brand-primary tracking-wider">
              {data.eyebrow}
            </p>
            <h2 className="text-section-title-mobile lg:text-split-section-title text-ink">
              {data.title}
            </h2>
            <div className="flex flex-col gap-space-24">
              {data.paragraphs.map((p, index) => (
                <p
                  key={index}
                  className="text-section-subtitle-mobile lg:text-page-hero-subtitle text-ink-muted"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
