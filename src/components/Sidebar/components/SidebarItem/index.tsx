import { useCallback, useState, useRef, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LockIcon } from "lucide-react";
import { NavItem, SidebarItemProps } from "../../types/sidebar.types";
import { useSidebarContext } from "../../context/SidebarContext";
import { Typography } from "@/components/Typography";
import { Tooltip } from "@/components/Tooltip";
import { isPathActive, isDashboardRoot } from "@/utils/path";
import { useSettings } from "@/context/SettingsContext";
import styles from "./SidebarItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface SubItemProps {
  item: NavItem;
  theme: "dark" | "light" | "custom";
  onSelect: () => void;
}

const SubItem = ({ item, theme, onSelect }: SubItemProps) => {
  const { state, actions } = useSidebarContext();
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useSettings();

  const isActive = isPathActive(pathname, item.path);
  const themeClass = theme === "dark" ? "theme-dark" : "theme-light";

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.disabled) return;

    onSelect();
    actions.setActiveItem(item.id);

    // Construir la ruta con el idioma actual
    const localizedPath = `/${language}${item.path}`;
    router.push(localizedPath);
  };

  // Construir la ruta con el idioma actual para el Link
  const localizedPath = `/${language}${item.path}`;

  return (
    <Link
      href={item.disabled ? "#" : localizedPath}
      onClick={handleClick}
      className={cx("subitem", themeClass, {
        "subitem--active": isActive,
        "subitem--disabled": item.disabled,
      })}
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
        <LockIcon className={cx("subitem__lock", themeClass)} size={16} />
      )}
    </Link>
  );
};

export const SidebarItem = ({ item, theme = "dark" }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [childrenHeight, setChildrenHeight] = useState<number | undefined>();
  const childrenRef = useRef<HTMLDivElement>(null);
  const { state, actions } = useSidebarContext();
  const { language } = useSettings();

  const hasChildren = item.children && item.children.length > 0;

  const isActive =
    isPathActive(pathname, item.path, isDashboardRoot(item.path)) ||
    (hasChildren &&
      item.children?.some((child) => isPathActive(pathname, child.path)));

  useLayoutEffect(() => {
    if (
      hasChildren &&
      !isOpen &&
      item.children?.some((child) => isPathActive(pathname, child.path))
    ) {
      setIsOpen(true);
    }
  }, [pathname, hasChildren, item.children, isOpen]);

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
        setIsOpen((prev) => !prev);
        return;
      }

      actions.collapse();
      actions.setActiveItem(item.id);

      // Construir la ruta con el idioma actual
      const localizedPath = `/${language}${item.path}`;
      router.push(localizedPath);
    },
    [item, hasChildren, actions, router, language]
  );

  // Construir la ruta con el idioma actual para el Link
  const localizedPath = `/${language}${item.path}`;

  const handleSubItemSelect = useCallback(() => {
    if (state.isMobile) {
      actions.collapse();
    }
  }, [state.isMobile, actions]);

  const themeClass = theme === "dark" ? "theme-dark" : "theme-light";

  const renderLink = () => {
    const iconContent = (
      <span className={cx("item__icon", themeClass)}>{item.icon}</span>
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
          />
        )}
        {item.disabled && <LockIcon className={cx("item__lock")} size={16} />}
      </>
    );

    const linkClassNames = cx("item__button", themeClass, {
      "item__button--collapsed": !state.isExpanded,
      "item__button--expanded": state.isExpanded,
      "item__button--active": isActive,
      "item__button--disabled": item.disabled,
    });

    const linkContent = !state.isExpanded ? (
      <Tooltip
        className={cx("item__tooltip")}
        content={item.title}
        theme={{ type: theme }}
        spacing={-4}
        position="right"
      >
        <div className={linkClassNames}>{iconContent}</div>
      </Tooltip>
    ) : (
      <div className={linkClassNames}>{expandedContent}</div>
    );

    return (
      <Link
        href={item.disabled ? "#" : localizedPath}
        onClick={handleClick}
        className={cx("item__link")}
      >
        {linkContent}
      </Link>
    );
  };

  const renderChildren = () => {
    if (!hasChildren || !state.isExpanded) return null;

    return (
      <div
        ref={childrenRef}
        className={cx("item__children", {
          "item__children--open": isOpen,
        })}
        style={{
          height: isOpen ? `${childrenHeight}px` : "0px",
        }}
      >
        {item.children?.map((child) => (
          <div key={child.id} className={cx("item__child")}>
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
