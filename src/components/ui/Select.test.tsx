import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Label } from "./Label";
import { Select } from "./Select";

const caseTypeOptions = (
  <>
    <option value="civil">Civil litigation</option>
    <option value="commercial">Commercial law</option>
    <option value="employment">Employment law</option>
  </>
);

describe("Select component", () => {
  it("renders a native select", () => {
    const { container } = render(
      <Select aria-label="Case type">{caseTypeOptions}</Select>,
    );

    expect(container.querySelector("select")).toBeInTheDocument();
  });

  it("exposes the native combobox role", () => {
    render(<Select aria-label="Case type">{caseTypeOptions}</Select>);

    expect(
      screen.getByRole("combobox", { name: "Case type" }),
    ).toBeInTheDocument();
  });

  it("renders native options", () => {
    render(<Select aria-label="Case type">{caseTypeOptions}</Select>);

    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(
      screen.getByRole("option", { name: "Commercial law" }),
    ).toHaveValue("commercial");
  });

  it("supports a default value", () => {
    render(
      <Select aria-label="Case type" defaultValue="commercial">
        {caseTypeOptions}
      </Select>,
    );

    expect(screen.getByRole("combobox", { name: "Case type" })).toHaveValue(
      "commercial",
    );
  });

  it("supports a controlled value", async () => {
    const user = userEvent.setup();

    function ControlledSelect() {
      const [value, setValue] = React.useState("civil");

      return (
        <Select
          aria-label="Case type"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {caseTypeOptions}
        </Select>
      );
    }

    render(<ControlledSelect />);

    const select = screen.getByRole("combobox", { name: "Case type" });
    await user.selectOptions(select, "employment");

    expect(select).toHaveValue("employment");
  });

  it("updates after a native user selection", async () => {
    const user = userEvent.setup();
    render(<Select aria-label="Case type">{caseTypeOptions}</Select>);

    const select = screen.getByRole("combobox", { name: "Case type" });
    await user.selectOptions(select, "commercial");

    expect(select).toHaveValue("commercial");
    expect(
      screen.getByRole("option", { name: "Commercial law" }),
    ).toHaveProperty("selected", true);
  });

  it("calls the native change handler", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Select aria-label="Case type" onChange={handleChange}>
        {caseTypeOptions}
      </Select>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Case type" }),
      "employment",
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("supports the disabled state", async () => {
    const user = userEvent.setup();
    render(
      <Select aria-label="Case status" defaultValue="open" disabled>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Case status" });
    await user.selectOptions(select, "closed");

    expect(select).toBeDisabled();
    expect(select).toHaveValue("open");
    expect(select).toHaveClass("disabled:cursor-not-allowed");
    expect(select).toHaveClass("disabled:opacity-50");
    expect(select).toHaveClass("disabled:hover:border-[var(--border)]");
  });

  it("supports the required state", () => {
    render(
      <Select aria-label="Case type" required>
        {caseTypeOptions}
      </Select>,
    );

    expect(
      screen.getByRole("combobox", { name: "Case type" }),
    ).toBeRequired();
  });

  it("supports the invalid state", () => {
    render(
      <Select aria-label="Case type" aria-invalid="true">
        {caseTypeOptions}
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Case type" });
    expect(select).toBeInvalid();
    expect(select).toHaveClass("aria-invalid:border-[var(--danger)]");
    expect(select).toHaveClass(
      "aria-invalid:focus-visible:ring-[var(--danger)]",
    );
  });

  it("supports aria-describedby", () => {
    render(
      <>
        <Select
          aria-label="Case type"
          aria-describedby="case-type-description"
        >
          {caseTypeOptions}
        </Select>
        <p id="case-type-description">Select the primary area of law.</p>
      </>,
    );

    expect(
      screen.getByRole("combobox", { name: "Case type" }),
    ).toHaveAccessibleDescription("Select the primary area of law.");
  });

  it("supports name and id", () => {
    render(
      <Select id="case-type" name="caseType" aria-label="Case type">
        {caseTypeOptions}
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Case type" });
    expect(select).toHaveAttribute("id", "case-type");
    expect(select).toHaveAttribute("name", "caseType");
  });

  it("supports autoComplete", () => {
    render(
      <Select aria-label="Team role" autoComplete="organization-title">
        <option value="lawyer">Lawyer</option>
      </Select>,
    );

    expect(screen.getByRole("combobox", { name: "Team role" })).toHaveAttribute(
      "autocomplete",
      "organization-title",
    );
  });

  it("supports multiple selection", async () => {
    const user = userEvent.setup();
    render(
      <Select aria-label="Team roles" multiple>
        <option value="owner">Case owner</option>
        <option value="lawyer">Lawyer</option>
        <option value="reviewer">Reviewer</option>
      </Select>,
    );

    const select = screen.getByRole("listbox", { name: "Team roles" });
    await user.selectOptions(select, ["owner", "reviewer"]);

    expect(select).toHaveAttribute("multiple");
    expect(select).toHaveValue(["owner", "reviewer"]);
    expect(select).toHaveClass("min-h-[120px]");
  });

  it("supports size", () => {
    render(
      <Select aria-label="Document category" size={5}>
        <option value="contract">Contract</option>
        <option value="evidence">Evidence</option>
        <option value="correspondence">Correspondence</option>
        <option value="pleading">Pleading</option>
        <option value="other">Other</option>
      </Select>,
    );

    const select = screen.getByRole("listbox", { name: "Document category" });
    expect(select).toHaveAttribute("size", "5");
    expect(select).toHaveClass("min-h-[120px]");
  });

  it("supports native optgroup elements", () => {
    render(
      <Select aria-label="Jurisdiction">
        <optgroup label="France">
          <option value="paris">Paris</option>
          <option value="lyon">Lyon</option>
        </optgroup>
      </Select>,
    );

    expect(screen.getByRole("group", { name: "France" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Paris" })).toBeInTheDocument();
  });

  it("accepts a custom className", () => {
    render(
      <Select aria-label="Case type" className="max-w-md">
        {caseTypeOptions}
      </Select>,
    );

    expect(screen.getByRole("combobox", { name: "Case type" })).toHaveClass(
      "max-w-md",
    );
  });

  it("merges conflicting Tailwind classes", () => {
    render(
      <Select
        aria-label="Case type"
        className="h-12 px-6 pr-12"
      >
        {caseTypeOptions}
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Case type" });
    expect(select).toHaveClass("h-12");
    expect(select).toHaveClass("px-6");
    expect(select).toHaveClass("pr-12");
    expect(select).not.toHaveClass("h-[44px]");
    expect(select).not.toHaveClass("px-3");
    expect(select).not.toHaveClass("pr-10");
  });

  it("preserves unrelated default styles with a custom className", () => {
    render(
      <Select aria-label="Case type" className="max-w-md">
        {caseTypeOptions}
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Case type" });
    expect(select).toHaveClass("max-w-md");
    expect(select).toHaveClass("border-[var(--border)]");
    expect(select).toHaveClass("bg-[var(--surface)]");
    expect(select).toHaveClass("rounded-[var(--radius-md)]");
  });

  it("forwards its ref to the native select", () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Case type">
        {caseTypeOptions}
      </Select>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current).toBe(
      screen.getByRole("combobox", { name: "Case type" }),
    );
  });

  it("associates correctly with Label", () => {
    render(
      <>
        <Label htmlFor="case-status">Case status</Label>
        <Select id="case-status">
          <option value="open">Open</option>
        </Select>
      </>,
    );

    expect(
      screen.getByRole("combobox", { name: "Case status" }),
    ).toBeInTheDocument();
  });

  it("exposes the expected default styles", () => {
    render(<Select aria-label="Case type">{caseTypeOptions}</Select>);

    const select = screen.getByRole("combobox", { name: "Case type" });
    expect(select).toHaveClass("h-[44px]");
    expect(select).toHaveClass("w-full");
    expect(select).toHaveClass("rounded-[var(--radius-md)]");
    expect(select).toHaveClass("border-[var(--border)]");
    expect(select).toHaveClass("bg-[var(--surface)]");
    expect(select).toHaveClass("px-3");
    expect(select).toHaveClass("pr-10");
    expect(select).toHaveClass("text-[var(--text-primary)]");
    expect(select).toHaveClass("shadow-[var(--shadow-sm)]");
    expect(select).toHaveClass("transition");
    expect(select).toHaveClass("duration-200");
    expect(select).toHaveClass("ease-in-out");
  });

  it("exposes hover styles", () => {
    render(<Select aria-label="Case type">{caseTypeOptions}</Select>);

    expect(screen.getByRole("combobox", { name: "Case type" })).toHaveClass(
      "hover:border-[var(--text-muted)]",
    );
  });

  it("exposes focus-visible styles", async () => {
    const user = userEvent.setup();
    render(<Select aria-label="Case type">{caseTypeOptions}</Select>);

    const select = screen.getByRole("combobox", { name: "Case type" });
    await user.click(select);

    expect(select).toHaveFocus();
    expect(select).toHaveClass("focus-visible:border-[var(--primary)]");
    expect(select).toHaveClass("focus-visible:ring-2");
    expect(select).toHaveClass("focus-visible:ring-[var(--primary)]");
    expect(select).toHaveClass("focus-visible:outline-none");
  });

  it("preserves children unchanged", () => {
    render(
      <Select aria-label="Task priority">
        <option data-testid="priority-option" value="high" disabled>
          High priority
        </option>
      </Select>,
    );

    const option = screen.getByTestId("priority-option");
    expect(option).toHaveValue("high");
    expect(option).toBeDisabled();
    expect(option).toHaveTextContent("High priority");
  });

  it("does not insert options automatically", () => {
    render(<Select aria-label="Case type" />);

    expect(screen.queryAllByRole("option")).toHaveLength(0);
  });
});
