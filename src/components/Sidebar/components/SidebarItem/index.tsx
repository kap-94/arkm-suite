import { useCallback, useState, useRef, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LockIcon } from "lucide-react";
import { Typography } from "@/components/Typography";
import { Tooltip } from "@/components/Tooltip";
import {
  isPathActive,
  isDashboardRoot,
  buildLocalizedPath,
} from "@/utils/path";
import { useSettings } from "@/context/SettingsContext";
import { useDashboard } from "@/context/DashboardContext";
import { useNavigation } from "@/context/NavigationContext";
import styles from "./SidebarItem.module.scss";
import classNames from "classnames/bind";
import { NavItem, SidebarItemProps } from "../../types/sidebar.types";

const cx = classNames.bind(styles);

interface SubItemProps {
  item: NavItem;
  theme: "dark" | "light" | "custom";
  onSelect: () => void;
}

const SubItem = ({ item, theme, onSelect }: SubItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useSettings();
  const { setActiveItem } = useNavigation();

  const isActive = (() => {
    // Extraer segmento del proyecto del item path
    const itemProjectSegment = item.path.match(/\/project\/([^/?#]+)/)?.[1];
    // Extraer segmento del proyecto del pathname actual
    const currentProjectSegment = pathname.match(/\/project\/([^/?#]+)/)?.[1];

    if (itemProjectSegment && currentProjectSegment) {
      return itemProjectSegment === currentProjectSegment;
    }

    const localizedItemPath = buildLocalizedPath(item.path, language);
    return pathname.startsWith(localizedItemPath);
  })();

  const themeClass = theme === "dark" ? "theme-dark" : "theme-light";

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.disabled) return;

    onSelect();
    setActiveItem(item.id);
    router.push(buildLocalizedPath(item.path, language));
  };

  return (
    <Link
      href={item.disabled ? "#" : buildLocalizedPath(item.path, language)}
      onClick={handleClick}
      className={cx("subitem", themeClass, {
        "subitem--active": isActive,
        "subitem--disabled": item.disabled,
      })}
      aria-label={item.aria}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={item.disabled}
      role="menuitem"
    >
      <Typography
        variant="p2"
        theme={theme}
        className={cx("subitem__text", themeClass)}
        color={item.disabled ? "disabled" : isActive ? "primary" : undefined}
        noWrap
      >
        {item.title}
      </Typography>
      {item.disabled && (
        <LockIcon
          className={cx("subitem__lock", themeClass)}
          size={16}
          aria-hidden="true"
        />
      )}
    </Link>
  );
};

export const SidebarItem = ({ item, theme = "dark" }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const childrenRef = useRef<HTMLDivElement>(null);
  const [childrenHeight, setChildrenHeight] = useState<number | undefined>();
  const { language } = useSettings();
  const {
    state: dashboardState,
    collapseSidebar,
    expandSidebar,
  } = useDashboard();
  const {
    state: navState,
    setActiveItem,
    isItemOpen,
    toggleItem,
  } = useNavigation();

  const hasChildren = item.children && item.children.length > 0;
  const isOpen = hasChildren && isItemOpen(item.id);

  // Check if the current path matches this item's path or any of its children
  const isItemActive = pathname === buildLocalizedPath(item.path, language);
  const hasActiveChild =
    hasChildren &&
    item.children?.some((child) =>
      pathname.startsWith(buildLocalizedPath(child.path, language))
    );

  // Only show active state if either:
  // 1. This is a leaf item (no children) and its path matches exactly
  // 2. This item has children and one of them matches the current path
  const isActive =
    (!hasChildren && isItemActive) || (hasChildren && hasActiveChild);

  // Auto-expand and set active state when path matches
  useLayoutEffect(() => {
    if (isActive) {
      setActiveItem(item.id);
      if (hasChildren && hasActiveChild && !isOpen) {
        toggleItem(item.id);
      }
    }
  }, [
    pathname,
    item.id,
    isActive,
    hasChildren,
    hasActiveChild,
    isOpen,
    setActiveItem,
    toggleItem,
  ]);

  // Calculate children height for animations
  useLayoutEffect(() => {
    if (hasChildren && childrenRef.current) {
      const height = childrenRef.current.scrollHeight;
      setChildrenHeight(height);
    }
  }, [hasChildren, item.children]);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (item.disabled) return;

      if (hasChildren) {
        // Si el sidebar está colapsado
        if (!dashboardState.isSidebarExpanded) {
          expandSidebar();
          setTimeout(() => {
            // Si el submenu está cerrado, lo abrimos
            if (!isOpen) {
              toggleItem(item.id);
            }
          }, 150);
          return;
        }

        // Si el sidebar está expandido, toggle normal del submenu
        toggleItem(item.id);
        return;
      }

      setActiveItem(item.id);
      router.push(buildLocalizedPath(item.path, language));

      if (dashboardState.isSidebarExpanded || dashboardState.isMobileSidebar) {
        collapseSidebar();
      }
    },
    [
      item,
      hasChildren,
      isOpen,
      dashboardState.isSidebarExpanded,
      dashboardState.isMobileSidebar,
      expandSidebar,
      collapseSidebar,
      setActiveItem,
      toggleItem,
      router,
      language,
    ]
  );
  const handleSubItemSelect = useCallback(() => {
    if (dashboardState.isSidebarExpanded || dashboardState.isMobileSidebar) {
      collapseSidebar();
    }
  }, [
    dashboardState.isSidebarExpanded,
    dashboardState.isMobileSidebar,
    collapseSidebar,
  ]);

  const themeClass = theme === "dark" ? "theme-dark" : "theme-light";

  const renderLink = () => {
    const iconContent = (
      <span className={cx("item__icon", themeClass)} aria-hidden="true">
        {item.icon}
      </span>
    );

    const expandedContent = (
      <>
        {iconContent}
        <Typography
          variant="p2"
          theme={theme}
          className={cx("item__title", themeClass)}
          noWrap
        >
          {item.title}
        </Typography>
        {hasChildren && (
          <ChevronDown
            className={cx("item__chevron", themeClass, {
              "item__chevron--rotated": isOpen,
            })}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
        {item.disabled && (
          <LockIcon className={cx("item__lock")} size={16} aria-hidden="true" />
        )}
      </>
    );

    const linkClassNames = cx("item__button", themeClass, {
      "item__button--collapsed": !dashboardState.isSidebarExpanded,
      "item__button--expanded": dashboardState.isSidebarExpanded,
      "item__button--active": isActive,
      "item__button--disabled": item.disabled,
    });

    const linkContent = !dashboardState.isSidebarExpanded ? (
      <Tooltip
        className={cx("item__tooltip")}
        content={item.title}
        theme={{ type: theme }}
        spacing={-4}
        position="right"
      >
        <div className={linkClassNames} aria-label={item.aria}>
          {iconContent}
        </div>
      </Tooltip>
    ) : (
      <div className={linkClassNames} aria-label={item.aria}>
        {expandedContent}
      </div>
    );

    return (
      <Link
        href={item.disabled ? "#" : buildLocalizedPath(item.path, language)}
        onClick={handleClick}
        className={cx("item__link")}
        aria-label={item.aria}
        aria-disabled={item.disabled}
        aria-expanded={hasChildren ? isOpen : undefined}
        role="menuitem"
      >
        {linkContent}
      </Link>
    );
  };

  const renderChildren = () => {
    if (!hasChildren || !dashboardState.isSidebarExpanded) return null;

    return (
      <div
        ref={childrenRef}
        className={cx("item__children", {
          "item__children--open": isOpen,
        })}
        style={{
          height: isOpen ? `${childrenHeight}px` : "0px",
        }}
        role="menu"
        aria-label={`${item.title} submenu`}
        aria-hidden={!isOpen}
      >
        {item.children?.map((child) => (
          <div key={child.id} className={cx("item__child")} role="none">
            <SubItem
              item={child}
              theme={theme}
              onSelect={handleSubItemSelect}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <li className={cx("item", themeClass)}>
      <div className={cx("item-wrapper", "group")}>
        {renderLink()}
        {renderChildren()}
      </div>
    </li>
  );
};

export default SidebarItem;
