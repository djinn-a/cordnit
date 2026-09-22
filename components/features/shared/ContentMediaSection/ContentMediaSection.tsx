import Container from "@/components/ui/Container/Container";
import ContentMediaText from "./ContentMediaText";
import ContentMediaImages from "./ContentMediaImages";
import { ContentMediaSectionProps } from "./ContentMediaSection.types";

export default function ContentMediaSection({
  eyebrow,
  title,
  description,
  cta,
  mainImage,
  secondaryImage,
}: Readonly<ContentMediaSectionProps>) {
  return (
    <section className="w-full px-0 md:px-15">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-15">
          <ContentMediaText 
            eyebrow={eyebrow}
            title={title}
            description={description}
            cta={cta}
          />
          <ContentMediaImages 
            mainImage={mainImage}
            secondaryImage={secondaryImage}
          />
        </div>
      </Container>
    </section>
  );
}
