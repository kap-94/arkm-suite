"use client";

import React, { ReactNode, CSSProperties } from "react";
import classNames from "classnames/bind";
import styles from "./GlowBackground.module.scss";

interface GlowBackgroundProps {
  children: ReactNode;
  variant?: // Variantes requeridas
  | "flow"
    | "gradient"
    | "gradient-black" // Nueva variante que se desvanece a negro
    | "gradient-pulse"
    | "indigo-waves"
    | "mesh"
    // Variantes adicionales
    | "aurora"
    | "nebula"
    | "quantum"
    | "galaxy";
  style?: CSSProperties; // Añadimos la propiedad style
  className?: string; // También es útil añadir className para más flexibilidad
}

const cx = classNames.bind(styles);

export default function GlowBackground({
  children,
  variant = "flow",
  style,
  className,
}: GlowBackgroundProps) {
  return (
    <div
      className={cx(
        "glow-background",
        `glow-background--${variant}`,
        className
      )}
      style={style}
    >
      <div className={cx("glow-background__content")}>{children}</div>
    </div>
  );
}
