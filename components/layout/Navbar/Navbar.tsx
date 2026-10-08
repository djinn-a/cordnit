"use client";
import { getImageUrl } from "@/lib/getImageUrl";
import { useState, useRef } from "react";
import { useContactModal } from "../../features/contact/ContactModal/ContactModalProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { navbarContent, type NavbarCmsContent } from "./navbarContent";
import MegaMenu from "./MegaMenu";
import { Button } from "@/components/ui";
import { Suspense, useEffect, useCallback } from "react";
import { trackNavigationEvent } from "@/lib/analytics/navigation";

function RouteChangeDetector({ onChange }: { onChange: () => void }) {
  const pathname = usePathname();
  useEffect(() => {
    onChange();
  }, [pathname, onChange]);
  return null;
}

function BrandMark({ href, alt, className }: { href: string; alt: string; className: string }) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={getImageUrl("/CordinitHorizontal%204.svg")} alt={alt} className={className} />
  );
  // A missing CMS destination must not fall back to a hardcoded home redirect.
  return href ? <Link href={href} className="flex items-center">{image}</Link> : <span className="flex items-center">{image}</span>;
}

export default function Navbar({ content }: Readonly<{ content?: NavbarCmsContent }>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null,
  );
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openModal } = useContactModal();
  const navLinks: NavbarCmsContent["navLinks"] = content?.navLinks ?? navbarContent.navLinks.map((link, index) => ({
    _id: `fallback-${index}`,
    label: link.label,
    href: "",
    kind: link.label === "Solutions" ? "solutions" : "link",
  }));
  const solutions = content
    ? content.solutionsDropdown.map((item) => {
        // Match only to code-owned visual assets; CMS values never choose an icon.
        const visual = navbarContent.solutionsDropdown.find((candidate) => candidate.slug === item.slug);
        return {
          ...item,
          icon: visual?.icon,
          iconColor: visual?.iconColor ?? "",
          iconBg: visual?.iconBg ?? "",
        };
      })
    : navbarContent.solutionsDropdown.map((item, index) => ({ ...item, _id: `fallback-${index}`, slug: "" }));
  const megaMenu = content?.megaMenu ?? { ...navbarContent.megaMenu, exploreAllHref: "" };
  const logoHref = content?.logoHref ?? "";
  const getInTouchLabel = content?.getInTouchLabel ?? navbarContent.getInTouchLabel;
  const logoAltText = content?.logoAltText ?? navbarContent.logoAltText;
  const mobileMenuToggleAriaLabel = content?.mobileMenuToggleAriaLabel ?? navbarContent.mobileMenuToggleAriaLabel;

  const handleRouteChange = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSolutionsOpen(false);
    setActiveDesktopMenu(null);
  }, []);

  const handleMenuEnter = (menuName: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDesktopMenu(menuName);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDesktopMenu(null);
    }, 150);
  };

  const handleLinkClick = () => {
    setActiveDesktopMenu(null);
  };

  return (
    <nav
      className="w-full sticky top-0 z-50 bg-linear-to-r from-primary to-surface-darker"
      onClickCapture={(event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const link = target.closest<HTMLAnchorElement>("a[href]");
        if (link) {
          trackNavigationEvent(
            link.href,
            link.getAttribute("aria-label") || link.innerText.trim() || link.href,
            "navbar",
          );
        }
      }}
    >
      <Suspense fallback={null}>
        <RouteChangeDetector onChange={handleRouteChange} />
      </Suspense>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Mobile Logo */}
        <BrandMark href={logoHref} alt={logoAltText} className="h-12 w-auto" />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-white transition-colors"
          aria-label={mobileMenuToggleAriaLabel}
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7 stroke-2" />
          )}
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden lg:block max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Group */}
          <div className="flex items-center gap-16">
            {/* Desktop Logo */}
            <div className="shrink-0 flex items-center">
              <BrandMark href={logoHref} alt={logoAltText} className="h-16 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                if (link.kind === "solutions") {
                  const isOpen = activeDesktopMenu === "Solutions";
                  return (
                    <div
                      key={link._id}
                      className="h-20 flex items-center"
                      onMouseEnter={() => handleMenuEnter("Solutions")}
                      onMouseLeave={handleMenuLeave}
                    >
                      {link.href ? (
                        <Link href={link.href} className="text-white hover:text-white/80 font-semibold text-base transition-colors flex items-center gap-1.5 py-6" onClick={handleLinkClick}>
                          {link.label}<ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </Link>
                      ) : (
                        <button type="button" className="text-white hover:text-white/80 font-semibold text-base transition-colors flex items-center gap-1.5 py-6" onClick={() => setActiveDesktopMenu(isOpen ? null : "Solutions")}>
                          {link.label}<ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      )}

                      {/* Mega Menu Dropdown */}
                      <MegaMenu
                        content={megaMenu}
                        solutions={solutions}
                        isOpen={isOpen}
                        onLinkClick={handleLinkClick}
                      />
                    </div>
                  );
                }

                return link.href ? (
                  <Link key={link._id} href={link.href} className="text-white hover:text-white/80 font-semibold text-base transition-colors py-6 flex items-center">{link.label}</Link>
                ) : (
                  <span key={link._id} className="text-white/70 font-semibold text-base py-6 flex items-center">{link.label}</span>
                );
              })}
            </div>
          </div>

          {/* Right CTA Button */}
          <div className="flex items-center">
            <Button
              variant="primary"
              onClick={() => openModal({ ctaLocation: 'navbar' })}
              className="rounded-lg px-6 py-2 text-sm"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {getInTouchLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Wrapper */}
      <div className="lg:hidden absolute top-full left-0 right-0 overflow-hidden pointer-events-none">
        {/* Animated Drawer */}
        <div
          className={`bg-gradient-mobile-nav shadow-2xl transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-6 py-6 pb-10 flex flex-col">
            {navLinks.map((link) => {
              if (link.kind === "solutions") {
                return (
                  <div
                    key={link._id}
                    className="border-b border-white/20 flex flex-col"
                  >
                    <button
                      className="flex items-center justify-between py-4 text-white hover:text-white/80 font-medium text-lg transition-colors w-full text-left"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileSolutionsOpen(!isMobileSolutionsOpen);
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${isMobileSolutionsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {/* Expandable sub-menu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileSolutionsOpen ? "max-h-125 opacity-100 mb-4" : "max-h-0 opacity-0"}`}
                    >
                      <div className="flex flex-col gap-4 pl-4 pt-2">
                        {solutions.map((solution) => (
                          solution.slug ? <Link key={solution._id} href={`/${solution.slug}`} className="text-white/90 hover:text-white font-medium text-base transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{solution.title}</Link>
                            : <span key={solution._id} className="text-white/60 font-medium text-base">{solution.title}</span>
                        ))}
                        {megaMenu.exploreAllHref ? <Link href={megaMenu.exploreAllHref} className="text-white font-bold text-base flex items-center mt-2 hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>{megaMenu.exploreAllLabel}<ArrowRight className="ml-2 h-4 w-4" /></Link> : <span className="text-white/60 font-bold text-base mt-2">{megaMenu.exploreAllLabel}</span>}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={link._id} className="border-b border-white/20">
                  {link.href ? <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 text-white hover:text-white/80 font-medium text-lg transition-colors"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </Link> : <span className="flex items-center justify-between py-4 text-white/60 font-medium text-lg">{link.label}</span>}
                </div>
              );
            })}

            <div className="pt-8 flex justify-center">
              <Button
                variant="primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openModal({ ctaLocation: 'navbar' });
                }}
                className="rounded-lg px-6 py-3"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {getInTouchLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
