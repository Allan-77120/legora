import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Label } from "./Label";
import { Switch, type SwitchProps } from "./Switch";

function getDecoration(container: HTMLElement) {
  return container.querySelector('[aria-hidden="true"]');
}

describe("Switch component", () => {
  it("renders a native input", () => {
    const { container } = render(<Switch aria-label="Email notifications" />);

    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it("always renders with the checkbox type", () => {
    render(<Switch aria-label="Email notifications" />);

    expect(
      screen.getByRole("switch", { name: "Email notifications" }),
    ).toHaveAttribute("type", "checkbox");
  });

  it("prevents unsafe runtime props from replacing its type and role", () => {
    const unsafeProps = {
      role: "checkbox",
      type: "radio",
    } as unknown as SwitchProps;

    render(<Switch {...unsafeProps} aria-label="Email notifications" />);

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    expect(switchControl).toHaveAttribute("type", "checkbox");
    expect(switchControl).toHaveAttribute("role", "switch");
  });

  it("exposes a displayName", () => {
    expect(Switch.displayName).toBe("Switch");
  });

  it("forwards native input attributes", () => {
    render(
      <Switch
        aria-label="Document sharing"
        id="document-sharing"
        name="sharing"
        value="enabled"
        title="Share documents with the client"
        readOnly
      />,
    );

    const switchControl = screen.getByRole("switch", {
      name: "Document sharing",
    });
    expect(switchControl).toHaveAttribute("id", "document-sharing");
    expect(switchControl).toHaveAttribute("name", "sharing");
    expect(switchControl).toHaveAttribute("value", "enabled");
    expect(switchControl).toHaveAttribute(
      "title",
      "Share documents with the client",
    );
    expect(switchControl).toHaveAttribute("readonly");
  });

  it("forwards data attributes", () => {
    render(
      <Switch
        aria-label="Security alerts"
        data-setting="security-alerts"
      />,
    );

    expect(
      screen.getByRole("switch", { name: "Security alerts" }),
    ).toHaveAttribute("data-setting", "security-alerts");
  });

  it("keeps its visual decoration out of the accessibility tree", () => {
    const { container } = render(<Switch aria-label="Email notifications" />);

    expect(getDecoration(container)).toHaveAttribute("aria-hidden", "true");
  });

  it("is unchecked by default", () => {
    render(<Switch aria-label="Email notifications" />);

    expect(
      screen.getByRole("switch", { name: "Email notifications" }),
    ).not.toBeChecked();
  });

  it("supports defaultChecked", () => {
    render(<Switch aria-label="Email notifications" defaultChecked />);

    expect(
      screen.getByRole("switch", { name: "Email notifications" }),
    ).toBeChecked();
  });

  it("supports the checked prop", () => {
    render(<Switch aria-label="Email notifications" checked readOnly />);

    expect(
      screen.getByRole("switch", { name: "Email notifications" }),
    ).toBeChecked();
  });

  it("supports controlled updates", async () => {
    const user = userEvent.setup();

    function ControlledSwitch() {
      const [checked, setChecked] = React.useState(false);

      return (
        <Switch
          aria-label="Email notifications"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      );
    }

    render(<ControlledSwitch />);

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    await user.click(switchControl);

    expect(switchControl).toBeChecked();
  });

  it("does not keep a native change when a controlled prop is not updated", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Switch
        aria-label="Email notifications"
        checked={false}
        onChange={handleChange}
      />,
    );

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    await user.click(switchControl);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(switchControl).not.toBeChecked();
  });

  it("calls the native change handler", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Switch aria-label="Email notifications" onChange={handleChange} />,
    );

    await user.click(
      screen.getByRole("switch", { name: "Email notifications" }),
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("toggles through user clicks", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Email notifications" />);

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    await user.click(switchControl);
    expect(switchControl).toBeChecked();

    await user.click(switchControl);
    expect(switchControl).not.toBeChecked();
  });

  it("toggles through the native Space key interaction", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Email notifications" />);

    await user.tab();

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    expect(switchControl).toHaveFocus();

    await user.keyboard(" ");

    expect(switchControl).toBeChecked();
  });

  it("participates in native Tab navigation", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Previous setting</button>
        <Switch aria-label="Email notifications" />
      </>,
    );

    await user.tab();
    expect(
      screen.getByRole("button", { name: "Previous setting" }),
    ).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("switch", { name: "Email notifications" }),
    ).toHaveFocus();
  });

  it("supports the disabled unchecked state", () => {
    const { container } = render(
      <Switch aria-label="Email notifications" disabled />,
    );

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    expect(switchControl).toBeDisabled();
    expect(switchControl).not.toBeChecked();
    expect(getDecoration(container)).toHaveClass("peer-disabled:opacity-50");
  });

  it("supports the disabled checked state", () => {
    render(
      <Switch aria-label="Email notifications" defaultChecked disabled />,
    );

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    expect(switchControl).toBeDisabled();
    expect(switchControl).toBeChecked();
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Switch
        aria-label="Email notifications"
        disabled
        onChange={handleChange}
      />,
    );

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    await user.click(switchControl);

    expect(switchControl).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("forwards readOnly while preserving native checkbox behavior", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Email notifications" readOnly />);

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    expect(switchControl).toHaveAttribute("readonly");

    await user.click(switchControl);

    expect(switchControl).toBeChecked();
  });

  it("associates with Label through htmlFor and id", () => {
    render(
      <>
        <Switch id="email-notifications" />
        <Label htmlFor="email-notifications">Email notifications</Label>
      </>,
    );

    expect(
      screen.getByRole("switch", { name: "Email notifications" }),
    ).toBeInTheDocument();
  });

  it("toggles when its associated Label is clicked", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Switch id="document-sharing-label" />
        <Label htmlFor="document-sharing-label">Document sharing</Label>
      </>,
    );

    const switchControl = screen.getByRole("switch", {
      name: "Document sharing",
    });
    await user.click(screen.getByText("Document sharing"));

    expect(switchControl).toBeChecked();
  });

  it("supports an accessible name through aria-label", () => {
    render(<Switch aria-label="Security alerts" />);

    expect(
      screen.getByRole("switch", { name: "Security alerts" }),
    ).toBeInTheDocument();
  });

  it("supports an accessible name through aria-labelledby", () => {
    render(
      <>
        <span id="sharing-label">Document sharing</span>
        <Switch aria-labelledby="sharing-label" />
      </>,
    );

    expect(
      screen.getByRole("switch", { name: "Document sharing" }),
    ).toBeInTheDocument();
  });

  it("supports aria-describedby", () => {
    render(
      <>
        <Switch
          aria-label="Security alerts"
          aria-describedby="security-description"
        />
        <p id="security-description">Receive alerts for sensitive actions.</p>
      </>,
    );

    expect(
      screen.getByRole("switch", { name: "Security alerts" }),
    ).toHaveAccessibleDescription("Receive alerts for sensitive actions.");
  });

  it("supports the invalid state", () => {
    const { container } = render(
      <Switch aria-label="Document sharing" aria-invalid="true" />,
    );

    const switchControl = screen.getByRole("switch", {
      name: "Document sharing",
    });
    expect(switchControl).toBeInvalid();
    expect(getDecoration(container)).toHaveClass(
      "peer-aria-invalid:border-[var(--danger)]",
    );
  });

  it("submits the default on value when checked", () => {
    render(
      <form data-testid="settings-form">
        <Switch
          aria-label="Email notifications"
          name="notifications"
          defaultChecked
        />
      </form>,
    );

    const form = screen.getByTestId("settings-form") as HTMLFormElement;

    expect(new FormData(form).get("notifications")).toBe("on");
  });

  it("submits a custom value when checked", () => {
    render(
      <form data-testid="settings-form">
        <Switch
          aria-label="Email notifications"
          name="notifications"
          value="enabled"
          defaultChecked
        />
      </form>,
    );

    const form = screen.getByTestId("settings-form") as HTMLFormElement;

    expect(new FormData(form).get("notifications")).toBe("enabled");
  });

  it("is omitted from form data when unchecked", () => {
    render(
      <form data-testid="settings-form">
        <Switch aria-label="Email notifications" name="notifications" />
      </form>,
    );

    const form = screen.getByTestId("settings-form") as HTMLFormElement;

    expect(new FormData(form).has("notifications")).toBe(false);
  });

  it("supports association with an external form", () => {
    render(
      <>
        <form id="preferences-form" data-testid="preferences-form" />
        <Switch
          aria-label="Security alerts"
          form="preferences-form"
          name="securityAlerts"
          value="enabled"
          defaultChecked
        />
      </>,
    );

    const form = screen.getByTestId("preferences-form") as HTMLFormElement;
    const switchControl = screen.getByRole("switch", {
      name: "Security alerts",
    });
    expect(switchControl).toHaveAttribute("form", "preferences-form");
    expect(new FormData(form).get("securityAlerts")).toBe("enabled");
  });

  it("supports required native validation", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Enable secure sharing" required />);

    const switchControl = screen.getByRole("switch", {
      name: "Enable secure sharing",
    });
    expect(switchControl).toBeRequired();
    expect(switchControl).toBeInvalid();

    await user.click(switchControl);

    expect(switchControl).toBeValid();
  });

  it("forwards an object ref to the native input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Switch ref={ref} aria-label="Email notifications" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(
      screen.getByRole("switch", { name: "Email notifications" }),
    );
  });

  it("supports a callback ref", () => {
    const ref = vi.fn();
    render(<Switch ref={ref} aria-label="Email notifications" />);

    expect(ref).toHaveBeenCalledWith(
      screen.getByRole("switch", { name: "Email notifications" }),
    );
  });

  it("accepts a custom className on the native input", () => {
    render(
      <Switch aria-label="Email notifications" className="custom-switch" />,
    );

    expect(
      screen.getByRole("switch", { name: "Email notifications" }),
    ).toHaveClass("custom-switch");
  });

  it("merges conflicting Tailwind classes", () => {
    render(
      <Switch
        aria-label="Email notifications"
        className="z-20 opacity-50"
      />,
    );

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    expect(switchControl).toHaveClass("z-20");
    expect(switchControl).toHaveClass("opacity-50");
    expect(switchControl).not.toHaveClass("z-10");
    expect(switchControl).not.toHaveClass("opacity-0");
  });

  it("exposes default, checked, hover, and transition styles", () => {
    const { container } = render(
      <Switch aria-label="Email notifications" defaultChecked />,
    );

    const decoration = getDecoration(container);
    expect(decoration).toHaveClass("h-6");
    expect(decoration).toHaveClass("w-11");
    expect(decoration).toHaveClass("rounded-full");
    expect(decoration).toHaveClass("bg-[var(--border)]");
    expect(decoration).toHaveClass("peer-hover:border-[var(--text-muted)]");
    expect(decoration).toHaveClass("peer-checked:bg-[var(--primary)]");
    expect(decoration).toHaveClass("peer-checked:after:translate-x-5");
    expect(decoration).toHaveClass("transition");
    expect(decoration).toHaveClass("after:transition-transform");
  });

  it("exposes focus-visible styles on the decorative rail", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Switch aria-label="Email notifications" />,
    );

    await user.tab();

    const switchControl = screen.getByRole("switch", {
      name: "Email notifications",
    });
    expect(switchControl).toHaveFocus();
    expect(getDecoration(container)).toHaveClass("peer-focus-visible:ring-2");
    expect(getDecoration(container)).toHaveClass(
      "peer-focus-visible:ring-[var(--primary)]",
    );
  });
});
