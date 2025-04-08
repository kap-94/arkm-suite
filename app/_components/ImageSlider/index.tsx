"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import styles from "./ImageSlider.module.scss";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/effect-fade";
import { useLanguage } from "@/app/_context/LanguageContext";

const cx = classNames.bind(styles);

// Definir tipos para los idiomas y temas soportados
type SupportedLanguage = "en" | "es";
type ThemeType = "dark" | "light";

// Imágenes organizadas por idioma y tema con tipado correcto
const images: Record<SupportedLanguage, Record<ThemeType, string[]>> = {
  en: {
    dark: [
      "/images/home/en-dark-dashboard.png",
      "/images/home/en-dark-timeline.png",
      "/images/home/en-dark-design-system.png",
    ],
    light: [
      "/images/home/en-white-dashboard.png",
      "/images/home/en-white-timeline.png",
      "/images/home/en-white-design-system.png",
    ],
  },
  es: {
    dark: [
      "/images/home/es-dark-dashboard.png",
      "/images/home/es-dark-timeline.png",
      "/images/home/es-dark-design-system.png",
    ],
    light: [
      "/images/home/es-white-dashboard.png",
      "/images/home/es-white-timeline.png",
      "/images/home/es-white-design-system.png",
    ],
  },
};

// Tipo para textos según el idioma
type TextContent = {
  altText: (index: number) => string;
  ariaLabel: string;
};

// Tipo para los textos en todos los idiomas soportados
type TextsByLanguage = Record<SupportedLanguage, TextContent>;

export const ImageSlider = () => {
  const sliderRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const neonGlowRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { language } = useLanguage();
  const [key, setKey] = useState(0); // Key para forzar el reinicio del Swiper

  // Determinar las imágenes correctas según idioma y tema
  const currentLanguage: SupportedLanguage =
    language === "en" || language === "es" ? language : "en";
  const currentTheme: ThemeType = isDarkTheme ? "dark" : "light";
  const currentImages = images[currentLanguage][currentTheme];

  // Textos según el idioma
  const texts: TextsByLanguage = {
    en: {
      altText: (index: number) =>
        `Client Suite view ${index + 1} - ${
          isDarkTheme ? "Dark" : "Light"
        } theme`,
      ariaLabel: isDarkTheme ? "Switch to light theme" : "Switch to dark theme",
    },
    es: {
      altText: (index: number) =>
        `Vista de Suite del Cliente ${index + 1} - Tema ${
          isDarkTheme ? "oscuro" : "claro"
        }`,
      ariaLabel: isDarkTheme ? "Cambiar a tema claro" : "Cambiar a tema oscuro",
    },
  };

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

  // Effect to handle language or theme change - reiniciando el slider
  useEffect(() => {
    if (containerRef.current && isLoaded) {
      // Aplicar clase para transición suave
      containerRef.current.classList.remove(cx("initial-animation"));
      containerRef.current.classList.add(cx("theme-change"));

      // Incrementar key para forzar el reinicio de Swiper
      setKey((prevKey) => prevKey + 1);

      // Resetear la animación a su estado inicial
      if (sliderRef.current && sliderRef.current.swiper) {
        sliderRef.current.swiper.slideTo(0, 0, false);
      }

      // Restaurar animación inicial después de la transición
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.remove(cx("theme-change"));
          containerRef.current.classList.add(cx("initial-animation"));
        }
      }, 500);
    }
  }, [language, isDarkTheme, isLoaded]);

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
        if (containerRef.current) {
          containerRef.current.classList.remove(cx("slide-change"));
          containerRef.current.classList.add(cx("initial-animation"));
        }
        setIsAnimating(false);
      }, 4000);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={cx("slider-wrapper")}>
      <div
        ref={containerRef}
        className={cx("slider-container", {
          loaded: isLoaded,
          "theme-dark": isDarkTheme,
          "theme-light": !isDarkTheme,
        })}
      >
        {/* Theme Toggle Button */}
        <button
          className={cx("theme-toggle")}
          onClick={toggleTheme}
          aria-label={texts[currentLanguage].ariaLabel}
        >
          <div className={cx("toggle-icon")}>
            {isDarkTheme ? (
              // Sol para indicar cambio a tema claro cuando estamos en tema oscuro
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 2V4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 20V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L2 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M22 12L20 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19.7778 4.22266L17.5558 6.25424"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4.22217 4.22266L6.44418 6.25424"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6.44434 17.5557L4.22211 19.7779"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M19.7778 19.7773L17.5558 17.5551"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // Luna para indicar cambio a tema oscuro cuando estamos en tema claro
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5 14.0784C20.3003 14.7189 18.9341 15.0821 17.4849 15.0821C12.9671 15.0821 9.30908 11.5396 9.30908 7.17105C9.30908 5.66356 9.7369 4.25916 10.4791 3.05469C6.70956 3.99363 4 7.54527 4 11.6715C4 16.6839 8.03757 20.6428 13.1048 20.6428C17.3471 20.6428 20.9913 17.9941 21.5 14.0784Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </button>

        {/* Key fuerza la recreación del componente cuando cambia el tema */}
        <Swiper
          key={key}
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
          {currentImages.map((src, index) => (
            <SwiperSlide
              key={`${currentLanguage}-${currentTheme}-${index}`}
              className={cx("slide")}
            >
              <div className={cx("image-wrapper")}>
                <Image
                  src={src}
                  alt={texts[currentLanguage].altText(index)}
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
    </div>
  );
};
