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

export const CTA_ACTION_OPTIONS: Array<{ value: CtaAction; label: string; help?: string }> = [
  { value: "link", label: "External / Page Link" },
  { value: "contactModal", label: "Open Contact Modal" },
  { value: "newsletterModal", label: "Open Newsletter Modal" },
  { value: "scrollTo", label: "Scroll to Section (anchor)", help: "Must start with #" },
];

export const CTA_VARIANT_OPTIONS: Array<{ value: CtaVariant; label: string }> = [
  { value: "primary", label: "Primary (Solid)" },
  { value: "secondary", label: "Secondary (Light)" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost (No border)" },
];
