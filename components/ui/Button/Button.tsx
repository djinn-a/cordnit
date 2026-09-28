import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { buttonVariants, type ButtonVariantProps } from "./button.variants";

type BaseProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  href?: string;
} & ButtonVariantProps;

type NativeButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">;
type NativeAnchorProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export type PolymorphicButtonProps = NativeButtonProps | NativeAnchorProps;

export default function Button(props: PolymorphicButtonProps) {
  const {
    variant,
    size,
    fullWidth,
    leftIcon,
    rightIcon,
    className,
    children,
    href,
    ...rest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = props as any;

  const classes = cn(buttonVariants({ variant, size, fullWidth, className }));

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    const isScrollTo = href.startsWith("#");
    
    if (isExternal || isScrollTo || rest.target === "_blank") {
      return (
        <a href={href} className={classes} {...rest}>
          {leftIcon}
          {children}
          {rightIcon}
        </a>
      );
    }
    
    return (
      <Link href={href} className={classes} {...rest}>
        {leftIcon}
        {children}
        {rightIcon}
      </Link>
    );
  }

  return (
    <button
      type={rest.type || "button"}
      className={classes}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
