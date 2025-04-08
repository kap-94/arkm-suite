"use client";

import classNames from "classnames/bind";
import Typography from "../Typography";
import { FooterDictionary } from "@/app/_types/dictionary/mainLayout.types";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

interface FooterProps {
  dictionary?: Partial<FooterDictionary>;
  className?: string;
}

export const Footer = ({ dictionary, className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  // Set default values if dictionary is not provided
  const copyright = dictionary?.copyright
    ? dictionary.copyright.replace("{year}", currentYear.toString())
    : `© ${currentYear} All rights reserved.`;

  // Extract navigation items from dictionary if available
  const navigationItems = dictionary?.navigation
    ? Object.entries(dictionary.navigation).map(([key, item]) => ({
        href: item.href,
        text: item.label,
        aria: item.aria,
      }))
    : [];

  return (
    <footer className={cx("footer", className)}>
      <div className={cx("footer__container")}>
        <div className={cx("footer__navigation")}>
          {navigationItems.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={cx("footer__nav-link")}
              aria-label={link.aria}
            >
              <Typography
                variant="p2"
                theme="dark"
                fontFamily="sofia"
                color="secondary"
                fontWeight={500}
              >
                {link.text}
              </Typography>
            </a>
          ))}
        </div>

        <div className={cx("footer__copyright")}>
          <Typography
            variant="p3"
            theme="dark"
            color="tertiary"
            fontWeight={400}
          >
            {copyright}
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
