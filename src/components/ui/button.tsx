import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: ReactNode;
  className?: string;
  /** Anchor-only: opens the link in a new tab when "https://…" is external. */
  target?: string;
  /** Anchor-only: paired with target="_blank" for safe external links. */
  rel?: string;
  /** Button-only: the native `type` attribute (e.g. "submit"). */
  type?: "button" | "submit" | "reset";
  /** Button-only: disables the control (e.g. during async submit). */
  disabled?: boolean;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60 focus-visible:ring-offset-2";
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-yellow text-ink rounded-pill",
  outline: "border border-current rounded-pill",
  ghost: "text-current underline-offset-4 hover:underline",
};
const sizeClasses: Record<ButtonSize, string> = {
  md: "px-6 py-3.5 sm:px-8 sm:py-4",
  lg: "px-6 py-4 text-base sm:px-10 sm:py-5 sm:text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  className,
  target,
  rel,
  type,
  disabled,
  children,
  ...rest
}: ButtonProps & HTMLAttributes<HTMLElement>) {
  const classes = [base, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={classes}
        data-variant={variant}
        {...(rest as HTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      className={classes}
      data-variant={variant}
      {...(rest as HTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {icon}
    </button>
  );
}