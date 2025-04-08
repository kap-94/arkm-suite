"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./JobSelector.module.scss";
import JobSelector from "./index";

interface InteractiveJobSelectorProps {
  isActive: boolean;
  company: string;
  role: string;
  industry?: string;
  iconType?: string;
  imageUrl?: string;
  onClick: () => void;
}

const cx = classNames.bind(styles);

export default function InteractiveJobSelector({
  isActive,
  company,
  role,
  industry,
  iconType,
  imageUrl,
  onClick,
}: InteractiveJobSelectorProps) {
  return (
    <div
      className={cx("selector", { "selector--active": isActive })}
      role="button"
      aria-pressed={isActive}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <JobSelector
        isActive={isActive}
        company={company}
        role={role}
        industry={industry}
        iconType={iconType}
      />
    </div>
  );
}
