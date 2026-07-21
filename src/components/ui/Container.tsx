import * as React from "react";

import { cn } from "@/lib/utils";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export type ContainerPadding = "none" | "sm" | "md" | "lg";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padding?: ContainerPadding;
  centered?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-none",
};

const paddingClasses: Record<ContainerPadding, string> = {
  none: "px-0",
  sm: "px-4",
  md: "px-4 sm:px-6",
  lg: "px-4 sm:px-6 lg:px-8",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      centered = true,
      className,
      padding = "md",
      size = "xl",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          sizeClasses[size],
          paddingClasses[padding],
          centered && "mx-auto",
          className,
        )}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";
