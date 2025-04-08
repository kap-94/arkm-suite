"use client";

import React, { useEffect, useCallback, useState, useRef } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { HeaderPosition } from "../types/header.types";
import styles from "../styles/MobileMenu.module.scss";
import { Button } from "../../Button";
import { useHeaderContext } from "../context";
import { Typography } from "../../Typography";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollToPlugin);

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
  isSectionLink?: boolean; // Prop para identificar enlaces a secciones
}

interface MobileMenuProps {
  position?: HeaderPosition;
  primaryNavigation?: NavigationItem[];
  secondaryNavigation?: NavigationItem[];
  onClose?: () => void;
  locale?: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  position = "right",
  primaryNavigation = [],
  secondaryNavigation = [],
  onClose,
  locale = "en",
}) => {
  const { isNavOpen } = useHeaderContext();
  const router = useRouter();
  const pathname = usePathname();
  const previousPathname = useRef("");
  const handledInitialScroll = useRef(false);

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

  /**
   * Handles smooth scrolling to a section
   * @param hash - The hash link to scroll to (e.g., "#contact")
   */
  const handleScrollToSection = useCallback((hash: string) => {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      const offset = 100; // Ajuste para compensar elementos fijos
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: targetElement,
          offsetY: offset,
        },
      });
    }
  }, []);

  /**
   * Handles navigation between pages and sections
   * @param href - Target URL or hash
   * @param isHomePage - Whether currently on home page
   */
  const handleNavigation = useCallback(
    (href: string, isHomePage: boolean) => {
      // Extract hash part if present
      const hasHash = href.includes("#");
      const hashPart = hasHash ? href.substring(href.indexOf("#")) : "";

      if (hasHash) {
        if (!isHomePage) {
          // Navigate to home page with hash
          router.push(`/${locale}${hashPart}`);

          // Wait for navigation to complete then scroll
          setTimeout(() => {
            handleScrollToSection(hashPart);
          }, 100);
        } else {
          // Already on home page, just scroll
          handleScrollToSection(hashPart);
        }
      } else {
        // Regular navigation
        router.push(href);

        // Scroll to top after navigation
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 100);
      }
    },
    [router, locale, handleScrollToSection]
  );

  /**
   * Handles click events on links
   * @param e - React mouse event
   * @param href - URL to navigate to
   * @param onClick - Optional callback function
   * @param isSectionLink - Whether the link is a section link
   */
  const handleLinkClick = useCallback(
    (
      e: React.MouseEvent,
      href: string,
      onClick?: () => void,
      isSectionLink?: boolean
    ) => {
      e.preventDefault();

      // Check if we're on the home page
      const isHomePage =
        pathname === "/" ||
        pathname === `/${locale}` ||
        pathname === `/${locale}/`;

      // Handle navigation based on link type
      if (isSectionLink || href.startsWith("#")) {
        handleNavigation(href, isHomePage);
      } else {
        handleNavigation(href, false);
      }

      // Execute additional callback if provided
      onClick?.();

      // Close the menu
      onClose?.();
    },
    [pathname, locale, handleNavigation, onClose]
  );

  // Effect to handle scrolling to section when URL has a hash
  useEffect(() => {
    if (typeof window !== "undefined" && isNavOpen) {
      // Check if we're on the home page
      const isHomePage =
        pathname === "/" ||
        pathname === `/${locale}` ||
        pathname === `/${locale}/`;

      const hash = window.location.hash;

      // Check if we changed pages
      const hasChangedPage = previousPathname.current !== pathname;
      previousPathname.current = pathname;

      // Scroll when:
      // 1. We're on the home page AND there's a hash
      // 2. AND (we changed pages OR haven't handled initial scroll)
      if (
        isHomePage &&
        hash &&
        (hasChangedPage || !handledInitialScroll.current)
      ) {
        // Small delay to ensure DOM elements are ready
        setTimeout(() => {
          handleScrollToSection(hash);
          handledInitialScroll.current = true;
        }, 100);
      } else if (!hash || hasChangedPage) {
        // Reset flag when:
        // - No hash in URL
        // - Or we changed to a different page
        handledInitialScroll.current = false;
      }
    }
  }, [pathname, isNavOpen, handleScrollToSection, locale]);

  if (!isNavOpen) return null;

  // Separar el último elemento del menú secundario
  const mainSecondaryItems = secondaryNavigation.slice(0, -1);
  const lastSecondaryItem =
    secondaryNavigation.length > 0
      ? secondaryNavigation[secondaryNavigation.length - 1]
      : null;

  // Función para renderizar un enlace de navegación
  const renderNavLink = (item: NavigationItem, isCTA = false) => {
    const isSection = item.isSectionLink || item.href.startsWith("#");
    const linkContent = (
      <>
        {item.icon && (
          <span className={cx("mobile__nav-icon")}>{item.icon}</span>
        )}
        <Typography
          variant={isCTA ? "button" : "h3"}
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
      </>
    );

    if (isCTA) {
      return (
        <Button
          size="md"
          href={item.href}
          onClick={(e) =>
            handleLinkClick(e, item.href, item.onClick, isSection)
          }
          className={cx("mobile__action-button")}
        >
          {linkContent}
        </Button>
      );
    }

    return (
      <Link
        href={item.href}
        className={cx(isCTA ? "mobile__action-button" : "mobile__nav-link", {
          "mobile__nav-link--active": item.isActive && !isCTA,
        })}
        onClick={(e) => handleLinkClick(e, item.href, item.onClick, isSection)}
      >
        {linkContent}
      </Link>
    );
  };

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
                  {renderNavLink(item)}
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
                    {renderNavLink(item)}
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
                    {renderNavLink(item, true)}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Last Secondary Item at the bottom */}
        {lastSecondaryItem && (
          <div className={cx("mobile__footer")}>
            <div className={cx("mobile__footer-divider")} />
            <div className={cx("mobile__nav-item")}>
              {renderNavLink(lastSecondaryItem)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
