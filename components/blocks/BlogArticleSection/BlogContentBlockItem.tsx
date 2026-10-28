import MultilineText from "@/components/ui/MultilineText/MultilineText";
import type { BlogArticleBlock } from "./BlogArticleSection.types";
import BlogComparisonTable from "./BlogComparisonTable";
import BlogInlineMediaCallout from "./BlogInlineMediaCallout";
import BlogInlineNewsletter from "./BlogInlineNewsletter";

export interface BlogContentBlockItemProps {
  sectionId: string;
  block: BlogArticleBlock;
}

export default function BlogContentBlockItem({
  sectionId,
  block,
}: Readonly<BlogContentBlockItemProps>) {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-space-20 md:gap-space-40">
      <article
        id={sectionId}
        className="w-full scroll-mt-space-32 flex flex-col justify-start items-start gap-space-12 md:gap-space-16"
      >
        {block.heading && (
          <h2 className="w-full text-ink text-card-title-mobile md:text-cta-title-desktop font-extrabold md:font-bold font-mulish leading-space-28! md:leading-space-40!">
            <MultilineText text={block.heading} />
          </h2>
        )}

        {block.leadBoldText && (
          <p className="w-full text-justify text-ink text-heading2-sb-mobile md:text-help-card-title-desktop font-semibold md:font-bold font-mulish leading-space-24 md:leading-space-32">
            <MultilineText text={block.leadBoldText} />
          </p>
        )}

        {block.paragraphs &&
          block.paragraphs.length > 0 &&
          block.paragraphs.map((paragraph, idx) => (
            <p
              key={`${idx}-${paragraph.slice(0, 24)}`}
              className="w-full text-justify text-ink-muted text-help-card-desc-mobile md:text-section-title-h font-normal font-mulish leading-space-20 md:leading-space-24"
            >
              <MultilineText text={paragraph} />
            </p>
          ))}

        {block.labeledItems && block.labeledItems.length > 0 && (
          <div className="w-full flex flex-col justify-start items-start gap-space-8 md:gap-space-12">
            {block.labeledItems.map((item, idx) => (
              <p
                key={item._id ?? `${item.label}-${idx}`}
                className="w-full text-justify text-help-card-desc-mobile md:text-section-title-h font-mulish leading-space-20 md:leading-space-24"
              >
                <span className="text-ink font-bold">{item.label} </span>
                <span className="text-ink font-normal">
                  <MultilineText text={item.description} />
                </span>
              </p>
            ))}
          </div>
        )}

        {block.bulletItems && block.bulletItems.length > 0 && (
          <ul className="w-full flex flex-col justify-start items-start gap-space-8 md:gap-space-12 m-0 p-0 list-none">
            {block.bulletItems.map((bullet, idx) => (
              <li
                key={`${idx}-${bullet.slice(0, 24)}`}
                className="w-full pl-space-8 md:pl-space-24 inline-flex justify-start items-start gap-space-8 md:gap-space-12"
              >
                <span
                  className="pt-space-8 md:pt-space-10 flex justify-start items-center shrink-0"
                  aria-hidden="true"
                >
                  <span className="size-1 md:size-1.5 bg-ink-muted rounded-full" />
                </span>
                <span className="flex-1 text-justify text-ink-muted text-help-card-desc-mobile md:text-section-title-h font-normal font-mulish leading-space-20 md:leading-space-24">
                  <MultilineText text={bullet} />
                </span>
              </li>
            ))}
          </ul>
        )}

        {block.table && block.table.rows?.length > 0 && (
          <div className="hidden md:block w-full pt-space-16">
            <BlogComparisonTable table={block.table} />
          </div>
        )}

        {block.closingBoldText && (
          <p className="w-full text-justify text-ink text-heading2-sb-mobile md:text-help-card-title-desktop font-semibold md:font-bold font-mulish leading-space-24 md:leading-space-32">
            <MultilineText text={block.closingBoldText} />
          </p>
        )}

        {block.closingParagraphs &&
          block.closingParagraphs.length > 0 &&
          block.closingParagraphs.map((paragraph, idx) => (
            <p
              key={`closing-${idx}-${paragraph.slice(0, 24)}`}
              className="w-full text-justify text-ink-muted text-help-card-desc-mobile md:text-section-title-h font-normal font-mulish leading-space-20 md:leading-space-24"
            >
              <MultilineText text={paragraph} />
            </p>
          ))}

        {block.subSections &&
          block.subSections.length > 0 &&
          block.subSections.map((sub, idx) => (
            <div
              key={sub._id ?? `${sub.subHeading}-${idx}`}
              className="w-full flex flex-col justify-start items-start gap-space-12 md:gap-space-16"
            >
              {sub.subHeading && (
                <h3 className="w-full text-justify text-ink text-heading2-sb-mobile md:text-help-card-title-desktop font-semibold md:font-bold font-mulish leading-space-28! md:leading-space-32!">
                  {sub.subHeading}
                </h3>
              )}
              {sub.paragraphs?.map((paragraph, pIdx) => (
                <p
                  key={`${pIdx}-${paragraph.slice(0, 24)}`}
                  className="w-full text-justify text-ink-muted text-help-card-desc-mobile md:text-section-title-h font-normal font-mulish leading-space-20 md:leading-space-24"
                >
                  <MultilineText text={paragraph} />
                </p>
              ))}
            </div>
          ))}
      </article>

      {block.newsletterCallout?.title && (
        <BlogInlineNewsletter callout={block.newsletterCallout} />
      )}

      {block.mediaCallout?.title && (
        <BlogInlineMediaCallout callout={block.mediaCallout} />
      )}
    </div>
  );
}
