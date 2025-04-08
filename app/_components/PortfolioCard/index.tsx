"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { ExternalLink, Github } from "lucide-react";
import { Typography } from "@/app/_components/Typography";
import styles from "./PortfolioCard.module.scss";

const cx = classNames.bind(styles);

export interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  projectNumber: number;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  className?: string;
  isRightAligned?: boolean; // New prop to determine alignment
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  projectNumber,
  technologies,
  liveUrl,
  githubUrl,
  className,
  isRightAligned = false, // Default to left alignment
}) => {
  // Check if we're in a mobile viewport
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsMobile(window.innerWidth <= 768);

    // Update on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile, we always want center alignment
  const alignRight = isRightAligned && !isMobile;

  return (
    <div
      className={cx(
        "portfolio-card",
        {
          "portfolio-card--right-aligned": alignRight,
        },
        className
      )}
    >
      <div className={cx("portfolio-card__content")}>
        <div className={cx("portfolio-card__title-container")}>
          <Typography
            variant="h3"
            className={cx("portfolio-card__title")}
            fontWeight={600}
            color="secondary"
            fontFamily="sofia"
            theme="dark"
            data-text={title}
          >
            {title}
          </Typography>
        </div>

        <Typography
          variant="p1"
          className={cx("portfolio-card__description")}
          color="tertiary"
          fontFamily="sofia"
          fontWeight={500}
          theme="dark"
        >
          {description}
        </Typography>

        <div className={cx("portfolio-card__technologies")}>
          {technologies.map((tech, index) => (
            <Typography
              fontFamily="sofia"
              theme="dark"
              variant="p2"
              color="secondary"
              fontWeight={600}
              key={index}
              className={cx("portfolio-card__technology")}
            >
              {tech}
            </Typography>
          ))}
        </div>

        <div className={cx("portfolio-card__links")}>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "portfolio-card__link",
                "portfolio-card__link--github"
              )}
              aria-label={`GitHub repository for ${title}`}
            >
              <Github size={20} strokeWidth={2} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "portfolio-card__link",
                "portfolio-card__link--live"
              )}
              aria-label={`Live demo for ${title}`}
            >
              <ExternalLink size={20} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
