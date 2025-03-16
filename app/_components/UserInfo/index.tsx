"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import classNames from "classnames/bind";
import { ThemedTypography } from "../Typography/ThemedTypography";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { buildLocalizedPath } from "@/app/_utils/path";
import styles from "./UserInfo.module.scss";
import { UserInfoProps, DropdownOption, UserInfoTheme } from "./types";
import { getInitials } from "./utils";
import Typography from "../Typography";
import { useSettings } from "../../_context/SettingsContext";

const cx = classNames.bind(styles);

const DropdownItem = ({
  option,
  theme,
  onItemClick,
}: {
  option: DropdownOption;
  theme: UserInfoTheme["type"];
  onItemClick: (option: DropdownOption) => void;
}) => {
  const { language } = useSettings();

  if (option.type === "divider") {
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
    onItemClick(option);
  };

  if (option.href) {
    return (
      <Link
        href={buildLocalizedPath(option.href, language)}
        className={cx("user-info__dropdown-item")}
        onClick={handleClick}
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
  theme = { type: "light" },
  closeOnScroll = false,
}: UserInfoProps & { closeOnScroll?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { language } = useSettings();
  const containerRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    if (!closeOnScroll) return;
    const handleScroll = () => isOpen && setIsOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [closeOnScroll, isOpen]);

  useEffect(() => {
    const handleRouteChange = () => isOpen && setIsOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [isOpen]);

  const handleItemClick = (option: DropdownOption) => {
    setIsOpen(false);

    if ("href" in option && option.href) {
      router.push(buildLocalizedPath(option.href, language));
    }

    if ("onClick" in option && option.onClick) {
      option.onClick();
    }
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
