import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-hover text-white border border-transparent shadow-sm",
  secondary:
    "bg-transparent border border-primary text-primary hover:bg-white/10",
  ghost: "bg-transparent text-primary hover:bg-primary-pale border border-transparent",
  outline:
    "bg-white border border-border-subtle text-ink hover:border-primary hover:text-primary",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 rounded-btn text-button",
  md: "px-4 sm:px-6 py-2.5 sm:py-2.5 rounded-xl sm:rounded-btn text-button",
  lg: "px-6 py-3 rounded-xl text-button",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 sm:gap-2 font-medium transition-colors whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none",
        variantClass[variant],
        sizeClass[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
