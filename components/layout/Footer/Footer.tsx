import Link from "next/link";
import { Image } from "@/components/ui/Image";
import { getImageUrl } from "@/lib/getImageUrl";
import { isExternalHref, socialPlatform } from "@/lib/cms/site-chrome";
import { ContactButton, TrackedRegion } from "../chrome-client";
import FooterNewsletter from "./FooterNewsletter";
import FooterMediaFeature from "./FooterMediaFeature";
import { FOOTER_ASSETS, type FooterCmsContent } from "./footerData";

function Logo({ content }: Readonly<{ content: FooterCmsContent }>) {
  const uploaded = content.logo?.url;
  const image = (
    // Uploaded logos (including SVG) are only ever rendered through <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={uploaded || getImageUrl(FOOTER_ASSETS.logo)}
      alt={content.logo?.alt || content.branding.logoAlt}
      className={`h-12 lg:h-16 w-auto ${uploaded ? "" : "brightness-0"}`}
      loading="lazy"
      decoding="async"
    />
  );
  return content.logoHref ? (
    <Link href={content.logoHref} className="shrink-0 w-max">{image}</Link>
  ) : (
    <span className="shrink-0 w-max">{image}</span>
  );
}

const linkClass = "text-black hover:text-ink text-card-desc max-lg:text-section-subtitle-mobile";

/** Server-rendered footer: all links ship as HTML; only the contact button and newsletter form hydrate. */
export default function Footer({ content }: Readonly<{ content: FooterCmsContent }>) {
  const socials = content.socialLinks.filter((s) => s.href && socialPlatform(s.platform));
  const { email, phone } = content.contact;

  return (
    <TrackedRegion as="footer" section="footer" className="w-full relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${getImageUrl(FOOTER_ASSETS.background)}')` }}
      />

      <div className="relative z-10 bg-white rounded-card-lg shadow-card p-6 md:p-12 lg:p-16 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto flex flex-col min-h-100">
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8">
          <div className="lg:w-1/4 shrink-0 mb-4 lg:mb-0">
            <div className="flex flex-col gap-1.25 lg:gap-2.25 mb-5 lg:mb-6">
              <Logo content={content} />
              <p className="text-black text-caption max-lg:text-card-desc-mobile max-w-50 md:max-w-70 lg:max-w-75">{content.branding.tagline}</p>
              {(email || phone) && (
                <address className="not-italic flex flex-col gap-1 mt-2 text-caption">
                  {email && <a href={`mailto:${email}`} className={linkClass}>{email}</a>}
                  {phone && <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className={linkClass}>{phone}</a>}
                </address>
              )}
            </div>
            <ContactButton label={content.branding.ctaText} ctaLocation="footer" size="md" className="w-max max-lg:text-link-mobile" />
          </div>

          <nav aria-label="Footer" className="lg:w-3/4 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8">
            {content.navColumns.map((col) => (
              <div key={col._id}>
                <h2 className="text-ink text-eyebrow lg:text-footer-heading-desktop max-lg:text-card-detail-mobile max-lg:font-bold mb-4 lg:mb-5">{col.title}</h2>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link._id}>
                      {link.href ? <Link href={link.href} className={linkClass}>{link.label}</Link> : <span className={linkClass}>{link.label}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-12 lg:mt-20 pt-8 border-t border-transparent">
          {socials.length > 0 && (
            <ul className="flex gap-3 mb-8 lg:mb-0" aria-label="Social media">
              {socials.map((social) => {
                const platform = socialPlatform(social.platform)!;
                const external = isExternalHref(social.href);
                return (
                  <li key={social._id}>
                    <a
                      href={social.href}
                      aria-label={platform.label}
                      className="w-9 h-9 rounded-full bg-footer-icon flex items-center justify-center hover:opacity-80 transition-opacity"
                      {...(external ? { target: "_blank", rel: "me noopener noreferrer" } : {})}
                    >
                      <Image src={platform.icon} alt="" width={16} height={16} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
          <FooterNewsletter content={content.newsletter} />
        </div>
      </div>

      <FooterMediaFeature media={content.media} copyright={content.copyright} legalLinks={content.legalLinks} />
    </TrackedRegion>
  );
}
