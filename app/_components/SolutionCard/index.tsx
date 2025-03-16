"use client";

import React from "react";
import classNames from "classnames/bind";
import { Typography } from "../Typography";
import {
  Code,
  PenTool,
  Settings,
  Activity,
  BarChart2,
  Megaphone,
  Star,
} from "lucide-react";
import styles from "./SolutionCard.module.scss";

const cx = classNames.bind(styles);

interface FeatureDetail {
  title: string;
  description: string;
}

export interface SolutionCardProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  features: FeatureDetail[];
  className?: string;
  featureOffset?: number; // Nuevo prop para el offset global
}

// Función que retorna un icono único a partir de un índice global
const getUniqueIconForFeature = (globalIndex: number) => {
  const icons = [
    <PenTool size={16} />,
    <Code size={16} />,
    <Settings size={16} />,
    <Activity size={16} />,
    <BarChart2 size={16} />,
    <Megaphone size={16} />,
    <Star size={16} />,
  ];
  return icons[globalIndex] || <Star size={16} />;
};

interface FeatureProps {
  feature: FeatureDetail;
  globalIndex: number;
}

const Feature = ({ feature, globalIndex }: FeatureProps) => {
  return (
    <div className={cx("solution-card__feature-container")}>
      <div className={cx("solution-card__feature")}>
        <div className={cx("solution-card__feature-icon")}>
          {getUniqueIconForFeature(globalIndex)}
        </div>
        <Typography
          variant="p2"
          color="secondary"
          theme="dark"
          fontFamily="sofia"
          fontWeight={400}
        >
          {feature.title}
        </Typography>
      </div>
      <div className={cx("solution-card__feature-description")}>
        <Typography
          variant="p2"
          color="tertiary"
          theme="dark"
          fontFamily="sofia"
          fontWeight={300}
        >
          {feature.description}
        </Typography>
      </div>
    </div>
  );
};

export const SolutionCard = ({
  title,
  description,
  icon,
  features,
  className,
  featureOffset = 0,
}: SolutionCardProps) => {
  return (
    <div className={cx("solution-card", className)}>
      <div className={cx("solution-card__content")}>
        <Typography
          variant="h3"
          className={cx("solution-card__title")}
          fontWeight={300}
          fontFamily="sofia"
          theme="dark"
        >
          {title}
        </Typography>

        <Typography
          variant="p1"
          className={cx("solution-card__description")}
          color="secondary"
          fontFamily="sofia"
          fontWeight={300}
          theme="dark"
        >
          {description}
        </Typography>

        <div className={cx("solution-card__features")}>
          {features.map((feature, index) => (
            <Feature
              key={index}
              feature={feature}
              globalIndex={featureOffset + index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;
