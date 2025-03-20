"use client";

import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Typography } from "../Typography";
import styles from "./SolutionCardExpandable.module.scss";

const cx = classNames.bind(styles);

interface FeatureDetail {
  title: string;
  description: string;
}

export interface SolutionCardProps {
  id: string;
  title: string;
  description: string;
  solutionNumber: number; // Nuevo prop para el número de solución
  features: FeatureDetail[];
  className?: string;
}

const ExpandableFeature = ({
  feature,
  isExpanded,
  featureIndex,
  handleToggle,
}: {
  feature: FeatureDetail;
  isExpanded: boolean;
  featureIndex: number;
  handleToggle: (index: number) => void;
}) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  // Medir la altura real del contenido cuando cambia
  useEffect(() => {
    if (descriptionRef.current) {
      const actualHeight = descriptionRef.current.scrollHeight;
      setHeight(actualHeight);
    }
  }, [feature.description, isExpanded]);

  return (
    <div className={cx("solution-card__feature-container")}>
      <div
        className={cx("solution-card__feature", {
          "solution-card__feature--expanded": isExpanded,
        })}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle(featureIndex);
        }}
      >
        <div className={cx("solution-card__feature-icon-wrapper")}>
          {isExpanded ? (
            <ChevronDown
              size={16}
              className={cx("solution-card__feature-icon")}
            />
          ) : (
            <ChevronRight
              size={16}
              className={cx("solution-card__feature-icon")}
            />
          )}
        </div>
        <Typography
          variant="p1"
          color="primary"
          theme="dark"
          fontFamily="sofia"
          fontWeight={400}
        >
          {feature.title}
        </Typography>
      </div>

      <div
        className={cx("solution-card__feature-description", {
          "solution-card__feature-description--expanded": isExpanded,
        })}
        style={{ height: isExpanded ? `${height}px` : "0px" }}
      >
        <div
          ref={descriptionRef}
          className={cx("solution-card__feature-description-content")}
        >
          <Typography
            variant="p2"
            color="secondary"
            theme="dark"
            fontFamily="sofia"
            fontWeight={400}
          >
            {feature.description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const SolutionCard = ({
  title,
  description,
  solutionNumber, // Usamos el número de solución en lugar del icono
  features,
  className,
}: SolutionCardProps) => {
  // Keep track of which feature is expanded (-1 means none)
  const [expandedFeatureIndex, setExpandedFeatureIndex] = useState<number>(-1);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Handle toggle logic to ensure only one can be expanded at a time
  const handleToggle = (index: number) => {
    if (expandedFeatureIndex === index) {
      // If clicking the already expanded feature, close it
      setExpandedFeatureIndex(-1);
    } else {
      // If clicking a different feature, expand it (and close the previous one)
      setExpandedFeatureIndex(index);
    }
  };

  // Handle click outside to close expanded feature
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if we have an expanded feature and if the click was outside the features container
      if (
        expandedFeatureIndex !== -1 &&
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node)
      ) {
        setExpandedFeatureIndex(-1);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedFeatureIndex]);

  return (
    <div className={cx("solution-card", className)}>
      <div className={cx("solution-card__content")}>
        <div className={cx("solution-card__title-container")}>
          <div className={cx("solution-card__number-container")}>
            <span className={cx("solution-card__number")}>
              {solutionNumber}
            </span>
          </div>
          <Typography
            variant="h3"
            className={cx("solution-card__title")}
            fontWeight={500}
            fontFamily="sofia"
            theme="dark"
            data-text={title}
          >
            {title}
          </Typography>
        </div>

        <Typography
          variant="p1"
          className={cx("solution-card__description")}
          color="primary"
          fontFamily="sofia"
          fontWeight={400}
          theme="dark"
        >
          {description}
        </Typography>

        <div ref={featuresRef} className={cx("solution-card__features")}>
          {features.map((feature, index) => (
            <ExpandableFeature
              key={index}
              feature={feature}
              isExpanded={expandedFeatureIndex === index}
              featureIndex={index}
              handleToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;
