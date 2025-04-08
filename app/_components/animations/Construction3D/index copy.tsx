import React from "react";
import styles from "./Construction3D.module.scss";
import classNames from "classnames/bind";

interface Construction3DProps {
  className?: string;
}

const cx = classNames.bind(styles);

export const Construction3D: React.FC<Construction3DProps> = ({
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
            id="constructionGradient"
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
            id="constructionDarkGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradiente para cristal/ventanas */}
          <linearGradient
            id="glassGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.3" />
          </linearGradient>

          {/* Gradiente para cristal/ventanas más oscuro */}
          <linearGradient
            id="glassDarkGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>

          {/* Filtro de brillo */}
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

        {/* MONITOR DE ESCRITORIO EN 3D - LADO IZQUIERDO */}
        <g transform="translate(-20, 5)">
          {/* Base del monitor en isométrica */}
          <path
            d="M78,165 L108,155 L138,165 L108,175 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.8"
          />
          <path
            d="M78,165 L78,168 L108,178 L108,175 Z"
            fill="url(#constructionDarkGradient)"
            fillOpacity="0.7"
          />
          <path
            d="M108,175 L108,178 L138,168 L138,165 Z"
            fill="url(#constructionDarkGradient)"
            fillOpacity="0.6"
          />

          {/* Soporte vertical en isométrica */}
          <path
            d="M106,165 L110,165 L110,148 L106,148 Z"
            fill="url(#constructionDarkGradient)"
            fillOpacity="0.8"
          />
          <path
            d="M106,148 L110,148 L112,146 L108,146 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.9"
          />

          {/* Pantalla del monitor en isométrica */}
          <path
            d="M65,100 L108,85 L151,100 L108,115 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.7"
          />
          <path
            d="M65,100 L65,140 L108,155 L108,115 Z"
            fill="url(#constructionDarkGradient)"
            fillOpacity="0.6"
          />
          <path
            d="M108,115 L108,155 L151,140 L151,100 Z"
            fill="url(#constructionDarkGradient)"
            fillOpacity="0.5"
          />

          {/* Marco interno de la pantalla */}
          <path
            d="M70,105 L108,92 L146,105 L108,118 Z"
            fill="none"
            stroke="url(#constructionGradient)"
            strokeWidth="0.9"
            strokeOpacity="0.8"
          />
          <path
            d="M70,105 L70,138 L108,151 L108,118 Z"
            fill="none"
            stroke="url(#constructionGradient)"
            strokeWidth="0.9"
            strokeOpacity="0.8"
          />
          <path
            d="M108,118 L108,151 L146,138 L146,105 Z"
            fill="none"
            stroke="url(#constructionGradient)"
            strokeWidth="0.9"
            strokeOpacity="0.8"
          />

          {/* Excel con celdas en 3D */}
          {/* Encabezado */}
          <path
            d="M72,107 L108,95 L144,107 L108,119 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.3"
          />

          {/* Celdas de datos - primera columna: 3 elementos */}
          <path
            d="M72,115 L81,111 L81,118 L72,122 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.3"
          />
          <path
            d="M72,125 L81,121 L81,128 L72,132 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.4"
          />
          <path
            d="M72,135 L81,131 L81,138 L72,142 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.5"
          />

          {/* Celdas de datos - segunda columna: 2 elementos */}
          <path
            d="M83,110 L92,106 L92,113 L83,117 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.3"
          />
          <path
            d="M83,130 L92,126 L92,133 L83,137 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.5"
          />

          {/* Celdas de datos - tercera columna: 3 elementos */}
          <path
            d="M94,105 L103,101 L103,108 L94,112 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.3"
          />
          <path
            d="M94,115 L103,111 L103,118 L94,122 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.4"
          />
          <path
            d="M94,135 L103,131 L103,138 L94,142 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.5"
          />

          {/* Celdas de datos - cuarta columna: 2 elementos */}
          <path
            d="M105,100 L114,96 L114,103 L105,107 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.3"
          />
          <path
            d="M105,130 L114,126 L114,133 L105,137 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.5"
          />

          {/* Celdas de datos - quinta columna: 3 elementos */}
          <path
            d="M116,105 L125,101 L125,108 L116,112 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.3"
          />
          <path
            d="M116,115 L125,111 L125,118 L116,122 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.4"
          />
          <path
            d="M116,135 L125,131 L125,138 L116,142 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.5"
          />

          {/* Celdas de datos - sexta columna: 2 elementos */}
          <path
            d="M127,110 L136,106 L136,113 L127,117 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.3"
          />
          <path
            d="M127,130 L136,126 L136,133 L127,137 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.5"
          />

          {/* Brillo sutil en el monitor */}
          <circle
            cx="108"
            cy="120"
            r="25"
            fill="url(#constructionGradient)"
            fillOpacity="0.03"
          />
        </g>

        {/* EDIFICIO EN 3D - LADO DERECHO */}
        <g transform="translate(20, -5)">
          {/* Base del edificio en isométrica */}
          <path
            d="M180,165 L210,155 L240,165 L210,175 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.5"
            stroke="url(#constructionGradient)"
            strokeWidth="1"
          />

          {/* Cuerpo principal del edificio - cara frontal */}
          <path
            d="M180,165 L180,75 L210,65 L210,155 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.15"
            stroke="url(#constructionGradient)"
            strokeWidth="1"
          />

          {/* Cara lateral del edificio */}
          <path
            d="M210,155 L210,65 L240,75 L240,165 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.1"
            stroke="url(#constructionGradient)"
            strokeWidth="1"
          />

          {/* Ventanas frontales - primera fila */}
          <path
            d="M185,85 L193,82 L193,95 L185,98 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M198,80 L206,77 L206,90 L198,93 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Ventanas frontales - segunda fila */}
          <path
            d="M185,105 L193,102 L193,115 L185,118 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M198,100 L206,97 L206,110 L198,113 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Ventanas frontales - tercera fila */}
          <path
            d="M185,125 L193,122 L193,135 L185,138 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M198,120 L206,117 L206,130 L198,133 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Ventanas frontales - cuarta fila y entrada */}
          <path
            d="M185,145 L193,142 L193,155 L185,158 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M196,140 L208,137 L208,165 L196,165 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.5"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Ventanas laterales - primera fila */}
          <path
            d="M212,82 L220,85 L220,98 L212,95 Z"
            fill="url(#glassDarkGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M225,87 L233,90 L233,103 L225,100 Z"
            fill="url(#glassDarkGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Ventanas laterales - segunda fila */}
          <path
            d="M212,102 L220,105 L220,118 L212,115 Z"
            fill="url(#glassDarkGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M225,107 L233,110 L233,123 L225,120 Z"
            fill="url(#glassDarkGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Ventanas laterales - tercera fila */}
          <path
            d="M212,122 L220,125 L220,138 L212,135 Z"
            fill="url(#glassDarkGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M225,127 L233,130 L233,143 L225,140 Z"
            fill="url(#glassDarkGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Ventanas laterales - cuarta fila */}
          <path
            d="M212,142 L220,145 L220,158 L212,155 Z"
            fill="url(#glassDarkGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M225,147 L233,150 L233,163 L225,160 Z"
            fill="url(#glassDarkGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Brillo sutil en el edificio */}
          <circle
            cx="210"
            cy="120"
            r="35"
            fill="url(#constructionGradient)"
            fillOpacity="0.03"
          />
        </g>
      </svg>
    </div>
  );
};

export default Construction3D;
