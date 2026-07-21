import * as React from "react";

import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  requiredIndicator?: boolean;
  disabled?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      className,
      disabled = false,
      requiredIndicator = false,
      "aria-disabled": ariaDisabled,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        ref={ref}
        aria-disabled={ariaDisabled ?? (disabled ? "true" : undefined)}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium leading-5 text-[var(--text-primary)]",
          disabled && "cursor-not-allowed text-[var(--text-muted)]",
          className,
        )}
        {...props}
      >
        {children}
        {requiredIndicator ? (
          <span aria-hidden="true" className="text-[var(--danger)]">
            *
          </span>
        ) : null}
      </label>
    );
  },
);
Label.displayName = "Label";
