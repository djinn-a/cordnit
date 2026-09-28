import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { buttonVariants, type ButtonVariantProps } from "./button.variants";

type CommonProps = ButtonVariantProps & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export type ButtonAsButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

export type ButtonAsLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const isInternalPath = (href: string) => href.startsWith("/") && !href.startsWith("//");

/** Renders a Next `Link` for internal paths, `<a>` for other hrefs, and `<button>` otherwise. */
export default function Button(props: ButtonProps) {
  const { variant, size, fullWidth, leftIcon, rightIcon, className, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);
  const body = (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLinkProps;
    if (isInternalPath(href) && anchorProps.target !== "_blank") {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {body}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {body}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButtonProps;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {body}
    </button>
  );
}
