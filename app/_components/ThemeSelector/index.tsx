// src/components/ThemeSelector/ThemeSelector.tsx
import React from "react";
import { useSettings } from "../../_context/SettingsContext";
import { ThemeType } from "../Sidebar/types/sidebar.types";
import { Sun, Moon } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./ThemeSelector.module.scss";

const cx = classNames.bind(styles);

interface ThemeSelectorProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className,
  style,
}) => {
  const { theme, updateTheme } = useSettings();

  const themes: { value: ThemeType; label: string; icon: JSX.Element }[] = [
    {
      value: "light",
      label: "Light",
      icon: <Sun size={18} />,
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon size={18} />,
    },
  ];

  return (
    <div className={cx("theme-selector", className)} style={style}>
      {themes.map(({ value, label, icon }) => (
        <button
          key={value}
          className={cx("theme-button", {
            active: theme === value,
          })}
          onClick={() => updateTheme(value)}
          aria-label={`Switch to ${label} theme`}
        >
          <span className={cx("theme-button__icon")}>{icon}</span>
          <span className={cx("theme-button__label")}>{label}</span>
        </button>
      ))}
    </div>
  );
};
