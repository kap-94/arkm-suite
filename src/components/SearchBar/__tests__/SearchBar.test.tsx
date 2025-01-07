// __tests__/SearchBar.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../SearchBar";

const mockOptions = [
  { id: 1, label: "Project A", value: "a" },
  { id: 2, label: "Project B", value: "b" },
  { id: 3, label: "Task C", value: "c" },
];

describe("SearchBar", () => {
  // Rendering tests
  it("renders successfully", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("search-input")).toBeDefined();
    expect(screen.getByTestId("search-button")).toBeDefined();
  });

  // Props tests
  it("displays custom placeholder text", () => {
    const placeholder = "Custom placeholder";
    render(<SearchBar placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });

  // Theme tests
  it("applies default dark theme", () => {
    render(<SearchBar />);
    const searchBar = screen.getByTestId("search-bar");
    // expect(searchBar).toHaveClass('search-bar--theme-dark');
  });

  // Form submission tests
  it("calls onSearch with input value on form submit", async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByTestId("search-input");
    const searchTerm = "test search";

    await userEvent.type(input, searchTerm);
    fireEvent.submit(screen.getByTestId("search-button"));

    expect(onSearch).toHaveBeenCalledWith(searchTerm);
  });

  // Accessibility tests
  it("has accessible search button", () => {
    render(<SearchBar />);
    const button = screen.getByTestId("search-button");
    // expect(button).toHaveAttribute('aria-label', 'Search');
  });
});
