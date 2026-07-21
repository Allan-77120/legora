import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox, type CheckboxProps } from "./Checkbox";
import { Label } from "./Label";

describe("Checkbox component", () => {
  it("renders a native checkbox input", () => {
    const { container } = render(<Checkbox aria-label="Client consent" />);

    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it("forces the checkbox type", () => {
    const unsafeProps = {
      type: "radio",
    } as unknown as CheckboxProps;

    render(<Checkbox {...unsafeProps} aria-label="Client consent" />);

    expect(
      screen.getByRole("checkbox", { name: "Client consent" }),
    ).toHaveAttribute("type", "checkbox");
  });

  it("exposes the native checkbox role", () => {
    render(<Checkbox aria-label="Client consent" />);

    expect(
      screen.getByRole("checkbox", { name: "Client consent" }),
    ).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox aria-label="Client consent" />);

    expect(
      screen.getByRole("checkbox", { name: "Client consent" }),
    ).not.toBeChecked();
  });

  it("supports defaultChecked", () => {
    render(<Checkbox aria-label="Email notifications" defaultChecked />);

    expect(
      screen.getByRole("checkbox", { name: "Email notifications" }),
    ).toBeChecked();
  });

  it("supports a controlled checked state", async () => {
    const user = userEvent.setup();

    function ControlledCheckbox() {
      const [checked, setChecked] = React.useState(false);

      return (
        <Checkbox
          aria-label="Mark task as completed"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      );
    }

    render(<ControlledCheckbox />);

    const checkbox = screen.getByRole("checkbox", {
      name: "Mark task as completed",
    });
    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("toggles through a user click", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Include archived cases" />);

    const checkbox = screen.getByRole("checkbox", {
      name: "Include archived cases",
    });
    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it("toggles through the native Space key interaction", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Select document" />);

    await user.tab();

    const checkbox = screen.getByRole("checkbox", { name: "Select document" });
    expect(checkbox).toHaveFocus();

    await user.keyboard(" ");

    expect(checkbox).toBeChecked();
  });

  it("calls the native change handler", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Checkbox aria-label="Client consent" onChange={handleChange} />,
    );

    await user.click(
      screen.getByRole("checkbox", { name: "Client consent" }),
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("supports the disabled state", () => {
    render(<Checkbox aria-label="Include archived cases" disabled />);

    const checkbox = screen.getByRole("checkbox", {
      name: "Include archived cases",
    });
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass("disabled:cursor-not-allowed");
    expect(checkbox).toHaveClass("disabled:opacity-50");
    expect(checkbox).toHaveClass("disabled:hover:border-[var(--border)]");
  });

  it("cannot be toggled when disabled", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Include archived cases" disabled />);

    const checkbox = screen.getByRole("checkbox", {
      name: "Include archived cases",
    });
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it("supports the required state", () => {
    render(<Checkbox aria-label="Accept data processing terms" required />);

    expect(
      screen.getByRole("checkbox", { name: "Accept data processing terms" }),
    ).toBeRequired();
  });

  it("forwards readOnly without adding custom behavior", () => {
    render(<Checkbox aria-label="Legal workflow option" readOnly />);

    expect(
      screen.getByRole("checkbox", { name: "Legal workflow option" }),
    ).toHaveAttribute("readonly");
  });

  it("supports the invalid state", () => {
    render(<Checkbox aria-label="Client consent" aria-invalid="true" />);

    const checkbox = screen.getByRole("checkbox", { name: "Client consent" });
    expect(checkbox).toBeInvalid();
    expect(checkbox).toHaveClass("aria-invalid:border-[var(--danger)]");
    expect(checkbox).toHaveClass(
      "aria-invalid:focus-visible:ring-[var(--danger)]",
    );
  });

  it("supports aria-describedby", () => {
    render(
      <>
        <Checkbox
          aria-label="Client consent"
          aria-describedby="consent-description"
        />
        <p id="consent-description">Required before processing client data.</p>
      </>,
    );

    expect(
      screen.getByRole("checkbox", { name: "Client consent" }),
    ).toHaveAccessibleDescription("Required before processing client data.");
  });

  it("supports name, id, value, and form", () => {
    render(
      <>
        <form id="consent-form" />
        <Checkbox
          id="client-consent"
          aria-label="Client consent"
          name="consent"
          value="accepted"
          form="consent-form"
        />
      </>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Client consent" });
    expect(checkbox).toHaveAttribute("id", "client-consent");
    expect(checkbox).toHaveAttribute("name", "consent");
    expect(checkbox).toHaveAttribute("value", "accepted");
    expect(checkbox).toHaveAttribute("form", "consent-form");
  });

  it("preserves native form submission behavior", () => {
    render(
      <form data-testid="consent-form">
        <Checkbox name="consent" value="accepted" defaultChecked />
      </form>,
    );

    const form = screen.getByTestId("consent-form") as HTMLFormElement;
    const formData = new FormData(form);

    expect(formData.get("consent")).toBe("accepted");
  });

  it("accepts a custom className", () => {
    render(<Checkbox aria-label="Client consent" className="mt-1" />);

    expect(
      screen.getByRole("checkbox", { name: "Client consent" }),
    ).toHaveClass("mt-1");
  });

  it("merges conflicting Tailwind classes", () => {
    render(
      <Checkbox
        aria-label="Client consent"
        className="h-6 w-6 rounded-none"
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Client consent" });
    expect(checkbox).toHaveClass("h-6");
    expect(checkbox).toHaveClass("w-6");
    expect(checkbox).toHaveClass("rounded-none");
    expect(checkbox).not.toHaveClass("h-5");
    expect(checkbox).not.toHaveClass("w-5");
    expect(checkbox).not.toHaveClass("rounded-[var(--radius-sm)]");
  });

  it("preserves unrelated default classes with a custom className", () => {
    render(<Checkbox aria-label="Client consent" className="mt-1" />);

    const checkbox = screen.getByRole("checkbox", { name: "Client consent" });
    expect(checkbox).toHaveClass("mt-1");
    expect(checkbox).toHaveClass("border-[var(--border)]");
    expect(checkbox).toHaveClass("bg-[var(--surface)]");
    expect(checkbox).toHaveClass("accent-[var(--primary)]");
  });

  it("forwards its ref to the native input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Client consent" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(
      screen.getByRole("checkbox", { name: "Client consent" }),
    );
  });

  it("supports a callback ref", () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} aria-label="Client consent" />);

    expect(ref).toHaveBeenCalledWith(
      screen.getByRole("checkbox", { name: "Client consent" }),
    );
  });

  it("associates correctly with Label through htmlFor and id", () => {
    render(
      <>
        <Checkbox id="client-consent-label" />
        <Label htmlFor="client-consent-label">Client consent obtained</Label>
      </>,
    );

    expect(
      screen.getByRole("checkbox", { name: "Client consent obtained" }),
    ).toBeInTheDocument();
  });

  it("toggles when the associated Label is clicked", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Checkbox id="email-notifications-label" />
        <Label htmlFor="email-notifications-label">
          Send email notifications
        </Label>
      </>,
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Send email notifications",
    });
    await user.click(screen.getByText("Send email notifications"));

    expect(checkbox).toBeChecked();
  });

  it("supports the native indeterminate state", () => {
    render(<Checkbox aria-label="Select all documents" indeterminate />);

    const checkbox = screen.getByRole("checkbox", {
      name: "Select all documents",
    }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it("updates the native indeterminate property when the prop changes", () => {
    const { rerender } = render(
      <Checkbox aria-label="Select all documents" indeterminate />,
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Select all documents",
    }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);

    rerender(
      <Checkbox aria-label="Select all documents" indeterminate={false} />,
    );

    expect(checkbox.indeterminate).toBe(false);
  });

  it("does not force checked when indeterminate", () => {
    render(<Checkbox aria-label="Select all documents" indeterminate />);

    const checkbox = screen.getByRole("checkbox", {
      name: "Select all documents",
    }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).not.toBeChecked();
  });

  it("exposes the expected default styles", () => {
    render(<Checkbox aria-label="Client consent" />);

    const checkbox = screen.getByRole("checkbox", { name: "Client consent" });
    expect(checkbox).toHaveClass("h-5");
    expect(checkbox).toHaveClass("w-5");
    expect(checkbox).toHaveClass("rounded-[var(--radius-sm)]");
    expect(checkbox).toHaveClass("border-[var(--border)]");
    expect(checkbox).toHaveClass("bg-[var(--surface)]");
    expect(checkbox).toHaveClass("accent-[var(--primary)]");
    expect(checkbox).toHaveClass("shadow-[var(--shadow-sm)]");
    expect(checkbox).toHaveClass("transition");
    expect(checkbox).toHaveClass("duration-200");
    expect(checkbox).toHaveClass("ease-in-out");
  });

  it("exposes hover styles", () => {
    render(<Checkbox aria-label="Client consent" />);

    expect(
      screen.getByRole("checkbox", { name: "Client consent" }),
    ).toHaveClass("hover:border-[var(--text-muted)]");
  });

  it("exposes focus-visible styles", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Client consent" />);

    const checkbox = screen.getByRole("checkbox", { name: "Client consent" });
    await user.click(checkbox);

    expect(checkbox).toHaveFocus();
    expect(checkbox).toHaveClass("focus-visible:ring-2");
    expect(checkbox).toHaveClass("focus-visible:ring-[var(--primary)]");
    expect(checkbox).toHaveClass("focus-visible:outline-none");
  });

  it("exposes checked-state styles", () => {
    render(<Checkbox aria-label="Client consent" defaultChecked />);

    const checkbox = screen.getByRole("checkbox", { name: "Client consent" });
    expect(checkbox).toHaveClass("checked:border-[var(--primary)]");
    expect(checkbox).toHaveClass("checked:bg-[var(--primary)]");
  });

  it("exposes indeterminate-state styles", () => {
    render(<Checkbox aria-label="Select all documents" indeterminate />);

    const checkbox = screen.getByRole("checkbox", {
      name: "Select all documents",
    });
    expect(checkbox).toHaveClass("indeterminate:border-[var(--primary)]");
    expect(checkbox).toHaveClass("indeterminate:bg-[var(--primary)]");
  });
});
