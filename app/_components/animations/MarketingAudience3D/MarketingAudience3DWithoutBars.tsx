import React from "react";
import styles from "./Marketing3D.module.scss";
import classNames from "classnames/bind";

interface MarketingAudience3DProps {
  className?: string;
}

const cx = classNames.bind(styles);

export const MarketingAudience3D: React.FC<MarketingAudience3DProps> = ({
  className,
}) => {
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
          {/* Gradientes principales */}
          <linearGradient
            id="audienceGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradiente más oscuro para sombras/profundidad */}
          <linearGradient
            id="audienceDarkGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5b21b6" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradiente para detalles/elementos de acento */}
          <linearGradient
            id="audienceAccentGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ddd6fe" stopOpacity="0.3" />
          </linearGradient>

          {/* Gradiente secundario para elementos de segmentación */}
          <linearGradient
            id="segmentationGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
          </linearGradient>

          {/* Filtro de brillo */}
          <filter
            id="neonAudienceGlow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feFlood floodColor="#8b5cf6" floodOpacity="0.5" result="flood" />
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

        {/* Desplazamiento a la izquierda */}
        <g transform="translate(40, 30)">
          {/* Panel principal / Dashboard */}

          {/* CÍRCULO BASE CENTRAL */}
          <g transform="translate(20, 20)">
            {/* Círculo base central */}
            <circle
              cx="90"
              cy="95"
              r="66.3"
              fill="url(#audienceGradient)"
              fillOpacity="0.05"
              stroke="url(#audienceGradient)"
              strokeWidth="0.4"
              strokeOpacity="0.3"
            />

            {/* Círculo medio */}
            <circle
              cx="90"
              cy="95"
              r="45.9"
              fill="url(#audienceGradient)"
              fillOpacity="0.08"
              stroke="url(#audienceDarkGradient)"
              strokeWidth="0.3"
              strokeOpacity="0.5"
            />

            {/* Líneas de segmentación perfectamente simétricas */}
            <line
              x1="90"
              y1="28.7"
              x2="90"
              y2="161.3"
              stroke="url(#audienceAccentGradient)"
              strokeWidth="0.4"
              strokeOpacity="0.6"
              strokeDasharray="2 2"
            />

            <line
              x1="23.7"
              y1="95"
              x2="156.3"
              y2="95"
              stroke="url(#audienceAccentGradient)"
              strokeWidth="0.4"
              strokeOpacity="0.6"
              strokeDasharray="2 2"
            />

            <line
              x1="38.9"
              y1="44"
              x2="141.1"
              y2="146.2"
              stroke="url(#audienceAccentGradient)"
              strokeWidth="0.4"
              strokeOpacity="0.6"
              strokeDasharray="2 2"
            />

            <line
              x1="38.9"
              y1="146.2"
              x2="141.1"
              y2="44"
              stroke="url(#audienceAccentGradient)"
              strokeWidth="0.4"
              strokeOpacity="0.6"
              strokeDasharray="2 2"
            />

            {/* Iconos de personas representando perfiles de audiencia */}
            {/* Perfil 1 - Superior */}
            <g transform="translate(90, 53.9)">
              <circle
                cx="0"
                cy="0"
                r="9.18"
                fill="url(#audienceGradient)"
                stroke="url(#audienceAccentGradient)"
                strokeWidth="0.6"
              />
              <circle
                cx="0"
                cy="-3.06"
                r="3.57"
                fill="url(#audienceAccentGradient)"
              />
              <path
                d="M-4.59,3.06 A5.1,4.59 0 0,0 4.59,3.06"
                fill="none"
                stroke="url(#audienceAccentGradient)"
                strokeWidth="0.8"
              />
            </g>

            {/* Perfil 2 - Derecha */}
            <g transform="translate(131.1, 95)">
              <circle
                cx="0"
                cy="0"
                r="9.18"
                fill="url(#audienceGradient)"
                stroke="url(#audienceAccentGradient)"
                strokeWidth="0.6"
              />
              <circle
                cx="0"
                cy="-3.06"
                r="3.57"
                fill="url(#audienceAccentGradient)"
              />
              <path
                d="M-4.59,3.06 A5.1,4.59 0 0,0 4.59,3.06"
                fill="none"
                stroke="url(#audienceAccentGradient)"
                strokeWidth="0.8"
              />
            </g>

            {/* Perfil 3 - Inferior */}
            <g transform="translate(90, 136.1)">
              <circle
                cx="0"
                cy="0"
                r="9.18"
                fill="url(#audienceGradient)"
                stroke="url(#audienceAccentGradient)"
                strokeWidth="0.6"
              />
              <circle
                cx="0"
                cy="-3.06"
                r="3.57"
                fill="url(#audienceAccentGradient)"
              />
              <path
                d="M-4.59,3.06 A5.1,4.59 0 0,0 4.59,3.06"
                fill="none"
                stroke="url(#audienceAccentGradient)"
                strokeWidth="0.8"
              />
            </g>

            {/* Perfil 4 - Izquierda */}
            <g transform="translate(48.9, 95)">
              <circle
                cx="0"
                cy="0"
                r="9.18"
                fill="url(#audienceGradient)"
                stroke="url(#audienceAccentGradient)"
                strokeWidth="0.6"
              />
              <circle
                cx="0"
                cy="-3.06"
                r="3.57"
                fill="url(#audienceAccentGradient)"
              />
              <path
                d="M-4.59,3.06 A5.1,4.59 0 0,0 4.59,3.06"
                fill="none"
                stroke="url(#audienceAccentGradient)"
                strokeWidth="0.8"
              />
            </g>

            {/* Efectos de resplandor y profundidad */}
            <circle
              cx="90"
              cy="95"
              r="76.5"
              fill="url(#audienceGradient)"
              fillOpacity="0.02"
              filter="url(#neonAudienceGlow)"
            />
          </g>

          {/* Gráfico de barras pequeño - Engagement por segmento */}
          <g transform="translate(160, 50)">
            {/* Ejes */}
            <line
              x1="0"
              y1="10"
              x2="0"
              y2="60"
              stroke="url(#audienceAccentGradient)"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="60"
              x2="50"
              y2="60"
              stroke="url(#audienceAccentGradient)"
              strokeWidth="0.5"
            />

            {/* Barras */}
            <rect
              x="5"
              y="20"
              width="8"
              height="40"
              rx="1"
              fill="url(#audienceGradient)"
              fillOpacity="0.7"
            />
            <rect
              x="18"
              y="30"
              width="8"
              height="30"
              rx="1"
              fill="url(#audienceGradient)"
              fillOpacity="0.5"
            />
            <rect
              x="31"
              y="15"
              width="8"
              height="45"
              rx="1"
              fill="url(#audienceGradient)"
              fillOpacity="0.8"
            />
            <rect
              x="44"
              y="40"
              width="8"
              height="20"
              rx="1"
              fill="url(#audienceGradient)"
              fillOpacity="0.4"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default MarketingAudience3D;
