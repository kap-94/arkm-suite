"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import { useSettings } from "../../../_context/SettingsContext";
import { Menu } from "lucide-react";
import { ThemedTypography } from "../../Typography/ThemedTypography";
import DocumentationSection from "../../DocumentationSection";
import { DocumentationSidebar } from "./components/DocumentationSidebar";
import styles from "./DocumentationPage.module.scss";
import { DocumentationPageProps } from "./types";
import { useDashboard } from "../../../_context/DashboardContext";

const cx = classNames.bind(styles);

export function DocumentationPage({ data }: DocumentationPageProps) {
  const { theme } = useSettings();
  const { dimensions } = useDashboard();
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = Object.entries(data.sections);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSetActiveSection = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={cx("documentation", `documentation--theme-${theme}`)}>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className={cx("documentation__overlay")}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cx("documentation__sidebar-wrapper", {
          "documentation__sidebar-wrapper--open": isMobileMenuOpen,
        })}
        style={{ paddingTop: isMobileMenuOpen ? dimensions.headerHeight : "" }}
      >
        <DocumentationSidebar
          activeSection={activeSection}
          setActiveSection={handleSetActiveSection}
          theme={theme}
          data={data}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>

      {/* Main Content */}
      <main className={cx("documentation__main")}>
        {/* Mobile Header */}
        <div className={cx("documentation__mobile-header")}>
          <ThemedTypography variant="h4" fontWeight={500}>
            {data.title}
          </ThemedTypography>
          <button
            className={cx("documentation__menu-button")}
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Content */}
        <div className={cx("documentation__content")}>
          {sections.map(([id, section]) => (
            <div
              key={id}
              className={cx("documentation__section", {
                "documentation__section--active": activeSection === id,
              })}
            >
              <DocumentationSection
                section={section}
                commonLabels={data.commonLabels}
                theme={{ type: theme }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default DocumentationPage;
