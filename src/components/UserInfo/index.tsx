// src/app/components/UserInfo/UserInfo.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import classNames from "classnames/bind";
import { ThemedTypography } from "../Typography/ThemedTypography";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import styles from "./UserInfo.module.scss";
import { UserInfoProps, DropdownOption, UserInfoTheme } from "./types";
import { getInitials } from "./utils";
import Typography from "../Typography";

const cx = classNames.bind(styles);

const DropdownItem = ({
  option,
  theme,
}: {
  option: DropdownOption;
  theme: UserInfoTheme["type"];
}) => {
  if (option.divider) {
    return <div className={cx("user-info__dropdown-divider")} />;
  }

  const content = (
    <>
      {option.icon && (
        <span className={cx("user-info__dropdown-icon")}>{option.icon}</span>
      )}
      <ThemedTypography variant="p2" theme={theme}>
        {option.label}
      </ThemedTypography>
    </>
  );

  if (option.href) {
    return (
      <Link href={option.href} className={cx("user-info__dropdown-item")}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cx("user-info__dropdown-item")}
      onClick={option.onClick}
      type="button"
    >
      {content}
    </button>
  );
};

export const UserInfo = ({
  userName,
  userRole,
  className,
  options,
  theme = { type: "dark" },
}: UserInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div
      ref={containerRef}
      className={cx(
        "user-info",
        { "user-info--active": isOpen },
        `user-info--theme-${theme.type}`,
        className
      )}
    >
      <button
        className={cx("user-info__trigger")}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className={cx("user-info__avatar")}>
          <Typography
            variant="p2"
            // color="secondary"
            className={cx("user-info__role")}
          >
            {getInitials(userName)}
          </Typography>
        </div>
        <div className={cx("user-info__content")}>
          <ThemedTypography
            variant="p2"
            className={cx("user-info__name")}
            theme={theme.type}
          >
            {userName}
          </ThemedTypography>
          <ThemedTypography
            variant="p3"
            color="secondary"
            className={cx("user-info__role")}
            theme={theme.type}
          >
            {userRole}
          </ThemedTypography>
        </div>
        <ChevronDown
          className={cx("user-info__chevron", {
            "user-info__chevron--active": isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div className={cx("user-info__dropdown-menu")}>
          {options.map((option) => (
            <DropdownItem key={option.id} option={option} theme={theme.type} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
