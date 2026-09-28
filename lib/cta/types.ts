export const CTA_ACTIONS = ["link", "contactModal", "newsletterModal", "scrollTo"] as const;
export type CtaAction = (typeof CTA_ACTIONS)[number];

export const CTA_VARIANTS = ["primary", "secondary", "ghost", "outline"] as const;
export type CtaVariant = (typeof CTA_VARIANTS)[number];

export type Cta = {
  label: string;
  action: CtaAction;
  href?: string;
  newTab?: boolean;
  variant?: CtaVariant;
};

/** Actions whose behaviour depends on `href`. */
export const HREF_ACTIONS: ReadonlySet<CtaAction> = new Set(["link", "scrollTo"]);

export const CTA_ACTION_OPTIONS: ReadonlyArray<{ value: CtaAction; label: string }> = [
  { value: "link", label: "Go to link" },
  { value: "contactModal", label: "Open contact form" },
  { value: "newsletterModal", label: "Open newsletter signup" },
  { value: "scrollTo", label: "Scroll to section" },
];

export const CTA_VARIANT_OPTIONS: ReadonlyArray<{ value: CtaVariant; label: string }> = [
  { value: "primary", label: "Primary (solid)" },
  { value: "secondary", label: "Secondary (bordered)" },
  { value: "outline", label: "Outline (light)" },
  { value: "ghost", label: "Ghost (text only)" },
];

export const LINK_PATTERN = /^(\/|#|https?:\/\/|mailto:|tel:)/;
export const ANCHOR_PATTERN = /^#[A-Za-z][\w-]*$/;
export const CTA_LABEL_MAX = 300;
export const CTA_HREF_MAX = 2048;
