import Container from "@/components/ui/Container/Container";
import { slugify } from "@/lib/cms/slugify";
import { cn } from "@/lib/utils/cn";
import type { BlogArticleSectionProps } from "./BlogArticleSection.types";
import BlogContentBlockItem from "./BlogContentBlockItem";
import BlogHeroBanner from "./BlogHeroBanner";
import BlogTableOfContents, { type TocItem } from "./BlogTableOfContents";

function buildSectionId(heading: string, index: number): string {
  const base = slugify(heading).slice(0, 60);
  return base ? `section-${index + 1}-${base}` : `section-${index + 1}`;
}

export default function BlogArticleSection({
  className,
  category,
  publishDate,
  articleTitle,
  bannerImage,
  introText,
  lastUpdatedLabel,
  lastUpdatedDate,
  tocTitle,
  blocks = [],
}: Readonly<BlogArticleSectionProps>) {
  const blocksWithIds = blocks.map((block, index) => ({
    block,
    sectionId: buildSectionId(block.tocLabel || block.heading, index),
  }));

  const tocItems: TocItem[] = blocksWithIds
    .filter(({ block }) => Boolean(block.tocLabel || block.heading))
    .map(({ block, sectionId }) => ({
      id: sectionId,
      label: block.tocLabel || block.heading,
    }));

  return (
    <section className={cn("w-full", className)}>
      <Container className="flex flex-col justify-center items-center gap-space-20 md:gap-space-80">
        <BlogHeroBanner
          category={category}
          publishDate={publishDate}
          articleTitle={articleTitle}
          bannerImage={bannerImage}
          introText={introText}
        />

        {blocksWithIds.length > 0 && (
          <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-space-20 lg:gap-space-32">
            <BlogTableOfContents
              lastUpdatedLabel={lastUpdatedLabel}
              lastUpdatedDate={lastUpdatedDate}
              tocTitle={tocTitle}
              items={tocItems}
            />

            <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-space-20 md:gap-space-40">
              {blocksWithIds.map(({ block, sectionId }) => (
                <BlogContentBlockItem
                  key={block._id ?? sectionId}
                  sectionId={sectionId}
                  block={block}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
