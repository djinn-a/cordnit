"use client";

import Link from 'next/link';
import { Image } from '@/components/ui/Image';
import { getImageUrl } from '@/lib/getImageUrl';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useContactModal } from '@/components/features/contact/ContactModal/ContactModalProvider';
import { trackNavigationEvent } from '@/lib/analytics/navigation';

import FooterNewsletter from './FooterNewsletter';
import FooterMediaFeature from './FooterMediaFeature';
import { FOOTER_BRANDING, FOOTER_LEGAL, FOOTER_MEDIA_FEATURE, FOOTER_NAV_COLUMNS, FOOTER_NEWSLETTER, SOCIAL_LINKS, type FooterCmsContent } from './footerData';

function contentOrTextDefaults(content?: FooterCmsContent): FooterCmsContent {
  if (content) return content;
  // Keep static copy available during a CMS outage, but never invent link destinations.
  return {
    logoHref: "",
    branding: FOOTER_BRANDING,
    navColumns: FOOTER_NAV_COLUMNS.map((column) => ({
      _id: column.id,
      title: column.title,
      links: column.links.map((link, index) => ({ _id: `${column.id}-${index}`, label: link.label, href: "" })),
    })),
    socialLinks: SOCIAL_LINKS.map((item) => ({ _id: item.id, label: item.label, href: "" })),
    newsletter: {
      ...FOOTER_NEWSLETTER,
      emailLabel: "Work email address",
      formLabel: "Newsletter subscription form",
      consentText: "I agree to receive updates from Cordinit. See our",
      privacyLinkLabel: "Privacy Policy",
      privacyLinkHref: "",
      buttonText: "Subscribe",
      submittingText: "Subscribing...",
      successText: "Thanks for subscribing.",
    },
    media: { eyebrow: FOOTER_MEDIA_FEATURE.eyebrow, heading: FOOTER_MEDIA_FEATURE.heading, description: FOOTER_MEDIA_FEATURE.description, ctaText: FOOTER_MEDIA_FEATURE.ctaText, href: "" },
    copyright: FOOTER_LEGAL.copyright,
    legalLinks: FOOTER_LEGAL.links.map((link, index) => ({ _id: `legal-${index}`, label: link.label, href: "" })),
  };
}

function Logo({ href, alt }: { href: string; alt: string }) {
  const image = (
    // CMS controls the accessible label and link; the image asset remains code-owned.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={getImageUrl("/CordinitHorizontal%204.svg")} alt={alt} className="h-12 lg:h-16 w-auto brightness-0" />
  );
  return href ? <Link href={href} className="shrink-0 w-max">{image}</Link> : <span className="shrink-0 w-max">{image}</span>;
}

export default function Footer({ content }: Readonly<{ content?: FooterCmsContent }>) {
  const { openModal } = useContactModal();
  const footer = contentOrTextDefaults(content);

  return (
    <footer
      className="w-full relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      onClickCapture={(event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const link = target.closest<HTMLAnchorElement>("a[href]");
        if (link) {
          trackNavigationEvent(
            link.href,
            link.getAttribute("aria-label") || link.innerText.trim() || link.href,
            "footer",
          );
        }
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${getImageUrl('/footer-bg.webp')}')` }}
      >
      </div>

      {/* Main Container */}
      <div className="relative z-10 bg-white rounded-card-lg shadow-card p-6 md:p-12 lg:p-16 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto flex flex-col min-h-100">

        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8">
          {/* Logo and Tagline (Left Side) */}
          <div className="lg:w-1/4 shrink-0 mb-4 lg:mb-0">
            <div className="flex flex-col gap-1.25 lg:gap-2.25 mb-5 lg:mb-6">
              <Logo href={footer.logoHref ?? ""} alt={footer.branding.logoAlt} />
              <p className="text-black text-caption max-lg:text-card-desc-mobile max-w-50 md:max-w-70 lg:max-w-75">
                {footer.branding.tagline}
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => openModal({ ctaLocation: 'footer' })}
              className="w-max max-lg:text-link-mobile"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {footer.branding.ctaText}
            </Button>
          </div>

          {/* Links Grid (Right Side) */}
          <div className="lg:w-3/4 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8">
            {footer.navColumns.map((col) => (
              <div key={col._id}>
                <h4 className="text-ink text-eyebrow lg:text-footer-heading-desktop max-lg:text-card-detail-mobile max-lg:font-bold mb-4 lg:mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link._id}>
                      {link.href ? <Link href={link.href} className="text-black hover:text-ink text-card-desc max-lg:text-section-subtitle-mobile">{link.label}</Link> : <span className="text-black text-card-desc max-lg:text-section-subtitle-mobile">{link.label}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-12 lg:mt-20 pt-8 border-t border-transparent">
          {/* Social Icons */}
          <div className="flex gap-3 mb-8 lg:mb-0">
            {footer.socialLinks.map((social) => {
              const iconSrc = SOCIAL_LINKS.find((item) => item.id === social._id)?.icon;
              const icon = iconSrc ? <Image src={iconSrc} alt="" width={16} height={16} /> : null;
              return social.href ? (
                <a key={social._id} href={social.href} className="w-9 h-9 rounded-full bg-footer-icon flex items-center justify-center hover:opacity-80 transition-opacity" aria-label={social.label}>{icon}</a>
              ) : (
                <span key={social._id} className="w-9 h-9 rounded-full bg-footer-icon flex items-center justify-center" aria-label={social.label}>{icon}</span>
              );
            })}
          </div>

          {/* Stay Ahead Form */}
          <FooterNewsletter content={footer.newsletter} />
        </div>
      </div>

      {/* Latest from Cordinit Section */}
      <FooterMediaFeature media={footer.media} copyright={footer.copyright} legalLinks={footer.legalLinks} />
    </footer>
  );
}
