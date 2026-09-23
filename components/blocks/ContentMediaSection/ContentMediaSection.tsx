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
    <section className="w-full">
      <Container className="px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-24 md:gap-space-50">
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
