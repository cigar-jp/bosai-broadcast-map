import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("should render the title", () => {
    render(<Header />);

    expect(screen.getByText("防災無線マップ")).toBeInTheDocument();
  });

  it("should render the location", () => {
    render(<Header />);

    expect(screen.getByText("須坂市")).toBeInTheDocument();
  });

  it("should render the header element", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the map pin icon", () => {
    render(<Header />);

    // The icon should be present (lucide-react renders as svg)
    const header = screen.getByRole("banner");
    expect(header.querySelector("svg")).toBeInTheDocument();
  });
});
