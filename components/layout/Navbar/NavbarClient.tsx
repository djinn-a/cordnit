"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, Suspense, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { trackLinkClick } from "../chrome-client";

/**
 * Interaction state for the server-rendered Navbar. Every link and label is in
 * the server HTML; these islands only toggle classes.
 */
type NavState = {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const NavContext = createContext<NavState | null>(null);

function useNav(): NavState {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("Navbar islands must render inside <NavRoot>.");
  return ctx;
}

function RouteChangeDetector({ onChange }: Readonly<{ onChange: () => void }>) {
  const pathname = usePathname();
  useEffect(() => {
    onChange();
  }, [pathname, onChange]);
  return null;
}

export function NavRoot({ className, children }: Readonly<{ className: string; children: ReactNode }>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeAll = useCallback(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, []);

  return (
    <NavContext.Provider value={{ mobileOpen, setMobileOpen, menuOpen, setMenuOpen }}>
      <nav className={className} aria-label="Main" onClickCapture={(e) => trackLinkClick(e, "navbar")}>
        <Suspense fallback={null}>
          <RouteChangeDetector onChange={closeAll} />
        </Suspense>
        {children}
      </nav>
    </NavContext.Provider>
  );
}

const TRIGGER_CLASS = "text-white hover:text-white/80 font-semibold text-base transition-colors flex items-center gap-1.5 py-6";

/** Desktop Solutions entry: hover or click opens the always-rendered mega menu panel. */
export function SolutionsMenu({ label, href, panel }: Readonly<{ label: string; href: string; panel: ReactNode }>) {
  const { menuOpen, setMenuOpen } = useNav();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chevron = <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />;

  return (
    <div
      className="h-20 flex items-center"
      onMouseEnter={() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setMenuOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
      }}
      onFocus={() => setMenuOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenuOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setMenuOpen(false);
      }}
      onClickCapture={(e) => {
        if ((e.target as Element).closest("[data-mega-panel] a[href]")) setMenuOpen(false);
      }}
    >
      {href ? (
        <Link href={href} className={TRIGGER_CLASS} aria-expanded={menuOpen} aria-haspopup="true">
          {label}
          {chevron}
        </Link>
      ) : (
        <button type="button" className={TRIGGER_CLASS} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {label}
          {chevron}
        </button>
      )}
      <div
        data-mega-panel
        className={`absolute top-20 left-0 w-full transition-all duration-300 ease-in-out border-t border-white/5 shadow-2xl bg-linear-to-r from-primary to-surface-darker ${menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
      >
        {panel}
      </div>
    </div>
  );
}

export function MobileMenuToggle({ ariaLabel }: Readonly<{ ariaLabel: string }>) {
  const { mobileOpen, setMobileOpen } = useNav();
  return (
    <button
      type="button"
      onClick={() => setMobileOpen(!mobileOpen)}
      className="p-2 -mr-2 text-white transition-colors"
      aria-label={ariaLabel}
      aria-expanded={mobileOpen}
      aria-controls="mobile-nav"
    >
      {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7 stroke-2" />}
    </button>
  );
}

/** Always in the HTML (crawlable); hidden with CSS until opened. Closes when a link or contact button is used. */
export function MobileDrawer({ children }: Readonly<{ children: ReactNode }>) {
  const { mobileOpen, setMobileOpen } = useNav();
  return (
    <div className="lg:hidden absolute top-full left-0 right-0 overflow-hidden pointer-events-none">
      <div
        id="mobile-nav"
        className={`bg-gradient-mobile-nav shadow-2xl transition-all duration-300 ease-in-out ${
          mobileOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none invisible"
        }`}
        onClickCapture={(e) => {
          if ((e.target as Element).closest("a[href], [data-close-menu]")) setMobileOpen(false);
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function MobileSolutions({ label, children }: Readonly<{ label: string; children: ReactNode }>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/20 flex flex-col">
      <button
        type="button"
        className="flex items-center justify-between py-4 text-white hover:text-white/80 font-medium text-lg transition-colors w-full text-left"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown aria-hidden className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-250 opacity-100 mb-4" : "max-h-0 opacity-0 invisible"}`}>
        {children}
      </div>
    </div>
  );
}
