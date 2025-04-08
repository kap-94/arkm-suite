"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./PortfolioImagesGrid.module.scss";

const cx = classNames.bind(styles);

export interface PortfolioImages {
  src: string;
  alt: string;
}

export type PortfolioVariant = "cascade" | "mosaic" | "panorama" | "horizontal";

interface PortfolioImagesGridProps {
  images: PortfolioImages[];
  className?: string;
  variant?: PortfolioVariant;
  overlay?: boolean;
  liveUrl?: string;
}

const PortfolioImagesGrid: React.FC<PortfolioImagesGridProps> = ({
  images,
  className,
  variant = "cascade",
  overlay = false,
  liveUrl = "#",
}) => {
  const [loaded, setLoaded] = useState<boolean[]>(
    Array(images.length).fill(false)
  );
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [forceVisible, setForceVisible] = useState(false);
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

  // Check viewport size for tablet or smaller view
  useEffect(() => {
    const checkViewport = () => {
      setIsTabletOrSmaller(window.innerWidth <= 830); // Using the ADAPTIVE_BREAKPOINT value
    };

    // Initial check
    checkViewport();

    // Add resize listener
    window.addEventListener("resize", checkViewport);

    // Cleanup
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Handle image load states
  const handleImageLoad = (index: number) => {
    const newLoaded = [...loaded];
    newLoaded[index] = true;
    setLoaded(newLoaded);
  };

  // Check if all images are loaded
  useEffect(() => {
    if (loaded.every((item) => item === true) && images.length > 0) {
      setIsAllLoaded(true);
    }

    // Force visibility after 3 seconds in case there are loading issues
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [loaded, images.length]);

  // Get only the first image for tablet or smaller view, otherwise take up to 3 images
  const displayImages = isTabletOrSmaller
    ? images.slice(0, 1)
    : images.slice(0, 3);

  // Determine the class suffix based on image count
  const countClass = `portfolio-images--count-${displayImages.length}`;

  return (
    <div
      className={cx(
        "portfolio-images",
        `portfolio-images--${variant}`,
        countClass,
        className,
        {
          "portfolio-images--loaded": isAllLoaded || forceVisible,
          "portfolio-images--with-overlay": overlay,
          "portfolio-images--tablet-or-smaller": isTabletOrSmaller,
        }
      )}
    >
      <div className={cx("portfolio-images__container")}>
        {/* Image 1 - Main (always show if available) */}
        {displayImages[0] && (
          <div className={cx("portfolio-images__main")}>
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "portfolio-images__image-wrapper",
                "portfolio-images__image-wrapper--main"
              )}
              aria-label={`View ${displayImages[0].alt} project`}
            >
              <Image
                src={displayImages[0].src}
                alt={displayImages[0].alt}
                fill
                sizes="(max-width: 830px) 100vw, 50vw"
                className={cx("portfolio-images__image")}
                onLoad={() => handleImageLoad(0)}
                quality={90}
              />
              <div className={cx("portfolio-images__overlay")} />
            </Link>
          </div>
        )}

        {/* Show secondary images only on desktop */}
        {!isTabletOrSmaller && (
          <>
            {/* Image 2 (only if available) */}
            {displayImages[1] && (
              <div
                className={cx(
                  "portfolio-images__secondary",
                  "portfolio-images__secondary--first"
                )}
              >
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "portfolio-images__image-wrapper",
                    "portfolio-images__image-wrapper--secondary"
                  )}
                  aria-label={`View ${displayImages[1].alt} project`}
                >
                  <Image
                    src={displayImages[1].src}
                    alt={displayImages[1].alt}
                    fill
                    sizes="30vw"
                    className={cx("portfolio-images__image")}
                    onLoad={() => handleImageLoad(1)}
                    quality={85}
                  />
                  <div className={cx("portfolio-images__overlay")} />
                </Link>
              </div>
            )}

            {/* Image 3 (only if available) */}
            {displayImages[2] && (
              <div
                className={cx(
                  "portfolio-images__secondary",
                  "portfolio-images__secondary--second"
                )}
              >
                <Link
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "portfolio-images__image-wrapper",
                    "portfolio-images__image-wrapper--secondary"
                  )}
                  aria-label={`View ${displayImages[2].alt} project`}
                >
                  <Image
                    src={displayImages[2].src}
                    alt={displayImages[2].alt}
                    fill
                    sizes="30vw"
                    className={cx("portfolio-images__image")}
                    onLoad={() => handleImageLoad(2)}
                    quality={85}
                  />
                  <div className={cx("portfolio-images__overlay")} />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioImagesGrid;
