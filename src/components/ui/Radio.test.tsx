import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Label } from "./Label";
import { Radio, type RadioProps } from "./Radio";

describe("Radio component", () => {
  it("renders a native input", () => {
    const { container } = render(<Radio aria-label="Standard priority" />);

    expect(container.querySelector("input")).toBeInTheDocument();
  });

  it("always renders with the radio type", () => {
    render(<Radio aria-label="Standard priority" />);

    expect(
      screen.getByRole("radio", { name: "Standard priority" }),
    ).toHaveAttribute("type", "radio");
  });

  it("prevents an unsafe runtime type prop from replacing the radio type", () => {
    const unsafeProps = { type: "checkbox" } as unknown as RadioProps;

    render(<Radio {...unsafeProps} aria-label="Standard priority" />);

    expect(
      screen.getByRole("radio", { name: "Standard priority" }),
    ).toHaveAttribute("type", "radio");
  });

  it("exposes a displayName", () => {
    expect(Radio.displayName).toBe("Radio");
  });

  it("forwards native input attributes", () => {
    render(
      <Radio
        aria-label="Urgent priority"
        id="urgent-priority"
        name="priority"
        value="urgent"
        title="Urgent case priority"
        readOnly
      />,
    );

    const radio = screen.getByRole("radio", { name: "Urgent priority" });
    expect(radio).toHaveAttribute("id", "urgent-priority");
    expect(radio).toHaveAttribute("name", "priority");
    expect(radio).toHaveAttribute("value", "urgent");
    expect(radio).toHaveAttribute("title", "Urgent case priority");
    expect(radio).toHaveAttribute("readonly");
  });

  it("forwards data attributes", () => {
    render(
      <Radio
        aria-label="Standard priority"
        data-case-reference="LEG-2026-0142"
      />,
    );

    expect(
      screen.getByRole("radio", { name: "Standard priority" }),
    ).toHaveAttribute("data-case-reference", "LEG-2026-0142");
  });

  it("is unchecked by default", () => {
    render(<Radio aria-label="Standard priority" />);

    expect(
      screen.getByRole("radio", { name: "Standard priority" }),
    ).not.toBeChecked();
  });

  it("supports defaultChecked", () => {
    render(<Radio aria-label="Standard priority" defaultChecked />);

    expect(
      screen.getByRole("radio", { name: "Standard priority" }),
    ).toBeChecked();
  });

  it("supports the checked prop", () => {
    render(<Radio aria-label="Standard priority" checked readOnly />);

    expect(
      screen.getByRole("radio", { name: "Standard priority" }),
    ).toBeChecked();
  });

  it("supports controlled updates", async () => {
    const user = userEvent.setup();

    function ControlledRadio() {
      const [selected, setSelected] = React.useState("standard");

      return (
        <>
          <Radio
            aria-label="Standard priority"
            name="controlled-priority"
            value="standard"
            checked={selected === "standard"}
            onChange={(event) => setSelected(event.target.value)}
          />
          <Radio
            aria-label="Urgent priority"
            name="controlled-priority"
            value="urgent"
            checked={selected === "urgent"}
            onChange={(event) => setSelected(event.target.value)}
          />
        </>
      );
    }

    render(<ControlledRadio />);

    const standard = screen.getByRole("radio", { name: "Standard priority" });
    const urgent = screen.getByRole("radio", { name: "Urgent priority" });
    await user.click(urgent);

    expect(standard).not.toBeChecked();
    expect(urgent).toBeChecked();
  });

  it("does not keep a native change when a controlled prop is not updated", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Radio
        aria-label="Standard priority"
        checked={false}
        onChange={handleChange}
      />,
    );

    const radio = screen.getByRole("radio", { name: "Standard priority" });
    await user.click(radio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(radio).not.toBeChecked();
  });

  it("calls the native change handler", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Radio aria-label="Standard priority" onChange={handleChange} />);

    await user.click(
      screen.getByRole("radio", { name: "Standard priority" }),
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("selects through a user click", async () => {
    const user = userEvent.setup();
    render(<Radio aria-label="Standard priority" />);

    const radio = screen.getByRole("radio", { name: "Standard priority" });
    await user.click(radio);

    expect(radio).toBeChecked();
  });

  it("selects through the native Space key interaction", async () => {
    const user = userEvent.setup();
    render(<Radio aria-label="Standard priority" />);

    await user.tab();

    const radio = screen.getByRole("radio", { name: "Standard priority" });
    expect(radio).toHaveFocus();

    await user.keyboard(" ");

    expect(radio).toBeChecked();
  });

  it("keeps selection exclusive inside a native name group", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio aria-label="Low priority" name="priority" value="low" />
        <Radio aria-label="Standard priority" name="priority" value="standard" />
        <Radio aria-label="Urgent priority" name="priority" value="urgent" />
      </>,
    );

    const low = screen.getByRole("radio", { name: "Low priority" });
    const standard = screen.getByRole("radio", { name: "Standard priority" });
    const urgent = screen.getByRole("radio", { name: "Urgent priority" });

    await user.click(low);
    expect(low).toBeChecked();

    await user.click(standard);
    expect(low).not.toBeChecked();
    expect(standard).toBeChecked();
    expect(urgent).not.toBeChecked();
    expect(
      document.querySelectorAll('input[name="priority"]:checked'),
    ).toHaveLength(1);
  });

  it("keeps groups with different names independent", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio aria-label="Civil case" name="case-type" value="civil" />
        <Radio aria-label="Commercial case" name="case-type" value="commercial" />
        <Radio aria-label="English language" name="language" value="en" />
        <Radio aria-label="French language" name="language" value="fr" />
      </>,
    );

    const civil = screen.getByRole("radio", { name: "Civil case" });
    const commercial = screen.getByRole("radio", { name: "Commercial case" });
    const english = screen.getByRole("radio", { name: "English language" });

    await user.click(civil);
    await user.click(english);
    await user.click(commercial);

    expect(civil).not.toBeChecked();
    expect(commercial).toBeChecked();
    expect(english).toBeChecked();
  });

  it("supports the disabled unchecked state", () => {
    render(<Radio aria-label="Archived case" disabled />);

    const radio = screen.getByRole("radio", { name: "Archived case" });
    expect(radio).toBeDisabled();
    expect(radio).not.toBeChecked();
    expect(radio).toHaveClass("disabled:cursor-not-allowed");
    expect(radio).toHaveClass("disabled:opacity-50");
  });

  it("supports the disabled checked state", () => {
    render(<Radio aria-label="Archived case" defaultChecked disabled />);

    const radio = screen.getByRole("radio", { name: "Archived case" });
    expect(radio).toBeDisabled();
    expect(radio).toBeChecked();
  });

  it("does not select a disabled radio", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Radio
        aria-label="Archived case"
        disabled
        onChange={handleChange}
      />,
    );

    const radio = screen.getByRole("radio", { name: "Archived case" });
    await user.click(radio);

    expect(radio).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("supports required native validation", () => {
    render(<Radio aria-label="Case priority" required />);

    const radio = screen.getByRole("radio", { name: "Case priority" });
    expect(radio).toBeRequired();
    expect(radio).toBeInvalid();
  });

  it("validates a required native group when one option is selected", async () => {
    const user = userEvent.setup();
    render(
      <form>
        <Radio aria-label="Standard priority" name="required-priority" required />
        <Radio aria-label="Urgent priority" name="required-priority" />
      </form>,
    );

    const standard = screen.getByRole("radio", { name: "Standard priority" });
    const urgent = screen.getByRole("radio", { name: "Urgent priority" });
    expect(standard).toBeInvalid();

    await user.click(urgent);

    expect(standard).toBeValid();
    expect(urgent).toBeValid();
  });

  it("forwards readOnly while preserving native radio behavior", async () => {
    const user = userEvent.setup();
    render(<Radio aria-label="Standard priority" readOnly />);

    const radio = screen.getByRole("radio", { name: "Standard priority" });
    expect(radio).toHaveAttribute("readonly");

    await user.click(radio);

    expect(radio).toBeChecked();
  });

  it("submits only the selected radio name and value", () => {
    render(
      <form data-testid="priority-form">
        <Radio name="priority" value="low" aria-label="Low priority" />
        <Radio
          name="priority"
          value="urgent"
          aria-label="Urgent priority"
          defaultChecked
        />
      </form>,
    );

    const form = screen.getByTestId("priority-form") as HTMLFormElement;
    const formData = new FormData(form);

    expect(formData.getAll("priority")).toEqual(["urgent"]);
  });

  it("omits an unselected radio from native form data", () => {
    render(
      <form data-testid="priority-form">
        <Radio name="priority" value="urgent" aria-label="Urgent priority" />
      </form>,
    );

    const form = screen.getByTestId("priority-form") as HTMLFormElement;

    expect(new FormData(form).has("priority")).toBe(false);
  });

  it("supports association with an external form", () => {
    render(
      <>
        <form id="case-form" data-testid="case-form" />
        <Radio
          aria-label="Commercial case"
          form="case-form"
          name="caseType"
          value="commercial"
          defaultChecked
        />
      </>,
    );

    const form = screen.getByTestId("case-form") as HTMLFormElement;
    const radio = screen.getByRole("radio", { name: "Commercial case" });
    expect(radio).toHaveAttribute("form", "case-form");
    expect(new FormData(form).get("caseType")).toBe("commercial");
  });

  it("associates with Label through htmlFor and id", () => {
    render(
      <>
        <Radio id="case-priority-standard" />
        <Label htmlFor="case-priority-standard">Standard priority</Label>
      </>,
    );

    expect(
      screen.getByRole("radio", { name: "Standard priority" }),
    ).toBeInTheDocument();
  });

  it("selects when its associated Label is clicked", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio id="case-priority-urgent" />
        <Label htmlFor="case-priority-urgent">Urgent priority</Label>
      </>,
    );

    const radio = screen.getByRole("radio", { name: "Urgent priority" });
    await user.click(screen.getByText("Urgent priority"));

    expect(radio).toBeChecked();
  });

  it("supports an accessible name through aria-label", () => {
    render(<Radio aria-label="Confidential matter" />);

    expect(
      screen.getByRole("radio", { name: "Confidential matter" }),
    ).toBeInTheDocument();
  });

  it("supports an accessible name through aria-labelledby", () => {
    render(
      <>
        <span id="priority-label">High priority</span>
        <Radio aria-labelledby="priority-label" />
      </>,
    );

    expect(
      screen.getByRole("radio", { name: "High priority" }),
    ).toBeInTheDocument();
  });

  it("supports aria-describedby", () => {
    render(
      <>
        <Radio
          aria-label="Urgent priority"
          aria-describedby="urgent-description"
        />
        <p id="urgent-description">Requires review within 24 hours.</p>
      </>,
    );

    expect(
      screen.getByRole("radio", { name: "Urgent priority" }),
    ).toHaveAccessibleDescription("Requires review within 24 hours.");
  });

  it("supports the invalid state", () => {
    render(<Radio aria-label="Case priority" aria-invalid="true" />);

    const radio = screen.getByRole("radio", { name: "Case priority" });
    expect(radio).toBeInvalid();
    expect(radio).toHaveClass("aria-invalid:border-[var(--danger)]");
    expect(radio).toHaveClass(
      "aria-invalid:focus-visible:ring-[var(--danger)]",
    );
  });

  it("exposes an accessible group through fieldset and legend", () => {
    render(
      <fieldset>
        <legend>Case priority</legend>
        <Radio id="group-low" name="group-priority" />
        <Label htmlFor="group-low">Low</Label>
        <Radio id="group-urgent" name="group-priority" />
        <Label htmlFor="group-urgent">Urgent</Label>
      </fieldset>,
    );

    const group = screen.getByRole("group", { name: "Case priority" });
    expect(within(group).getAllByRole("radio")).toHaveLength(2);
  });

  it("forwards an object ref to the native input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio ref={ref} aria-label="Standard priority" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(
      screen.getByRole("radio", { name: "Standard priority" }),
    );
  });

  it("supports a callback ref", () => {
    const ref = vi.fn();
    render(<Radio ref={ref} aria-label="Standard priority" />);

    expect(ref).toHaveBeenCalledWith(
      screen.getByRole("radio", { name: "Standard priority" }),
    );
  });

  it("accepts a custom className", () => {
    render(<Radio aria-label="Standard priority" className="mt-1" />);

    expect(
      screen.getByRole("radio", { name: "Standard priority" }),
    ).toHaveClass("mt-1");
  });

  it("merges conflicting Tailwind classes", () => {
    render(
      <Radio
        aria-label="Standard priority"
        className="h-6 w-6 rounded-none"
      />,
    );

    const radio = screen.getByRole("radio", { name: "Standard priority" });
    expect(radio).toHaveClass("h-6");
    expect(radio).toHaveClass("w-6");
    expect(radio).toHaveClass("rounded-none");
    expect(radio).not.toHaveClass("h-5");
    expect(radio).not.toHaveClass("w-5");
    expect(radio).not.toHaveClass("rounded-full");
  });

  it("preserves unrelated default classes with a custom className", () => {
    render(<Radio aria-label="Standard priority" className="mt-1" />);

    const radio = screen.getByRole("radio", { name: "Standard priority" });
    expect(radio).toHaveClass("mt-1");
    expect(radio).toHaveClass("border-[var(--border)]");
    expect(radio).toHaveClass("bg-[var(--surface)]");
    expect(radio).toHaveClass("accent-[var(--primary)]");
  });

  it("exposes the expected default styles", () => {
    render(<Radio aria-label="Standard priority" />);

    const radio = screen.getByRole("radio", { name: "Standard priority" });
    expect(radio).toHaveClass("h-5");
    expect(radio).toHaveClass("w-5");
    expect(radio).toHaveClass("rounded-full");
    expect(radio).toHaveClass("border-[var(--border)]");
    expect(radio).toHaveClass("bg-[var(--surface)]");
    expect(radio).toHaveClass("accent-[var(--primary)]");
    expect(radio).toHaveClass("shadow-[var(--shadow-sm)]");
  });

  it("exposes hover, focus-visible, and checked styles", async () => {
    const user = userEvent.setup();
    render(<Radio aria-label="Standard priority" defaultChecked />);

    const radio = screen.getByRole("radio", { name: "Standard priority" });
    await user.click(radio);

    expect(radio).toHaveFocus();
    expect(radio).toHaveClass("hover:border-[var(--text-muted)]");
    expect(radio).toHaveClass("focus-visible:outline-none");
    expect(radio).toHaveClass("focus-visible:ring-2");
    expect(radio).toHaveClass("focus-visible:ring-[var(--primary)]");
    expect(radio).toHaveClass("checked:border-[var(--primary)]");
    expect(radio).toHaveClass("checked:bg-[var(--primary)]");
  });
});
