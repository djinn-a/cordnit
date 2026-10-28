import { getImageUrl } from "@/lib/getImageUrl";
import MultilineText from "@/components/ui/MultilineText/MultilineText";
import type { BlogMediaImage } from "./BlogArticleSection.types";

export interface BlogHeroBannerProps {
  category?: string;
  publishDate?: string;
  articleTitle?: string;
  bannerImage?: BlogMediaImage;
  introText?: string;
}

export default function BlogHeroBanner({
  category,
  publishDate,
  articleTitle,
  bannerImage,
  introText,
}: Readonly<BlogHeroBannerProps>) {
  const hasHeader = Boolean(category || publishDate || articleTitle);
  if (!hasHeader && !bannerImage?.url && !introText) return null;

  return (
    <div className="w-full flex flex-col justify-start items-center gap-space-24 md:gap-space-80">
      <div className="w-full flex flex-col justify-start items-center gap-space-24">
        {hasHeader && (
          <div className="w-full px-space-16 py-space-20 md:px-space-32 md:py-space-32 bg-gradient-contact-soft rounded-card-sm md:rounded-card flex flex-col justify-start items-start gap-space-8 md:gap-space-12">
            {category && (
              <div className="px-space-12 py-space-4 bg-primary/10 rounded-btn flex flex-col justify-start items-start">
                <span className="text-primary text-eyebrow-mobile md:text-about-eyebrow-desktop font-extrabold font-mulish uppercase tracking-wide">
                  {category}
                </span>
              </div>
            )}
            {publishDate && (
              <time className="text-ink-muted text-card-detail-mobile md:text-help-card-desc-mobile font-normal font-mulish">
                {publishDate}
              </time>
            )}
            {articleTitle && (
              <h1 className="w-full text-ink text-section-title-mobile md:text-cta-title-desktop lg:text-section-title font-extrabold font-mulish leading-space-28! md:leading-space-40! lg:leading-space-60!">
                <MultilineText text={articleTitle} />
              </h1>
            )}
          </div>
        )}

        {bannerImage?.url && (
          <div className="w-full bg-primary-pale rounded-card-xs md:rounded-card shadow-card overflow-hidden">
            <div className="relative w-full h-36 sm:h-64 md:h-panel xl:h-blog-banner rounded-card-xs md:rounded-card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(bannerImage.url)}
                alt={bannerImage.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {introText && (
        <div className="w-full flex justify-center items-center">
          <p className="flex-1 text-justify text-ink-muted text-card-desc md:text-footer-media-heading-desktop font-normal font-mulish leading-space-24 md:leading-space-32">
            <MultilineText text={introText} />
          </p>
        </div>
      )}
    </div>
  );
}
