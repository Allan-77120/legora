"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  indeterminate?: boolean;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate = false, ...props }, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const setRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    React.useLayoutEffect(() => {
      inputRef.current!.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <input
        {...props}
        ref={setRef}
        type="checkbox"
        className={cn(
          "h-5 w-5 shrink-0 cursor-pointer rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] accent-[var(--primary)] shadow-[var(--shadow-sm)] transition duration-200 ease-in-out hover:border-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 checked:border-[var(--primary)] checked:bg-[var(--primary)] indeterminate:border-[var(--primary)] indeterminate:bg-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border)] aria-invalid:border-[var(--danger)] aria-invalid:focus-visible:ring-[var(--danger)]",
          className,
        )}
      />
    );
  },
);
Checkbox.displayName = "Checkbox";
