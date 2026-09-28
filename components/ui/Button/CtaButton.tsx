"use client";

import type { ReactNode } from "react";
import { useCtaAction } from "@/hooks/useCtaAction";
import type { Cta } from "@/lib/cta";
import Button from "./Button";
import type { ButtonVariant, ButtonVariantProps } from "./button.variants";

export type CtaButtonProps = Omit<ButtonVariantProps, "variant"> & {
  cta: Cta;
  /** Sent with leads from the contact modal, e.g. "about-hero". */
  ctaLocation?: string;
  /** Forces a look for placements where the design, not the editor, owns the style (e.g. inline card links). */
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
};

export default function CtaButton({ cta, ctaLocation, variant, ...buttonProps }: Readonly<CtaButtonProps>) {
  const { href, target, rel, onClick } = useCtaAction(cta, ctaLocation);
  const look = variant ?? cta.variant ?? "primary";

  if (href !== undefined) {
    return (
      <Button {...buttonProps} variant={look} href={href} target={target} rel={rel} onClick={onClick}>
        {cta.label}
      </Button>
    );
  }
  return (
    <Button {...buttonProps} variant={look} onClick={onClick} aria-haspopup={onClick ? "dialog" : undefined}>
      {cta.label}
    </Button>
  );
}
