import React from "react";
import classNames from "classnames/bind";
import { Circle } from "lucide-react";
import { ThemedTypography } from "../../../../Typography/ThemedTypography";
import { DocumentationData } from "../../types";
import styles from "./DocumentationSidebar.module.scss";

const cx = classNames.bind(styles);

interface NavItem {
  id: string;
  titleKey: keyof DocumentationData["sections"];
  children?: NavItem[];
}

interface DocumentationSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  theme: string;
  data: DocumentationData;
  isMobileMenuOpen: boolean;
  className?: string;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    titleKey: "dashboard",
  },
  {
    id: "projectDetails",
    titleKey: "projectDetails",
  },
  {
    id: "deliverables",
    titleKey: "deliverables",
    children: [
      {
        id: "designSystem",
        titleKey: "designSystem",
      },
    ],
  },
  {
    id: "settings",
    titleKey: "settings",
  },
];

export function DocumentationSidebar({
  activeSection,
  setActiveSection,
  theme,
  data,
  isMobileMenuOpen,
}: DocumentationSidebarProps) {
  const getTitle = (titleKey: keyof DocumentationData["sections"]) => {
    return data.sections[titleKey]?.title || titleKey;
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = Boolean(item.children?.length);
    const isActive = activeSection === item.id;

    return (
      <div key={item.id} className={cx("sidebar__nav-item")}>
        <button
          onClick={() => {
            setActiveSection(item.id);
          }}
          className={cx("sidebar__nav-button", {
            "sidebar__nav-button--active": isActive,
            [`sidebar__nav-button--level-${level}`]: level > 0,
          })}
        >
          <div className={cx("sidebar__nav-content")}>
            {level > 0 && (
              <Circle
                size={4}
                strokeWidth={4}
                className={cx("sidebar__nav-marker")}
              />
            )}
            <ThemedTypography
              variant="p1"
              color={isActive ? "primary" : "secondary"}
            >
              {getTitle(item.titleKey)}
            </ThemedTypography>
          </div>
        </button>
        {hasChildren && (
          <div className={cx("sidebar__nav-children")}>
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cx("sidebar", `sidebar--theme-${theme}`, {
        "sidebar--open": isMobileMenuOpen,
      })}
    >
      <div className={cx("sidebar__header")}>
        <ThemedTypography variant="h4" color="primary" fontWeight={400}>
          {data.title}
        </ThemedTypography>
      </div>
      <nav className={cx("sidebar__nav")}>
        {navItems.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}

export default DocumentationSidebar;
