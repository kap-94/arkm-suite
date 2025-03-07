"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import classNames from "classnames/bind";
import { ArrowRight, Users2 } from "lucide-react";
import { VideoBackground } from "./VideoBackground";
import { AnimatedTextProps, NavMenuProps } from "../types/header.types";
import { useHeaderContext } from "../context";
import { useMediaQuery } from "../../../_hooks/useMediaQuery";
import { useLanguage } from "../../../_context/LanguageContext";
import { Button } from "../../Button";
import LanguageSelector, { Language } from "../../LanguageSelector";
import styles from "../styles/NavMenu.module.scss";

const cx = classNames.bind(styles);

const DEFAULT_VIDEO =
  "https://cdn.pixabay.com/video/2024/10/18/236893_large.mp4";

const menuVariants: Variants = {
  initial: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
    transition: { duration: 0.4 },
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const itemVariants: Variants = {
  initial: { y: 80, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    y: 80,
    opacity: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

export const NavMenu = ({
  isOpen,
  onClose,
  menuItems,
  onCursor,
}: NavMenuProps) => {
  const { language, setLanguage } = useLanguage();
  const { breakpoint, dictionary } = useHeaderContext();
  const isMobile = useMediaQuery(`(max-width: ${breakpoint}px)`);
  const [activeItem, setActiveItem] = useState<string>("");

  const enrichedItems = useRef(
    menuItems.map((item) => ({
      ...item,
      videoSrc: DEFAULT_VIDEO,
    }))
  ).current;

  const handleItemHover = (href: string, isHovering: boolean) => {
    if (!isMobile) {
      setActiveItem(isHovering ? href : "");
      onCursor?.(isHovering ? "pointer" : "");
    }
  };

  const renderMobileActions = () => {
    if (!isMobile) return null;

    return (
      <motion.div
        className={cx("nav-menu__mobile-actions")}
        variants={itemVariants}
      >
        <Button
          variant="secondary"
          href={dictionary.clientPortal.href}
          icon={<Users2 size={16} />}
          className={cx("nav-menu__mobile-portal-button")}
        >
          {dictionary.clientPortal.label}
        </Button>

        <div className={cx("nav-menu__mobile-divider")} />

        <div className={cx("nav-menu__mobile-language")}>
          <LanguageSelector
            variant={"split-line"}
            currentLanguage={language}
            onLanguageChange={(newLang: Language) => {
              setLanguage(newLang);
            }}
          />
        </div>
      </motion.div>
    );
  };

  const renderVideos = () => {
    if (isMobile) return null;

    return (
      <div className={cx("nav-menu__video-wrapper")}>
        <motion.div
          className={cx("nav-menu__video-overlay")}
          initial={{ opacity: 1 }}
          animate={{ opacity: activeItem ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <div className={cx("nav-menu__videos")}>
          {enrichedItems.map((item) => (
            <VideoBackground
              key={item.href}
              src={item.videoSrc || ""}
              isActive={activeItem === item.href}
              className={cx("nav-menu__video-element")}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={cx("nav-menu", { "nav-menu--mobile": isMobile })}
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className={cx("nav-menu__container")}>
            <div className={cx("nav-menu__content")}>
              <motion.ul className={cx("nav-menu__list")}>
                {enrichedItems.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={itemVariants}
                    className={cx("nav-menu__item", {
                      "nav-menu__item--active": activeItem === item.href,
                    })}
                    onMouseEnter={() => handleItemHover(item.href, true)}
                    onMouseLeave={() => handleItemHover(item.href, false)}
                  >
                    <Link href={item.href} className={cx("nav-menu__link")}>
                      {!isMobile && (
                        <span className={cx("nav-menu__arrow")}>
                          <ArrowRight size={48} />
                        </span>
                      )}
                      <span className={cx("nav-menu__link-text")}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              {renderMobileActions()}
              {renderVideos()}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavMenu;
