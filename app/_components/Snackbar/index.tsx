"use client";

import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { useUIContext } from "@/app/_context/UIContext";
import Typography from "../Typography";
import styles from "./Snackbar.module.scss";

const cx = classNames.bind(styles);

export interface SnackbarProps {
  duration?: number;
  position?: "top" | "bottom";
}

const Snackbar: React.FC<SnackbarProps> = ({
  duration = 6000,
  position = "top",
}) => {
  const { state, hideSnackbar } = useUIContext();
  const { snackbar } = state;

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        hideSnackbar();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [snackbar.open, hideSnackbar, duration]);

  if (!snackbar.open) return null;

  return (
    <div
      className={cx(
        "snackbar",
        `snackbar--${snackbar.type}`,
        `snackbar--${position}`
      )}
    >
      <Typography variant="p1" theme="dark" fontFamily="sofia" fontWeight={500}>
        {snackbar.message}
      </Typography>
      <button className={cx("snackbar__close")} onClick={hideSnackbar}>
        <Typography variant="p1" theme="dark" fontFamily="sofia">
          X
        </Typography>
      </button>
    </div>
  );
};

export default Snackbar;
