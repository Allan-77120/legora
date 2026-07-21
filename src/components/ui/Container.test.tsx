import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import {
  Container,
  type ContainerPadding,
  type ContainerSize,
} from "./Container";

const sizes: Array<{
  className: string;
  size: ContainerSize;
}> = [
  { size: "sm", className: "max-w-screen-sm" },
  { size: "md", className: "max-w-screen-md" },
  { size: "lg", className: "max-w-screen-lg" },
  { size: "xl", className: "max-w-screen-xl" },
  { size: "full", className: "max-w-none" },
];

const paddings: Array<{
  classes: string[];
  padding: ContainerPadding;
}> = [
  { padding: "none", classes: ["px-0"] },
  { padding: "sm", classes: ["px-4"] },
  { padding: "md", classes: ["px-4", "sm:px-6"] },
  { padding: "lg", classes: ["px-4", "sm:px-6", "lg:px-8"] },
];

describe("Container component", () => {
  it("renders its children in a native div", () => {
    render(
      <Container>
        <section>Client overview</section>
      </Container>,
    );

    const container = screen.getByText("Client overview").parentElement;
    expect(container?.tagName).toBe("DIV");
    expect(container).toHaveTextContent("Client overview");
  });

  it("uses stable layout defaults", () => {
    render(<Container data-testid="container" />);

    const container = screen.getByTestId("container");
    expect(container).toHaveClass("w-full");
    expect(container).toHaveClass("max-w-screen-xl");
    expect(container).toHaveClass("px-4");
    expect(container).toHaveClass("sm:px-6");
    expect(container).toHaveClass("mx-auto");
  });

  it.each(sizes)("renders the $size size", ({ className, size }) => {
    render(<Container data-testid="container" size={size} />);

    expect(screen.getByTestId("container")).toHaveClass(className);
  });

  it.each(paddings)(
    "renders the $padding horizontal padding",
    ({ classes, padding }) => {
      render(<Container data-testid="container" padding={padding} />);

      expect(screen.getByTestId("container")).toHaveClass(...classes);
    },
  );

  it("centers the container by default", () => {
    render(<Container data-testid="container" />);

    expect(screen.getByTestId("container")).toHaveClass("mx-auto");
  });

  it("supports a non-centered layout", () => {
    render(<Container data-testid="container" centered={false} />);

    expect(screen.getByTestId("container")).not.toHaveClass("mx-auto");
  });

  it("allows className to opt into centering when centered is false", () => {
    render(
      <Container
        data-testid="container"
        centered={false}
        className="mx-auto"
      />,
    );

    expect(screen.getByTestId("container")).toHaveClass("mx-auto");
  });

  it("accepts a custom className without removing unrelated defaults", () => {
    render(
      <Container data-testid="container" className="min-h-screen">
        Dashboard
      </Container>,
    );

    const container = screen.getByTestId("container");
    expect(container).toHaveClass("min-h-screen");
    expect(container).toHaveClass("w-full");
    expect(container).toHaveClass("mx-auto");
  });

  it("merges conflicting Tailwind classes", () => {
    render(
      <Container
        data-testid="container"
        className="max-w-2xl px-10 sm:px-12"
      />,
    );

    const container = screen.getByTestId("container");
    expect(container).toHaveClass("max-w-2xl");
    expect(container).toHaveClass("px-10");
    expect(container).toHaveClass("sm:px-12");
    expect(container).not.toHaveClass("max-w-screen-xl");
    expect(container).not.toHaveClass("px-4");
    expect(container).not.toHaveClass("sm:px-6");
  });

  it("forwards its ref to the root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Container ref={ref}>Case workspace</Container>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByText("Case workspace"));
  });

  it("forwards native div attributes", () => {
    render(
      <Container
        id="client-page-container"
        data-layout="client-page"
        aria-label="Client page"
        role="region"
        dir="ltr"
      />,
    );

    const container = screen.getByRole("region", { name: "Client page" });
    expect(container).toHaveAttribute("id", "client-page-container");
    expect(container).toHaveAttribute("data-layout", "client-page");
    expect(container).toHaveAttribute("dir", "ltr");
  });

  it("does not impose an accessibility role", () => {
    render(<Container data-testid="container" />);

    expect(screen.getByTestId("container")).not.toHaveAttribute("role");
  });

  it("forwards native event handlers", () => {
    const handleClick = vi.fn();
    render(
      <Container data-testid="container" onClick={handleClick}>
        Settings
      </Container>,
    );

    fireEvent.click(screen.getByTestId("container"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("exposes a displayName", () => {
    expect(Container.displayName).toBe("Container");
  });
});
