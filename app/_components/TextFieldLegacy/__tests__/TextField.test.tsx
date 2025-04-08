import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemedTextField } from "../ThemedTextField";

describe("TextField", () => {
  it("renders correctly", () => {
    render(<ThemedTextField>Content</ThemedTextField>);
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("handles theme changes", () => {
    render(<ThemedTextField theme={{ type: "dark" }}>Content</ThemedTextField>);
    const element = screen.getByText("Content");
    expect(element.className).includes("textfield--theme-dark");
  });

  it("handles custom theme values", () => {
    render(
      <ThemedTextField
        theme={{
          type: "custom",
          customValues: {
            primary: "#ff0000",
            secondary: "#00ff00",
          },
        }}
      >
        Content
      </ThemedTextField>
    );
    const element = screen.getByText("Content");
    expect(element.style.getPropertyValue("--custom-primary")).toBe("#ff0000");
  });

  it("handles disabled state", () => {
    render(<ThemedTextField disabled>Content</ThemedTextField>);
    const element = screen.getByText("Content");
    expect(element.className).includes("textfield--disabled");
  });
});
