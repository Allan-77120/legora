import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./Input";
import { Label } from "./Label";

describe("Label component", () => {
  it("renders a native label", () => {
    const { container } = render(<Label>Client name</Label>);

    expect(container.querySelector("label")).toBeInTheDocument();
  });

  it("renders its text content", () => {
    render(<Label>Client name</Label>);

    expect(screen.getByText("Client name")).toBeInTheDocument();
  });

  it("associates with a form control through htmlFor and id", () => {
    render(
      <>
        <Label htmlFor="client-name">Client name</Label>
        <input id="client-name" />
      </>,
    );

    expect(screen.getByLabelText("Client name")).toBe(
      screen.getByRole("textbox", { name: "Client name" }),
    );
  });

  it("supports custom children", () => {
    render(
      <Label>
        <span data-testid="label-icon" aria-hidden="true">
          Icon
        </span>
        <span>Search documents</span>
      </Label>,
    );

    expect(screen.getByTestId("label-icon")).toBeInTheDocument();
    expect(screen.getByText("Search documents")).toBeInTheDocument();
  });

  it("forwards native label attributes", () => {
    render(
      <>
        <Label
          id="email-label"
          htmlFor="client-email"
          title="Client email address"
          aria-label="Email field"
          aria-describedby="email-label-description"
        >
          Email
        </Label>
        <span id="email-label-description">Used for correspondence.</span>
      </>,
    );

    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("id", "email-label");
    expect(label).toHaveAttribute("for", "client-email");
    expect(label).toHaveAttribute("title", "Client email address");
    expect(label).toHaveAttribute("aria-label", "Email field");
    expect(label).toHaveAttribute("aria-describedby", "email-label-description");
  });

  it("accepts a custom className", () => {
    render(<Label className="uppercase">Case reference</Label>);

    expect(screen.getByText("Case reference")).toHaveClass("uppercase");
  });

  it("merges conflicting Tailwind classes without removing other base styles", () => {
    render(
      <Label className="text-base font-bold leading-7">Case reference</Label>,
    );

    const label = screen.getByText("Case reference");
    expect(label).toHaveClass("text-base");
    expect(label).toHaveClass("font-bold");
    expect(label).toHaveClass("leading-7");
    expect(label).not.toHaveClass("text-sm");
    expect(label).not.toHaveClass("font-medium");
    expect(label).not.toHaveClass("leading-5");
    expect(label).toHaveClass("text-[var(--text-primary)]");
  });

  it("forwards its ref to the native label", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Client name</Label>);

    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    expect(ref.current).toBe(screen.getByText("Client name"));
  });

  it("exposes the expected base styles", () => {
    render(<Label>Client name</Label>);

    const label = screen.getByText("Client name");
    expect(label).toHaveClass("inline-flex");
    expect(label).toHaveClass("text-sm");
    expect(label).toHaveClass("font-medium");
    expect(label).toHaveClass("leading-5");
    expect(label).toHaveClass("text-[var(--text-primary)]");
  });

  it("does not expose disabled styling by default", () => {
    render(<Label>Case reference</Label>);

    const label = screen.getByText("Case reference");
    expect(label).toHaveClass("text-[var(--text-primary)]");
    expect(label).not.toHaveClass("text-[var(--text-muted)]");
    expect(label).not.toHaveClass("cursor-not-allowed");
    expect(label).not.toHaveAttribute("aria-disabled");
  });

  it("applies explicit disabled styling", () => {
    render(<Label disabled>Case reference</Label>);

    const label = screen.getByText("Case reference");
    expect(label).toHaveClass("text-[var(--text-muted)]");
    expect(label).toHaveClass("cursor-not-allowed");
    expect(label).not.toHaveClass("text-[var(--text-primary)]");
  });

  it("sets aria-disabled when disabled is true", () => {
    render(<Label disabled>Case reference</Label>);

    expect(screen.getByText("Case reference")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("respects a caller-provided aria-disabled value", () => {
    render(
      <Label disabled aria-disabled="false">
        Case reference
      </Label>,
    );

    expect(screen.getByText("Case reference")).toHaveAttribute(
      "aria-disabled",
      "false",
    );
  });

  it("does not render an asterisk by default", () => {
    render(<Label>Email</Label>);

    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renders an asterisk when requiredIndicator is true", () => {
    render(<Label requiredIndicator>Email</Label>);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("uses the danger token for the required asterisk", () => {
    render(<Label requiredIndicator>Email</Label>);

    expect(screen.getByText("*")).toHaveClass("text-[var(--danger)]");
  });

  it("hides the required asterisk from assistive technologies", () => {
    render(<Label requiredIndicator>Email</Label>);

    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps the required indicator when disabled", () => {
    render(
      <Label disabled requiredIndicator>
        Email
      </Label>,
    );

    expect(screen.getByText("Email")).toHaveClass("text-[var(--text-muted)]");
    expect(screen.getByText("*")).toHaveClass("text-[var(--danger)]");
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("does not alter the associated control accessible name", () => {
    render(
      <>
        <Label htmlFor="required-email" requiredIndicator>
          Email
        </Label>
        <input id="required-email" />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAccessibleName(
      "Email",
    );
  });

  it("does not make the associated control required", () => {
    render(
      <>
        <Label htmlFor="optional-email" requiredIndicator>
          Email
        </Label>
        <input id="optional-email" />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).not.toBeRequired();
  });

  it("focuses the associated control when clicked", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="case-reference">Case reference</Label>
        <Input id="case-reference" />
      </>,
    );

    await user.click(screen.getByText("Case reference"));

    expect(screen.getByRole("textbox", { name: "Case reference" })).toHaveFocus();
  });
});
