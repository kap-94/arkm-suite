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

        {/* MONITOR DE ESCRITORIO EN 3D - LADO IZQUIERDO (MÁS ESTRECHO) */}
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
            strokeWidth="0.3"
            strokeOpacity="0.7"
          />
          <path
            d="M70,105 L70,138 L108,151 L108,118 Z"
            fill="none"
            stroke="url(#constructionGradient)"
            strokeWidth="0.3"
            strokeOpacity="0.7"
          />
          <path
            d="M108,118 L108,151 L146,138 L146,105 Z"
            fill="none"
            stroke="url(#constructionGradient)"
            strokeWidth="0.3"
            strokeOpacity="0.7"
          />

          {/* Excel con celdas en 3D */}
          {/* Encabezado */}
          <path
            d="M72,107 L108,95 L144,107 L108,119 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.3"
          />

          {/* Celdas de datos - primera columna: 2 elementos (eliminando la última) */}
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
            strokeWidth=".8"
          />

          {/* Cuerpo principal del edificio - cara frontal */}
          <path
            d="M180,165 L180,75 L210,65 L210,155 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.15"
            stroke="url(#constructionGradient)"
            strokeWidth=".8"
          />

          {/* Cara lateral del edificio */}
          <path
            d="M210,155 L210,65 L240,75 L240,165 Z"
            fill="url(#constructionGradient)"
            fillOpacity="0.1"
            stroke="url(#constructionGradient)"
            strokeWidth=".8"
          />

          {/* VENTANAS FRONTALES - MOVIDAS 2 PIXELES ABAJO Y 0.5 PIXELES A LA DERECHA DESDE LA ÚLTIMA POSICIÓN */}
          {/* Primera fila */}
          <path
            d="M184.5,86 L192.5,83 L192.5,96 L184.5,99 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M197.5,81 L205.5,78 L205.5,91 L197.5,94 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Segunda fila */}
          <path
            d="M184.5,104 L192.5,101 L192.5,114 L184.5,117 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M197.5,99 L205.5,96 L205.5,109 L197.5,112 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Tercera fila */}
          <path
            d="M184.5,122 L192.5,119 L192.5,132 L184.5,135 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M197.5,117 L205.5,114 L205.5,127 L197.5,130 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Cuarta fila */}
          <path
            d="M184.5,140 L192.5,137 L192.5,150 L184.5,153 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M197.5,135 L205.5,132 L205.5,145 L197.5,148 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* VENTANAS LATERALES - MOVIDAS 2 PIXELES ARRIBA Y AJUSTADAS A LA IZQUIERDA */}
          {/* Primera fila */}
          <path
            d="M214,78 L222,81 L222,94 L214,91 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M227,83 L235,86 L235,99 L227,96 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Segunda fila */}
          <path
            d="M214,96 L222,99 L222,112 L214,109 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M227,101 L235,104 L235,117 L227,114 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Tercera fila */}
          <path
            d="M214,114 L222,117 L222,130 L214,127 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M227,119 L235,122 L235,135 L227,132 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />

          {/* Cuarta fila */}
          <path
            d="M214,132 L222,135 L222,148 L214,145 Z"
            fill="url(#glassGradient)"
            stroke="url(#constructionGradient)"
            strokeWidth="0.5"
          />
          <path
            d="M227,137 L235,140 L235,153 L227,150 Z"
            fill="url(#glassGradient)"
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
