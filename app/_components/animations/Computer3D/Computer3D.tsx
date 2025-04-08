import React from "react";
import styles from "../Component3D.module.scss";
import classNames from "classnames/bind";

interface Computer3DProps {
  className?: string;
}

const cx = classNames.bind(styles);

export const Computer3D: React.FC<Computer3DProps> = ({ className }) => {
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
            id="computerGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradiente más oscuro para sombras/profundidad */}
          <linearGradient
            id="computerDarkGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.4" />
          </linearGradient>

          {/* Filtro de brillo */}
          <filter
            id="computerNeonGlow"
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

        {/* MONITOR DE ESCRITORIO EN 3D - Posicionado a la izquierda */}
        <g transform="translate(0, -60)">
          {/* <g transform="translate(-50, -60)"> */}
          <g transform="scale(1.5)">
            {/* Base del monitor en isométrica */}
            <path
              d="M78,165 L108,155 L138,165 L108,175 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.8"
            />
            <path
              d="M78,165 L78,168 L108,178 L108,175 Z"
              fill="url(#computerDarkGradient)"
              fillOpacity="0.7"
            />
            <path
              d="M108,175 L108,178 L138,168 L138,165 Z"
              fill="url(#computerDarkGradient)"
              fillOpacity="0.6"
            />

            {/* Soporte vertical en isométrica */}
            <path
              d="M106,165 L110,165 L110,148 L106,148 Z"
              fill="url(#computerDarkGradient)"
              fillOpacity="0.8"
            />
            <path
              d="M106,148 L110,148 L112,146 L108,146 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.9"
            />

            {/* Pantalla del monitor en isométrica */}
            <path
              d="M65,100 L108,85 L151,100 L108,115 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.7"
            />
            <path
              d="M65,100 L65,140 L108,155 L108,115 Z"
              fill="url(#computerDarkGradient)"
              fillOpacity="0.6"
            />
            <path
              d="M108,115 L108,155 L151,140 L151,100 Z"
              fill="url(#computerDarkGradient)"
              fillOpacity="0.5"
            />

            {/* Marco interno de la pantalla */}
            <path
              d="M70,105 L108,92 L146,105 L108,118 Z"
              fill="none"
              stroke="url(#computerGradient)"
              strokeWidth="0.3"
              strokeOpacity="0.7"
            />
            <path
              d="M70,105 L70,138 L108,151 L108,118 Z"
              fill="none"
              stroke="url(#computerGradient)"
              strokeWidth="0.3"
              strokeOpacity="0.7"
            />
            <path
              d="M108,118 L108,151 L146,138 L146,105 Z"
              fill="none"
              stroke="url(#computerGradient)"
              strokeWidth="0.3"
              strokeOpacity="0.7"
            />

            {/* Excel con celdas en 3D */}
            {/* Encabezado */}
            <path
              d="M72,107 L108,95 L144,107 L108,119 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.3"
            />

            {/* Celdas de datos - primera columna: 2 elementos */}
            <path
              d="M72,115 L81,111 L81,118 L72,122 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.3"
            />
            <path
              d="M72,125 L81,121 L81,128 L72,132 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.4"
            />

            {/* Celdas de datos - segunda columna: 2 elementos */}
            <path
              d="M83,110 L92,106 L92,113 L83,117 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.3"
            />
            <path
              d="M83,130 L92,126 L92,133 L83,137 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.5"
            />

            {/* Celdas de datos - tercera columna: 3 elementos */}
            <path
              d="M94,105 L103,101 L103,108 L94,112 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.3"
            />
            <path
              d="M94,115 L103,111 L103,118 L94,122 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.4"
            />
            <path
              d="M94,135 L103,131 L103,138 L94,142 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.5"
            />

            {/* Celdas de datos - cuarta columna: 2 elementos */}
            <path
              d="M105,100 L114,96 L114,103 L105,107 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.3"
            />
            <path
              d="M105,130 L114,126 L114,133 L105,137 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.5"
            />

            {/* Celdas de datos - quinta columna: 3 elementos */}
            <path
              d="M116,105 L125,101 L125,108 L116,112 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.3"
            />
            <path
              d="M116,115 L125,111 L125,118 L116,122 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.4"
            />
            <path
              d="M116,135 L125,131 L125,138 L116,142 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.5"
            />

            {/* Celdas de datos - sexta columna: 2 elementos */}
            <path
              d="M127,110 L136,106 L136,113 L127,117 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.3"
            />
            <path
              d="M127,130 L136,126 L136,133 L127,137 Z"
              fill="url(#computerGradient)"
              fillOpacity="0.5"
            />

            {/* Panel de estadísticas a la derecha */}
            {/* <g transform="translate(160, 85)">
            <rect
              x="0"
              y="0"
              width="80"
              height="60"
              rx="2"
              fill="url(#computerDarkGradient)"
              fillOpacity="0.2"
              stroke="url(#computerGradient)"
              strokeWidth="0.5"
            />

            <text
              x="40"
              y="12"
              fill="url(#computerGradient)"
              fontFamily="Arial"
              fontSize="8"
              textAnchor="middle"
              fontWeight="bold"
            >
              Data Analytics
            </text>

            <path
              d="M10,40 L20,30 L30,35 L40,25 L50,20 L60,30 L70,28"
              fill="none"
              stroke="url(#computerGradient)"
              strokeWidth="1.5"
              strokeOpacity="0.8"
            />

            <circle cx="10" cy="40" r="2" fill="url(#computerGradient)" />
            <circle cx="20" cy="30" r="2" fill="url(#computerGradient)" />
            <circle cx="30" cy="35" r="2" fill="url(#computerGradient)" />
            <circle cx="40" cy="25" r="2" fill="url(#computerGradient)" />
            <circle cx="50" cy="20" r="2" fill="url(#computerGradient)" />
            <circle cx="60" cy="30" r="2" fill="url(#computerGradient)" />
            <circle cx="70" cy="28" r="2" fill="url(#computerGradient)" />
          </g> */}

            {/* Brillo sutil en el monitor */}
            <circle
              cx="108"
              cy="120"
              r="50"
              fill="url(#computerGradient)"
              fillOpacity="0.03"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Computer3D;
