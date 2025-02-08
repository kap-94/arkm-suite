// illustrations.tsx
import React from "react";

interface IllustrationProps {
  color: string;
  className?: string;
}

export const PulseProgress: React.FC<IllustrationProps> = ({
  color = "rgb(99, 102, 241)",
  className,
}) => (
  <svg viewBox="0 0 200 160" className={className}>
    <g transform="translate(100, 80)">
      {/* Círculos de pulso */}
      {[40, 30, 20].map((radius, i) => (
        <circle
          key={`pulse-${i}`}
          cx="0"
          cy="0"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          opacity={0.3 + i * 0.4}
        />
      ))}

      {/* Arcos de progreso */}
      <path
        d="M 0,-40 A 40,40 0 0,1 34.64,20"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M 0,-30 A 30,30 0 0,1 25.98,15"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="1"
      />

      <path
        d="M 0,-20 A 20,20 0 0,1 17.32,10"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Punto central */}
      <circle cx="0" cy="0" r="4" fill={color} />
    </g>
  </svg>
);

export const ActiveProjectsIllustration: React.FC<IllustrationProps> = ({
  color = "rgb(99, 102, 241)",
  className,
}) => {
  const size = 22;
  const startX = 100;
  const startY = 52;

  return (
    <svg viewBox="0 0 200 160" className={className}>
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const x = startX + col * size - row * size;
          const y = startY + row * (size / 2) + col * (size / 2);
          const opacity = 0.3 + (row + col) * 0.1;

          return (
            <g key={`${row}-${col}`} stroke={color} strokeWidth="2">
              {/* Top face */}
              <path
                d={`
                  M ${x} ${y - size / 2}
                  L ${x + size} ${y}
                  L ${x} ${y + size / 2}
                  L ${x - size} ${y}
                  Z
                `}
                fill={color}
                fillOpacity={opacity * 0.1}
              />
              {/* Right face */}
              <path
                d={`
                  M ${x + size} ${y}
                  L ${x} ${y + size / 2}
                  L ${x} ${y + size * 1.5}
                  L ${x + size} ${y + size}
                  Z
                `}
                fill={color}
                fillOpacity={opacity * 0.5}
              />
              {/* Left face */}
              <path
                d={`
                  M ${x - size} ${y}
                  L ${x} ${y + size / 2}
                  L ${x} ${y + size * 1.5}
                  L ${x - size} ${y + size}
                  Z
                `}
                fill={color}
                fillOpacity={opacity * 0.5}
              />
            </g>
          );
        })
      )}
    </svg>
  );
};

export const CompletedProjectsIllustration: React.FC<IllustrationProps> = ({
  color = "rgb(99, 102, 241)",
  className,
}) => {
  return (
    <svg viewBox="0 0 200 160" className={className}>
      {/* Main large check */}
      <path
        d="M55 80 C55 80, 80 105, 80 105 C80 105, 135 50, 135 50"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />

      {/* Smaller complementary check */}
      <path
        d="M85 95 C85 95, 100 110, 100 110 C100 110, 145 65, 145 65"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />

      {/* Subtle background shape for balance */}
      {/* <path
        d="M40 80 L100 115 L160 80 L100 45 Z"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.2"
      /> */}
    </svg>
  );
};

export const NotificationBellIllustration: React.FC<IllustrationProps> = ({
  color = "rgb(99, 102, 241)",
  className,
}) => (
  <svg viewBox="0 0 200 160" className={className}>
    {/* Expanded Ripple Effects */}
    {[4, 3, 2, 1].map((i) => (
      <path
        key={i}
        d="M70 80 A30 30 0 0 1 130 80"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity={0.2 * i}
        transform={`translate(0 ${-i * 10})`}
      />
    ))}

    {/* Enhanced Bell Shape */}
    <path
      d="M85 65
         C85 60, 115 60, 115 65
         L120 95
         C120 105, 80 105, 80 95 Z"
      fill={color}
      opacity="0.9"
    />

    {/* Bell Top */}
    <circle cx="100" cy="60" r="6" fill={color} opacity="0.9" />

    {/* Bell Bottom Detail */}
    <path
      d="M90 98 C90 108, 110 108, 110 98"
      fill="none"
      stroke={color}
      strokeWidth="3"
      opacity="0.7"
    />
  </svg>
);

// Primera variación: Hexágonos en cascada
export const HexagonProgress: React.FC<IllustrationProps> = ({
  color = "rgb(99, 102, 241)",
  className,
}) => (
  <svg viewBox="0 0 200 160" className={className}>
    <defs>
      <filter id="glowHex">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g transform="translate(40, 80)">
      {/* Hexágonos base */}
      {[120, 80, 40, 0].map((x, i) => (
        <path
          key={`hex-${i}`}
          d={`M ${x},0 
              l 15,-10 
              l 15,10 
              l 0,20 
              l -15,10 
              l -15,-10 
              z`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity={0.2}
        />
      ))}

      {/* Hexágonos activos con opacidad decreciente */}
      {[80, 40, 0].map((x, i) => (
        <path
          key={`hex-active-${i}`}
          d={`M ${x},0 
              l 15,-10 
              l 15,10 
              l 0,20 
              l -15,10 
              l -15,-10 
              z`}
          fill={color}
          opacity={0.9 - i * 0.25}
          filter="url(#glowHex)"
        />
      ))}

      {/* Puntos de conexión */}
      {[100, 60, 20].map((x, i) => (
        <circle
          key={`connector-${i}`}
          cx={x + 10}
          cy="10"
          r="2"
          fill={color}
          opacity={0.7 - i * 0.2}
        />
      ))}
    </g>
  </svg>
);
