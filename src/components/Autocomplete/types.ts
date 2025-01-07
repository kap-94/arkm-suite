// types.ts

export interface AutocompleteOption {
  id: string | number;
  label: string;
  value: any;
  icon?: React.ReactNode;
  group?: string;
}

export interface AutocompleteTheme {
  type: "light" | "dark" | "custom";
  customValues?: {
    background?: string;
    hoverBackground?: string;
    text?: string;
    highlightedText?: string;
    dividerColor?: string;
    scrollbarColor?: string;
  };
}

export interface AutocompleteProps {
  /** Options to display in the dropdown */
  options: AutocompleteOption[];
  /** Currently selected option */
  value?: AutocompleteOption;
  /** Input value */
  inputValue?: string;
  /** Callback when option is selected */
  onSelect?: (option: AutocompleteOption) => void;
  /** Callback when input value changes */
  onInputChange?: (value: string) => void;
  /** Maximum height of dropdown in pixels */
  maxHeight?: number;
  /** Whether to group options by group property */
  groupBy?: boolean;
  /** Whether to show group headers */
  showGroupHeaders?: boolean;
  /** Custom render function for option */
  renderOption?: (option: AutocompleteOption) => React.ReactNode;
  /** Custom render function for group header */
  renderGroupHeader?: (group: string) => React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** No options message */
  noOptionsMessage?: string;
  /** Theme configuration */
  theme?: AutocompleteTheme;
  /** Whether the dropdown is open */
  isOpen?: boolean;
  /** Additional CSS classes */
  className?: string;
}
