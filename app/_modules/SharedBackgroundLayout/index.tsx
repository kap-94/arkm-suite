// src/modules/SharedBackgroundLayout/index.tsx
"use client";

import React, { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./SharedBackgroundLayout.module.scss";

const cx = classNames.bind(styles);

interface SharedBackgroundLayoutProps {
  children: React.ReactNode;
}

export const SharedBackgroundLayout = ({
  children,
}: SharedBackgroundLayoutProps) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hoverTrailRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cx("background-container")}>
      <div className={cx("ambient-glow")} ref={glowRef} />
      <div className={cx("grid-background")} ref={gridRef} />

      <div ref={maskRef} className={cx("mask")} />
      <div ref={hoverTrailRef} className={cx("hover-trail")} />

      <div className={cx("content")}>{children}</div>
    </div>
  );
};

export default SharedBackgroundLayout;
