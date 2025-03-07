import classNames from "classnames/bind";
import styles from "./ClientSuiteIcons.module.scss";

const cx = classNames.bind(styles);

export const ProgressIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--progress")}
  >
    <defs>
      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#62B6CB" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1B4965" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <circle
      cx="32"
      cy="32"
      r="23"
      stroke="url(#progressGradient)"
      strokeWidth="3"
      opacity="0.7"
    />
    <path
      d="M32 8C44.1503 8 54 17.8497 54 30"
      stroke="url(#progressGradient)"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

export const CollaborationIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--collaboration")}
  >
    <defs>
      <linearGradient id="collabGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#A2D2FF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#3A0CA3" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="12" r="4" fill="url(#collabGradient)" />
    <circle cx="52" cy="32" r="4" fill="url(#collabGradient)" />
    <circle cx="32" cy="52" r="4" fill="url(#collabGradient)" />
    <circle cx="12" cy="32" r="4" fill="url(#collabGradient)" />
  </svg>
);

export const DocumentIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--document")}
  >
    <defs>
      <linearGradient id="docGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#C9184A" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path
      d="M15 9H41L49 17V52H15V9Z"
      stroke="url(#docGradient)"
      strokeWidth="2"
      opacity="0.7"
    />
    <path d="M40 9L40 17H48" stroke="url(#docGradient)" strokeWidth="2" />
    <path
      d="M24 24H40M24 32H40M24 40H40"
      stroke="url(#docGradient)"
      strokeWidth="2"
      opacity="0.9"
    />
  </svg>
);

export const ChatIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--chat")}
  >
    <defs>
      <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path
      d="M8 16H56V40H40L32 48L24 40H8V16Z"
      stroke="url(#chatGradient)"
      strokeWidth="2"
      opacity="0.7"
    />
    <circle cx="24" cy="28" r="3" fill="url(#chatGradient)" opacity="0.8" />
    <circle cx="32" cy="28" r="3" fill="url(#chatGradient)" opacity="0.8" />
    <circle cx="40" cy="28" r="3" fill="url(#chatGradient)" opacity="0.8" />
  </svg>
);

export const CalendarIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--calendar")}
  >
    <defs>
      <linearGradient id="calendarGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#62B6CB" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#1B4965" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <rect
      x="13"
      y="14"
      width="38"
      height="38"
      rx="2"
      stroke="url(#calendarGradient)"
      strokeWidth="2"
      fill="none"
      opacity="0.7"
    />
    <path d="M13 23H51" stroke="url(#calendarGradient)" strokeWidth="1.5" />
    <path d="M22 33H42" stroke="url(#calendarGradient)" strokeWidth="1.5" />
    <path d="M22 41H42" stroke="url(#calendarGradient)" strokeWidth="1.5" />
  </svg>
);

export const DataIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--data")}
  >
    <defs>
      <linearGradient id="dataGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="axisGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#A2D2FF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#3A0CA3" stopOpacity="0.3" />
      </linearGradient>
    </defs>

    {/* Fondo translúcido para mayor contraste */}
    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="8"
      fill="url(#dataGradient)"
      opacity="0.15"
    />

    {/* Línea base (eje X) */}
    <line
      x1="10"
      y1="50"
      x2="54"
      y2="50"
      stroke="url(#axisGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.8"
    />

    {/* Barras con alturas distintas */}
    <rect
      x="14"
      y="34"
      width="8"
      height="16"
      fill="url(#dataGradient)"
      rx="2"
    />
    <rect
      x="28"
      y="22"
      width="8"
      height="28"
      fill="url(#dataGradient)"
      rx="2"
    />
    <rect
      x="42"
      y="14"
      width="8"
      height="36"
      fill="url(#dataGradient)"
      rx="2"
    />

    {/* Indicadores de datos adicionales */}
    <circle cx="22" cy="30" r="2" fill="url(#axisGradient)" />
    <circle cx="36" cy="18" r="2" fill="url(#axisGradient)" />
    <circle cx="50" cy="12" r="2" fill="url(#axisGradient)" />
  </svg>
);
