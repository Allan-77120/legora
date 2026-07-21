import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-[44px] w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] shadow-[var(--shadow-sm)] transition duration-200 ease-in-out placeholder:text-[var(--text-muted)] hover:border-[var(--text-muted)] focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border)] aria-invalid:border-[var(--danger)] aria-invalid:focus-visible:ring-[var(--danger)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
