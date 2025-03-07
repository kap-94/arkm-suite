// src/components/SolutionCard/SolutionCard.tsx
import React from "react";
import classNames from "classnames/bind";
import { Check } from "lucide-react";
import { Typography } from "../Typography";
import styles from "./SolutionCard.module.scss";

const cx = classNames.bind(styles);

export interface SolutionCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  className?: string;
}

export const SolutionCard = ({
  title,
  description,
  icon,
  features,
  className,
}: SolutionCardProps) => {
  return (
    <div className={cx("solution-card", className)}>
      {/* <div className={cx("solution-card__icon-wrapper")}>{icon}</div> */}

      <div className={cx("solution-card__content")}>
        <Typography
          variant="h3"
          className={cx("solution-card__title")}
          fontWeight={300}
          fontFamily="kranto"
          // fontWeight={400}
          // fontFamily="usual"
          theme="dark"
        >
          {title}
        </Typography>

        <Typography
          variant="p1"
          className={cx("solution-card__description")}
          color="secondary"
          fontFamily="usual"
          fontWeight={300}
          theme="dark"
        >
          {description}
        </Typography>

        {/* <div className={cx("solution-card__indicator")} /> */}

        <div className={cx("solution-card__features")}>
          {features.map((feature, index) => (
            <div key={index} className={cx("solution-card__feature")}>
              <Typography
                variant="p1"
                className={cx("solution-card__feature")}
                color="secondary"
                theme="dark"
                fontFamily="usual"
                fontWeight={300}
              >
                {feature}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;
