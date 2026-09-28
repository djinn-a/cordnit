"use client";

import React from "react";
import type { Cta } from "@/lib/cta";
import { useCtaAction } from "@/hooks/useCtaAction";
import Button, { type PolymorphicButtonProps } from "./Button";

export type CtaButtonProps = {
  cta: Cta;
  analyticsContext?: string;
} & Omit<PolymorphicButtonProps, "href" | "onClick" | "target" | "rel" | "variant">;

export default function CtaButton({ cta, analyticsContext, ...buttonProps }: CtaButtonProps) {
  const binding = useCtaAction(cta, analyticsContext);
  const variant = cta.variant || "primary";

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Button variant={variant} {...(binding as any)} {...(buttonProps as any)}>
      {cta.label}
    </Button>
  );
}
