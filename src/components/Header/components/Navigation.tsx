"use client";

import Link from "next/link";
import classNames from "classnames/bind";
import { useHeaderContext } from "../context";
import { AnimatedText } from "./AnimatedText";
import { NavigationProps } from "../types/header.types";
import { Button } from "@/components/Button";
import LanguageSelector from "@/components/LanguageSelector";
import styles from "../styles/Navigation.module.scss";

const cx = classNames.bind(styles);

export const Navigation: React.FC<NavigationProps> = ({ items, actions }) => {
  const { onCursor, language, setLanguage } = useHeaderContext();

  if (!items?.length) return null;

  return (
    <nav
      className={cx("nav")}
      onMouseEnter={() => onCursor?.("hovered")}
      onMouseLeave={() => onCursor?.("")}
    >
      {/* <div className={cx("nav__links")}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={cx("nav__link")}>
            <AnimatedText text={item.text} />
            {item.icon && (
              <span className={cx("nav__link-icon")}>{item.icon}</span>
            )}
          </Link>
        ))}
      </div> */}
      <div className={cx("nav__actions")}>
        {actions?.map((action) => (
          <div key={action.href} className={cx("nav__action-wrapper")}>
            <Button
              variant={action.variant}
              href={action.href}
              icon={action.icon}
              className={cx("nav__action-button")}
            >
              {action.text}
            </Button>
          </div>
        ))}
      </div>
    </nav>
  );
};
