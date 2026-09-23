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

export default function SplitContentSection({ data }: Readonly<SplitContentSectionProps>) {
  return (
    <section className="w-full">
      <div className="w-full max-w-container-xl px-0 md:px-space-32 lg:px-space-40 mx-auto flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row items-start md:items-center xl:items-start justify-between gap-space-40 md:gap-space-48 lg:gap-space-64">
        {/* Image Column */}
        <div className="w-full xl:w-5/12 order-2 md:order-1 xl:order-1">
          <div className="relative w-full aspect-media-wrap mx-auto md:mx-0 lg:mx-0 rounded-split-image overflow-hidden">
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
        <div className="w-full xl:w-7/12 flex flex-col md:items-start xl:items-end order-1 md:order-2 xl:order-2">
          <div className="w-full max-w-media-wrap flex flex-col gap-space-20 mx-auto md:mx-0 lg:mx-0">
            <p className="text-eyebrow-mobile lg:text-page-hero-eyebrow uppercase text-brand-primary tracking-wider">
              {data.eyebrow}
            </p>
            <h2 className="text-section-title-mobile md:text-card-title lg:text-split-section-title text-ink font-mulish">
              {data.title}
            </h2>
            <div className="flex flex-col gap-space-24">
              {data.paragraphs.map((p) => (
                <p
                  key={p}
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
