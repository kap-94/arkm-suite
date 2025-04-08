import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { Typography } from "@/app/_components/Typography";
import styles from "./JobDetailsCard.module.scss";
import { Fintech3D } from "../animations/Fintech3D";

interface JobDetailsCardProps {
  company: string;
  role: string;
  location: string; // Mantenido para compatibilidad
  description: string;
  technologies?: string[];
  period?: string; // Período de trabajo
  imageUrl?: string;
  svgComponent?: React.ReactNode;
}

const cx = classNames.bind(styles);

export default function JobDetailsCard({
  company,
  role,
  location,
  description,
  technologies,
  period,
  imageUrl,
  svgComponent,
}: JobDetailsCardProps) {
  return (
    <div className={cx("job-card")}>
      <div className={cx("job-card__content")}>
        <div className={cx("job-card__header")}>
          <Typography
            fontFamily="sofia"
            variant="h4"
            fontWeight={600}
            color="primary"
            theme="dark"
            className={cx("job-card__role")}
          >
            {role}
          </Typography>

          <div className={cx("job-card__details")}>
            <Typography
              fontFamily="sofia"
              variant="p2"
              fontWeight={600}
              color="secondary"
              theme="dark"
              className={cx("job-card__company")}
            >
              {company}
            </Typography>

            {/* Period instead of location */}
            {period && (
              <Typography
                fontFamily="sofia"
                variant="p2"
                fontWeight={500}
                theme="dark"
                color="tertiary"
                className={cx("job-card__period")}
              >
                {period}
              </Typography>
            )}

            {/* Hidden location for compatibility */}
            {location && (
              <Typography
                fontFamily="sofia"
                variant="p3"
                fontWeight={500}
                theme="dark"
                color="secondary"
                className={cx("job-card__location")}
              >
                {location}
              </Typography>
            )}
          </div>
        </div>

        <div className={cx("job-card__body")}>
          <Typography
            fontFamily="sofia"
            variant="p1"
            fontWeight={500}
            color="tertiary"
            theme="dark"
            className={cx("job-card__description")}
          >
            {description}
          </Typography>
        </div>

        {/* Technologies section removed as per your request */}
      </div>

      <div className={cx("job-card__image-wrapper")}>
        <div className={cx("job-card__image-container")}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={company}
              fill
              className={cx("job-card__image")}
              priority={true}
              style={{ objectFit: "contain" }}
            />
          ) : svgComponent ? (
            <div className={cx("job-card__svg-wrapper")}>{svgComponent}</div>
          ) : (
            <div className={cx("job-card__svg-wrapper")}>
              <Fintech3D />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
