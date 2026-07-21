import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Label } from "./Label";
import { Textarea } from "./Textarea";

describe("Textarea component", () => {
  it("renders a native textarea", () => {
    const { container } = render(<Textarea aria-label="Case description" />);

    expect(container.querySelector("textarea")).toBeInTheDocument();
  });

  it("exposes the native textbox role", () => {
    render(<Textarea aria-label="Case description" />);

    expect(
      screen.getByRole("textbox", { name: "Case description" }),
    ).toBeInTheDocument();
  });

  it("renders a placeholder", () => {
    render(<Textarea placeholder="Describe the case" />);

    expect(screen.getByPlaceholderText("Describe the case")).toHaveAttribute(
      "placeholder",
      "Describe the case",
    );
  });

  it("supports a default value", () => {
    render(
      <Textarea
        aria-label="Internal note"
        defaultValue="Review the latest client documents."
      />,
    );

    expect(screen.getByRole("textbox", { name: "Internal note" })).toHaveValue(
      "Review the latest client documents.",
    );
  });

  it("supports a controlled value", async () => {
    const user = userEvent.setup();

    function ControlledTextarea() {
      const [value, setValue] = React.useState("Initial observation");

      return (
        <Textarea
          aria-label="Client observations"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }

    render(<ControlledTextarea />);

    const textarea = screen.getByRole("textbox", {
      name: "Client observations",
    });
    await user.clear(textarea);
    await user.type(textarea, "Client approved the draft.");

    expect(textarea).toHaveValue("Client approved the draft.");
  });

  it("supports native user typing", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Internal note" />);

    const textarea = screen.getByRole("textbox", { name: "Internal note" });
    await user.type(textarea, "Request the signed agreement.");

    expect(textarea).toHaveValue("Request the signed agreement.");
  });

  it("calls the native change handler", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Textarea aria-label="Legal analysis" onChange={handleChange} />,
    );

    await user.type(
      screen.getByRole("textbox", { name: "Legal analysis" }),
      "Review",
    );

    expect(handleChange).toHaveBeenCalled();
  });

  it("supports the disabled state", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Internal note" disabled />);

    const textarea = screen.getByRole("textbox", { name: "Internal note" });
    await user.type(textarea, "This should not be entered.");

    expect(textarea).toBeDisabled();
    expect(textarea).toHaveValue("");
    expect(textarea).toHaveClass("disabled:cursor-not-allowed");
    expect(textarea).toHaveClass("disabled:opacity-50");
    expect(textarea).toHaveClass("disabled:hover:border-[var(--border)]");
  });

  it("supports the read-only state", async () => {
    const user = userEvent.setup();
    render(
      <Textarea
        aria-label="Legal analysis"
        defaultValue="Approved legal analysis."
        readOnly
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Legal analysis" });
    await user.type(textarea, "Updated");

    expect(textarea).toHaveAttribute("readonly");
    expect(textarea).toHaveValue("Approved legal analysis.");
  });

  it("supports the required state", () => {
    render(<Textarea aria-label="Case description" required />);

    expect(
      screen.getByRole("textbox", { name: "Case description" }),
    ).toBeRequired();
  });

  it("supports rows", () => {
    render(<Textarea aria-label="AI drafting instructions" rows={6} />);

    expect(
      screen.getByRole("textbox", { name: "AI drafting instructions" }),
    ).toHaveAttribute("rows", "6");
  });

  it("supports minimum and maximum lengths", () => {
    render(
      <Textarea
        aria-label="Case description"
        minLength={20}
        maxLength={500}
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Case description" });
    expect(textarea).toHaveAttribute("minlength", "20");
    expect(textarea).toHaveAttribute("maxlength", "500");
  });

  it("forwards native textarea attributes", () => {
    render(
      <Textarea
        id="legal-analysis"
        aria-label="Legal analysis"
        name="legalAnalysis"
        cols={40}
        autoComplete="off"
        title="Legal analysis notes"
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Legal analysis" });
    expect(textarea).toHaveAttribute("id", "legal-analysis");
    expect(textarea).toHaveAttribute("name", "legalAnalysis");
    expect(textarea).toHaveAttribute("cols", "40");
    expect(textarea).toHaveAttribute("autocomplete", "off");
    expect(textarea).toHaveAttribute("title", "Legal analysis notes");
  });

  it("supports the invalid state", () => {
    render(<Textarea aria-label="Case description" aria-invalid="true" />);

    const textarea = screen.getByRole("textbox", { name: "Case description" });
    expect(textarea).toBeInvalid();
    expect(textarea).toHaveClass("aria-invalid:border-[var(--danger)]");
    expect(textarea).toHaveClass(
      "aria-invalid:focus-visible:ring-[var(--danger)]",
    );
  });

  it("supports aria-describedby", () => {
    render(
      <>
        <Textarea
          aria-label="Case description"
          aria-describedby="case-description-help"
        />
        <p id="case-description-help">Include the relevant legal context.</p>
      </>,
    );

    expect(
      screen.getByRole("textbox", { name: "Case description" }),
    ).toHaveAccessibleDescription("Include the relevant legal context.");
  });

  it("accepts a custom className", () => {
    render(
      <Textarea aria-label="Internal note" className="max-w-2xl" />,
    );

    expect(screen.getByRole("textbox", { name: "Internal note" })).toHaveClass(
      "max-w-2xl",
    );
  });

  it("merges conflicting Tailwind classes", () => {
    render(
      <Textarea
        aria-label="Internal note"
        className="min-h-64 resize-none px-6"
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Internal note" });
    expect(textarea).toHaveClass("min-h-64");
    expect(textarea).toHaveClass("resize-none");
    expect(textarea).toHaveClass("px-6");
    expect(textarea).not.toHaveClass("min-h-[120px]");
    expect(textarea).not.toHaveClass("resize-y");
    expect(textarea).not.toHaveClass("px-3");
    expect(textarea).toHaveClass("border-[var(--border)]");
  });

  it("preserves the expected default styles", () => {
    render(<Textarea aria-label="Case description" />);

    const textarea = screen.getByRole("textbox", { name: "Case description" });
    expect(textarea).toHaveClass("min-h-[120px]");
    expect(textarea).toHaveClass("w-full");
    expect(textarea).toHaveClass("rounded-[var(--radius-md)]");
    expect(textarea).toHaveClass("border-[var(--border)]");
    expect(textarea).toHaveClass("bg-[var(--surface)]");
    expect(textarea).toHaveClass("text-[var(--text-primary)]");
    expect(textarea).toHaveClass("shadow-[var(--shadow-sm)]");
    expect(textarea).toHaveClass("leading-6");
    expect(textarea).toHaveClass("transition");
    expect(textarea).toHaveClass("duration-200");
    expect(textarea).toHaveClass("ease-in-out");
  });

  it("forwards its ref to the native textarea", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="Case description" />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current).toBe(
      screen.getByRole("textbox", { name: "Case description" }),
    );
  });

  it("associates with Label through htmlFor and id", () => {
    render(
      <>
        <Label htmlFor="client-observations">Client observations</Label>
        <Textarea id="client-observations" />
      </>,
    );

    expect(
      screen.getByRole("textbox", { name: "Client observations" }),
    ).toBeInTheDocument();
  });

  it("exposes hover styles", () => {
    render(<Textarea aria-label="Case description" />);

    expect(
      screen.getByRole("textbox", { name: "Case description" }),
    ).toHaveClass("hover:border-[var(--text-muted)]");
  });

  it("exposes focus-visible styles", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Case description" />);

    const textarea = screen.getByRole("textbox", { name: "Case description" });
    await user.click(textarea);

    expect(textarea).toHaveFocus();
    expect(textarea).toHaveClass("focus-visible:border-[var(--primary)]");
    expect(textarea).toHaveClass("focus-visible:ring-2");
    expect(textarea).toHaveClass("focus-visible:ring-[var(--primary)]");
    expect(textarea).toHaveClass("focus-visible:outline-none");
  });

  it("exposes placeholder styles", () => {
    render(
      <Textarea
        aria-label="Case description"
        placeholder="Describe the case"
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "Case description" }),
    ).toHaveClass("placeholder:text-[var(--text-muted)]");
  });

  it("only allows vertical resizing by default", () => {
    render(<Textarea aria-label="Case description" />);

    const textarea = screen.getByRole("textbox", { name: "Case description" });
    expect(textarea).toHaveClass("resize-y");
    expect(textarea).not.toHaveClass("resize-x");
    expect(textarea).not.toHaveClass("resize");
  });
});
