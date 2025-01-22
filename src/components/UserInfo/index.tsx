"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  onItemClick,
}: {
  option: DropdownOption;
  theme: UserInfoTheme["type"];
  onItemClick: () => void;
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

  const handleClick = () => {
    onItemClick();
    if (option.onClick) {
      option.onClick();
    }
  };

  if (option.href) {
    return (
      <Link
        href={option.href}
        className={cx("user-info__dropdown-item")}
        onClick={onItemClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cx("user-info__dropdown-item")}
      onClick={handleClick}
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
  closeOnScroll = false,
}: UserInfoProps & { closeOnScroll?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    if (!closeOnScroll) return;

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [closeOnScroll, isOpen]);

  // Escucha los cambios de ruta para cerrar el dropdown
  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [isOpen]);

  const handleItemClick = () => {
    setIsOpen(false);
  };

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
          <Typography variant="p2" className={cx("user-info__initials")}>
            {getInitials(userName)}
          </Typography>
        </div>
        <div className={cx("user-info__content")}>
          <ThemedTypography variant="p2" className={cx("user-info__name")}>
            {userName}
          </ThemedTypography>
          <ThemedTypography
            variant="p3"
            color="secondary"
            className={cx("user-info__role")}
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
            <DropdownItem
              key={option.id}
              option={option}
              theme={theme.type}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
