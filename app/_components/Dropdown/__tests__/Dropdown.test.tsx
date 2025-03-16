import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemedDropdown } from "../Dropdown";

describe("Dropdown", () => {
  it("renders correctly", () => {
    render(<ThemedDropdown>Content</ThemedDropdown>);
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("handles theme changes", () => {
    render(<ThemedDropdown theme={{ type: "dark" }}>Content</ThemedDropdown>);
    const element = screen.getByText("Content");
    expect(element.className).includes("dropdown--theme-dark");
  });

  it("handles custom theme values", () => {
    render(
      <ThemedDropdown
        theme={{
          type: "custom",
          customValues: {
            primary: "#ff0000",
            secondary: "#00ff00",
          },
        }}
      >
        Content
      </ThemedDropdown>
    );
    const element = screen.getByText("Content");
    expect(element.style.getPropertyValue("--custom-primary")).toBe("#ff0000");
  });

  it("handles disabled state", () => {
    render(<ThemedDropdown disabled>Content</ThemedDropdown>);
    const element = screen.getByText("Content");
    expect(element.className).includes("dropdown--disabled");
  });
});
