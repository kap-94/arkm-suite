// src/components/SolutionCard/SolutionCard.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Typography } from "@/components/Typography";
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
  icon?: React.ReactNode;
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
  const [renderContent, setRenderContent] = useState(isExpanded);

  // Este efecto garantiza que el contenido se renderice antes de animarlo
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isExpanded) {
      setRenderContent(true);
    } else {
      // Esperar a que termine la animación de desvanecimiento antes de eliminar el contenido del DOM
      timeoutId = setTimeout(() => {
        setRenderContent(false);
      }, 300); // Sincronizar con la duración de la transición CSS
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isExpanded]);

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
          color="secondary"
          theme="dark"
          fontFamily="usual"
          fontWeight={300}
        >
          {feature.title}
        </Typography>
      </div>

      <div
        className={cx("solution-card__feature-description", {
          "solution-card__feature-description--expanded": isExpanded,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent && (
          <Typography
            variant="p2"
            color="tertiary"
            theme="dark"
            fontFamily="usual"
            fontWeight={300}
          >
            {feature.description}
          </Typography>
        )}
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
        <Typography
          variant="h3"
          className={cx("solution-card__title")}
          fontWeight={300}
          fontFamily="kranto"
          theme="dark"
          data-text={title}
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
