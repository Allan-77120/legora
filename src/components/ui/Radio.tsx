import * as React from "react";

import { cn } from "@/lib/utils";

export type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type="radio"
        className={cn(
          "h-5 w-5 shrink-0 cursor-pointer rounded-full border border-[var(--border)] bg-[var(--surface)] accent-[var(--primary)] shadow-[var(--shadow-sm)] transition duration-200 ease-in-out hover:border-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 checked:border-[var(--primary)] checked:bg-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border)] aria-invalid:border-[var(--danger)] aria-invalid:focus-visible:ring-[var(--danger)]",
          className,
        )}
      />
    );
  },
);
Radio.displayName = "Radio";
