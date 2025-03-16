import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./LanguageSelector.module.scss";
import ReactCountryFlag from "react-country-flag";
import { Typography } from "../Typography";
import { LanguageOption } from "@/app/_types/dictionary/mainLayout.types";

const cx = classNames.bind(styles);

export type Language = "en" | "es";

export type LanguageSelectorVariant =
  | "neon-pill"
  | "split-line"
  | "glassy-dropdown"
  | "floating-bubble"
  | "neon-outline"
  | "minimal-underline"
  | "gradient-pill"
  | "icon-circle"
  | "modern-dropdown"
  | "rounded-dropdown"
  | "minimal-dropdown"
  | "accent-dropdown"
  | "neumorphic-dropdown"
  | "rounded-dropdown-with-icon"
  | "rounded-card-dropdown"
  | "rounded-gradient-dropdown";

// Actualizada para recibir opciones desde el diccionario
interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: LanguageSelectorVariant;
  className?: string;
  options?: LanguageOption[];
}

// Opciones por defecto en caso de que no se proporcionen desde el diccionario
const DEFAULT_OPTIONS = [
  {
    code: "es",
    label: "ES",
    aria: "Español",
    countryCode: "ES", // Código ISO para España
  },
  {
    code: "en",
    label: "EN",
    aria: "English",
    countryCode: "GB", // Código ISO para Reino Unido
  },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  variant = "neon-pill",
  className,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Usar las opciones proporcionadas o las predeterminadas
  const languageOptions = options || DEFAULT_OPTIONS;

  // Get current language option
  const currentOption = languageOptions.find(
    (option) => option.code === currentLanguage
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  // Función para renderizar la bandera
  const renderFlag = (countryCode: string) => {
    return (
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "1.2em",
          height: "1.2em",
          borderRadius: "2px",
          objectFit: "cover",
        }}
        aria-hidden="true"
      />
    );
  };

  // Render based on variant
  if (
    variant === "floating-bubble" ||
    variant === "icon-circle" ||
    variant === "neon-outline" ||
    variant === "minimal-underline" ||
    variant === "gradient-pill"
  ) {
    return (
      <div className={cx("language-selector", `variant-${variant}`, className)}>
        {languageOptions.map((option) => (
          <button
            key={option.code}
            className={cx("language-button", {
              active: currentLanguage === option.code,
            })}
            onClick={() => onLanguageChange(option.code as Language)}
            aria-label={option.aria}
          >
            {variant === "icon-circle" && (
              <span className={cx("icon-wrapper")}>
                {renderFlag(option.countryCode)}
              </span>
            )}
            <Typography
              variant="p2"
              fontFamily="sofia"
              fontWeight={600}
              theme="dark"
            >
              {option.label}
            </Typography>
          </button>
        ))}
      </div>
    );
  }

  if (
    variant === "glassy-dropdown" ||
    variant === "modern-dropdown" ||
    variant === "rounded-dropdown" ||
    variant === "minimal-dropdown" ||
    variant === "accent-dropdown" ||
    variant === "neumorphic-dropdown" ||
    variant === "rounded-dropdown-with-icon" ||
    variant === "rounded-card-dropdown" ||
    variant === "rounded-gradient-dropdown"
  ) {
    return (
      <div
        ref={dropdownRef}
        className={cx("language-selector", `variant-${variant}`, className, {
          open: isOpen,
        })}
      >
        <button
          className={cx("dropdown-toggle", `toggle-${variant}`)}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {variant === "modern-dropdown" && currentOption && (
            <span className={cx("dropdown-icon")}>
              {renderFlag(currentOption.countryCode)}
            </span>
          )}
          {variant === "rounded-dropdown-with-icon" ? (
            <span>
              {currentOption && (
                <span className={cx("dropdown-icon")}>
                  {renderFlag(currentOption.countryCode)}
                </span>
              )}
              <Typography
                variant="p2"
                fontFamily="sofia"
                fontWeight={600}
                theme="dark"
                className={cx("selected-text")}
                style={{ transform: "translateY(-1.2px)" }}
              >
                {currentOption?.label}
              </Typography>
            </span>
          ) : (
            <Typography
              variant="p2"
              fontFamily="sofia"
              fontWeight={500}
              theme="dark"
            >
              {variant === "minimal-dropdown" ||
              variant === "neumorphic-dropdown"
                ? currentOption?.aria
                : currentOption?.label}
            </Typography>
          )}
          <svg
            className={cx("dropdown-arrow", { open: isOpen })}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isOpen && (
          <div className={cx("dropdown-menu", `menu-${variant}`)}>
            <ul role="listbox" aria-activedescendant={currentLanguage}>
              {languageOptions.map((option) => (
                <li
                  key={option.code}
                  role="option"
                  aria-selected={currentLanguage === option.code}
                  className={cx("dropdown-item", {
                    active: currentLanguage === option.code,
                  })}
                  onClick={() => handleLanguageChange(option.code as Language)}
                >
                  {(variant === "modern-dropdown" ||
                    variant === "rounded-dropdown" ||
                    variant === "accent-dropdown" ||
                    variant === "rounded-dropdown-with-icon" ||
                    variant === "rounded-card-dropdown" ||
                    variant === "rounded-gradient-dropdown") && (
                    <span className={cx("item-icon")}>
                      {renderFlag(option.countryCode)}
                    </span>
                  )}
                  <Typography
                    variant="p2"
                    fontFamily="sofia"
                    fontWeight={currentLanguage === option.code ? 500 : 400}
                    theme="dark"
                  >
                    {variant === "minimal-dropdown" ||
                    variant === "neumorphic-dropdown" ||
                    variant === "accent-dropdown" ||
                    variant === "rounded-dropdown" ||
                    variant === "rounded-dropdown-with-icon" ||
                    variant === "rounded-card-dropdown" ||
                    variant === "rounded-gradient-dropdown"
                      ? option.aria
                      : option.label}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Return original variants
  return (
    <div className={cx("language-selector", `variant-${variant}`, className)}>
      {languageOptions.map((option) => (
        <button
          key={option.code}
          className={cx("language-button", {
            active: currentLanguage === option.code,
          })}
          onClick={() => onLanguageChange(option.code as Language)}
          aria-label={option.aria}
        >
          <Typography
            variant="p2"
            fontFamily="sofia"
            fontWeight={600}
            theme="dark"
          >
            {option.label}
          </Typography>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
