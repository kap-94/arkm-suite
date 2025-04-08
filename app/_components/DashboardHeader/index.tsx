"use client";

import React, {
  forwardRef,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import classNames from "classnames/bind";
import { FileIcon, ListTodoIcon, Layout, BookOpen } from "lucide-react";
import { UserInfo } from "../UserInfo";
import { SearchBar, SearchBarOption } from "../SearchBar";
import { Hamburger } from "../Hamburger";
import { useDashboard } from "../../_context/DashboardContext";
import styles from "./DashboardHeader.module.scss";
import type {
  HeaderSection,
  UserMenuItem,
} from "@/app/_types/dictionary/dashboardLayout.types";
import { getIconComponent } from "@/app/_utils/iconUtils";
import { SearchableEntity, searchService } from "../../_services/searchService";
import { UserProfile } from "../../[lang]/dashboard/account/profile/ProfileClient";
import { Language } from "@/app/_lib/config/i18n";
import Brand from "../BrandNoimage";

const cx = classNames.bind(styles);

interface DashboardHeaderTheme {
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
  theme?: DashboardHeaderTheme;
  config: HeaderSection;
  onSignOut?: () => void;
  user: UserProfile;
  lang: Language;
}

const CATEGORY_ICONS = {
  project: <Layout size={16} strokeWidth={1.9} />,
  task: <ListTodoIcon size={16} strokeWidth={1.9} />,
  file: <FileIcon size={16} strokeWidth={1.9} />,
  documentation: <BookOpen size={16} strokeWidth={1.9} />,
};

const DEBOUNCE_MS = 300; // Ajusta este valor según necesites

const transformSearchEntityToOption = (
  entity: SearchableEntity
): SearchBarOption => ({
  ...searchService.toSearchBarOption(entity),
  icon: CATEGORY_ICONS[entity.type as keyof typeof CATEGORY_ICONS],
});

const transformUserMenuOptions = (
  options: UserMenuItem[],
  handleSignOut: () => void
) => {
  return options.map((option) => {
    // Manejamos específicamente la opción de cierre de sesión
    if (option.id === "signout") {
      return {
        ...option,
        icon: option.icon ? getIconComponent(option.icon) : undefined,
        onClick: handleSignOut,
      };
    }

    // Para el resto de opciones, solo transformamos el ícono
    if (!option.icon) return option;

    const IconComponent = getIconComponent(option.icon);
    return {
      ...option,
      icon: IconComponent,
    };
  });
};

export const DashboardHeader = forwardRef<HTMLDivElement, DashboardHeaderProps>(
  (
    { className, theme = { type: "light" }, config, user, lang, onSignOut },
    ref
  ) => {
    const router = useRouter();
    const { state, toggleSidebar } = useDashboard();
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchBarOption[]>([]);
    const searchTimeoutRef = useRef<NodeJS.Timeout>();

    // Función para manejar el cierre de sesión
    const handleSignOut = useCallback(async () => {
      // Si se proporciona una función onSignOut personalizada, la usamos
      if (onSignOut) {
        onSignOut();
        return;
      }

      try {
        // De lo contrario, usamos la función signOut de next-auth
        await signOut({
          callbackUrl: `/${lang}/auth/signin`,
          redirect: true,
        });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }, [onSignOut, lang]);

    // Transformamos las opciones de menú agregando la función de signOut
    const userMenuOptions = transformUserMenuOptions(
      config.user.menu.options,
      handleSignOut
    );

    const performSearch = useCallback(
      async (searchTerm: string) => {
        if (searchTerm.length >= config.search.config.minSearchLength) {
          setIsSearching(true);
          try {
            const results = await searchService.search(searchTerm, lang);
            setSearchResults(results.map(transformSearchEntityToOption));
          } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
          } finally {
            setIsSearching(false);
          }
        } else {
          setSearchResults([]);
        }
      },
      [config.search.config.minSearchLength, lang]
    );

    const handleSearch = useCallback(
      (searchTerm: string) => {
        // Clear any existing timeout
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }

        // If empty search term, clear results immediately
        if (
          !searchTerm ||
          searchTerm.length < config.search.config.minSearchLength
        ) {
          setSearchResults([]);
          setIsSearching(false);
          return;
        }

        // Set loading state immediately
        setIsSearching(true);

        // Set new timeout for search
        searchTimeoutRef.current = setTimeout(() => {
          performSearch(searchTerm);
        }, DEBOUNCE_MS);
      },
      [config.search.config.minSearchLength, performSearch]
    );

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
      };
    }, []);

    const handleOptionSelect = useCallback(
      (option: SearchBarOption) => {
        if (option.href) {
          router.push(option.href);
        }
      },
      [router]
    );

    // Función handleSubmit que se pasa al SearchBar
    const handleSubmit = useCallback(
      (searchTerm: string) => {
        if (searchTerm.trim()) {
          // Redirigir a la página de resultados de búsqueda
          router.push(
            `/${lang}/dashboard/search?query=${encodeURIComponent(
              searchTerm.trim()
            )}`
          );
        }
      },
      [router, lang]
    );

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

            <Brand
              size="sm"
              variant="minimal"
              className={cx("dashboard-header__logo")}
            />

            {/* <SearchBar
              buttonText={config.search.config.buttonText}
              closeOnScroll
              label={config.search.config.label}
              onOptionSelect={handleOptionSelect}
              onSearch={handleSearch}
              onSubmit={handleSubmit} // Pasamos handleSubmit como prop
              options={searchResults}
              placeholder={config.search.config.placeholder}
              showButton={true}
              showLabel={false}
              theme={theme}
              loading={isSearching}
            /> */}
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
