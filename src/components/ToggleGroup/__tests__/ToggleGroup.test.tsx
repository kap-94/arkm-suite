// src/components/ToggleGroup/__tests__/ToggleGroup.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToggleGroup } from "../ToggleGroup";

describe("ToggleGroup", () => {
  const mockOptions = [
    { value: "option1", label: "Option 1", ariaLabel: "Select Option 1" },
    { value: "option2", label: "Option 2", ariaLabel: "Select Option 2" },
  ];

  it("renders all options", () => {
    render(
      <ToggleGroup value="option1" onChange={() => {}} options={mockOptions} />
    );
    expect(screen.getByText("Option 1")).toBeDefined();
    expect(screen.getByText("Option 2")).toBeDefined();
  });

  it("applies custom theme values", () => {
    render(
      <ToggleGroup
        value="option1"
        onChange={() => {}}
        options={mockOptions}
        theme={{
          type: "custom",
          customValues: {
            primary: "#ff0000",
            secondary: "#00ff00",
          },
        }}
      />
    );

    const container = screen.getByRole("button", {
      name: "Select Option 1",
    }).parentElement;
    expect(container?.className).includes("toggle-group--theme-custom");
    expect(container?.style.getPropertyValue("--custom-primary")).toBe(
      "#ff0000"
    );
  });

  it("respects disabled state", () => {
    render(
      <ToggleGroup
        value="option1"
        onChange={() => {}}
        options={mockOptions}
        disabled
      />
    );

    const buttons = screen.getAllByRole("button") as HTMLButtonElement[];
    buttons.forEach((button) => {
      expect(button.disabled).toBe(true);
    });
  });
});
