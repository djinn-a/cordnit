import PageHeroContent from "./PageHeroContent";
import PageHeroImage from "./PageHeroImage";

export type PageHeroData = {
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href?: string;
  };
  image: {
    src: string;
    alt: string;
  };
};

export type PageHeroProps = {
  data: PageHeroData;
};

export default function PageHero({ data }: PageHeroProps) {
  return (
    <section className="w-full flex flex-col gap-space-80">
      {/* Content Section */}
      <div className="w-full">
        <PageHeroContent
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          cta={data.cta}
        />
      </div>

      {/* Image Section */}
      <div className="w-full">
        <PageHeroImage src={data.image.src} alt={data.image.alt} />
      </div>
    </section>
  );
}
