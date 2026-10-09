import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionContentMap } from "@/lib/cms/registry";
import { getImageUrl } from "@/lib/getImageUrl";
import { ContactButton } from "../chrome-client";
import MegaMenu from "./MegaMenu";
import { MobileDrawer, MobileMenuToggle, MobileSolutions, NavRoot, SolutionsMenu } from "./NavbarClient";

type NavbarContent = SectionContentMap["navbar"];

function BrandMark({ content, className }: Readonly<{ content: NavbarContent; className: string }>) {
  const image = (
    // Uploaded logos (including SVG) are only ever rendered through <img>.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={content.logo?.url || getImageUrl("/CordinitHorizontal%204.svg")}
      alt={content.logo?.alt || content.logoAltText}
      className={className}
      fetchPriority="high"
    />
  );
  return content.logoHref ? (
    <Link href={content.logoHref} className="flex items-center">{image}</Link>
  ) : (
    <span className="flex items-center">{image}</span>
  );
}

const LINK_CLASS = "text-white hover:text-white/80 font-semibold text-base transition-colors py-6 flex items-center";
const MOBILE_LINK_CLASS = "flex items-center justify-between py-4 text-white hover:text-white/80 font-medium text-lg transition-colors";

/** Server-rendered: every navigation link is plain HTML; only open/close state runs on the client. */
export default function Navbar({ content }: Readonly<{ content: NavbarContent }>) {
  const { solutionsMenu, navLinks } = content;

  return (
    <NavRoot className="w-full sticky top-0 z-50 bg-linear-to-r from-primary to-surface-darker">
      <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-3">
        <BrandMark content={content} className="h-12 w-auto" />
        <MobileMenuToggle ariaLabel={content.mobileMenuToggleAriaLabel} />
      </div>

      <div className="hidden lg:block max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-16">
            <div className="shrink-0 flex items-center">
              <BrandMark content={content} className="h-16 w-auto" />
            </div>
            <ul className="flex items-center gap-6">
              <li>
                <SolutionsMenu label={solutionsMenu.label} href={solutionsMenu.href} panel={<MegaMenu content={solutionsMenu} />} />
              </li>
              {navLinks.map((link) => (
                <li key={link._id}>
                  {link.href ? (
                    <Link href={link.href} className={LINK_CLASS}>{link.label}</Link>
                  ) : (
                    <span className={LINK_CLASS}>{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <ContactButton label={content.getInTouchLabel} ctaLocation="navbar" className="rounded-lg px-6 py-2 text-sm" />
          </div>
        </div>
      </div>

      <MobileDrawer>
        <div className="px-6 py-6 pb-10 flex flex-col">
          <MobileSolutions label={solutionsMenu.label}>
            <ul className="flex flex-col gap-4 pl-4 pt-2">
              {solutionsMenu.items.map((item) => (
                <li key={item._id}>
                  {item.href ? (
                    <Link href={item.href} className="text-white/90 hover:text-white font-medium text-base transition-colors">{item.title}</Link>
                  ) : (
                    <span className="text-white/60 font-medium text-base">{item.title}</span>
                  )}
                </li>
              ))}
              {solutionsMenu.exploreAllHref ? (
                <li>
                  <Link href={solutionsMenu.exploreAllHref} className="text-white font-bold text-base flex items-center mt-2 hover:opacity-80 transition-opacity">
                    {solutionsMenu.exploreAllLabel}
                    <ArrowRight aria-hidden className="ml-2 h-4 w-4" />
                  </Link>
                </li>
              ) : null}
            </ul>
          </MobileSolutions>
          <ul>
            {navLinks.map((link) => (
              <li key={link._id} className="border-b border-white/20">
                {link.href ? (
                  <Link href={link.href} className={MOBILE_LINK_CLASS}>{link.label}</Link>
                ) : (
                  <span className={MOBILE_LINK_CLASS}>{link.label}</span>
                )}
              </li>
            ))}
          </ul>
          <div className="pt-8 flex justify-center">
            <ContactButton label={content.getInTouchLabel} ctaLocation="navbar" className="rounded-lg px-6 py-3" />
          </div>
        </div>
      </MobileDrawer>
    </NavRoot>
  );
}
