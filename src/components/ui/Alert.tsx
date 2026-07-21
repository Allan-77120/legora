"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

type AlertRole = "alert" | "status";

interface AlertVariantConfig {
  className: string;
  iconClassName: string;
  role: AlertRole;
}

const variantConfig: Record<AlertVariant, AlertVariantConfig> = {
  info: {
    className: "border-[var(--primary)]/20 bg-[var(--primary-soft)]",
    iconClassName: "text-[var(--primary)]",
    role: "status",
  },
  success: {
    className: "border-[var(--success)]/20 bg-[var(--success)]/10",
    iconClassName: "text-[var(--success)]",
    role: "status",
  },
  warning: {
    className: "border-[var(--warning)]/20 bg-[var(--warning)]/10",
    iconClassName: "text-[var(--warning)]",
    role: "alert",
  },
  danger: {
    className: "border-[var(--danger)]/20 bg-[var(--danger)]/10",
    iconClassName: "text-[var(--danger)]",
    role: "alert",
  },
};

const rootClasses =
  "flex w-full flex-col gap-3 rounded-[var(--radius-md)] border p-4 text-[var(--text-primary)] shadow-[var(--shadow-sm)] sm:flex-row sm:items-start";

const contentClasses = "flex min-w-0 flex-1 items-start gap-3";
const iconClasses =
  "mt-0.5 inline-flex shrink-0 items-center justify-center [&>svg]:h-5 [&>svg]:w-5";
const titleClasses = "text-sm font-semibold leading-5";
const descriptionClasses = "text-sm leading-6 text-[var(--text-secondary)]";
const actionsClasses =
  "flex shrink-0 items-center gap-2 self-start sm:ml-auto";
const dismissButtonClasses =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-secondary)] transition duration-200 ease-in-out hover:bg-[var(--surface)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2";

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      action,
      children,
      className,
      dismissible = false,
      icon,
      onDismiss,
      title,
      variant = "info",
      ...props
    },
    ref,
  ) => {
    const config = variantConfig[variant];
    const hasAction = action !== null && action !== undefined;
    const hasDescription = children !== null && children !== undefined;
    const hasTitle = title !== null && title !== undefined;

    return (
      <div
        {...props}
        ref={ref}
        role={config.role}
        className={cn(rootClasses, config.className, className)}
      >
        <div className={contentClasses}>
          {icon ? (
            <span
              aria-hidden="true"
              className={cn(iconClasses, config.iconClassName)}
            >
              {icon}
            </span>
          ) : null}

          <div className="min-w-0 flex-1">
            {hasTitle ? (
              <div className={titleClasses}>{title}</div>
            ) : null}
            {hasDescription ? (
              <div className={cn(descriptionClasses, hasTitle && "mt-1")}>
                {children}
              </div>
            ) : null}
          </div>
        </div>

        {hasAction || dismissible ? (
          <div className={actionsClasses}>
            {hasAction ? action : null}
            {dismissible ? (
              <button
                type="button"
                aria-label="Dismiss alert"
                className={dismissButtonClasses}
                onClick={() => onDismiss?.()}
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);
Alert.displayName = "Alert";
