"use client";

import React, { useRef } from "react";
import classNames from "classnames/bind";
import { Typography } from "@/app/_components/Typography";
import type {
  TypographyVariant,
  TypographyColor,
  ThemeType,
  TypographyAlign,
  TypographyFontFamily,
  TypographyWeight,
} from "@/app/_components/Typography/types";
import styles from "./SectionHeading.module.scss";

const cx = classNames.bind(styles);

// Variantes disponibles para el SectionHeading
export type SectionHeadingVariant = "default" | "bulb";

// Configuración para la variante bulb
export interface BulbIconConfig {
  wordIndex?: number; // Índice de la palabra que contiene la 'i' (empezando en 0)
  letterIndex?: number; // Por defecto usa la última 'i' de la palabra
}

// Definir los posibles valores de alineación
export type SectionHeadingAlignment = "left" | "center" | "right";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  variant?: SectionHeadingVariant;
  align?: SectionHeadingAlignment; // Nueva prop para alineación
  titleProps?: {
    variant?: TypographyVariant;
    color?: TypographyColor;
    theme?: ThemeType;
    fontWeight?: TypographyWeight;
    fontFamily?: TypographyFontFamily;
    align?: TypographyAlign;
    className?: string;
  };
  subtitleProps?: {
    variant?: TypographyVariant;
    color?: TypographyColor;
    theme?: ThemeType;
    fontWeight?: TypographyWeight;
    fontFamily?: TypographyFontFamily;
    align?: TypographyAlign;
    className?: string;
  };
  className?: string;
  bulbConfig?: BulbIconConfig;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  variant = "default",
  align = "left", // Valor por defecto
  titleProps = {},
  subtitleProps = {},
  className = "",
  bulbConfig = {},
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Valores predeterminados para title y subtitle
  const defaultTitleProps = {
    variant: "h2" as TypographyVariant,
    color: "primary" as TypographyColor,
    theme: "dark" as ThemeType,
    fontWeight: 500 as TypographyWeight,
    fontFamily: "sofia" as TypographyFontFamily,
    align: align as TypographyAlign, // Usa la alineación del componente
    className: "",
  };

  const defaultSubtitleProps = {
    variant: "h5" as TypographyVariant,
    color: "tertiary" as TypographyColor,
    theme: "dark" as ThemeType,
    fontWeight: 500 as TypographyWeight,
    fontFamily: "sofia" as TypographyFontFamily,
    align: align as TypographyAlign, // Usa la alineación del componente
    className: "",
  };

  // Combinar props predeterminados con los proporcionados
  const mergedTitleProps = { ...defaultTitleProps, ...titleProps };
  const mergedSubtitleProps = { ...defaultSubtitleProps, ...subtitleProps };

  // Procesamiento del título cuando se usa la variante bulb
  const renderTitleWithBulb = () => {
    if (variant !== "bulb") {
      return title;
    }

    const words = title.split(" ");
    const wordIndex = bulbConfig.wordIndex ?? words.length - 1; // Por defecto, última palabra

    if (wordIndex >= words.length || wordIndex < 0) {
      console.warn(
        "SectionHeading: wordIndex fuera de rango, usando la última palabra."
      );
      return title;
    }

    const targetWord = words[wordIndex];
    let letterIndex = bulbConfig.letterIndex;

    // Si no se especifica letterIndex, buscar la última 'i' en la palabra
    if (letterIndex === undefined) {
      letterIndex = targetWord.lastIndexOf("i");
    }

    if (letterIndex === -1 || letterIndex >= targetWord.length) {
      console.warn(
        "SectionHeading: La palabra seleccionada no tiene una letra 'i' o letterIndex fuera de rango."
      );
      return title;
    }

    // Crear las tres partes del título: antes del bulb, bulb, después del bulb
    const beforeBulb =
      words.slice(0, wordIndex).join(" ") + (wordIndex > 0 ? " " : "");
    const beforeI = targetWord.substring(0, letterIndex);
    const afterI = targetWord.substring(letterIndex + 1);
    const afterBulb =
      wordIndex < words.length - 1
        ? " " + words.slice(wordIndex + 1).join(" ")
        : "";

    return (
      <>
        {beforeBulb}
        {beforeI}
        <span className={cx("letter-i-container")}>
          <span className={cx("letter-i-placeholder")}>i</span>
          <span className={cx("bulb-and-pole-wrapper")}>
            {/* Poste de luz moderno SVG */}
            <span className={cx("pole-wrapper")}>
              <svg
                width="4"
                height="26"
                viewBox="0 0 4 26"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMin meet"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="20"
                  fill="currentColor"
                  rx="1"
                />
                <rect
                  x="-2"
                  y="20"
                  width="8"
                  height="2"
                  fill="currentColor"
                  rx="1"
                />
                <rect
                  x="0"
                  y="22"
                  width="4"
                  height="4"
                  fill="currentColor"
                  rx="1"
                />
              </svg>
            </span>
            {/* Bulb SVG */}
            <span className={cx("bulb-wrapper")}>
              <svg
                version="1.1"
                width="24"
                height="24"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="
                  M100,45
                  C75,45 55,65 55,90
                  C55,110 70,125 80,135
                  L80,145
                  C80,150 85,155 90,155
                  L110,155
                  C115,155 120,150 120,145
                  L120,135
                  C130,125 145,110 145,90
                  C145,65 125,45 100,45
                  Z
                "
                />
                <path
                  d="
                  M85,95
                  Q90,100 95,95
                  Q100,90 105,95
                  Q110,100 115,95
                "
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </span>
        {afterI}
        {afterBulb}
      </>
    );
  };

  return (
    <div
      ref={headerRef}
      className={cx("section-heading", `section-heading--${align}`, className)}
    >
      <Typography
        variant={mergedTitleProps.variant}
        color={mergedTitleProps.color}
        theme={mergedTitleProps.theme}
        fontWeight={mergedTitleProps.fontWeight}
        fontFamily={mergedTitleProps.fontFamily}
        align={mergedTitleProps.align}
        className={cx("section-heading__title", mergedTitleProps.className)}
      >
        {variant === "bulb" ? renderTitleWithBulb() : title}
      </Typography>

      {subtitle && (
        <Typography
          variant={mergedSubtitleProps.variant}
          color={mergedSubtitleProps.color}
          theme={mergedSubtitleProps.theme}
          fontWeight={mergedSubtitleProps.fontWeight}
          fontFamily={mergedSubtitleProps.fontFamily}
          align={mergedSubtitleProps.align}
          className={cx(
            "section-heading__subtitle",
            mergedSubtitleProps.className
          )}
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default SectionHeading;
