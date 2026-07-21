import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const baseClasses =
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border font-medium leading-none align-middle";

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]",
  primary:
    "border-[var(--primary)]/20 bg-[var(--primary-soft)] text-[var(--primary)]",
  success:
    "border-[var(--success)]/20 bg-[var(--success)]/10 text-[var(--text-primary)]",
  warning:
    "border-[var(--warning)]/20 bg-[var(--warning)]/10 text-[var(--text-primary)]",
  danger:
    "border-[var(--danger)]/20 bg-[var(--danger)]/10 text-[var(--text-primary)]",
  neutral:
    "border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "h-5 gap-1 px-2 text-xs",
  md: "h-6 gap-1.5 px-2.5 text-sm",
};

const iconClasses: Record<BadgeSize, string> = {
  sm: "[&>svg]:h-3 [&>svg]:w-3",
  md: "[&>svg]:h-4 [&>svg]:w-4",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      icon,
      size = "md",
      variant = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {icon ? (
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex shrink-0 items-center justify-center",
              iconClasses[size],
            )}
          >
            {icon}
          </span>
        ) : null}
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";
