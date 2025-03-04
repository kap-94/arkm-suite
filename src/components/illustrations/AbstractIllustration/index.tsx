import React from "react";
import classNames from "classnames/bind";
import styles from "./AbstractIllustration.module.scss";

const cx = classNames.bind(styles);

export type AbstractIllustrationVariant =
  | "abstractBlueTech"
  | "abstractOrangeFlow"
  | "abstractPrimaryZen"
  | "abstractPrimarySpark"
  | "abstractPrimaryDepth"
  | "abstractIndigoGlare"
  | "abstractWhiteMist"
  // Web design:
  | "webDesignLayout"
  | "webDesignPenNib"
  | "webDesignWireframe"
  | "webDesignVectors"
  // Web dev:
  | "webDevAngleBrackets"
  | "webDevCurlyBraces"
  | "webDevSlashes"
  | "webDevParentheses";

interface AbstractIllustrationProps {
  className?: string;
  variant?: AbstractIllustrationVariant;
}

export const AbstractIllustration: React.FC<AbstractIllustrationProps> = ({
  className,
  variant = "abstractBlueTech",
}) => {
  return (
    <div className={cx("abstract-illustration", className)}>
      <svg
        viewBox="0 0 500 532"
        className={cx("abstract-illustration__svg")}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/*
            ======================================================================
            GRADIENTES Y FILTROS CONSERVADOS (solo para las variantes que sigues usando)
            ======================================================================
          */}

          {/* 1) abstractBlueTech */}
          <linearGradient id="ab-blue-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#001a38" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#003165" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ab-blue-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5fc1ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#92ddff" stopOpacity="0.2" />
          </linearGradient>
          <filter
            id="ab-blue-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          {/* 2) abstractOrangeFlow */}
          <linearGradient id="ab-orange-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#402100" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#663100" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ab-orange-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9d48" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffcf9f" stopOpacity="0.2" />
          </linearGradient>
          <filter
            id="ab-orange-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          {/* 3) abstractPrimaryZen (antes abstractPrimaryOne) */}
          <linearGradient id="ab-primaryOne-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="ab-primaryOne-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9698fd" stopOpacity="0.3" />
          </linearGradient>
          <filter
            id="ab-primaryOne-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          {/* 4) abstractPrimarySpark (antes abstractPrimaryTwo) */}
          <linearGradient id="ab-primaryTwo-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ab-primaryTwo-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
          <filter
            id="ab-primaryTwo-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          {/* 5) abstractPrimaryDepth (antes abstractPrimaryDark) */}
          <linearGradient
            id="ab-primaryDark-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.3" />
          </linearGradient>
          <filter
            id="ab-primaryDark-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>

          {/* 6) abstractIndigoGlare (antes abstractIndigoLight) */}
          <radialGradient id="ab-indigoLight-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9698fd" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
          </radialGradient>
          <filter
            id="ab-indigoLight-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>

          {/* 7) abstractWhiteMist (antes abstractWhiteDark) */}
          <linearGradient
            id="ab-whiteDark-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e0e0e0" stopOpacity="0.3" />
          </linearGradient>
          <filter
            id="ab-whiteDark-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          {/*
            ========================================================================
            8) Web Design Gradients / Filters
            ========================================================================
          */}
          <linearGradient
            id="ab-webDesign-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
          </linearGradient>
          <filter
            id="ab-webDesign-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>

          {/*
            ========================================================================
            9) Web Dev Gradients / Filters
            ========================================================================
          */}
          <linearGradient id="ab-webDev-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
          <filter
            id="ab-webDev-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/*
          =============================================================================
          A) 7 VARIANTES ABSTRACTAS CONSERVADAS (renombradas)
          =============================================================================
        */}

        {/* 1) abstractBlueTech (antes abstractBlue) */}
        {variant === "abstractBlueTech" && (
          <>
            {/* Donut oscuro */}
            <circle
              cx="250"
              cy="180"
              r="60"
              fill="none"
              stroke="url(#ab-blue-dark)"
              strokeWidth="30"
            />
            {/* Círculo claro al costado */}
            <circle
              cx="400"
              cy="130"
              r="40"
              fill="url(#ab-blue-light)"
              filter="url(#ab-blue-blur)"
              opacity="0.8"
            />
            {/* Polígono oscuro */}
            <polygon
              points="370,300 400,340 340,340"
              fill="url(#ab-blue-dark)"
              opacity="0.7"
            />
          </>
        )}

        {/* 2) abstractOrangeFlow (antes abstractOrange) */}
        {variant === "abstractOrangeFlow" && (
          <>
            {/* Donut oscuro */}
            <circle
              cx="250"
              cy="150"
              r="60"
              fill="none"
              stroke="url(#ab-orange-dark)"
              strokeWidth="30"
            />
            {/* Círculo claro (blur) */}
            <circle
              cx="360"
              cy="100"
              r="35"
              fill="url(#ab-orange-light)"
              filter="url(#ab-orange-blur)"
              opacity="0.8"
            />
            {/* Pequeño rectángulo oscuro inclinado */}
            <rect
              x="200"
              y="300"
              width="60"
              height="30"
              fill="url(#ab-orange-dark)"
              transform="rotate(25 230 315)"
            />
          </>
        )}

        {/* 3) abstractPrimaryZen (antes abstractPrimaryOne) */}
        {variant === "abstractPrimaryZen" && (
          <>
            {/* Donut (mezcla primary y dark) */}
            <circle
              cx="250"
              cy="180"
              r="50"
              fill="none"
              stroke="url(#ab-primaryOne-dark)"
              strokeWidth="25"
            />
            {/* Círculo claro con gradient */}
            <circle
              cx="360"
              cy="120"
              r="40"
              fill="url(#ab-primaryOne-light)"
              filter="url(#ab-primaryOne-blur)"
            />
            {/* Pequeño polígono */}
            <polygon
              points="150,270 190,310 110,310"
              fill="url(#ab-primaryOne-dark)"
              opacity="0.6"
            />
          </>
        )}

        {/* 4) abstractPrimarySpark (antes abstractPrimaryTwo) */}
        {variant === "abstractPrimarySpark" && (
          <>
            {/* Donut */}
            <circle
              cx="250"
              cy="150"
              r="60"
              fill="none"
              stroke="url(#ab-primaryTwo-dark)"
              strokeWidth="30"
            />
            {/* Círculo claro */}
            <circle
              cx="120"
              cy="100"
              r="35"
              fill="url(#ab-primaryTwo-light)"
              filter="url(#ab-primaryTwo-blur)"
              opacity="0.8"
            />
            {/* Rectángulo oscuro inclinado */}
            <rect
              x="280"
              y="280"
              width="80"
              height="40"
              fill="url(#ab-primaryTwo-dark)"
              transform="rotate(-15 320 300)"
              opacity="0.7"
            />
          </>
        )}

        {/* 5) abstractPrimaryDepth (antes abstractPrimaryDark) */}
        {variant === "abstractPrimaryDepth" && (
          <>
            {/* Circulo grande con gradient */}
            <circle
              cx="250"
              cy="200"
              r="70"
              fill="url(#ab-primaryDark-gradient)"
              filter="url(#ab-primaryDark-blur)"
            />
            {/* Barra horizontal oscura */}
            <rect
              x="200"
              y="300"
              width="100"
              height="30"
              fill="url(#ab-primaryDark-gradient)"
              rx="6"
              ry="6"
              opacity="0.7"
            />
            {/* Círculo pequeño */}
            <circle
              cx="130"
              cy="150"
              r="25"
              fill="url(#ab-primaryDark-gradient)"
              opacity="0.5"
            />
          </>
        )}

        {/* 6) abstractIndigoGlare (antes abstractIndigoLight) */}
        {variant === "abstractIndigoGlare" && (
          <>
            {/* Radial swirl */}
            <circle
              cx="250"
              cy="150"
              r="60"
              fill="url(#ab-indigoLight-radial)"
              filter="url(#ab-indigoLight-blur)"
            />
            {/* Polígono invertido */}
            <polygon
              points="300,270 340,230 260,230"
              fill="url(#ab-indigoLight-radial)"
              opacity="0.6"
            />
            {/* Pequeño rectángulo */}
            <rect
              x="200"
              y="320"
              width="50"
              height="30"
              fill="url(#ab-indigoLight-radial)"
              opacity="0.4"
            />
          </>
        )}

        {/* 7) abstractWhiteMist (antes abstractWhiteDark) */}
        {variant === "abstractWhiteMist" && (
          <>
            {/* Donut claro */}
            <circle
              cx="250"
              cy="150"
              r="50"
              fill="none"
              stroke="url(#ab-whiteDark-gradient)"
              strokeWidth="25"
              filter="url(#ab-whiteDark-blur)"
            />
            {/* Polígono con gradient */}
            <polygon
              points="320,280 370,330 270,330"
              fill="url(#ab-whiteDark-gradient)"
              opacity="0.6"
            />
            {/* Círculo pequeño */}
            <circle
              cx="150"
              cy="300"
              r="20"
              fill="url(#ab-whiteDark-gradient)"
              opacity="0.4"
            />
          </>
        )}

        {/*
          =============================================================================
          B) 4 VARIANTES "WEB DESIGN" (renombradas, quitando la 5)
          =============================================================================
        */}

        {/* webDesignLayout (antes abstractWebDesign1) */}
        {variant === "webDesignLayout" && (
          <>
            {/* Donut con "webDesign" gradient */}
            <circle
              cx="250"
              cy="150"
              r="60"
              fill="none"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="30"
              filter="url(#ab-webDesign-blur)"
            />
            {/* Lápiz / pincel abstracto */}
            <path
              d="M120 300 L140 320 L180 280 L160 260 Z"
              fill="url(#ab-webDesign-gradient)"
              opacity="0.7"
            />
            {/* Círculo pequeño */}
            <circle
              cx="190"
              cy="250"
              r="20"
              fill="url(#ab-webDesign-gradient)"
              opacity="0.5"
            />
          </>
        )}

        {/* webDesignPenNib (antes abstractWebDesign2) */}
        {variant === "webDesignPenNib" && (
          <>
            {/* Pen nib shape (símbolo de diseño) */}
            <path
              d="M200 200 L220 220 L230 210 L210 190 Z"
              fill="url(#ab-webDesign-gradient)"
              filter="url(#ab-webDesign-blur)"
              opacity="0.8"
            />
            {/* Donut menor */}
            <circle
              cx="280"
              cy="160"
              r="40"
              fill="none"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="20"
              opacity="0.6"
            />
            {/* Rectángulo wireframe */}
            <rect
              x="100"
              y="300"
              width="120"
              height="60"
              fill="none"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="3"
              opacity="0.7"
            />
          </>
        )}

        {/* webDesignWireframe (antes abstractWebDesign3) */}
        {variant === "webDesignWireframe" && (
          <>
            {/* Layout (rectángulo subdividido) */}
            <rect
              x="80"
              y="250"
              width="160"
              height="90"
              fill="none"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="3"
              opacity="0.7"
            />
            <line
              x1="80"
              y1="280"
              x2="240"
              y2="280"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1="160"
              y1="250"
              x2="160"
              y2="340"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Círculo difuminado */}
            <circle
              cx="350"
              cy="150"
              r="50"
              fill="url(#ab-webDesign-gradient)"
              filter="url(#ab-webDesign-blur)"
              opacity="0.6"
            />
            {/* Pequeño polígono “pincel” */}
            <polygon
              points="310,220 320,230 300,250"
              fill="url(#ab-webDesign-gradient)"
              opacity="0.5"
            />
          </>
        )}

        {/* webDesignVectors (antes abstractWebDesign4) */}
        {variant === "webDesignVectors" && (
          <>
            {/* Trazos vectoriales */}
            <path
              d="M100 100 C140 140, 200 120, 220 160"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="5"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M220 160 C250 210, 300 200, 340 220"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="5"
              fill="none"
              opacity="0.5"
            />
            {/* Donut menor */}
            <circle
              cx="360"
              cy="280"
              r="40"
              fill="none"
              stroke="url(#ab-webDesign-gradient)"
              strokeWidth="15"
              opacity="0.6"
            />
            {/* Pequeño rectángulo en diagonal (regla) */}
            <rect
              x="130"
              y="300"
              width="80"
              height="10"
              fill="url(#ab-webDesign-gradient)"
              transform="rotate(-15 170 305)"
              opacity="0.7"
            />
          </>
        )}

        {/*
          =============================================================================
          C) 4 VARIANTES "WEB DEVELOPMENT" (renombradas, quitando la 4)
          =============================================================================
        */}

        {/* webDevAngleBrackets (antes abstractWebDev1) */}
        {variant === "webDevAngleBrackets" && (
          <>
            {/* Angled brackets */}
            <path
              d="M150 150 L130 170 L150 190"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="5"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M220 150 L240 170 L220 190"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="5"
              fill="none"
              opacity="0.8"
            />
            {/* Donut con “webDev” gradient */}
            <circle
              cx="300"
              cy="150"
              r="50"
              fill="none"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="25"
              filter="url(#ab-webDev-blur)"
              opacity="0.6"
            />
            {/* Círculo pequeño */}
            <circle
              cx="200"
              cy="300"
              r="20"
              fill="url(#ab-webDev-gradient)"
              opacity="0.5"
            />
          </>
        )}

        {/* webDevCurlyBraces (antes abstractWebDev2) */}
        {variant === "webDevCurlyBraces" && (
          <>
            {/* Curly braces */}
            <path
              d="M100 200 C80 180, 120 180, 100 160
                 C80 140, 120 140, 100 120"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M200 200 C220 180, 180 180, 200 160
                 C220 140, 180 140, 200 120"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="4"
              fill="none"
            />
            {/* Rectángulo “pantalla” */}
            <rect
              x="280"
              y="130"
              width="120"
              height="70"
              fill="none"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="3"
              opacity="0.7"
            />
            {/* Pequeño polígono “código” */}
            <polygon
              points="320,220 340,240 300,240"
              fill="url(#ab-webDev-gradient)"
              opacity="0.5"
            />
          </>
        )}

        {/* webDevSlashes (antes abstractWebDev3) */}
        {variant === "webDevSlashes" && (
          <>
            {/* Slash y backslash */}
            <line
              x1="120"
              y1="120"
              x2="160"
              y2="160"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="5"
              opacity="0.7"
            />
            <line
              x1="160"
              y1="120"
              x2="120"
              y2="160"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="5"
              opacity="0.7"
            />
            {/* Donut */}
            <circle
              cx="300"
              cy="180"
              r="60"
              fill="none"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="30"
              opacity="0.6"
            />
            {/* Pequeño rectángulo vertical (columna de código) */}
            <rect
              x="200"
              y="280"
              width="40"
              height="60"
              fill="url(#ab-webDev-gradient)"
              opacity="0.5"
            />
          </>
        )}

        {/* webDevParentheses (antes abstractWebDev5) */}
        {variant === "webDevParentheses" && (
          <>
            {/* Paréntesis */}
            <path
              d="M120 150 C100 190, 100 210, 120 250"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M200 150 C220 190, 220 210, 200 250"
              stroke="url(#ab-webDev-gradient)"
              strokeWidth="4"
              fill="none"
            />
            {/* Círculo con gradiente */}
            <circle
              cx="330"
              cy="180"
              r="40"
              fill="url(#ab-webDev-gradient)"
              opacity="0.7"
            />
            {/* Pequeño “archivo de código” (rect + notch) */}
            <path
              d="M270 250 H310 V290 L300 280 H270 Z"
              fill="url(#ab-webDev-gradient)"
              opacity="0.5"
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default AbstractIllustration;
