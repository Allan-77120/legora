import * as React from "react";

import { cn } from "@/lib/utils";

export type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "role" | "type"
>;

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <span className="relative inline-flex h-6 w-11 shrink-0 align-middle">
        <input
          {...props}
          ref={ref}
          type="checkbox"
          role="switch"
          className={cn(
            "peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed",
            className,
          )}
        />
        <span
          aria-hidden="true"
          className="relative inline-flex h-6 w-11 rounded-full border border-[var(--border)] bg-[var(--border)] shadow-[var(--shadow-sm)] transition duration-200 ease-in-out after:absolute after:left-[1px] after:top-[1px] after:h-5 after:w-5 after:rounded-full after:bg-[var(--surface)] after:shadow-[var(--shadow-sm)] after:transition-transform after:duration-200 after:ease-in-out peer-hover:border-[var(--text-muted)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--primary)] peer-focus-visible:ring-offset-2 peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] peer-checked:after:translate-x-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-aria-invalid:border-[var(--danger)] peer-aria-invalid:peer-focus-visible:ring-[var(--danger)]"
        />
      </span>
    );
  },
);
Switch.displayName = "Switch";
