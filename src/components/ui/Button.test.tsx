import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./Button";

describe("Button component", () => {
  it("renders a native button", () => {
    render(<Button>Continue</Button>);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders its children", () => {
    render(
      <Button>
        <span>Save changes</span>
      </Button>,
    );

    expect(screen.getByText("Save changes")).toBeInTheDocument();
  });

  it("uses button as the default type", () => {
    render(<Button>Continue</Button>);

    expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("accepts a custom button type", () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("forwards native button attributes", () => {
    render(
      <Button id="save-button" name="action" value="save" title="Save the form">
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("id", "save-button");
    expect(button).toHaveAttribute("name", "action");
    expect(button).toHaveAttribute("value", "save");
    expect(button).toHaveAttribute("title", "Save the form");
  });

  it("merges custom classes without removing default styles", () => {
    render(<Button className="w-full ring-4">Continue</Button>);

    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toHaveClass("w-full");
    expect(button).toHaveClass("ring-4");
    expect(button).toHaveClass("inline-flex");
    expect(button).toHaveClass("bg-[var(--primary)]");
  });

  it("calls the native click handler", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Continue</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports the disabled state and prevents clicks", () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Continue
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:cursor-not-allowed");
    expect(button).toHaveClass("disabled:hover:scale-100");

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards its ref to the native button", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Continue</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(screen.getByRole("button", { name: "Continue" }));
  });

  it("supports an accessible name", () => {
    render(
      <Button aria-label="Save changes">
        <span aria-hidden="true">Icon</span>
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Save changes" })).toHaveAccessibleName(
      "Save changes",
    );
  });

  it("can receive focus and exposes focus-visible styles", () => {
    render(<Button>Continue</Button>);

    const button = screen.getByRole("button", { name: "Continue" });
    button.focus();

    expect(button).toHaveFocus();
    expect(button).toHaveClass("focus-visible:ring-2");
    expect(button).toHaveClass("focus-visible:outline-none");
  });
});
