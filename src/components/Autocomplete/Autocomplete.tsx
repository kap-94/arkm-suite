"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Loader } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./Autocomplete.module.scss";
import type { AutocompleteProps, AutocompleteOption } from "./types";

const cx = classNames.bind(styles);

/**
 * Autocomplete dropdown component with theme support
 *
 * @example
 * ```tsx
 * <Autocomplete
 *   options={[
 *     { id: 1, label: 'Option 1', value: 'opt1' },
 *     { id: , label: 'Option ', value: 'opt2' }
 *   ]}
 *   onSelect={(option) => console.log(option)}
 *   theme={{ type: 'dark' }}
 * />
 * ```
 */
export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  inputValue = "",
  onSelect,
  onInputChange,
  maxHeight = 300,
  groupBy = false,
  showGroupHeaders = true,
  renderOption,
  renderGroupHeader,
  loading = false,
  noOptionsMessage = "No options available",
  theme = { type: "dark" },
  isOpen = false,
  className,
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filteredOptions, setFilteredOptions] =
    useState<AutocompleteOption[]>(options);

  // Group options if needed
  const groupedOptions = React.useMemo(() => {
    if (!groupBy) return { ungrouped: filteredOptions };

    return filteredOptions.reduce((acc, option) => {
      const group = option.group || "ungrouped";
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    }, {} as Record<string, AutocompleteOption[]>);
  }, [filteredOptions, groupBy]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onSelect?.(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        onInputChange?.("");
        break;
    }
  };

  // Custom styles for theme
  const customStyles =
    theme.type === "custom" && theme.customValues
      ? ({
          "--autocomplete-background": theme.customValues.background,
          "--autocomplete-hover-background": theme.customValues.hoverBackground,
          "--autocomplete-text": theme.customValues.text,
          "--autocomplete-highlighted-text": theme.customValues.highlightedText,
          "--autocomplete-divider-color": theme.customValues.dividerColor,
          "--autocomplete-scrollbar-color": theme.customValues.scrollbarColor,
        } as React.CSSProperties)
      : undefined;

  // Render option with highlighting
  const defaultRenderOption = (option: AutocompleteOption) => (
    <div className={cx("autocomplete__option-content")}>
      {option.icon && (
        <span className={cx("autocomplete__option-icon")}>{option.icon}</span>
      )}
      <span className={cx("autocomplete__option-label")}>{option.label}</span>
      {value?.id === option.id && (
        <Check size={16} className={cx("autocomplete__option-check")} />
      )}
    </div>
  );

  // Render group header
  const defaultRenderGroupHeader = (group: string) => (
    <div className={cx("autocomplete__group-header")}>
      {group === "ungrouped" ? null : group}
    </div>
  );

  return (
    <div
      className={cx(
        "autocomplete",
        `autocomplete--theme-${theme.type}`,
        className
      )}
      style={customStyles}
      onKeyDown={handleKeyDown}
      ref={dropdownRef}
    >
      <div
        className={cx("autocomplete__dropdown")}
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {loading ? (
          <div className={cx("autocomplete__loading")}>
            <Loader className={cx("autocomplete__loading-icon")} />
            Loading...
          </div>
        ) : filteredOptions.length === 0 ? (
          <div className={cx("autocomplete__no-options")}>
            {noOptionsMessage}
          </div>
        ) : (
          Object.entries(groupedOptions).map(([group, groupOptions]) => (
            <React.Fragment key={group}>
              {groupBy &&
                showGroupHeaders &&
                group !== "ungrouped" &&
                (renderGroupHeader?.(group) ?? defaultRenderGroupHeader(group))}
              {groupOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={cx("autocomplete__option", {
                    "autocomplete__option--highlighted":
                      index === highlightedIndex,
                    "autocomplete__option--selected": value?.id === option.id,
                  })}
                  onClick={() => onSelect?.(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {renderOption?.(option) ?? defaultRenderOption(option)}
                </div>
              ))}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

Autocomplete.displayName = "Autocomplete";
