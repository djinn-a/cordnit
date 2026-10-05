import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-1.5 sm:gap-2 font-medium transition-colors whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary-hover text-white border border-transparent shadow-sm",
        secondary: "bg-transparent border border-primary text-primary hover:bg-white/10",
        ghost: "bg-transparent text-primary hover:bg-primary-pale border border-transparent",
        outline: "bg-white border border-border-subtle text-ink hover:border-primary hover:text-primary",
        link: "bg-transparent border-0 shadow-none text-primary hover:text-primary-hover",
      },
      size: {
        sm: "px-3 py-1.5 rounded-btn text-sm font-semibold",
        md: "px-4 sm:px-6 py-2.5 sm:py-2.5 rounded-xl sm:rounded-btn text-[14px] font-semibold leading-[24px]",
        lg: "px-6 py-3 rounded-xl text-lg font-semibold leading-[28px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    compoundVariants: [{ variant: "link", className: "p-0 rounded-none justify-start" }],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariantProps["variant"]>;
