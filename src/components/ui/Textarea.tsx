import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[120px] w-full resize-y rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm leading-6 text-[var(--text-primary)] shadow-[var(--shadow-sm)] transition duration-200 ease-in-out placeholder:text-[var(--text-muted)] hover:border-[var(--text-muted)] focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border)] aria-invalid:border-[var(--danger)] aria-invalid:focus-visible:ring-[var(--danger)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
