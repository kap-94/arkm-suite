"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import classNames from "classnames/bind";
import { useHeaderContext } from "../context";
import { AnimatedText } from "./AnimatedText";
import { Button } from "@/components/Button";
import { MobileMenuProps } from "../types/header.types";
import styles from "../styles/MobileMenu.module.scss";
import { LanguageToggle } from "@/app/[lang]/dashboard/settings/components/SettingsToggleGroup";

const cx = classNames.bind(styles);

export const MobileMenu: React.FC<MobileMenuProps> = ({
  items,
  actions,
  isOpen,
  onClose,
  position = "right",
  languageConfig,
}) => {
  // Asegurémonos de que languageConfig.currentLanguage nunca sea undefined
  const currentLanguage = languageConfig?.currentLanguage || "en";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cx("mobile", `mobile--${position}`)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className={cx("mobile__content")}>
            <button
              className={cx("mobile__close")}
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <nav className={cx("mobile__links")}>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx("mobile__link")}
                  onClick={onClose}
                >
                  <AnimatedText text={item.text} />
                  {item.icon && (
                    <span className={cx("mobile__link-icon")}>{item.icon}</span>
                  )}
                </Link>
              ))}
            </nav>
            {actions && actions.length > 0 && (
              <div className={cx("mobile__actions")}>
                {actions.map((action) => (
                  <div
                    key={action.href}
                    className={cx("mobile__action-wrapper")}
                  >
                    <Button
                      variant={action.variant}
                      href={action.href}
                      icon={action.icon}
                      className={cx("mobile__action-button")}
                      onClick={onClose}
                    >
                      {action.text}
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {languageConfig?.enabled && (
              <div className={cx("mobile__language")}>
                {/* <LanguageToggle
                  currentLanguage={currentLanguage}
                  onLanguageChange={(lang) => {
                    languageConfig.onLanguageChange?.(lang);
                    onClose();
                  }}
                  variant={languageConfig.variant}
                  size="md"
                  position={
                    languageConfig.position === "dropdown" ? "float" : "inline"
                  }
                  showLabels={languageConfig.showLabels}
                  enableHoverEffects={true}
                  accentColor={languageConfig.accentColor}
                  className={cx("mobile__language-selector")}
                /> */}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
