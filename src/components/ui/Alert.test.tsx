import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Alert, type AlertVariant } from "./Alert";

const variants: Array<{
  className: string;
  role: "alert" | "status";
  variant: AlertVariant;
}> = [
  {
    variant: "info",
    role: "status",
    className: "bg-[var(--primary-soft)]",
  },
  {
    variant: "success",
    role: "status",
    className: "bg-[var(--success)]/10",
  },
  {
    variant: "warning",
    role: "alert",
    className: "bg-[var(--warning)]/10",
  },
  {
    variant: "danger",
    role: "alert",
    className: "bg-[var(--danger)]/10",
  },
];

describe("Alert component", () => {
  it("renders correctly as a div", () => {
    render(<Alert>AI analysis completed.</Alert>);

    const alert = screen.getByRole("status");
    expect(alert.tagName).toBe("DIV");
    expect(alert).toHaveTextContent("AI analysis completed.");
  });

  it("uses the info variant by default", () => {
    render(<Alert>AI analysis completed.</Alert>);

    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("bg-[var(--primary-soft)]");
    expect(alert).toHaveClass("border-[var(--primary)]/20");
  });

  it.each(variants)(
    "renders the $variant variant with the correct role",
    ({ className, role, variant }) => {
      render(<Alert variant={variant}>{variant} message</Alert>);

      expect(screen.getByRole(role)).toHaveClass(className);
    },
  );

  it("renders a visually prominent title", () => {
    render(
      <Alert title={<span>Document saved successfully</span>}>
        The latest version is now available.
      </Alert>,
    );

    const title = screen.getByText("Document saved successfully").parentElement;
    expect(title).toHaveClass("font-semibold");
    expect(title).toHaveClass("leading-5");
  });

  it("renders children as the description", () => {
    render(
      <Alert title="AI analysis completed">
        Review the generated summary before sharing it.
      </Alert>,
    );

    const description = screen.getByText(
      "Review the generated summary before sharing it.",
    );
    expect(description).toHaveClass("text-[var(--text-secondary)]");
    expect(description).toHaveClass("mt-1");
  });

  it("renders title-only content without an empty description", () => {
    render(<Alert title="Connection restored" />);

    const alert = screen.getByRole("status");
    expect(alert).toHaveTextContent("Connection restored");
    expect(alert.querySelectorAll(".leading-6")).toHaveLength(0);
  });

  it("renders an optional decorative icon", () => {
    render(
      <Alert
        variant="success"
        icon={<svg data-testid="alert-icon" aria-label="Success icon" />}
      >
        Document saved successfully.
      </Alert>,
    );

    const iconWrapper = screen.getByTestId("alert-icon").parentElement;
    expect(iconWrapper).toHaveAttribute("aria-hidden", "true");
    expect(iconWrapper).toHaveClass("text-[var(--success)]");
  });

  it("hides icon content from the accessibility tree", () => {
    render(
      <Alert icon={<svg role="img" aria-label="Information icon" />}>
        AI analysis completed.
      </Alert>,
    );

    expect(
      screen.queryByRole("img", { name: "Information icon" }),
    ).not.toBeInTheDocument();
  });

  it("renders an optional action aligned to the right", () => {
    render(
      <Alert action={<button type="button">Review fields</button>}>
        Missing required information.
      </Alert>,
    );

    const action = screen.getByRole("button", { name: "Review fields" });
    expect(action).toBeInTheDocument();
    expect(action.parentElement).toHaveClass("sm:ml-auto");
  });

  it("preserves the action's own behavior", () => {
    const handleAction = vi.fn();
    render(
      <Alert
        action={
          <button type="button" onClick={handleAction}>
            Retry
          </button>
        }
      >
        Connection lost.
      </Alert>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));

    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it("renders an accessible dismiss button when dismissible", () => {
    render(<Alert dismissible>Document saved successfully.</Alert>);

    const dismissButton = screen.getByRole("button", {
      name: "Dismiss alert",
    });
    expect(dismissButton).toHaveAttribute("type", "button");
    expect(dismissButton).toHaveClass("focus-visible:ring-2");
  });

  it("does not render a dismiss button by default", () => {
    render(<Alert>Document saved successfully.</Alert>);

    expect(
      screen.queryByRole("button", { name: "Dismiss alert" }),
    ).not.toBeInTheDocument();
  });

  it("calls onDismiss when the dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={handleDismiss}>
        Document saved successfully.
      </Alert>,
    );

    await user.click(
      screen.getByRole("button", { name: "Dismiss alert" }),
    );

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("allows a dismissible alert without an onDismiss callback", async () => {
    const user = userEvent.setup();
    render(<Alert dismissible>Document saved successfully.</Alert>);

    await expect(
      user.click(screen.getByRole("button", { name: "Dismiss alert" })),
    ).resolves.toBeUndefined();
  });

  it("keeps the dismiss button keyboard accessible", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={handleDismiss}>
        Connection lost.
      </Alert>,
    );

    await user.tab();

    const dismissButton = screen.getByRole("button", {
      name: "Dismiss alert",
    });
    expect(dismissButton).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("enforces the accessibility role required by the variant", () => {
    render(
      <Alert variant="danger" role="region">
        Connection lost.
      </Alert>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("forwards its ref to the root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>AI analysis completed.</Alert>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByRole("status"));
  });

  it("accepts a custom className", () => {
    render(<Alert className="max-w-xl">AI analysis completed.</Alert>);

    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("max-w-xl");
    expect(alert).toHaveClass("w-full");
  });

  it("merges conflicting Tailwind classes", () => {
    render(
      <Alert className="rounded-none p-6">AI analysis completed.</Alert>,
    );

    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("rounded-none");
    expect(alert).toHaveClass("p-6");
    expect(alert).not.toHaveClass("rounded-[var(--radius-md)]");
    expect(alert).not.toHaveClass("p-4");
  });

  it("forwards native div attributes", () => {
    render(
      <>
        <p id="alert-context">Case synchronization status</p>
        <Alert
          id="connection-alert"
          data-severity="critical"
          aria-describedby="alert-context"
          dir="ltr"
        >
          Connection lost.
        </Alert>
      </>,
    );

    const alert = screen.getByRole("status");
    expect(alert).toHaveAttribute("id", "connection-alert");
    expect(alert).toHaveAttribute("data-severity", "critical");
    expect(alert).toHaveAttribute("dir", "ltr");
    expect(alert).toHaveAccessibleDescription("Case synchronization status");
  });

  it("exposes a displayName", () => {
    expect(Alert.displayName).toBe("Alert");
  });
});
