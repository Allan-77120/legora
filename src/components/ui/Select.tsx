import * as React from "react";

import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, multiple, size, ...props }, ref) => {
    const isListbox = multiple || (size !== undefined && size > 1);

    return (
      <select
        ref={ref}
        multiple={multiple}
        size={size}
        className={cn(
          "w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 pr-10 text-sm text-[var(--text-primary)] shadow-[var(--shadow-sm)] transition duration-200 ease-in-out hover:border-[var(--text-muted)] focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--border)] aria-invalid:border-[var(--danger)] aria-invalid:focus-visible:ring-[var(--danger)]",
          isListbox ? "min-h-[120px] py-2" : "h-[44px]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);
Select.displayName = "Select";
