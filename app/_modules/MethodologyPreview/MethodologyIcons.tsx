import classNames from "classnames/bind";
import styles from "./MethodologyPreview.module.scss";

const cx = classNames.bind(styles);
// SVG Icons for each methodology step
export const ResearchIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--research")}
  >
    <defs>
      <linearGradient id="researchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <circle
      cx="28"
      cy="28"
      r="16"
      stroke="url(#researchGradient)"
      strokeWidth="2.5"
      className={cx("icon__circle")}
    />
    <path
      d="M39 39L50 50"
      stroke="url(#researchGradient)"
      strokeWidth="3.5"
      strokeLinecap="round"
      className={cx("icon__handle")}
    />
    <path
      d="M28 18V28M28 28H38"
      stroke="url(#researchGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={cx("icon__crosshair")}
    />
  </svg>
);

// export const VisualDirectionIcon = () => (
//   <svg
//     viewBox="0 0 64 64"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className={cx("icon", "icon--visual")}
//   >
//     <defs>
//       <linearGradient id="visualGradient" x1="0%" y1="100%" x2="100%" y2="0%">
//         <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
//         <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.3" />
//       </linearGradient>
//     </defs>
//     <circle
//       cx="20"
//       cy="20"
//       r="10"
//       fill="url(#visualGradient)"
//       opacity="0.8"
//       className={cx("icon__shape", "icon__shape--1")}
//     />
//     <rect
//       x="34"
//       y="10"
//       width="20"
//       height="20"
//       rx="4"
//       fill="url(#visualGradient)"
//       opacity="0.6"
//       className={cx("icon__shape", "icon__shape--2")}
//     />
//     <path
//       d="M15 40H49"
//       stroke="url(#visualGradient)"
//       strokeWidth="2"
//       strokeLinecap="round"
//       className={cx("icon__line")}
//     />
//     <path
//       d="M20 48H44"
//       stroke="url(#visualGradient)"
//       strokeWidth="2"
//       strokeLinecap="round"
//       className={cx("icon__line")}
//     />
//     <path
//       d="M25 56H39"
//       stroke="url(#visualGradient)"
//       strokeWidth="2"
//       strokeLinecap="round"
//       className={cx("icon__line")}
//     />
//   </svg>
// );

// export const VisualDirectionIcon = () => (
//   <svg
//     viewBox="0 0 64 64"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className={cx("icon", "icon--visual")}
//   >
//     <defs>
//       <linearGradient id="visualGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
//         <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
//         <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.3" />
//       </linearGradient>
//     </defs>
//     {/* Capas apiladas */}
//     <rect
//       x="16"
//       y="22"
//       width="32"
//       height="24"
//       rx="2"
//       stroke="url(#visualGradient2)"
//       strokeWidth="2"
//       opacity="0.4"
//     />
//     <rect
//       x="20"
//       y="18"
//       width="32"
//       height="24"
//       rx="2"
//       stroke="url(#visualGradient2)"
//       strokeWidth="2"
//       opacity="0.6"
//     />
//     <rect
//       x="24"
//       y="14"
//       width="32"
//       height="24"
//       rx="2"
//       fill="url(#visualGradient2)"
//       opacity="0.2"
//       stroke="url(#visualGradient2)"
//       strokeWidth="2"
//     />

//     {/* Herramientas de diseño */}
//     <circle
//       cx="18"
//       cy="46"
//       r="4"
//       stroke="url(#visualGradient2)"
//       strokeWidth="2"
//     />
//     <path
//       d="M46 46H52"
//       stroke="url(#visualGradient2)"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//     <path
//       d="M48 42L48 50"
//       stroke="url(#visualGradient2)"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//     <path
//       d="M30 46H38"
//       stroke="url(#visualGradient2)"
//       strokeWidth="2"
//       strokeLinecap="round"
//     />
//   </svg>
// );
export const VisualDirectionIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--visual")}
  >
    <defs>
      <linearGradient id="visualGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>

    {/* Contorno del ojo */}
    <path
      d="M8 32C8 32 20 16 32 16C44 16 56 32 56 32C56 32 44 48 32 48C20 48 8 32 8 32Z"
      stroke="url(#visualGradient)"
      strokeWidth="2.5"
      strokeLinejoin="round"
      className={cx("icon__eye", "icon__eye--outline")}
    />

    {/* Iris del ojo */}
    <circle
      cx="32"
      cy="32"
      r="10"
      fill="url(#visualGradient)"
      opacity="0.3"
      stroke="url(#visualGradient)"
      strokeWidth="2.5"
      className={cx("icon__eye", "icon__eye--iris")}
    />

    {/* Pupila */}
    <circle
      cx="32"
      cy="32"
      r="4"
      fill="url(#visualGradient)"
      opacity="0.8"
      className={cx("icon__eye", "icon__eye--pupil")}
    />

    {/* Reflejo en el ojo */}
    <circle
      cx="35"
      cy="29"
      r="2"
      fill="white"
      opacity="0.9"
      className={cx("icon__eye", "icon__eye--highlight")}
    />

    {/* Líneas de dirección/enfoque visual */}
    <path
      d="M32 16V12"
      stroke="url(#visualGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={cx("icon__direction-line")}
    />
    <path
      d="M32 52V48"
      stroke="url(#visualGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={cx("icon__direction-line")}
    />
    <path
      d="M56 32H60"
      stroke="url(#visualGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={cx("icon__direction-line")}
    />
    <path
      d="M4 32H8"
      stroke="url(#visualGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={cx("icon__direction-line")}
    />
  </svg>
);

export const UIDesignIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--ui")}
  >
    <defs>
      <linearGradient id="uiGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect
      x="10"
      y="10"
      width="44"
      height="44"
      rx="4"
      stroke="url(#uiGradient)"
      strokeWidth="2.5"
      className={cx("icon__frame")}
    />
    <path
      d="M10 20H54"
      stroke="url(#uiGradient)"
      strokeWidth="2.5"
      className={cx("icon__header")}
    />
    <rect
      x="16"
      y="26"
      width="20"
      height="8"
      rx="2"
      fill="url(#uiGradient)"
      opacity="0.9"
      className={cx("icon__element", "icon__element--1")}
    />
    <rect
      x="16"
      y="38"
      width="32"
      height="10"
      rx="2"
      fill="url(#uiGradient)"
      opacity="0.7"
      className={cx("icon__element", "icon__element--2")}
    />
    <circle
      cx="44"
      cy="30"
      r="4"
      fill="url(#uiGradient)"
      opacity="0.9"
      className={cx("icon__element", "icon__element--3")}
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
    <defs>
      <linearGradient id="devGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <path
      d="M12 18L24 30L12 42"
      stroke="url(#devGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("icon__bracket", "icon__bracket--left")}
    />
    <path
      d="M52 18L40 30L52 42"
      stroke="url(#devGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("icon__bracket", "icon__bracket--right")}
    />
    <path
      d="M36 12L28 48"
      stroke="url(#devGradient)"
      strokeWidth="3"
      strokeLinecap="round"
      className={cx("icon__slash")}
    />
  </svg>
);
// export const LaunchIcon = () => (
//   <svg
//     viewBox="0 0 64 64"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className={cx("icon", "icon--launch")}
//   >
//     <defs>
//       <linearGradient id="launchGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
//         <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
//         <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.3" />
//       </linearGradient>
//     </defs>
//     {/* Botón de lanzamiento */}
//     <circle
//       cx="32"
//       cy="32"
//       r="18"
//       stroke="url(#launchGradient2)"
//       strokeWidth="2"
//     />
//     <circle
//       cx="32"
//       cy="32"
//       r="12"
//       fill="url(#launchGradient2)"
//       opacity="0.3"
//       stroke="url(#launchGradient2)"
//       strokeWidth="2"
//     />

//     {/* Triángulo de play/lanzamiento */}
//     <path
//       d="M28 26L38 32L28 38V26Z"
//       fill="url(#launchGradient2)"
//       opacity="0.8"
//       stroke="url(#launchGradient2)"
//       strokeWidth="2"
//       strokeLinejoin="round"
//     />

//     {/* Ondas de lanzamiento */}
//     <path
//       d="M32 8C17.6406 8 6 19.6406 6 34"
//       stroke="url(#launchGradient2)"
//       strokeWidth="1"
//       strokeLinecap="round"
//       strokeDasharray="2 2"
//     />
//     <path
//       d="M32 14C20.9543 14 12 22.9543 12 34"
//       stroke="url(#launchGradient2)"
//       strokeWidth="1"
//       strokeLinecap="round"
//       strokeDasharray="2 2"
//     />
//     <path
//       d="M58 34C58 19.6406 46.3594 8 32 8"
//       stroke="url(#launchGradient2)"
//       strokeWidth="1"
//       strokeLinecap="round"
//       strokeDasharray="2 2"
//     />
//     <path
//       d="M52 34C52 22.9543 43.0457 14 32 14"
//       stroke="url(#launchGradient2)"
//       strokeWidth="1"
//       strokeLinecap="round"
//       strokeDasharray="2 2"
//     />
//   </svg>
// );
export const LaunchIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--launch")}
  >
    <defs>
      <linearGradient id="launchGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* Base de lanzamiento */}
    <path
      d="M18 54H46"
      stroke="url(#launchGradient3)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M22 54L22 46"
      stroke="url(#launchGradient3)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M42 54L42 46"
      stroke="url(#launchGradient3)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Torre de lanzamiento */}
    <path
      d="M26 46H38"
      stroke="url(#launchGradient3)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M30 46L30 38"
      stroke="url(#launchGradient3)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M34 46L34 38"
      stroke="url(#launchGradient3)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Cohete */}
    <path
      d="M32 10L36 20L28 20L32 10Z"
      fill="url(#launchGradient3)"
      opacity="0.9"
      stroke="url(#launchGradient3)"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <rect
      x="28"
      y="20"
      width="8"
      height="16"
      fill="url(#launchGradient3)"
      opacity="0.4"
      stroke="url(#launchGradient3)"
      strokeWidth="2.5"
    />

    {/* Trayectoria y nubes */}
    <path
      d="M32 10C32 10 38 22 38 30"
      stroke="url(#launchGradient3)"
      strokeWidth="1.5"
      strokeDasharray="1 1"
    />

    {/* Nubes estilizadas */}
    <path
      d="M44 26C45.6569 26 47 24.6569 47 23C47 21.3431 45.6569 20 44 20C44 17.7909 42.2091 16 40 16C37.7909 16 36 17.7909 36 20"
      stroke="url(#launchGradient3)"
      strokeWidth="1.5"
    />
    <path
      d="M20 30C21.6569 30 23 28.6569 23 27C23 25.3431 21.6569 24 20 24C20 21.7909 18.2091 20 16 20C13.7909 20 12 21.7909 12 24"
      stroke="url(#launchGradient3)"
      strokeWidth="1.5"
    />
  </svg>
);
export const MaintenanceIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--maintenance")}
  >
    <defs>
      <linearGradient
        id="maintenanceGradient"
        x1="0%"
        y1="100%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <circle
      cx="32"
      cy="32"
      r="20"
      stroke="url(#maintenanceGradient)"
      strokeWidth="2.5"
      className={cx("icon__gear", "icon__gear--outer")}
    />
    <circle
      cx="32"
      cy="32"
      r="8"
      stroke="url(#maintenanceGradient)"
      strokeWidth="2.5"
      className={cx("icon__gear", "icon__gear--inner")}
    />
    <path
      d="M32 12V16M32 48V52M12 32H16M48 32H52M16.9 16.9L19.8 19.8M44.2 44.2L47.1 47.1M16.9 47.1L19.8 44.2M44.2 19.8L47.1 16.9"
      stroke="url(#maintenanceGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={cx("icon__teeth")}
    />
  </svg>
);

// Arrow component for connecting steps
export const ConnectorArrow = () => (
  <svg
    width="60"
    height="20"
    viewBox="0 0 60 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("connector")}
  >
    <defs>
      <linearGradient id="arrowGradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <path
      d="M0 10H54M54 10L45 1M54 10L45 19"
      stroke="url(#arrowGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("connector__arrow")}
    />
  </svg>
);

// Vertical connector for rows
export const VerticalConnector = () => (
  <svg
    width="20"
    height="60"
    viewBox="0 0 20 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("connector", "connector--vertical")}
  >
    <defs>
      <linearGradient id="verticalGradient" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <path
      d="M10 0V54M10 54L1 45M10 54L19 45"
      stroke="url(#verticalGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("connector__arrow")}
    />
  </svg>
);
