import React from "react";
import styles from "../Component3D.module.scss";
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
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <linearGradient
            id="fintechGradient"
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

          <filter
            id="fintechNeonGlow"
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

        {/* Posicionamiento a la izquierda */}
        <g transform="translate(-20, -65)">
          {/* BARRAS SECTION */}
          <g transform="scale(1.9)">
            {/* Primera barra bull */}
            <path
              d="M42,132 L42,92 L52,87 L52,127 Z"
              fill="url(#bullGradient)"
            />
            <path
              d="M42,92 L52,87 L61,92 L52,97 Z"
              fill="url(#bullDarkGradient)"
            />
            <path
              d="M52,97 L52,127 L61,122 L61,92 Z"
              fill="url(#bullDarkGradient)"
              fillOpacity="0.7"
            />

            {/* Segunda barra bear */}
            <path
              d="M67,143 L67,78 L77,73 L77,138 Z"
              fill="url(#bearGradient)"
            />
            <path
              d="M67,78 L77,73 L87,78 L77,83 Z"
              fill="url(#bearDarkGradient)"
            />
            <path
              d="M77,83 L77,138 L87,133 L87,78 Z"
              fill="url(#bearDarkGradient)"
              fillOpacity="0.7"
            />

            {/* Tercera barra bull */}
            <path
              d="M92,132 L92,92 L102,87 L102,127 Z"
              fill="url(#bullGradient)"
            />
            <path
              d="M92,92 L102,87 L111,92 L102,97 Z"
              fill="url(#bullDarkGradient)"
            />
            <path
              d="M102,97 L102,127 L111,122 L111,92 Z"
              fill="url(#bullDarkGradient)"
              fillOpacity="0.7"
            />

            {/* Cuarta barra bear */}
            <path
              d="M117,138 L117,102 L127,97 L127,133 Z"
              fill="url(#bearGradient)"
            />
            <path
              d="M117,102 L127,97 L137,102 L127,107 Z"
              fill="url(#bearDarkGradient)"
            />
            <path
              d="M127,107 L127,133 L137,128 L137,102 Z"
              fill="url(#bearDarkGradient)"
              fillOpacity="0.7"
            />

            {/* Líneas de referencia */}
            <path
              d="M30,145 L150,130"
              stroke="url(#fintechGradient)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
            />
            <path
              d="M30,125 L150,110"
              stroke="url(#fintechGradient)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
              strokeDasharray="2"
            />
            <path
              d="M30,105 L150,90"
              stroke="url(#fintechGradient)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
              strokeDasharray="2"
            />
            <path
              d="M30,85 L150,70"
              stroke="url(#fintechGradient)"
              strokeOpacity="0.3"
              strokeWidth="0.5"
              strokeDasharray="2"
            />
          </g>

          {/* Brillo sutil */}
          {/* <circle
            cx="120"
            cy="120"
            r="100"
            fill="url(#fintechGradient)"
            fillOpacity="0.03"
          /> */}
        </g>
      </svg>
    </div>
  );
};

export default Fintech3D;
