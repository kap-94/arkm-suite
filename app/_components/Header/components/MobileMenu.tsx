"use client";

import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { HeaderPosition } from "../types/header.types";
import styles from "../styles/MobileMenu.module.scss";
import { Button } from "../../Button";
import { useHeaderContext } from "../context";
import { Typography } from "../../Typography";

const cx = classNames.bind(styles);

interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  variant?: string;
  isCTA?: boolean;
}

interface MobileMenuProps {
  position?: HeaderPosition;
  primaryNavigation?: NavigationItem[];
  secondaryNavigation?: NavigationItem[];
  onClose?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  position = "right",
  primaryNavigation = [],
  secondaryNavigation = [],
  onClose,
}) => {
  const { isNavOpen } = useHeaderContext();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isNavOpen) return null;

  // Separar el último elemento del menú secundario
  const mainSecondaryItems = secondaryNavigation.slice(0, -1);
  const lastSecondaryItem =
    secondaryNavigation.length > 0
      ? secondaryNavigation[secondaryNavigation.length - 1]
      : null;

  return (
    <div className={cx("mobile", `mobile--${position}`)}>
      <div className={cx("mobile__content")}>
        {/* Grupo principal de navegación */}
        <div className={cx("mobile__main-group")}>
          {/* Primary Navigation Links */}
          <nav className={cx("mobile__navigation")}>
            <ul className={cx("mobile__nav-list")}>
              {primaryNavigation.map((item, index) => (
                <li key={`primary-${index}`} className={cx("mobile__nav-item")}>
                  <a
                    href={item.href}
                    className={cx("mobile__nav-link", {
                      "mobile__nav-link--active": item.isActive,
                    })}
                    onClick={() => {
                      item.onClick?.();
                      onClose?.();
                    }}
                  >
                    {item.icon && (
                      <span className={cx("mobile__nav-icon")}>
                        {item.icon}
                      </span>
                    )}
                    <Typography
                      variant="h3"
                      fontFamily="sofia"
                      fontWeight={500}
                      color="primary"
                      theme="dark"
                    >
                      {item.label}
                    </Typography>
                    {item.dropdownIcon && (
                      <span className={cx("mobile__nav-dropdown")}>
                        {item.dropdownIcon}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className={cx("mobile__divider")} />

          {/* Main Secondary Navigation Items */}
          {mainSecondaryItems?.length > 0 && (
            <div className={cx("mobile__secondary")}>
              <ul className={cx("mobile__nav-list")}>
                {mainSecondaryItems.map((item, index) => (
                  <li
                    key={`secondary-${index}`}
                    className={cx("mobile__nav-item")}
                  >
                    <a
                      href={item.href}
                      className={cx("mobile__nav-link", {
                        "mobile__nav-link--active": item.isActive,
                      })}
                      onClick={() => {
                        item.onClick?.();
                        onClose?.();
                      }}
                    >
                      {item.icon && (
                        <span className={cx("mobile__nav-icon")}>
                          {item.icon}
                        </span>
                      )}
                      <Typography
                        variant="h3"
                        fontFamily="sofia"
                        fontWeight={500}
                        color="primary"
                        theme="dark"
                      >
                        {item.label}
                      </Typography>
                      {item.dropdownIcon && (
                        <span className={cx("mobile__nav-dropdown")}>
                          {item.dropdownIcon}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Buttons */}
          {secondaryNavigation?.some((item) => item.isCTA) && (
            <div className={cx("mobile__actions")}>
              {secondaryNavigation
                .filter((item) => item.isCTA)
                .map((item, index) => (
                  <div
                    key={`cta-${index}`}
                    className={cx("mobile__action-wrapper")}
                  >
                    <Button
                      size="md"
                      href={item.href}
                      onClick={() => {
                        item.onClick?.();
                        onClose?.();
                      }}
                      className={cx("mobile__action-button")}
                    >
                      {item.icon && <span>{item.icon}</span>}
                      <Typography
                        variant="button"
                        fontWeight={500}
                        color="primary"
                        theme="dark"
                      >
                        {item.label}
                      </Typography>
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Last Secondary Item at the bottom */}
        {lastSecondaryItem && (
          <div className={cx("mobile__footer")}>
            <div className={cx("mobile__footer-divider")} />
            <a
              href={lastSecondaryItem.href}
              className={cx("mobile__footer-link")}
              onClick={() => {
                lastSecondaryItem.onClick?.();
                onClose?.();
              }}
            >
              {lastSecondaryItem.icon && (
                <span className={cx("mobile__nav-icon")}>
                  {lastSecondaryItem.icon}
                </span>
              )}
              <Typography
                variant="h3"
                fontFamily="sofia"
                fontWeight={500}
                color="primary"
                theme="dark"
              >
                {lastSecondaryItem.label}
              </Typography>
              {lastSecondaryItem.dropdownIcon && (
                <span className={cx("mobile__nav-dropdown")}>
                  {lastSecondaryItem.dropdownIcon}
                </span>
              )}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
