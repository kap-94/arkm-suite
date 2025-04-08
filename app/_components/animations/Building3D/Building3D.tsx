import React from "react";
import styles from "./Building3D.module.scss";
import classNames from "classnames/bind";

interface Building3DProps {
  className?: string;
}

const cx = classNames.bind(styles);

export const Building3D: React.FC<Building3DProps> = ({ className }) => {
  return (
    <div className={cx("svg-wrapper", className)}>
      <svg
        viewBox="0 0 300 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cx("svg-element")}
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          {/* Gradientes principales */}
          <linearGradient
            id="buildingSingleGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradiente para cristal/ventanas */}
          <linearGradient
            id="buildingSingleGlassGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.3" />
          </linearGradient>

          {/* Filtro de brillo */}
          <filter
            id="buildingSingleNeonGlow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feFlood floodColor="#818cf8" floodOpacity="0.5" result="flood" />
            <feComposite
              in="flood"
              in2="SourceGraphic"
              operator="in"
              result="masked"
            />
            <feGaussianBlur in="masked" stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* BASE ISOMÉTRICA */}
        <path
          d="M20,220 L150,150 L280,220 L150,290 Z"
          fill="url(#buildingSingleGradient)"
          fillOpacity="0.1"
          stroke="url(#buildingSingleGradient)"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />

        {/* EDIFICIO EN 3D - Posicionado a la izquierda */}
        <g transform="translate(20, 30) scale(1)">
          {/* Base del edificio en isométrica */}
          <path
            d="M60,165 L100,145 L140,165 L100,185 Z"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.5"
            stroke="url(#buildingSingleGradient)"
            strokeWidth=".8"
          />

          {/* Cuerpo principal del edificio - cara frontal */}
          <path
            d="M60,165 L60,65 L100,45 L100,145 Z"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.15"
            stroke="url(#buildingSingleGradient)"
            strokeWidth=".8"
          />

          {/* Cara lateral del edificio */}
          <path
            d="M100,145 L100,45 L140,65 L140,165 Z"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.1"
            stroke="url(#buildingSingleGradient)"
            strokeWidth=".8"
          />

          {/* Techo del edificio */}
          <path
            d="M70,65 L100,45 L130,65 L100,85 Z"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.6"
            stroke="url(#buildingSingleGradient)"
            strokeWidth=".7"
          />

          {/* Antena o estructura en el techo */}
          <path
            d="M98,45 L102,45 L102,20 L98,20 Z"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.8"
            stroke="url(#buildingSingleGradient)"
            strokeWidth=".6"
          />

          {/* VENTANAS FRONTALES - 5 filas y 2 columnas */}
          <path
            d="M70,80 L80,75 L80,90 L70,95 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M85,73 L95,68 L95,83 L85,88 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M70,100 L80,95 L80,110 L70,115 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M85,93 L95,88 L95,103 L85,108 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M70,120 L80,115 L80,130 L70,135 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M85,113 L95,108 L95,123 L85,128 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M70,140 L80,135 L80,150 L70,155 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M85,133 L95,128 L95,143 L85,148 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          {/* VENTANAS LATERALES - 5 filas y 2 columnas */}
          <path
            d="M105,68 L115,73 L115,88 L105,83 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M120,75 L130,80 L130,95 L120,90 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M105,88 L115,93 L115,108 L105,103 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M120,95 L130,100 L130,115 L120,110 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M105,108 L115,113 L115,128 L105,123 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M120,115 L130,120 L130,135 L120,130 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M105,128 L115,133 L115,148 L105,143 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M120,135 L130,140 L130,155 L120,150 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          {/* Brillo sutil en el edificio */}
          <circle
            cx="100"
            cy="120"
            r="60"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.03"
          />
        </g>

        {/* EDIFICIO 2 MÁS PEQUEÑO - A LA DERECHA */}
        <g transform="translate(150, 50) scale(0.7)">
          {/* Base del edificio en isométrica */}
          <path
            d="M60,165 L100,145 L140,165 L100,185 Z"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.4"
            stroke="url(#buildingSingleGradient)"
            strokeWidth=".8"
          />

          {/* Cuerpo principal del edificio - cara frontal */}
          <path
            d="M60,165 L60,85 L100,65 L100,145 Z"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.12"
            stroke="url(#buildingSingleGradient)"
            strokeWidth=".8"
          />

          {/* Cara lateral del edificio */}
          <path
            d="M100,145 L100,65 L140,85 L140,165 Z"
            fill="url(#buildingSingleGradient)"
            fillOpacity="0.08"
            stroke="url(#buildingSingleGradient)"
            strokeWidth=".8"
          />

          {/* Ventanas frontales */}
          <path
            d="M70,100 L80,95 L80,110 L70,115 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M85,93 L95,88 L95,103 L85,108 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M70,120 L80,115 L80,130 L70,135 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M85,113 L95,108 L95,123 L85,128 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M70,140 L80,135 L80,150 L70,155 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M85,133 L95,128 L95,143 L85,148 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          {/* Ventanas laterales */}
          <path
            d="M105,88 L115,93 L115,108 L105,103 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M120,95 L130,100 L130,115 L120,110 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M105,108 L115,113 L115,128 L105,123 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M120,115 L130,120 L130,135 L120,130 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />

          <path
            d="M105,128 L115,133 L115,148 L105,143 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M120,135 L130,140 L130,155 L120,150 Z"
            fill="url(#buildingSingleGlassGradient)"
            stroke="url(#buildingSingleGradient)"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </div>
  );
};

export default Building3D;
