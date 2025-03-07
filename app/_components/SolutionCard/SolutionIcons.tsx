// src/components/SolutionCard/SolutionIcons.tsx
import classNames from "classnames/bind";
import styles from "./SolutionIcons.module.scss";

const cx = classNames.bind(styles);

export const DesignIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--design")}
  >
    <path
      className={cx("icon__hexagon")}
      d="M32 8L56 24V40L32 56L8 40V24L32 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={cx("icon__lines")}
      d="M32 32L44 24M32 32L32 48M32 32L20 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      className={cx("icon__dot")}
      cx="32"
      cy="32"
      r="4"
      fill="currentColor"
    />
  </svg>
);

export const DevelopmentIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--development")}
  >
    <path
      className={cx("icon__bracket", "icon__bracket--left")}
      d="M16 24L8 32L16 40"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={cx("icon__bracket", "icon__bracket--right")}
      d="M48 24L56 32L48 40"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={cx("icon__slash")}
      d="M36 16L28 48"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const OptimizationIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--optimization")}
  >
    <circle
      className={cx("icon__circle")}
      cx="32"
      cy="32"
      r="24"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      className={cx("icon__hand")}
      d="M32 16V32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      className={cx("icon__line")}
      d="M16 32H48"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      className={cx("icon__indicator")}
      d="M32 32L44 44"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const RocketIllustration = () => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("illustration", "illustration--rocket")}
  >
    {/* Estrellas simples alrededor */}
    <path
      d="M25 40 L28 40 M26.5 38.5 L26.5 41.5
         M40 20 L43 20 M41.5 18.5 L41.5 21.5
         M60 50 L63 50 M61.5 48.5 L61.5 51.5
         M150 60 L153 60 M151.5 58.5 L151.5 61.5
         M170 30 L173 30 M171.5 28.5 L171.5 31.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Nubes en la parte inferior */}
    <path
      d="M30 150 
         C20 140, 50 130, 60 140 
         C70 150, 100 140, 110 150
         C120 160, 140 150, 150 160
         C160 170, 190 160, 180 150"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Cohete */}
    <path
      d="M100 70 
         C90 80, 90 100, 95 110 
         V130 
         H105 
         V110 
         C110 100, 110 80, 100 70 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Ventana del cohete */}
    <circle
      cx="100"
      cy="90"
      r="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    {/* Aletas laterales */}
    <path
      d="M95 130 L85 140 L95 140 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M105 130 L115 140 L105 140 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinejoin="round"
    />
    {/* Llamas de propulsión */}
    <path
      d="M95 130 
         C95 140, 105 140, 105 130"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
