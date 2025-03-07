// types.ts

/**
 * Theme configuration for the SearchBar
 * @property type - The theme type (light, dark, or custom)
 * @property customValues - Optional custom theme values
 */
export interface SearchBarTheme {
  type: "light" | "dark" | "custom";
  customValues?: {
    background?: string;
    inputBackground?: string;
    text?: string;
    placeholder?: string;
    buttonBackground?: string;
    buttonText?: string;
    borderColor?: string;
  };
}

import { AutocompleteOption, AutocompleteProps } from "../Autocomplete/types";

export interface SearchBarProps {
  /** Options for autocomplete */
  options?: AutocompleteOption[];
  /** Autocomplete props override */
  autocompleteProps?: Partial<
    Omit<AutocompleteProps, "options" | "inputValue" | "onInputChange">
  >;
  /** Custom filter function for options */
  filterOptions?: (
    options: AutocompleteOption[],
    inputValue: string
  ) => AutocompleteOption[];
  /** Additional CSS classes */
  className?: string;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Callback function when search is submitted */
  onSearch?: (searchTerm: string) => void;
  /** Show/hide the search button text */
  showButtonText?: boolean;
  /** Theme configuration */
  theme?: SearchBarTheme;
}

export interface SearchFormValues {
  searchTerm: string;
}
