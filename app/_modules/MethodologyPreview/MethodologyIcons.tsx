import classNames from "classnames/bind";
import styles from "./MethodologyPreview.module.scss";

const cx = classNames.bind(styles);

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
    {/* <circle
      cx="35"
      cy="29"
      r="2"
      fill="white"
      opacity="0.9"
      className={cx("icon__eye", "icon__eye--highlight")}
    /> */}

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
    // Further reduced size for an even smaller icon
    width={42}
    height={42}
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
      x="11"
      y="11"
      width="42"
      height="42"
      rx="4"
      stroke="url(#uiGradient)"
      strokeWidth="2"
      className={cx("icon__frame")}
    />
    <path
      d="M11 20H53"
      stroke="url(#uiGradient)"
      strokeWidth="2"
      className={cx("icon__header")}
    />
    <rect
      x="17"
      y="26"
      width="19"
      height="7"
      rx="2"
      fill="url(#uiGradient)"
      opacity="0.9"
      className={cx("icon__element", "icon__element--1")}
    />
    <rect
      x="17"
      y="38"
      width="31"
      height="9"
      rx="2"
      fill="url(#uiGradient)"
      opacity="0.7"
      className={cx("icon__element", "icon__element--2")}
    />
    <circle
      cx="44"
      cy="30"
      r="3.5"
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

export const TestsIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--tests")}
  >
    <defs>
      <linearGradient id="testsGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>

    {/* Outer circle (gear-like) */}
    <circle
      cx="32"
      cy="32"
      r="20"
      stroke="url(#testsGradient)"
      strokeWidth="2.5"
      className={cx("icon__gear", "icon__gear--outer")}
    />

    {/* Centered flask with fill */}
    <path
      d="M30.5 21.5H33.5V29.5L39.5 40.5H24.5L30.5 29.5V21.5Z"
      stroke="url(#testsGradient)"
      fill="url(#testsGradient)"
      fillOpacity="0.9"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("icon__test-flask")}
    />
  </svg>
);

export const LaunchIcon = () => (
  <svg
    // Significantly increased size for a much bigger icon
    width={120}
    height={120}
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

    {/* Solo dejamos el cohete */}
    <path
      d="M32 8L38 22L26 22L32 8Z"
      fill="url(#launchGradient3)"
      opacity="0.9"
      stroke="url(#launchGradient3)"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <rect
      x="26"
      y="22"
      width="12"
      height="24"
      fill="url(#launchGradient3)"
      opacity="0.4"
      stroke="url(#launchGradient3)"
      strokeWidth="3"
    />
  </svg>
);

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
