"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import classnames from "classnames/bind";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import useScrollActiveSection from "@/app/_hooks/useScrollActiveSection";
import { Typography } from "@/app/_components/Typography";
import { buildLocalizedPath } from "@/app/_utils/path";
import styles from "./MenuList.module.scss";

gsap.registerPlugin(ScrollToPlugin);

interface MenuItem {
  menu_item_id: number;
  menu_item_parent: number;
  title: string;
  url: string;
  target?: string;
  icon?: React.ReactElement;
  dropdownIcon?: React.ReactElement;
  showDropdownIcon?: boolean;
  isSectionLink?: boolean;
}

interface MenuListProps {
  data: MenuItem[];
  frontPageID: number | string;
  onClick?: () => void;
  useActiveStyle?: boolean;
  orientation?: "horizontal" | "vertical";
  gap?: number;
  showBorders?: boolean;
}

const cx = classnames.bind(styles);

export const MenuList: React.FC<MenuListProps> = ({
  data,
  frontPageID,
  onClick,
  useActiveStyle = true,
  orientation = "horizontal",
  gap = 24,
  showBorders = false,
}) => {
  if (!data || !Array.isArray(data)) return null;

  const router = useRouter();
  const pathname = usePathname();
  // const currentLocale = pathname.split('/')[1] || 'en';
  const currentLocale = "en";
  const isHomePage =
    pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const topMenuItems = data.filter((item) => item.menu_item_parent === 0);
  const submenuItems = data.filter((item) => item.menu_item_parent !== 0);

  const sectionIds = data
    .filter((item) => item.url?.startsWith("#"))
    .map((item) => item.url.replace("#", ""));

  const activeSectionId = useScrollActiveSection(sectionIds);

  const getLocalizedPath = (url: string) => {
    return buildLocalizedPath(url, currentLocale);
  };

  const handleScrollToSection = useCallback((hash: string) => {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: targetElement,
          offsetY: 100,
        },
        ease: "power2.inOut",
        onComplete: () => {
          // Actualizar URL sin recargar
          window.history.replaceState(null, "", hash);
        },
      });
    }
  }, []);

  const handleNavigation = useCallback(
    (url: string, menuItemId: number) => {
      if (url.startsWith("#")) {
        if (isHomePage) {
          // Si ya estamos en home, hacer scroll directamente
          handleScrollToSection(url);
          setActiveIndex(menuItemId);
        } else {
          // Si estamos en otra página, navegar a home con hash
          router.push(`/${currentLocale}${url}`);
          // El scroll se manejará después de la navegación
        }
      } else {
        // Para enlaces normales
        router.push(getLocalizedPath(url));
        setActiveIndex(menuItemId);
        window.scrollTo(0, 0);
      }
    },
    [currentLocale, handleScrollToSection, isHomePage, router]
  );

  // Efecto para manejar scroll después de navegar a home con hash
  useEffect(() => {
    if (isHomePage && typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const matchingItem = data.find((item) => item.url === hash);
      if (matchingItem) {
        setActiveIndex(matchingItem.menu_item_id);
        handleScrollToSection(hash);
      }
    }
  }, [isHomePage, data, handleScrollToSection]);

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    hasSubmenu: boolean,
    menuItemId: number
  ) => {
    if (isMobile && hasSubmenu) {
      e.preventDefault();
      setActiveIndex(activeIndex === menuItemId ? null : menuItemId);
      return;
    }

    if (hasSubmenu) {
      e.preventDefault();
      setActiveIndex(activeIndex === menuItemId ? null : menuItemId);
      return;
    }

    e.preventDefault();
    if (onClick) onClick();
    handleNavigation(href, menuItemId);
  };

  // Resto de efectos (resize, click outside, etc.)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1360);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (e: MouseEvent | TouchEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setActiveIndex(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isMobile]);

  // Actualizar ítem activo basado en sección visible
  useEffect(() => {
    if (activeSectionId) {
      const activeItem = data.find(
        (item) => item.url === `#${activeSectionId}`
      );
      setActiveIndex(activeItem?.menu_item_id || null);
    } else {
      // Resetear si no hay sección visible
      setActiveIndex(null);
    }
  }, [activeSectionId, data]);

  // Actualizar ítem activo basado en ruta actual
  useEffect(() => {
    const activeItem = data.find((item) => {
      if (!item.url || item.url.startsWith("#")) return false;
      const itemPath = buildLocalizedPath(item.url, currentLocale);
      return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
    });
    setActiveIndex(activeItem?.menu_item_id || null);
  }, [pathname, data, currentLocale]);

  // Actualizar indicador visual del ítem activo
  useEffect(() => {
    if (menuRef.current && useActiveStyle) {
      if (activeIndex !== null) {
        const activeItemIndex = topMenuItems.findIndex(
          (item) => item.menu_item_id === activeIndex
        );
        const activeItem = menuItemRefs.current[activeItemIndex];
        if (activeItem) {
          const { left, width } = activeItem.getBoundingClientRect();
          const menuRect = menuRef.current.getBoundingClientRect();

          gsap.to(menuRef.current, {
            duration: 0.2,
            "--indicator-left": `${left - menuRect.left}px`,
            "--indicator-width": `${width}px`,
            ease: "power2.out",
          });
          return;
        }
      }

      // Ocultar indicador si no hay ítem activo
      gsap.to(menuRef.current, {
        duration: 0.15,
        "--indicator-width": "0px",
        ease: "power2.in",
      });
    }
  }, [activeIndex, topMenuItems, useActiveStyle]);

  return (
    <ul
      ref={menuRef}
      className={cx("menu", { "menu--vertical": orientation === "vertical" })}
      style={{ "--menu-gap": `${gap}px` } as React.CSSProperties}
    >
      {topMenuItems.map((menuItem, index) => {
        const path = getLocalizedPath(menuItem.url);
        const hasSubmenu = submenuItems.some(
          (item) => item.menu_item_parent === menuItem.menu_item_id
        );
        const isActive = activeIndex === menuItem.menu_item_id;

        return (
          <li
            key={menuItem.menu_item_id}
            ref={(el) => {
              if (el) menuItemRefs.current[index] = el;
            }}
            className={cx("menu__item", {
              "menu__item--active": useActiveStyle && isActive,
              "menu__item--border":
                showBorders && index !== topMenuItems.length - 1,
            })}
          >
            <Link
              href={path}
              target={menuItem.target}
              className={cx("menu__link")}
              onClick={(e) =>
                handleMenuClick(
                  e,
                  menuItem.url,
                  hasSubmenu,
                  menuItem.menu_item_id
                )
              }
            >
              {menuItem.icon && (
                <span className={cx("menu__icon")}>{menuItem.icon}</span>
              )}
              <Typography
                variant="p1"
                theme="dark"
                fontFamily="sofia"
                fontWeight={500}
                className={cx("menu__link-text")}
              >
                {menuItem.title}
              </Typography>
              {hasSubmenu && menuItem.showDropdownIcon !== false && (
                <span className={cx("dropdown__icon")}>
                  {menuItem.dropdownIcon || "▼"}
                </span>
              )}
            </Link>

            {hasSubmenu && (
              <ul className={cx("submenu", { "submenu--open": isActive })}>
                {submenuItems
                  .filter(
                    (item) => item.menu_item_parent === menuItem.menu_item_id
                  )
                  .map((submenuItem) => (
                    <li
                      key={submenuItem.menu_item_id}
                      className={cx("submenu__item")}
                    >
                      <Link
                        href={getLocalizedPath(submenuItem.url)}
                        className={cx("submenu__link")}
                        onClick={() => {
                          if (onClick) onClick();
                          setActiveIndex(menuItem.menu_item_id);
                        }}
                        target={submenuItem.target}
                      >
                        {submenuItem.icon && (
                          <span className={cx("submenu__icon")}>
                            {submenuItem.icon}
                          </span>
                        )}
                        <Typography
                          variant="p3"
                          fontFamily="sofia"
                          theme="dark"
                          textTransform="uppercase"
                        >
                          {submenuItem.title}
                        </Typography>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuList;
