"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import { useSettings } from "@/context/SettingsContext";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import styles from "./DocumentationPage.module.scss";
import { DocumentationPageProps } from "./types";
import DocumentationSection from "@/components/DocumentationSection";
import {
  Menu,
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  MessageSquare,
  Bell,
} from "lucide-react";

const cx = classNames.bind(styles);

const SECTION_ICONS: { [key: string]: React.ComponentType<any> } = {
  dashboard: LayoutDashboard,
  clients: Users,
  projects: FileText,
  messages: MessageSquare,
  notifications: Bell,
  settings: Settings,
};

export function DocumentationPage({ data }: DocumentationPageProps) {
  const { theme } = useSettings();
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = Object.entries(data.sections);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderNavLink = (id: string, section: any) => {
    const Icon = SECTION_ICONS[id] || FileText;

    return (
      <button
        key={id}
        onClick={() => {
          setActiveSection(id);
          setIsMobileMenuOpen(false);
        }}
        className={cx("documentation__nav-link", {
          "documentation__nav-link--active": activeSection === id,
        })}
      >
        <div className={cx("documentation__nav-link-content")}>
          <ThemedTypography
            variant="p1"
            color={activeSection === id ? "primary" : "secondary"}
          >
            {section.title}
          </ThemedTypography>
        </div>
      </button>
    );
  };

  return (
    <div className={cx("documentation", `documentation--theme-${theme}`)}>
      {/* Sidebar Container */}
      <div className={cx("documentation__sidebar-wrapper")}>
        {/* Sticky Sidebar */}
        <aside
          className={cx("documentation__sidebar", {
            "documentation__sidebar--open": isMobileMenuOpen,
          })}
        >
          <div className={cx("documentation__sidebar-header")}>
            <ThemedTypography variant="h4" color="secondary" fontWeight={500}>
              Client Suite Guide
            </ThemedTypography>
          </div>
          <nav className={cx("documentation__nav-links")}>
            {sections.map(([id, section]) => renderNavLink(id, section))}
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <main className={cx("documentation__main")}>
        {/* Mobile Header */}
        <div className={cx("documentation__mobile-header")}>
          <ThemedTypography variant="h4" fontWeight={500}>
            Client Suite Guide
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
