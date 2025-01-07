"use client";

import React from "react";
import classnames from "classnames/bind";
import { Moon, Sun } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { Typography } from "@/components/Typography";
import styles from "./ThemeSelector.module.scss";

const cx = classnames.bind(styles);

const ThemeSelector = () => {
  const { theme, updateTheme } = useSettings();

  return (
    <div className={cx("card")}>
      <Typography variant="h4" className={cx("card__title")}>
        Theme Preferences
      </Typography>

      <div className={cx("grid")}>
        <button
          onClick={() => updateTheme("light")}
          className={cx("theme-button", {
            "theme-button--active": theme === "light",
            "theme-button--inactive": theme !== "light",
          })}
        >
          <Sun
            className={cx("theme-button__icon", {
              "theme-button__icon--active": theme === "light",
              "theme-button__icon--inactive": theme !== "light",
            })}
          />
          <Typography
            variant="p1"
            className={cx("theme-button__label", {
              "theme-button__label--active": theme === "light",
              "theme-button__label--inactive": theme !== "light",
            })}
          >
            Light Mode
          </Typography>
        </button>

        <button
          onClick={() => updateTheme("dark")}
          className={cx("theme-button", {
            "theme-button--active": theme === "dark",
            "theme-button--inactive": theme !== "dark",
          })}
        >
          <Moon
            className={cx("theme-button__icon", {
              "theme-button__icon--active": theme === "dark",
              "theme-button__icon--inactive": theme !== "dark",
            })}
          />
          <Typography
            variant="p1"
            className={cx("theme-button__label", {
              "theme-button__label--active": theme === "dark",
              "theme-button__label--inactive": theme !== "dark",
            })}
          >
            Dark Mode
          </Typography>
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;
