import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { buttonVariants, type ButtonVariantProps } from "./button.variants";
import styles from "./buttonanimation.module.css";

type CommonProps = ButtonVariantProps & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export type ButtonAsButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

export type ButtonAsLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const isInternalPath = (href: string) =>
  href.startsWith("/") && !href.startsWith("//");

/** Renders a Next `Link` for internal paths, `<a>` for other hrefs, and `<button>` otherwise. */
export default function Button(props: ButtonProps) {
  const {
    variant,
    size,
    fullWidth,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;
  const hasArrowAnim = !!rightIcon;
  const classes = cn(
    buttonVariants({ variant, size, fullWidth }),
    hasArrowAnim && cn(styles.group, "group overflow-hidden"),
    className,
  );
  const body = (
    <>
      {leftIcon}
      {hasArrowAnim ? (
        <span className="flex items-center justify-center">
          <span
            className={cn(
              styles.textAnim,
              "flex items-center whitespace-nowrap",
            )}
          >
            <span className={styles.arrowLeft}>{rightIcon}</span>
            {children}
          </span>
          <span className={cn(styles.arrowRight, "inline-flex ml-2")}>
            {rightIcon}
          </span>
        </span>
      ) : (
        <>
          {children}
          {rightIcon}
        </>
      )}
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
