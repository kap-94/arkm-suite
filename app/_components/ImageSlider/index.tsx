"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import styles from "./ImageSlider.module.scss";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/effect-fade";

const cx = classNames.bind(styles);

// Array de imágenes para el slider
const images = [
  "/images/home/dashboard-preview-en.png",
  "/images/home/project-timeline-preview-en.png",
  "/images/home/design-system-preview-en.png",
];

export const ImageSlider = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const neonGlowRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Effect to start animation when component mounts
  useEffect(() => {
    if (containerRef.current) {
      const initialAnimationTimeout = setTimeout(() => {
        setIsLoaded(true);
        containerRef.current?.classList.add(cx("initial-animation"));
      }, 300);

      return () => {
        clearTimeout(initialAnimationTimeout);
        containerRef.current?.classList.remove(cx("initial-animation"));
        containerRef.current?.classList.remove(cx("slide-change"));
      };
    }
  }, []);

  const handleSlideChange = (swiper: any) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(swiper.realIndex);

    if (containerRef.current) {
      containerRef.current.classList.remove(cx("initial-animation"));
      containerRef.current.classList.remove(cx("slide-change"));
      void containerRef.current.offsetWidth; // Trigger reflow
      containerRef.current.classList.add(cx("slide-change"));

      // Reset to normal animation mode after transition
      setTimeout(() => {
        containerRef.current?.classList.remove(cx("slide-change"));
        containerRef.current?.classList.add(cx("initial-animation"));
        setIsAnimating(false);
      }, 4000);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cx("slider-container", { loaded: isLoaded })}
    >
      <Swiper
        ref={sliderRef}
        effect="fade"
        modules={[Autoplay, EffectFade]}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        className={cx("slider")}
        onSlideChange={handleSlideChange}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className={cx("slide")}>
            <div className={cx("image-wrapper")}>
              <Image
                src={src}
                alt={`Suite del Cliente vista ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                className={cx("image")}
                priority={index === 0}
                onLoad={index === 0 ? () => setIsLoaded(true) : undefined}
                quality={90}
              />
              <div className={cx("slide-overlay")} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={neonGlowRef} className={cx("neon-glow")} />
    </div>
  );
};
