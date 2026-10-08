import { Image } from '@/components/ui/Image';
import Link from 'next/link';
import { Play, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { FOOTER_MEDIA_FEATURE } from './footerData';
import type { FooterCmsContent } from './footerData';

type MediaFeatureProps = {
  media: FooterCmsContent["media"];
  copyright: FooterCmsContent["copyright"];
  legalLinks: FooterCmsContent["legalLinks"];
};

export default function FooterMediaFeature({ media, copyright, legalLinks }: Readonly<MediaFeatureProps>) {
  return (
    <div className="relative z-10 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto mt-12 lg:mt-16 px-4 sm:px-6 lg:px-16 pb-6">

      {/* Mobile Design (Figma 760:1298) */}
      <div className="lg:hidden mb-12">
        <h4 className="text-white text-card-desc-mobile uppercase tracking-wider mb-6">
          {media.eyebrow}
        </h4>
        <div className="flex w-full items-start gap-3">

          {/* Media Area */}
          <div className="relative w-28 shrink-0 mt-1">
            <Image
              src={FOOTER_MEDIA_FEATURE.thumbnail}
              alt="Video Thumbnail"
              width={112}
              height={91}
              className="w-full h-auto object-cover rounded-sm"
              style={{ width: '100%', height: 'auto' }}
            />
            {/* Overlay 30% black */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer rounded-sm">
              <div className="w-8 h-6 bg-white rounded-sm flex items-center justify-center shadow-sm">
                <Play className="h-3 w-3 text-primary ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-card-desc text-white">
              {media.heading}
            </h3>
            <p className="text-card-desc-mobile text-white">
              {media.description}
            </p>
            <Button
              variant="primary"
              {...(media.href ? { href: media.href } : {})}
              aria-disabled={!media.href}
              tabIndex={media.href ? 0 : -1}
              className="w-fit bg-primary hover:bg-primary/90 rounded-[24px] sm:rounded-[24px] px-4 py-3 text-[14px] font-semibold leading-5 uppercase mt-1 group flex items-center gap-2 border-0"
            >
              {media.ctaText}
              <span className="flex items-center justify-center bg-white text-primary rounded-full w-6 h-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-12">
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5px]" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Design */}
      <div className="hidden lg:flex flex-row items-center gap-16 mb-16">
        {/* Video Column */}
        <div className="w-[45%] flex flex-col gap-6 shrink-0">
          <h4 className="text-white text-about-eyebrow-desktop tracking-[1px] uppercase">
            {media.eyebrow}
          </h4>
          {/* Video Thumbnail Area */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-900/10 aspect-video">
            <Image
              src={FOOTER_MEDIA_FEATURE.thumbnail}
              alt="Video Thumbnail"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer transition-colors hover:bg-black/40">
              <div className="w-16 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Play className="h-5 w-5 text-primary ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content Area */}
        <div className="w-[55%] text-white flex flex-col justify-center">
          <h3 className="text-footer-media-heading-desktop text-white mb-6 leading-snug">
            {media.heading}
          </h3>
          <p className="text-white/80 text-card-desc mb-8 max-w-xl">
            {media.description}
          </p>
          <Button
            variant="primary"
            {...(media.href ? { href: media.href } : {})}
            aria-disabled={!media.href}
            tabIndex={media.href ? 0 : -1}
            className="w-fit rounded-[24px] sm:rounded-[24px] px-4 py-3 text-[14px] font-semibold leading-5 uppercase mt-2 group flex items-center gap-2"
          >
            {media.ctaText}
            <span className="flex items-center justify-center bg-white text-primary rounded-full w-7 h-7 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-12">
              <ArrowUpRight className="h-4 w-4 stroke-[2.5px]" />
            </span>
          </Button>
        </div>
      </div>

      {/* Very Bottom Footer Text */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center text-white border-t border-white/10 pt-5 lg:pt-6 gap-6">
        <p className="text-[10px] font-normal leading-3.5">
          {copyright}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-normal leading-3.5">
          {legalLinks.map(link => (
            link.href ? <Link key={link._id} href={link.href} className="hover:text-white/80 transition-colors">{link.label}</Link>
              : <span key={link._id} className="text-white/70">{link.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
