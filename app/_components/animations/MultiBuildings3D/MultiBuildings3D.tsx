import React from "react";
import styles from "../Component3D.module.scss";
import classNames from "classnames/bind";

interface MultiBuildings3DProps {
  className?: string;
}

const cx = classNames.bind(styles);

export const MultiBuildings3D: React.FC<MultiBuildings3DProps> = ({
  className,
}) => {
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
          {/* Gradientes para edificios */}
          <linearGradient
            id="buildingGradient1"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient
            id="buildingGradient2"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient
            id="buildingGradient3"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.5" />
          </linearGradient>

          {/* Gradientes para ventanas */}
          <linearGradient
            id="glassGradient1"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient
            id="glassGradient2"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient
            id="glassGradient3"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.3" />
          </linearGradient>

          {/* Gradiente para el terreno/base */}
          <linearGradient
            id="groundGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.1" />
          </linearGradient>

          {/* Filtro de brillo */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feFlood floodColor="#818cf8" floodOpacity="0.3" result="flood" />
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

        {/* Ajuste del grupo completo para que se vea mejor - transformación a la izquierda */}
        <g transform="translate(-25, -30) scale(.95)">
          {/* BASE / TERRENO */}
          <path
            d="M50,220 L200,150 L350,220 L200,290 Z"
            fill="url(#groundGradient)"
            fillOpacity="0.6"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />

          {/* EDIFICIO 1 - RASCACIELOS ALTO (CENTRO-IZQUIERDA) */}
          <g>
            {/* Base del edificio */}
            <path
              d="M120,220 L150,205 L180,220 L150,235 Z"
              fill="url(#buildingGradient1)"
              fillOpacity="0.6"
              stroke="url(#buildingGradient1)"
              strokeWidth="0.8"
            />

            {/* Cuerpo principal - cara frontal */}
            <path
              d="M120,220 L120,110 L150,95 L150,205 Z"
              fill="url(#buildingGradient1)"
              fillOpacity="0.2"
              stroke="url(#buildingGradient1)"
              strokeWidth="0.8"
            />

            {/* Cara lateral */}
            <path
              d="M150,205 L150,95 L180,110 L180,220 Z"
              fill="url(#buildingGradient1)"
              fillOpacity="0.15"
              stroke="url(#buildingGradient1)"
              strokeWidth="0.8"
            />

            {/* Ventanas frontales */}
            {Array.from({ length: 6 }).map((_, i) => (
              <React.Fragment key={`front-windows-1-${i}`}>
                <path
                  d={`M124,${125 + i * 15} L135,${120 + i * 15} L135,${
                    128 + i * 15
                  } L124,${133 + i * 15} Z`}
                  fill="url(#glassGradient1)"
                  stroke="url(#buildingGradient1)"
                  strokeWidth="0.5"
                />
                <path
                  d={`M138,${118 + i * 15} L146,${114 + i * 15} L146,${
                    122 + i * 15
                  } L138,${126 + i * 15} Z`}
                  fill="url(#glassGradient1)"
                  stroke="url(#buildingGradient1)"
                  strokeWidth="0.5"
                />
              </React.Fragment>
            ))}

            {/* Ventanas laterales */}
            {Array.from({ length: 6 }).map((_, i) => (
              <React.Fragment key={`side-windows-1-${i}`}>
                <path
                  d={`M154,${110 + i * 15} L162,${114 + i * 15} L162,${
                    122 + i * 15
                  } L154,${118 + i * 15} Z`}
                  fill="url(#glassGradient1)"
                  stroke="url(#buildingGradient1)"
                  strokeWidth="0.5"
                />
                <path
                  d={`M166,${116 + i * 15} L174,${120 + i * 15} L174,${
                    128 + i * 15
                  } L166,${124 + i * 15} Z`}
                  fill="url(#glassGradient1)"
                  stroke="url(#buildingGradient1)"
                  strokeWidth="0.5"
                />
              </React.Fragment>
            ))}
          </g>

          {/* EDIFICIO 2 - EDIFICIO MÁS ANCHO (DERECHA) */}
          <g>
            {/* Base del edificio */}
            <path
              d="M210,220 L250,200 L290,220 L250,240 Z"
              fill="url(#buildingGradient2)"
              fillOpacity="0.6"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.8"
            />

            {/* Cuerpo principal - cara frontal */}
            <path
              d="M210,220 L210,130 L250,110 L250,200 Z"
              fill="url(#buildingGradient2)"
              fillOpacity="0.2"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.8"
            />

            {/* Cara lateral */}
            <path
              d="M250,200 L250,110 L290,130 L290,220 Z"
              fill="url(#buildingGradient2)"
              fillOpacity="0.15"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.8"
            />

            {/* Ventanas frontales */}
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={`front-windows-2-${i}`}>
                <path
                  d={`M215,${145 + i * 16} L225,${140 + i * 16} L225,${
                    150 + i * 16
                  } L215,${155 + i * 16} Z`}
                  fill="url(#glassGradient2)"
                  stroke="url(#buildingGradient2)"
                  strokeWidth="0.5"
                />
                <path
                  d={`M230,${137 + i * 16} L240,${132 + i * 16} L240,${
                    142 + i * 16
                  } L230,${147 + i * 16} Z`}
                  fill="url(#glassGradient2)"
                  stroke="url(#buildingGradient2)"
                  strokeWidth="0.5"
                />
              </React.Fragment>
            ))}

            {/* Ventanas laterales */}
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={`side-windows-2-${i}`}>
                <path
                  d={`M255,${125 + i * 16} L265,${130 + i * 16} L265,${
                    140 + i * 16
                  } L255,${135 + i * 16} Z`}
                  fill="url(#glassGradient2)"
                  stroke="url(#buildingGradient2)"
                  strokeWidth="0.5"
                />
                <path
                  d={`M270,${133 + i * 16} L280,${138 + i * 16} L280,${
                    148 + i * 16
                  } L270,${143 + i * 16} Z`}
                  fill="url(#glassGradient2)"
                  stroke="url(#buildingGradient2)"
                  strokeWidth="0.5"
                />
              </React.Fragment>
            ))}
          </g>

          {/* EDIFICIO 3 - TORRE MAYOR (IZQUIERDA) */}
          <g>
            {/* Base del edificio */}
            <path
              d="M70,220 L100,205 L130,220 L100,235 Z"
              fill="url(#buildingGradient3)"
              fillOpacity="0.6"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.8"
            />

            {/* Cuerpo principal - cara frontal */}
            <path
              d="M70,220 L70,140 L100,125 L100,205 Z"
              fill="url(#buildingGradient3)"
              fillOpacity="0.2"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.8"
            />

            {/* Cara lateral */}
            <path
              d="M100,205 L100,125 L130,140 L130,220 Z"
              fill="url(#buildingGradient3)"
              fillOpacity="0.15"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.8"
            />

            {/* Ventanas frontales */}
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={`front-windows-3-${i}`}>
                <path
                  d={`M75,${155 + i * 14} L85,${150 + i * 14} L85,${
                    158 + i * 14
                  } L75,${163 + i * 14} Z`}
                  fill="url(#glassGradient3)"
                  stroke="url(#buildingGradient3)"
                  strokeWidth="0.5"
                />
                <path
                  d={`M88,${147 + i * 14} L95,${144 + i * 14} L95,${
                    152 + i * 14
                  } L88,${155 + i * 14} Z`}
                  fill="url(#glassGradient3)"
                  stroke="url(#buildingGradient3)"
                  strokeWidth="0.5"
                />
              </React.Fragment>
            ))}

            {/* Ventanas laterales */}
            {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={`side-windows-3-${i}`}>
                <path
                  d={`M105,${140 + i * 14} L112,${143 + i * 14} L112,${
                    151 + i * 14
                  } L105,${148 + i * 14} Z`}
                  fill="url(#glassGradient3)"
                  stroke="url(#buildingGradient3)"
                  strokeWidth="0.5"
                />
                <path
                  d={`M115,${145 + i * 14} L125,${150 + i * 14} L125,${
                    158 + i * 14
                  } L115,${153 + i * 14} Z`}
                  fill="url(#glassGradient3)"
                  stroke="url(#buildingGradient3)"
                  strokeWidth="0.5"
                />
              </React.Fragment>
            ))}
          </g>

          {/* EDIFICIO 4 - RASCACIELOS DELGADO (DERECHA) */}
          <g>
            {/* Base del edificio */}
            <path
              d="M270,220 L290,210 L310,220 L290,230 Z"
              fill="url(#buildingGradient1)"
              fillOpacity="0.6"
              stroke="url(#buildingGradient1)"
              strokeWidth="0.8"
            />

            {/* Cuerpo principal - cara frontal */}
            <path
              d="M270,220 L270,120 L290,110 L290,210 Z"
              fill="url(#buildingGradient1)"
              fillOpacity="0.17"
              stroke="url(#buildingGradient1)"
              strokeWidth="0.8"
            />

            {/* Cara lateral */}
            <path
              d="M290,210 L290,110 L310,120 L310,220 Z"
              fill="url(#buildingGradient1)"
              fillOpacity="0.12"
              stroke="url(#buildingGradient1)"
              strokeWidth="0.8"
            />

            {/* Ventanas frontales */}
            {Array.from({ length: 5 }).map((_, i) => (
              <path
                key={`front-windows-4-${i}`}
                d={`M275,${140 + i * 15} L285,${135 + i * 15} L285,${
                  145 + i * 15
                } L275,${150 + i * 15} Z`}
                fill="url(#glassGradient1)"
                stroke="url(#buildingGradient1)"
                strokeWidth="0.5"
              />
            ))}

            {/* Ventanas laterales */}
            {Array.from({ length: 5 }).map((_, i) => (
              <path
                key={`side-windows-4-${i}`}
                d={`M295,${127 + i * 15} L305,${132 + i * 15} L305,${
                  142 + i * 15
                } L295,${137 + i * 15} Z`}
                fill="url(#glassGradient1)"
                stroke="url(#buildingGradient1)"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* EDIFICIO 5 - EDIFICIO PLANO DE OFICINAS (FONDO) */}
          <g>
            {/* Base del edificio */}
            <path
              d="M170,200 L200,185 L230,200 L200,215 Z"
              fill="url(#buildingGradient2)"
              fillOpacity="0.5"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.7"
            />

            {/* Cuerpo principal - cara frontal */}
            <path
              d="M170,200 L170,165 L200,150 L200,185 Z"
              fill="url(#buildingGradient2)"
              fillOpacity="0.17"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.7"
            />

            {/* Cara lateral */}
            <path
              d="M200,185 L200,150 L230,165 L230,200 Z"
              fill="url(#buildingGradient2)"
              fillOpacity="0.13"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.7"
            />

            {/* Ventanas frontales (estilo de oficina - corridas horizontalmente) */}
            <path
              d="M172,175 L198,162 L198,168 L172,181 Z"
              fill="url(#glassGradient2)"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.4"
            />
            <path
              d="M172,185 L198,172 L198,178 L172,191 Z"
              fill="url(#glassGradient2)"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.4"
            />

            {/* Ventanas laterales (estilo de oficina - corridas horizontalmente) */}
            <path
              d="M202,162 L228,175 L228,181 L202,168 Z"
              fill="url(#glassGradient2)"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.4"
            />
            <path
              d="M202,172 L228,185 L228,191 L202,178 Z"
              fill="url(#glassGradient2)"
              stroke="url(#buildingGradient2)"
              strokeWidth="0.4"
            />
          </g>

          {/* EDIFICIO 6 - TORRE DE APARTAMENTOS (IZQUIERDA-FONDO) */}
          <g>
            {/* Base del edificio */}
            <path
              d="M110,200 L130,190 L150,200 L130,210 Z"
              fill="url(#buildingGradient3)"
              fillOpacity="0.5"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.7"
            />

            {/* Cuerpo principal - cara frontal */}
            <path
              d="M110,200 L110,160 L130,150 L130,190 Z"
              fill="url(#buildingGradient3)"
              fillOpacity="0.18"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.7"
            />

            {/* Cara lateral */}
            <path
              d="M130,190 L130,150 L150,160 L150,200 Z"
              fill="url(#buildingGradient3)"
              fillOpacity="0.14"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.7"
            />

            {/* Ventanas/balcones frontales */}
            <path
              d="M114,170 L126,163 L126,173 L114,180 Z"
              fill="url(#glassGradient3)"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.4"
            />
            <path
              d="M114,185 L126,178 L126,188 L114,195 Z"
              fill="url(#glassGradient3)"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.4"
            />

            {/* Ventanas/balcones laterales */}
            <path
              d="M134,163 L146,170 L146,180 L134,173 Z"
              fill="url(#glassGradient3)"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.4"
            />
            <path
              d="M134,178 L146,185 L146,195 L134,188 Z"
              fill="url(#glassGradient3)"
              stroke="url(#buildingGradient3)"
              strokeWidth="0.4"
            />
          </g>

          {/* Luces ambientales / efecto de brillo */}
          <circle
            cx="200"
            cy="160"
            r="100"
            fill="url(#buildingGradient1)"
            fillOpacity="0.03"
          />
          <circle
            cx="150"
            cy="150"
            r="60"
            fill="url(#buildingGradient1)"
            fillOpacity="0.02"
          />
          <circle
            cx="250"
            cy="150"
            r="60"
            fill="url(#buildingGradient1)"
            fillOpacity="0.02"
          />
        </g>
      </svg>
    </div>
  );
};

export default MultiBuildings3D;
