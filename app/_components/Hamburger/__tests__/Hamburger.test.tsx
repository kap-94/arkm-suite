// __tests__/Hamburger.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Hamburger } from "../Hamburger";

describe("Hamburger", () => {
  it("renders successfully", () => {
    const handleClick = vi.fn() as () => void;
    render(<Hamburger onClick={handleClick} />);
    expect(screen.getByTestId("hamburger-button")).toBeDefined();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Hamburger onClick={handleClick} />);

    fireEvent.click(screen.getByTestId("hamburger-button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders correct number of lines based on variant", () => {
    const handleClick = vi.fn();

    // Slide variant (3 lines)
    const { rerender } = render(
      <Hamburger onClick={handleClick} variant="slide" />
    );
    expect(screen.getAllByTestId(/hamburger-line-/)).toHaveLength(3);

    // Morph variant (2 lines)
    rerender(<Hamburger onClick={handleClick} variant="morph" />);
    expect(screen.getAllByTestId(/hamburger-line-/)).toHaveLength(2);
  });

  // it("applies open state correctly", () => {
  //   const handleClick = vi.fn();
  //   render(<Hamburger onClick={handleClick} isOpen={true} />);

  //   const button = screen.getByTestId("hamburger-button");
  //   expect(button).toHaveClass("hamburger--open");
  //   expect(button).toHaveAttribute("aria-expanded", "true");
  // });

  // it("applies theme correctly", () => {
  //   const handleClick = vi.fn();
  //   render(
  //     <Hamburger
  //       onClick={handleClick}
  //       theme={{
  //         type: "custom",
  //         customValues: {
  //           primary: "#ff0000",
  //           secondary: "#00ff00",
  //           background: "#0000ff",
  //           hover: "rgba(255,0,0,0.1)",
  //         },
  //       }}
  //     />
  //   );

  //   const button = screen.getByTestId("hamburger-button");
  //   expect(button).toHaveClass("hamburger--theme-custom");
  //   expect(button.style.getPropertyValue("--hamburger-primary")).toBe(
  //     "#ff0000"
  //   );
  //   expect(button.style.getPropertyValue("--hamburger-secondary")).toBe(
  //     "#00ff00"
  //   );
  // });
});
