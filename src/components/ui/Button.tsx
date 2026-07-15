"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary)] px-4 text-sm font-semibold text-white transition duration-200 ease-in-out hover:scale-[1.02] hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary-hover)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[var(--primary)] disabled:hover:shadow-none",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
