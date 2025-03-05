// src/components/SearchBar/SearchBar.tsx
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import classNames from "classnames/bind";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import Spinner from "@/components/Spinner";
import styles from "./SearchBar.module.scss";

const cx = classNames.bind(styles);

interface SearchBarTheme {
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

export interface SearchBarOption {
  id: string;
  label: string;
  value: string;
  type: string;
  subtitle?: string;
  icon?: React.ReactNode;
  href?: string;
}

interface SearchBarProps {
  options?: SearchBarOption[];
  onSearch?: (term: string) => void;
  onOptionSelect?: (option: SearchBarOption) => void;
  onSubmit?: (searchTerm: string) => void; // Nueva prop onSubmit
  placeholder?: string;
  showLabel?: boolean;
  label?: string;
  theme?: SearchBarTheme;
  size?: "small" | "large";
  className?: string;
  loading?: boolean;
  showButton?: boolean;
  buttonText?: string;
  closeOnScroll?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  options = [],
  onSearch,
  onOptionSelect,
  onSubmit, // Recibimos onSubmit como prop
  placeholder = "Search...",
  showLabel = true,
  label = "Search",
  theme = { type: "light" },
  size = "large",
  className = "",
  loading = false,
  showButton = true,
  buttonText = "Search",
  closeOnScroll = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const calculateDropdownPosition = useCallback(() => {
    if (!formRef.current) return "bottom";

    const formRect = formRef.current.getBoundingClientRect();
    const dropdownHeight = 300;
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - formRect.bottom;
    const spaceAbove = formRect.top;

    return spaceBelow < dropdownHeight && spaceAbove > spaceBelow
      ? "top"
      : "bottom";
  }, []);

  useEffect(() => {
    if (!closeOnScroll) return;

    const handleScroll = () => {
      if (isDropdownVisible) {
        setIsDropdownVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [closeOnScroll, isDropdownVisible]);

  useEffect(() => {
    const handlePositionUpdate = () => {
      if (isDropdownVisible) {
        setDropdownPosition(calculateDropdownPosition());
      }
    };

    window.addEventListener("resize", handlePositionUpdate);
    window.addEventListener("scroll", handlePositionUpdate);

    return () => {
      window.removeEventListener("resize", handlePositionUpdate);
      window.removeEventListener("scroll", handlePositionUpdate);
    };
  }, [calculateDropdownPosition, isDropdownVisible]);

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    setIsDropdownVisible(false);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(inputValue.trim()); // Llamamos a onSubmit con el término de búsqueda
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 2) {
      setIsDropdownVisible(true);
      setDropdownPosition(calculateDropdownPosition());
      onSearch?.(value);
    } else {
      setIsDropdownVisible(false);
    }
  };

  const handleOptionSelect = (option: SearchBarOption) => {
    setInputValue(option.label);
    setIsDropdownVisible(false);
    onOptionSelect?.(option);
  };

  const handleFocus = () => {
    if (inputValue && (loading || options.length > 0)) {
      setIsDropdownVisible(true);
      setDropdownPosition(calculateDropdownPosition());
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className={cx("search-bar__highlight")}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const renderDropdownContent = () => {
    if (loading) {
      return (
        <div className={cx("search-bar__loading")}>
          <Spinner size="sm" theme={theme} />
        </div>
      );
    }

    if (options.length > 0) {
      return (
        <div className={cx("search-bar__options-list")}>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className={cx("search-bar__option")}
            >
              {option.icon && (
                <span className={cx("search-bar__option-icon")}>
                  {option.icon}
                </span>
              )}
              <div className={cx("search-bar__option-content")}>
                <div className={cx("search-bar__option-content-header")}>
                  <ThemedTypography
                    variant="p3"
                    fontWeight={500}
                    color="primary"
                    className={cx("search-bar__option-label")}
                  >
                    {highlightMatch(option.label, inputValue)}
                  </ThemedTypography>

                  <ThemedTypography
                    variant="p3"
                    fontWeight={500}
                    className={cx("search-bar__option-type")}
                  >
                    {highlightMatch(option.type, inputValue)}
                  </ThemedTypography>
                </div>
                {option.subtitle && (
                  <ThemedTypography
                    variant="p3"
                    color="secondary"
                    className={cx("search-bar__option-subtitle")}
                  >
                    {highlightMatch(option.subtitle, inputValue)}
                  </ThemedTypography>
                )}
              </div>
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      className={cx(
        "search-bar",
        {
          "search-bar--small": size === "small",
        },
        `search-bar--theme-${theme.type}`,
        className
      )}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={cx("search-bar__form")}
      >
        <div className={cx("search-bar__wrapper")}>
          {showLabel && (
            <ThemedTypography
              as="label"
              variant="label"
              className={cx("search-bar__label")}
              color="secondary"
              theme={theme.type}
            >
              {label}
            </ThemedTypography>
          )}

          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            className={cx("search-bar__input", {
              "search-bar__input--with-label": showLabel,
              "search-bar__input--small": size === "small",
            })}
            autoComplete="off"
          />

          {showButton && (
            <button
              type="submit"
              className={cx("search-bar__button")}
              aria-label="Search"
            >
              <Search className={cx("search-bar__button-icon")} />
              {buttonText && (
                <ThemedTypography
                  variant="p2"
                  color="tertiary"
                  fontWeight={400}
                  className={cx("search-bar__button-text")}
                  theme={theme.type}
                >
                  {buttonText}
                </ThemedTypography>
              )}
            </button>
          )}
        </div>

        {isDropdownVisible && (
          <div
            className={cx("search-bar__dropdown", {
              "search-bar__dropdown--top": dropdownPosition === "top",
              "search-bar__dropdown--bottom": dropdownPosition === "bottom",
            })}
          >
            {renderDropdownContent()}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
