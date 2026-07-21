import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Input } from "./Input";

describe("Input component", () => {
  it("renders a native input", () => {
    render(<Input aria-label="Client name" />);

    expect(screen.getByRole("textbox", { name: "Client name" })).toBeInTheDocument();
  });

  it("uses text as the default type", () => {
    render(<Input aria-label="Client name" />);

    expect(screen.getByRole("textbox", { name: "Client name" })).toHaveAttribute(
      "type",
      "text",
    );
  });

  it("exposes default, hover, and focus-visible styles", () => {
    render(<Input aria-label="Client name" />);

    const input = screen.getByRole("textbox", { name: "Client name" });
    input.focus();

    expect(input).toHaveFocus();
    expect(input).toHaveClass("border-[var(--border)]");
    expect(input).toHaveClass("bg-[var(--surface)]");
    expect(input).toHaveClass("hover:border-[var(--text-muted)]");
    expect(input).toHaveClass("focus-visible:border-[var(--primary)]");
    expect(input).toHaveClass("focus-visible:ring-2");
    expect(input).toHaveClass("focus-visible:outline-none");
  });

  it("renders a placeholder", () => {
    render(<Input placeholder="Enter client name" />);

    const input = screen.getByPlaceholderText("Enter client name");
    expect(input).toHaveAttribute("placeholder", "Enter client name");
    expect(input).toHaveClass("placeholder:text-[var(--text-muted)]");
  });

  it("supports a default value", () => {
    render(<Input aria-label="Case reference" defaultValue="LEG-2026-0142" />);

    expect(screen.getByRole("textbox", { name: "Case reference" })).toHaveValue(
      "LEG-2026-0142",
    );
  });

  it("supports a controlled value", () => {
    function ControlledInput() {
      const [value, setValue] = React.useState("Initial client");

      return (
        <Input
          aria-label="Client name"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }

    render(<ControlledInput />);

    const input = screen.getByRole("textbox", { name: "Client name" });
    fireEvent.change(input, { target: { value: "Sophie Martin" } });

    expect(input).toHaveValue("Sophie Martin");
  });

  it("supports the disabled state", () => {
    render(<Input aria-label="Case reference" disabled />);

    const input = screen.getByRole("textbox", { name: "Case reference" });
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:cursor-not-allowed");
    expect(input).toHaveClass("disabled:opacity-50");
  });

  it("supports the read-only state", () => {
    render(<Input aria-label="Case reference" readOnly />);

    expect(screen.getByRole("textbox", { name: "Case reference" })).toHaveAttribute(
      "readonly",
    );
  });

  it("supports the required state", () => {
    render(<Input aria-label="Client name" required />);

    expect(screen.getByRole("textbox", { name: "Client name" })).toBeRequired();
  });

  it("supports the invalid state", () => {
    render(<Input aria-label="Email" aria-invalid="true" />);

    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toBeInvalid();
    expect(input).toHaveClass("aria-invalid:border-[var(--danger)]");
    expect(input).toHaveClass("aria-invalid:focus-visible:ring-[var(--danger)]");
  });

  it("supports aria-describedby", () => {
    render(
      <>
        <Input aria-label="Email" aria-describedby="email-error" />
        <p id="email-error">Enter a valid email address.</p>
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAccessibleDescription(
      "Enter a valid email address.",
    );
  });

  it("accepts a custom className", () => {
    render(<Input aria-label="Client name" className="max-w-md" />);

    expect(screen.getByRole("textbox", { name: "Client name" })).toHaveClass(
      "max-w-md",
    );
  });

  it("merges conflicting classes without removing default styles", () => {
    render(<Input aria-label="Client name" className="h-12 px-6" />);

    const input = screen.getByRole("textbox", { name: "Client name" });
    expect(input).toHaveClass("h-12");
    expect(input).toHaveClass("px-6");
    expect(input).not.toHaveClass("h-[44px]");
    expect(input).not.toHaveClass("px-3");
    expect(input).toHaveClass("border-[var(--border)]");
  });

  it("forwards its ref to the native input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Client name" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Client name" }));
  });

  it("forwards native input attributes", () => {
    render(
      <Input
        id="case-reference"
        aria-label="Case reference"
        name="caseReference"
        autoComplete="off"
        maxLength={20}
        pattern="LEG-[0-9]+"
        title="Legora case reference"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Case reference" });
    expect(input).toHaveAttribute("id", "case-reference");
    expect(input).toHaveAttribute("name", "caseReference");
    expect(input).toHaveAttribute("autocomplete", "off");
    expect(input).toHaveAttribute("maxlength", "20");
    expect(input).toHaveAttribute("pattern", "LEG-[0-9]+");
    expect(input).toHaveAttribute("title", "Legora case reference");
  });

  it("calls the native change handler", () => {
    const handleChange = vi.fn();
    render(<Input aria-label="Client name" onChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox", { name: "Client name" }), {
      target: { value: "Sophie Martin" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it.each(["text", "email", "password", "number", "search", "tel", "url", "date"])(
    "supports the %s input type",
    (type) => {
      const { container } = render(<Input type={type} aria-label={`${type} input`} />);

      expect(container.querySelector("input")).toHaveAttribute("type", type);
    },
  );

  it("uses the native accessible role and associated label", () => {
    render(
      <>
        <label htmlFor="client-email">Email</label>
        <Input id="client-email" type="email" />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });
});
