import { useCallback, useState, useRef, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LockIcon } from "lucide-react";
import { NavItem, SidebarItemProps } from "../../types/sidebar.types";
import { useSidebarContext } from "../../context/SidebarContext";
import { Typography } from "@/components/Typography";
import { isPathActive, isDashboardRoot } from "@/utils/path";
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

  const isActive = isPathActive(pathname, item.path);
  const themeClass = theme === "dark" ? "theme-dark" : "theme-light";

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.disabled) return;

    onSelect();
    actions.setActiveItem(item.id);
    router.push(item.path);
  };

  return (
    <Link
      href={item.disabled ? "#" : item.path}
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
      router.push(item.path);
    },
    [item, hasChildren, actions, router]
  );

  const handleSubItemSelect = useCallback(() => {
    if (state.isMobile) {
      actions.collapse();
    }
  }, [state.isMobile, actions]);

  const themeClass = theme === "dark" ? "theme-dark" : "theme-light";

  const renderLink = () => (
    <Link
      href={item.disabled ? "#" : item.path}
      onClick={handleClick}
      className={cx("item__button", themeClass, {
        "item__button--collapsed": !state.isExpanded,
        "item__button--expanded": state.isExpanded,
        "item__button--active": isActive,
        "item__button--disabled": item.disabled,
      })}
    >
      <span className={cx("item__icon", themeClass)}>{item.icon}</span>
      {state.isExpanded && (
        <>
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
      )}
    </Link>
  );

  const renderTooltip = () => {
    if (!item.disabled) return null;

    return (
      <div
        className={cx("tooltip", {
          "tooltip--collapsed": !state.isExpanded,
        })}
      >
        <Typography variant="p3" theme={theme} className={cx("tooltip__text")}>
          Esta es una versión demostrativa con funcionalidades limitadas. El
          acceso completo al sistema está restringido por derechos de propiedad
          del cliente.
        </Typography>
      </div>
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
        {renderTooltip()}
        {renderChildren()}
      </div>
    </li>
  );
};
