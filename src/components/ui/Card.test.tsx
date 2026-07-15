import { render, screen } from "@testing-library/react";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

describe("Card component", () => {
  it("renders children", () => {
    render(
      <Card>
        <CardContent>Card content</CardContent>
      </Card>,
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("merges custom className without removing default classes", () => {
    render(
      <Card data-testid="custom-card" className="ring-2 ring-blue-500">
        <CardContent>Content</CardContent>
      </Card>,
    );

    const card = screen.getByTestId("custom-card");
    expect(card).toHaveClass("ring-2");
    expect(card).toHaveClass("ring-blue-500");
    expect(card).toHaveClass("rounded-[var(--radius-lg)]");
  });

  it("forwards standard HTML attributes", () => {
    render(
      <Card data-testid="attribute-card" id="test-card">
        <CardContent>Content</CardContent>
      </Card>,
    );

    const card = screen.getByTestId("attribute-card");
    expect(card).toHaveAttribute("id", "test-card");
  });

  it("renders CardHeader correctly", () => {
    render(
      <Card>
        <CardHeader>Header content</CardHeader>
      </Card>,
    );

    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("renders CardTitle as a heading element", () => {
    render(
      <Card>
        <CardTitle>Card title</CardTitle>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Card title" })).toBeInTheDocument();
  });

  it("renders CardDescription correctly", () => {
    render(
      <Card>
        <CardDescription>Card description</CardDescription>
      </Card>,
    );

    expect(screen.getByText("Card description")).toBeInTheDocument();
  });

  it("renders CardContent correctly", () => {
    render(
      <Card>
        <CardContent>Card content</CardContent>
      </Card>,
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders CardFooter correctly", () => {
    render(
      <Card>
        <CardFooter>Footer content</CardFooter>
      </Card>,
    );

    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("composes all compound components together", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("forwards refs correctly", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Card ref={ref}>
        <CardContent>Content</CardContent>
      </Card>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toContainElement(screen.getByText("Content"));
  });
});
