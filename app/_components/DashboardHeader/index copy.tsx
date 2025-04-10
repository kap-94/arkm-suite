// src/components/DashboardHeader/DashboardHeader.tsx
"use client";

import React, { forwardRef, useCallback } from "react";
import classNames from "classnames/bind";
import { FolderIcon, FileIcon, ListTodoIcon } from "lucide-react";
import { UserInfo } from "../UserInfo";
import { SearchBar } from "../SearchBar";
import { Hamburger } from "../Hamburger";
import { useDashboard } from "../../_context/DashboardContext";
import styles from "./DashboardHeader.module.scss";
import type {
  HeaderSection,
  SearchSection,
  UserMenuItem,
} from "@/app/_types/dictionary/dashboardLayout.types";
import { getIconComponent } from "@/app/_utils/iconUtils";
import { UserProfile } from "../../[lang]/dashboard/account/profile/ProfileClient";

const cx = classNames.bind(styles);

interface Theme {
  type: "light" | "dark" | "custom";
  customValues?: {
    background?: string;
    border?: string;
    glow?: string;
    icon?: string;
  };
}

interface DashboardHeaderProps {
  className?: string;
  theme?: Theme;
  config: HeaderSection;
  onSignOut?: () => void;
  user: UserProfile;
}

const CATEGORY_ICONS = {
  project: <FolderIcon size={16} />,
  task: <ListTodoIcon size={16} />,
  file: <FileIcon size={16} />,
};

const transformSearchOptions = (search: SearchSection) => {
  const options = [];
  const categoryEntries = Object.entries(search.categories);

  for (const [categoryKey, category] of categoryEntries) {
    const option = {
      id: categoryKey,
      label: category.label,
      value: categoryKey,
      type: categoryKey,
      icon: CATEGORY_ICONS[categoryKey as keyof typeof CATEGORY_ICONS],
      subtitle: category.label,
      priority: category.priority,
    };

    options.push(option);
  }

  return options.slice(0, search.results.maxItems);
};

const transformUserMenuOptions = (options: UserMenuItem[]) => {
  return options.map((option) => {
    if (!option.icon) return option;

    const IconComponent = getIconComponent(option.icon);
    return {
      ...option,
      icon: IconComponent,
    };
  });
};

export const DashboardHeader = forwardRef<HTMLDivElement, DashboardHeaderProps>(
  ({ className, theme = { type: "light" }, config, user, onSignOut }, ref) => {
    const { state, toggleSidebar } = useDashboard();
    const searchOptions = transformSearchOptions(config.search);
    const userMenuOptions = transformUserMenuOptions(config.user.menu.options);

    const handleSearch = useCallback(
      (searchTerm: string) => {
        if (searchTerm.length >= config.search.config.minSearchLength) {
          console.log("Searching for:", searchTerm);
        }
      },
      [config.search.config.minSearchLength]
    );

    const handleOptionSelect = useCallback((option: any) => {
      console.log("Selected option:", option);
      if (option.href) {
        window.location.href = option.href;
      }
    }, []);

    return (
      <header
        ref={ref}
        className={cx(
          "dashboard-header",
          `dashboard-header--theme-${theme.type}`,
          className
        )}
        style={
          theme.customValues
            ? ({
                "--custom-background": theme.customValues.background,
                "--custom-border": theme.customValues.border,
                "--custom-glow": theme.customValues.glow,
                "--custom-icon": theme.customValues.icon,
              } as React.CSSProperties)
            : undefined
        }
      >
        <div className={cx("dashboard-header__container")}>
          <div className={cx("dashboard-header__left")}>
            <div className={cx("dashboard-header__mobile-menu")}>
              <Hamburger
                variant="morph"
                onClick={toggleSidebar}
                isOpen={state.isSidebarExpanded}
                className={cx("header__menu-trigger")}
                theme={theme}
              />
            </div>

            <SearchBar
              buttonText={config.search.config.buttonText}
              closeOnScroll
              label={config.search.config.label}
              onOptionSelect={handleOptionSelect}
              onSearch={handleSearch}
              options={searchOptions}
              placeholder={config.search.config.placeholder}
              showButton={true}
              showLabel={false}
              theme={theme}
            />
          </div>

          <div className={cx("dashboard-header__actions")}>
            <UserInfo
              closeOnScroll
              userName={user.fullName}
              userRole={
                config.user.roles.types[config.user.roles.productOwner].label
              }
              options={userMenuOptions}
              theme={theme}
            />
          </div>
        </div>
      </header>
    );
  }
);

DashboardHeader.displayName = "DashboardHeader";

export default DashboardHeader;
