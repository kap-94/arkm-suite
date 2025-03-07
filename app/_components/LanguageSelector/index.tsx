import React from "react";
import classNames from "classnames/bind";
import styles from "./LanguageSelector.module.scss";

const cx = classNames.bind(styles);

export type Language = "en" | "es";

export type LanguageSelectorVariant = "neon-pill" | "split-line";

interface LanguageOption {
  code: Language;
  label: string;
  ariaLabel: string;
}

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: LanguageSelectorVariant;
  className?: string;
}

const DEFAULT_OPTIONS: LanguageOption[] = [
  { code: "es", label: "ES", ariaLabel: "Español" },
  { code: "en", label: "EN", ariaLabel: "English" },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  variant = "neon-pill",
  className,
}) => {
  return (
    <div className={cx("language-selector", `variant-${variant}`, className)}>
      {DEFAULT_OPTIONS.map((option) => (
        <button
          key={option.code}
          className={cx("language-button", {
            active: currentLanguage === option.code,
          })}
          onClick={() => onLanguageChange(option.code)}
          aria-label={option.ariaLabel}
        >
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
