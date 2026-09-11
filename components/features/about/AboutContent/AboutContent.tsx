import { Button, Container, Section, SectionHeader } from "@/components/ui";

export type AboutContentProps = {
  eyebrow?: string;
  title?: string;
  storyTitle?: string;
  paragraphs?: string[];
  imageSrc?: string;
  imageAlt?: string;
};

export default function AboutContent({
  eyebrow = "ABOUT CORDINIT",
  title = "Making technology work for what matters.",
  storyTitle = "Our Story",
  paragraphs = [
    "Cordinit exists to make that change more useful: connecting clear thinking, capable delivery and long-term operational support around the outcomes our clients need.",
    "We believe successful transformation is not just about introducing new tools. It is about creating the conditions for people, processes and technology to work better together.",
  ],
  imageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  imageAlt = "Cordinit team working in modern office",
}: AboutContentProps = {}) {
  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <SectionHeader eyebrow={eyebrow} title={title} className="mb-5 md:mb-10" />

            <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
              <Button size="sm" className="rounded-full px-4 md:px-5">
                Our Story
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full px-4 md:px-5 text-ink-muted md:text-primary border-border-subtle md:border-primary-border"
              >
                Our Mission
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full px-4 md:px-5 text-ink-muted md:text-primary border-border-subtle md:border-primary-border"
              >
                Our Vision
              </Button>
            </div>

            <h3 className="text-h3 mb-4 md:mb-5">{storyTitle}</h3>
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-body mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-end">
            <div className="relative w-full max-w-[550px] h-[360px] xs:h-[400px] md:h-[500px] rounded-card-lg overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
