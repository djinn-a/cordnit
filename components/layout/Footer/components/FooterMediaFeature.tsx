import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { FOOTER_MEDIA_FEATURE, FOOTER_LEGAL } from '../data/footerData';

export default function FooterMediaFeature() {
  return (
    <div className="relative z-10 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto mt-12 lg:mt-16 px-4 sm:px-6 lg:px-16 pb-6">
      
      {/* Mobile Design (Figma 760:1298) */}
      <div className="lg:hidden mb-12">
        <h4 className="text-white text-card-desc-mobile uppercase tracking-wider mb-6">
          {FOOTER_MEDIA_FEATURE.eyebrow}
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
              {FOOTER_MEDIA_FEATURE.heading}
            </h3>
            <p className="text-card-desc-mobile text-white">
              {FOOTER_MEDIA_FEATURE.description}
            </p>
            <Link href={FOOTER_MEDIA_FEATURE.href} className="flex items-center gap-2 text-link-mobile text-primary hover:text-primary-hover transition-colors uppercase">
              {FOOTER_MEDIA_FEATURE.ctaText} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Design */}
      <div className="hidden lg:flex flex-row items-center gap-16 mb-16">
        {/* Video Column */}
        <div className="w-[45%] flex flex-col gap-6 shrink-0">
          <h4 className="text-white/90 text-eyebrow">
            {FOOTER_MEDIA_FEATURE.eyebrow}
          </h4>
          {/* Video Thumbnail Area */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-900/10 aspect-video">
            <Image
              src={FOOTER_MEDIA_FEATURE.thumbnail}
              alt="Video Thumbnail"
              fill
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
            {FOOTER_MEDIA_FEATURE.heading}
          </h3>
          <p className="text-white/80 text-card-desc mb-8 max-w-xl">
            {FOOTER_MEDIA_FEATURE.description}
          </p>
          <Link href={FOOTER_MEDIA_FEATURE.href} className="inline-flex items-center text-primary text-footer-media-cta-desktop uppercase hover:text-primary-hover transition-colors">
            {FOOTER_MEDIA_FEATURE.ctaText} <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Very Bottom Footer Text */}
      <div className="flex justify-between items-center text-white text-caption border-t border-white/10 pt-5 lg:pt-6">
        <p>{FOOTER_LEGAL.copyright}</p>
        <p className="cursor-pointer hover:text-white transition-colors">{FOOTER_LEGAL.privacy}</p>
      </div>
    </div>
  );
}
