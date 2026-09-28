import { describe, expect, it, vi } from "vitest";
import { bindCta, ctaSchema, type Cta } from "@/lib/cta";

describe("ctaSchema", () => {
  const ok = (cta: unknown) => ctaSchema.safeParse(cta).success;

  it("defaults the action to link", () => {
    expect(ctaSchema.parse({ label: "Go", href: "/x" }).action).toBe("link");
  });

  it.each(["/about", "#contact", "https://cordinit.com", "mailto:hi@cordinit.com", "tel:+441234"])(
    "accepts link href %s",
    (href) => expect(ok({ label: "Go", action: "link", href })).toBe(true),
  );

  it.each(["javascript:alert(1)", "data:text/html,x", "cordinit.com", ""])("rejects link href %j", (href) =>
    expect(ok({ label: "Go", action: "link", href })).toBe(false),
  );

  it("requires an anchor for scrollTo", () => {
    expect(ok({ label: "Go", action: "scrollTo", href: "#contact" })).toBe(true);
    expect(ok({ label: "Go", action: "scrollTo", href: "/contact" })).toBe(false);
    expect(ok({ label: "Go", action: "scrollTo" })).toBe(false);
  });

  it("does not need an href for modal actions", () => {
    expect(ok({ label: "Talk", action: "contactModal" })).toBe(true);
    expect(ok({ label: "Join", action: "newsletterModal" })).toBe(true);
  });

  it("rejects blank or oversized labels and unknown enums", () => {
    expect(ok({ label: "   ", action: "contactModal" })).toBe(false);
    expect(ok({ label: "x".repeat(301), action: "contactModal" })).toBe(false);
    expect(ok({ label: "Go", action: "explode" })).toBe(false);
    expect(ok({ label: "Go", action: "contactModal", variant: "neon" })).toBe(false);
  });

  it("rejects oversized hrefs", () => {
    expect(ok({ label: "Go", action: "link", href: `/${"x".repeat(2048)}` })).toBe(false);
  });
});

describe("bindCta", () => {
  const handlers = () => ({ onContactModal: vi.fn(), onNewsletterModal: vi.fn(), onScrollTo: vi.fn() });
  const click = () => ({ preventDefault: vi.fn() }) as unknown as Parameters<NonNullable<ReturnType<typeof bindCta>["onClick"]>>[0];
  const bind = (cta: Partial<Cta>, h = handlers()) => ({ h, bound: bindCta({ label: "x", action: "link", ...cta }, h) });

  it("binds links without handlers and only opens a new tab when asked", () => {
    expect(bind({ href: "/about" }).bound).toEqual({ href: "/about" });
    expect(bind({ href: "https://x.com" }).bound).toEqual({ href: "https://x.com" });
    expect(bind({ href: "https://x.com", newTab: true }).bound).toEqual({
      href: "https://x.com",
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });

  it("binds modal actions to their handlers", () => {
    const contact = bind({ action: "contactModal", href: "/ignored" });
    expect(contact.bound.href).toBeUndefined();
    contact.bound.onClick?.(click());
    expect(contact.h.onContactModal).toHaveBeenCalledOnce();

    const newsletter = bind({ action: "newsletterModal" });
    newsletter.bound.onClick?.(click());
    expect(newsletter.h.onNewsletterModal).toHaveBeenCalledOnce();
  });

  it("keeps the anchor href for scrollTo and scrolls on click", () => {
    const { h, bound } = bind({ action: "scrollTo", href: "#contact" });
    expect(bound.href).toBe("#contact");
    const event = click();
    bound.onClick?.(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(h.onScrollTo).toHaveBeenCalledWith("#contact");
  });
});
