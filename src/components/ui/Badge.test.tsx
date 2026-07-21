import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import {
  Badge,
  type BadgeSize,
  type BadgeVariant,
} from "./Badge";

const variants: Array<{
  className: string;
  variant: BadgeVariant;
}> = [
  { variant: "default", className: "bg-[var(--surface)]" },
  { variant: "primary", className: "bg-[var(--primary-soft)]" },
  { variant: "success", className: "bg-[var(--success)]/10" },
  { variant: "warning", className: "bg-[var(--warning)]/10" },
  { variant: "danger", className: "bg-[var(--danger)]/10" },
  { variant: "neutral", className: "bg-[var(--background)]" },
];

const sizes: Array<{
  classes: string[];
  size: BadgeSize;
}> = [
  { size: "sm", classes: ["h-5", "px-2", "text-xs"] },
  { size: "md", classes: ["h-6", "px-2.5", "text-sm"] },
];

describe("Badge component", () => {
  it("renders its children in a semantic span", () => {
    render(<Badge>Draft</Badge>);

    const badge = screen.getByText("Draft");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toBeInTheDocument();
  });

  it("uses the default variant and medium size", () => {
    render(<Badge>Draft</Badge>);

    const badge = screen.getByText("Draft");
    expect(badge).toHaveClass("bg-[var(--surface)]");
    expect(badge).toHaveClass("text-[var(--text-secondary)]");
    expect(badge).toHaveClass("h-6");
    expect(badge).toHaveClass("text-sm");
  });

  it.each(variants)(
    "renders the $variant variant",
    ({ className, variant }) => {
      render(<Badge variant={variant}>{variant}</Badge>);

      expect(screen.getByText(variant)).toHaveClass(className);
    },
  );

  it.each(sizes)("renders the $size size", ({ classes, size }) => {
    render(<Badge size={size}>{size}</Badge>);

    expect(screen.getByText(size)).toHaveClass(...classes);
  });

  it("renders an icon before its content", () => {
    render(
      <Badge icon={<svg data-testid="badge-icon" aria-label="Paid icon" />}>
        Paid
      </Badge>,
    );

    const badge = screen.getByText("Paid");
    const iconWrapper = screen.getByTestId("badge-icon").parentElement;
    expect(badge.firstElementChild).toBe(iconWrapper);
    expect(iconWrapper).toHaveAttribute("aria-hidden", "true");
  });

  it.each([
    { size: "sm" as const, className: "[&>svg]:h-3" },
    { size: "md" as const, className: "[&>svg]:h-4" },
  ])("keeps icon sizing consistent for $size", ({ className, size }) => {
    render(
      <Badge size={size} icon={<svg data-testid={`${size}-icon`} />}>
        Status
      </Badge>,
    );

    expect(screen.getByTestId(`${size}-icon`).parentElement).toHaveClass(
      className,
    );
  });

  it("does not add an icon wrapper when no icon is provided", () => {
    render(<Badge>Archived</Badge>);

    expect(screen.getByText("Archived").children).toHaveLength(0);
  });

  it("hides decorative icon content from the accessibility tree", () => {
    render(
      <Badge icon={<svg role="img" aria-label="Paid icon" />}>
        Paid
      </Badge>,
    );

    expect(
      screen.queryByRole("img", { name: "Paid icon" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Paid")).toBeVisible();
  });

  it("forwards its ref to the native span", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Pending</Badge>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toBe(screen.getByText("Pending"));
  });

  it("accepts a custom className", () => {
    render(<Badge className="uppercase">Draft</Badge>);

    const badge = screen.getByText("Draft");
    expect(badge).toHaveClass("uppercase");
    expect(badge).toHaveClass("inline-flex");
  });

  it("merges conflicting Tailwind classes", () => {
    render(
      <Badge className="h-8 rounded-none px-4 text-base">Draft</Badge>,
    );

    const badge = screen.getByText("Draft");
    expect(badge).toHaveClass("h-8");
    expect(badge).toHaveClass("rounded-none");
    expect(badge).toHaveClass("px-4");
    expect(badge).toHaveClass("text-base");
    expect(badge).not.toHaveClass("h-6");
    expect(badge).not.toHaveClass("rounded-full");
    expect(badge).not.toHaveClass("px-2.5");
    expect(badge).not.toHaveClass("text-sm");
  });

  it("forwards native span attributes", () => {
    render(
      <Badge
        id="invoice-status"
        title="Invoice payment status"
        data-status="paid"
        aria-label="Invoice paid"
      >
        Paid
      </Badge>,
    );

    const badge = screen.getByLabelText("Invoice paid");
    expect(badge).toHaveAttribute("id", "invoice-status");
    expect(badge).toHaveAttribute("title", "Invoice payment status");
    expect(badge).toHaveAttribute("data-status", "paid");
  });

  it("preserves optional keyboard behavior supplied by the consumer", () => {
    const handleKeyDown = vi.fn();
    render(
      <Badge tabIndex={0} onKeyDown={handleKeyDown}>
        Pending
      </Badge>,
    );

    const badge = screen.getByText("Pending");
    badge.focus();
    fireEvent.keyDown(badge, { key: "Enter" });

    expect(badge).toHaveFocus();
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it("exposes a displayName", () => {
    expect(Badge.displayName).toBe("Badge");
  });
});
