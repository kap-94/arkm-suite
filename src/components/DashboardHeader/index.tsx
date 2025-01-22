"use client";

import React, { useCallback } from "react";
import classNames from "classnames/bind";
import {
  FolderIcon,
  FileIcon,
  ListTodoIcon,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import type { SearchDictionary, UserInfoDictionary } from "@/types/dictionary";
import { UserInfo } from "../UserInfo";
import { SearchBar, SearchBarOption } from "../SearchBar";
import { useSidebarContext } from "../Sidebar/context/SidebarContext";
import { Hamburger } from "../Hamburger";
import { DropdownOption } from "../UserInfo/types";
import { Brand } from "../Header/components";
import styles from "./DashboardHeader.module.scss";

const cx = classNames.bind(styles);

export interface Theme {
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
  search: SearchDictionary;
  userInfo: UserInfoDictionary;
  onSignOut?: () => void;
}

// Mapa de iconos que corresponden a las claves de las opciones
const OPTION_ICONS: Record<string, React.ElementType> = {
  viewProfile: User,
  // settings: Settings,
  signOut: LogOut,
};

const getDropdownOptions = (
  dictionary: UserInfoDictionary,
  callbacks?: Record<string, () => void>
): DropdownOption[] => {
  return Object.entries(dictionary.options).reduce<DropdownOption[]>(
    (acc, [key, value]) => {
      // Si es un divisor
      if (value === "divider") {
        acc.push({
          id: `divider-${acc.length}`,
          divider: true,
        });
        return acc;
      }

      // Para las opciones regulares
      const option: DropdownOption = {
        id: key,
        label: value.label,
        ...(OPTION_ICONS[key] && {
          icon: React.createElement(OPTION_ICONS[key], { size: 16 }),
        }),
        ...(value.href && { href: value.href }),
        ...(callbacks?.[key] && { onClick: callbacks[key] }),
      };

      acc.push(option);
      return acc;
    },
    []
  );
};

const getSearchOptions = (
  translations: SearchDictionary
): SearchBarOption[] => [
  {
    id: "project-a",
    label: "Project Alpha",
    value: "project-alpha",
    type: "project",
    icon: <FolderIcon size={16} />,
    subtitle: translations.types.project,
  },
  {
    id: "project-b",
    label: "Project Beta",
    value: "project-beta",
    type: "project",
    icon: <FolderIcon size={16} />,
    subtitle: translations.types.project,
  },
  {
    id: "task-1",
    label: "Complete Documentation",
    value: "task-docs",
    type: "task",
    icon: <ListTodoIcon size={16} />,
    subtitle: translations.types.task,
  },
  {
    id: "file-1",
    label: "Technical Specs",
    value: "tech-specs",
    type: "file",
    icon: <FileIcon size={16} />,
    subtitle: translations.types.file,
  },
];

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  className,
  theme = { type: "light" },
  search,
  userInfo,
  onSignOut,
}) => {
  const { state, actions } = useSidebarContext();
  const searchOptions = getSearchOptions(search);

  const handleSearch = useCallback((searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  }, []);

  const handleOptionSelect = useCallback((option: SearchBarOption) => {
    console.log("Selected option:", option);
    if (option.href) {
      window.location.href = option.href;
    }
  }, []);

  const callbacks = React.useMemo(() => {
    const cb: Record<string, () => void> = {};

    if (onSignOut) {
      cb.signOut = onSignOut;
    }

    return cb;
  }, [onSignOut]);

  const dropdownOptions = getDropdownOptions(userInfo, callbacks);

  return (
    <header
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
              onClick={actions.toggle}
              isOpen={state.isExpanded}
              className={cx("header__menu-trigger")}
              theme={theme}
            />
          </div>

          <SearchBar
            buttonText={search.button}
            closeOnScroll
            label={search.label}
            onOptionSelect={handleOptionSelect}
            onSearch={handleSearch}
            options={searchOptions}
            placeholder={search.placeholder}
            showButton={true}
            showLabel={false}
            theme={theme}
          />
        </div>

        <div className={cx("dashboard-header__actions")}>
          <UserInfo
            closeOnScroll
            userName="Marc Vega"
            userRole={userInfo.roles.productOwner}
            options={dropdownOptions}
            theme={theme}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
