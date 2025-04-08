"use client";

import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Typography } from "@/app/_components/Typography";
import { AboutMeData } from "@/app/_types/dictionary/home.types";
import styles from "./AboutMeSelector.module.scss";

interface AboutMeSelectorProps {
  isActive: boolean;
  aboutMe: AboutMeData;
  onClick: () => void;
}

const cx = classNames.bind(styles);

export default function AboutMeSelector({
  isActive,
  aboutMe,
  onClick,
}: AboutMeSelectorProps) {
  // Obtener el título principal y secundario
  const mainTitle = aboutMe.roles[0];
  const secondaryTitle = aboutMe.roles.length > 1 ? aboutMe.roles[1] : "";

  return (
    <div
      className={cx("selector", { "selector--active": isActive })}
      role="button"
      aria-pressed={isActive}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className={cx("selector__info", { "selector__info--active": isActive })}
      >
        <div className={cx("selector__content")}>
          <div className={cx("selector__image-container")}>
            {aboutMe.imageUrl && (
              <Image
                src={aboutMe.imageUrl}
                alt={aboutMe.title}
                width={64}
                height={64}
                className={cx("selector__profile-image")}
              />
            )}
          </div>
          <div className={cx("selector__text")}>
            <Typography
              variant="p1"
              fontWeight={600}
              fontFamily="sofia"
              color="secondary"
              theme="dark"
              className={cx("selector__title")}
            >
              {aboutMe.title}
            </Typography>

            {/* <Typography
            variant="p3"
            color="secondary"
            theme="dark"
            fontFamily="sofia"
            fontWeight={500}
              
              className={cx("selector__subtitle")}
            >
              {aboutMe.subtitle}
            </Typography> */}

            {/* <div className={cx("selector__roles")}>
              <Typography
                variant="p3"
                color="secondary"
                theme="dark"
                fontFamily="sofia"
                fontWeight={500}
                className={cx("selector__role")}
              >
                {mainTitle}
              </Typography>

              {secondaryTitle && (
                <Typography
                  variant="p3"
                  color="secondary"
                  theme="dark"
                  fontFamily="sofia"
                  fontWeight={500}
                  className={cx("selector__secondary-role")}
                >
                  {secondaryTitle}
                </Typography>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
