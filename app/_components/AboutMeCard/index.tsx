import React from "react";
import classNames from "classnames/bind";
import { Typography } from "@/app/_components/Typography";
import { AboutMeData } from "@/app/_types/dictionary/home.types";
import styles from "./AboutMeCard.module.scss";

interface AboutMeCardProps {
  aboutMe: AboutMeData;
}

const cx = classNames.bind(styles);

export default function AboutMeCard({ aboutMe }: AboutMeCardProps) {
  // Check if paragraphs exist, otherwise use description as a fallback
  const paragraphsToDisplay = aboutMe.paragraphs || [aboutMe.description];

  return (
    <div className={cx("about-card")}>
      <div className={cx("about-card__content")}>
        <div className={cx("about-card__header")}>
          <div className={cx("about-card__name-container")}>
            <Typography
              variant="h4"
              fontWeight={600}
              fontFamily="sofia"
              color="primary"
              theme="dark"
              className={cx("about-card__name")}
            >
              {aboutMe.careerTitle || "Acerca de mí"}
            </Typography>

            {aboutMe.roles && aboutMe.roles.length > 0 && (
              <Typography
                fontFamily="sofia"
                variant="p2"
                fontWeight={500}
                theme="dark"
                color="tertiary"
                className={cx("about-card__subtitle")}
              >
                {aboutMe.roles.join(" / ")}
              </Typography>
            )}
          </div>
        </div>

        <div className={cx("about-card__content-wrapper")}>
          <div className={cx("about-card__paragraphs")}>
            {paragraphsToDisplay.map((paragraph, index) => (
              <Typography
                fontFamily="sofia"
                key={index}
                variant="p1"
                fontWeight={500}
                color="tertiary"
                theme="dark"
                className={cx("about-card__paragraph")}
              >
                {paragraph}
              </Typography>
            ))}
          </div>

          {aboutMe.skills && aboutMe.skills.length > 0 && (
            <div className={cx("about-card__skills")}>
              <Typography
                fontFamily="sofia"
                variant="h5"
                fontWeight={600}
                color="primary"
                theme="dark"
                className={cx("about-card__skills-title")}
              >
                {aboutMe.skillsTitle || "Especialidades técnicas:"}
              </Typography>
              <div className={cx("about-card__skills-list")}>
                {aboutMe.skills.map((skill, index) => (
                  <Typography
                    fontFamily="sofia"
                    theme="dark"
                    variant="p1"
                    color="secondary"
                    fontWeight={600}
                    key={index}
                    className={cx("about-card__skill-tag")}
                  >
                    {skill}
                  </Typography>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
