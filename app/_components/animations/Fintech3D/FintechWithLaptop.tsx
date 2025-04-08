import React from "react";
import styles from "./Fintech3D.module.scss";
import classNames from "classnames/bind";

interface Fintech3DProps {
  className?: string;
}

const cx = classNames.bind(styles);

export const Fintech3D: React.FC<Fintech3DProps> = ({ className }) => {
  return (
    <div className={cx("svg-wrapper", className)}>
      <svg
        viewBox="0 0 300 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cx("svg-element")}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="fintechStory1Gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="bullGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="bearGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient
            id="fintechDarkGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient
            id="bullDarkGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient
            id="bearDarkGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.4" />
          </linearGradient>

          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
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

        {/* LAPTOP SECTION - comenzando desde el borde izquierdo */}
        <g transform="translate(0, 5)">
          {/* Laptop base en isométrica */}
          <path
            d="M8,140 L78,122 L148,140 L78,158 Z"
            fill="url(#fintechStory1Gradient)"
            fillOpacity="0.8"
          />
          <path
            d="M8,140 L8,145 L78,163 L78,158 Z"
            fill="url(#fintechDarkGradient)"
            fillOpacity="0.7"
          />
          <path
            d="M78,158 L78,163 L148,145 L148,140 Z"
            fill="url(#fintechDarkGradient)"
            fillOpacity="0.6"
          />

          {/* Laptop pantalla en isométrica */}
          <path
            d="M35,115 L78,110 L121,115 L78,120 Z"
            fill="url(#fintechStory1Gradient)"
            fillOpacity="0.7"
          />
          <path
            d="M35,115 L35,118 L78,123 L78,120 Z"
            fill="url(#fintechDarkGradient)"
            fillOpacity="0.6"
          />
          <path
            d="M78,120 L78,123 L121,118 L121,115 Z"
            fill="url(#fintechDarkGradient)"
            fillOpacity="0.5"
          />

          {/* Pantalla interna */}
          {/* <path
            d="M31,88 L78,102 L125,88 L78,70 Z"
            fill="none"
            stroke="url(#fintechStory1Gradient)"
            strokeWidth="0.9"
            strokeOpacity="0.7"
          />
          <path
            d="M31,88 L31,118 L78,132 L78,102 Z"
            fill="none"
            stroke="url(#fintechStory1Gradient)"
            strokeWidth="0.9"
            strokeOpacity="0.7"
          />
          <path
            d="M78,102 L78,132 L125,118 L125,88 Z"
            fill="none"
            stroke="url(#fintechStory1Gradient)"
            strokeWidth="0.9"
            strokeOpacity="0.7"
          /> */}

          {/* Contenido de la pantalla */}
          <path
            d="M35,110 L47,102 L59,106 L71,98 L78,110 L91,102 L103,106"
            stroke="url(#fintechStory1Gradient)"
            strokeWidth="2.6"
            fill="none"
          />

          {/* Brillo laptop */}
          <circle
            cx="78"
            cy="102"
            r="22"
            fill="url(#fintechStory1Gradient)"
            fillOpacity="0.03"
          />
        </g>

        {/* BARRAS SECTION - 10% más pequeñas que la versión original */}
        <g transform="translate(0, 15)">
          {/* Panel gráfico base */}
          {/* <path
            d="M170,88 L210,73 L250,88 L210,103 Z"
            fill="url(#fintechStory1Gradient)"
            fillOpacity="0.1"
            stroke="url(#fintechStory1Gradient)"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          <path
            d="M170,88 L170,155 L210,170 L210,103 Z"
            fill="url(#fintechStory1Gradient)"
            fillOpacity="0.05"
            stroke="url(#fintechStory1Gradient)"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          <path
            d="M210,103 L210,170 L250,155 L250,88 Z"
            fill="url(#fintechStory1Gradient)"
            fillOpacity="0.05"
            stroke="url(#fintechStory1Gradient)"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          /> */}

          {/* Barras 3D */}
          <g>
            {/* Primera barra bull */}
            <path
              d="M182,142 L182,92 L192,87 L192,137 Z"
              fill="url(#bullGradient)"
            />
            <path
              d="M182,92 L192,87 L201,92 L192,97 Z"
              fill="url(#bullDarkGradient)"
            />
            <path
              d="M192,97 L192,137 L201,132 L201,92 Z"
              fill="url(#bullDarkGradient)"
              fillOpacity="0.7"
            />

            {/* Segunda barra bear */}
            <path
              d="M207,153 L207,78 L217,73 L217,148 Z"
              fill="url(#bearGradient)"
            />
            <path
              d="M207,78 L217,73 L227,78 L217,83 Z"
              fill="url(#bearDarkGradient)"
            />
            <path
              d="M217,83 L217,148 L227,143 L227,78 Z"
              fill="url(#bearDarkGradient)"
              fillOpacity="0.7"
            />

            {/* Tercera barra bull */}
            <path
              d="M232,142 L232,92 L242,87 L242,137 Z"
              fill="url(#bullGradient)"
            />
            <path
              d="M232,92 L242,87 L251,92 L242,97 Z"
              fill="url(#bullDarkGradient)"
            />
            <path
              d="M242,97 L242,137 L251,132 L251,92 Z"
              fill="url(#bullDarkGradient)"
              fillOpacity="0.7"
            />
          </g>

          {/* Líneas de referencia */}
          <path
            d="M170,155 L250,140"
            stroke="url(#fintechStory1Gradient)"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
          <path
            d="M170,135 L250,120"
            stroke="url(#fintechStory1Gradient)"
            strokeOpacity="0.3"
            strokeWidth="0.5"
            strokeDasharray="2"
          />
          <path
            d="M170,115 L250,100"
            stroke="url(#fintechStory1Gradient)"
            strokeOpacity="0.3"
            strokeWidth="0.5"
            strokeDasharray="2"
          />
          <path
            d="M170,95 L250,80"
            stroke="url(#fintechStory1Gradient)"
            strokeOpacity="0.3"
            strokeWidth="0.5"
            strokeDasharray="2"
          />

          {/* Brillo barras */}
          <circle
            cx="210"
            cy="115"
            r="34"
            fill="url(#fintechStory1Gradient)"
            fillOpacity="0.03"
          />
        </g>
      </svg>
    </div>
  );
};
