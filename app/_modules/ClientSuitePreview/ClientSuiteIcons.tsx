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
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <circle
      cx="32"
      cy="32"
      r="23"
      stroke="url(#progressGradient)"
      strokeWidth="3"
      className={cx("icon__circle")}
    />
    <path
      d="M32 9C44.1503 9 54 18.8497 54 31"
      stroke="url(#progressGradient)"
      strokeWidth="4"
      strokeLinecap="round"
      className={cx("icon__progress")}
    />
    <circle
      cx="54"
      cy="31"
      r="3"
      fill="url(#progressGradient)"
      className={cx("icon__pointer")}
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
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* <circle
      cx="32"
      cy="32"
      r="22"
      stroke="url(#collabGradient)"
      strokeWidth="1.5"
      strokeDasharray="4 2"
      className={cx("icon__orbit")}
    /> */}
    <circle
      cx="32"
      cy="12"
      r="4"
      fill="url(#collabGradient)"
      className={cx("icon__point", "icon__point--1")}
    />
    <circle
      cx="52"
      cy="32"
      r="4"
      fill="url(#collabGradient)"
      className={cx("icon__point", "icon__point--2")}
    />
    <circle
      cx="32"
      cy="52"
      r="4"
      fill="url(#collabGradient)"
      className={cx("icon__point", "icon__point--3")}
    />
    <circle
      cx="12"
      cy="32"
      r="4"
      fill="url(#collabGradient)"
      className={cx("icon__point", "icon__point--4")}
    />
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
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <rect
      x="15"
      y="9"
      width="34"
      height="43"
      rx="2"
      fill="currentColor"
      className={cx("icon__shadow")}
    />
    <path
      d="M15 9H41L49 17V52H15V9Z"
      stroke="url(#docGradient)"
      strokeWidth="2"
      fill="none"
      className={cx("icon__page")}
    />
    <path
      d="M40 9L40 17H48"
      stroke="url(#docGradient)"
      strokeWidth="2"
      className={cx("icon__corner")}
    />
    <path
      d="M24 24H40M24 32H40M24 40H40"
      stroke="url(#docGradient)"
      strokeWidth="2"
      className={cx("icon__lines")}
    />
    <circle
      cx="20"
      cy="40"
      r="1.5"
      fill="url(#docGradient)"
      className={cx("icon__status")}
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
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    <path
      d="M8 16H56V40H40L32 48L24 40H8V16Z"
      stroke="url(#chatGradient)"
      strokeWidth="2"
      fill="none"
      className={cx("icon__bubble", "icon__bubble--main")}
    />
    <circle
      cx="24"
      cy="28"
      r="3"
      fill="url(#chatGradient)"
      className={cx("icon__dot", "icon__dot--1")}
    />
    <circle
      cx="32"
      cy="28"
      r="3"
      fill="url(#chatGradient)"
      className={cx("icon__dot", "icon__dot--2")}
    />
    <circle
      cx="40"
      cy="28"
      r="3"
      fill="url(#chatGradient)"
      className={cx("icon__dot", "icon__dot--3")}
    />
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
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
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
      className={cx("icon__frame")}
    />
    <path
      d="M13 23H51"
      stroke="url(#calendarGradient)"
      strokeWidth="1.5"
      className={cx("icon__top")}
    />
    <path
      d="M22 33H42"
      stroke="url(#calendarGradient)"
      strokeWidth="1.5"
      className={cx("icon__marker")}
    />
    <path
      d="M22 41H42"
      stroke="url(#calendarGradient)"
      strokeWidth="1.5"
      className={cx("icon__marker")}
    />
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
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
      </linearGradient>
    </defs>

    <rect
      x="8"
      y="8"
      width="48"
      height="48"
      rx="8"
      fill="url(#dataGradient)"
      opacity="0.15"
    />

    <line
      x1="10"
      y1="50"
      x2="54"
      y2="50"
      stroke="url(#dataGradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={cx("icon__line")}
    />

    <rect
      x="14"
      y="34"
      width="8"
      height="16"
      rx="2"
      stroke="url(#dataGradient)"
      strokeWidth="2"
      fill="none"
      className={cx("icon__bar", "icon__bar--1")}
    />
    <rect
      x="28"
      y="22"
      width="8"
      height="28"
      rx="2"
      stroke="url(#dataGradient)"
      strokeWidth="2"
      fill="none"
      className={cx("icon__bar", "icon__bar--2")}
    />
    <rect
      x="42"
      y="14"
      width="8"
      height="36"
      rx="2"
      stroke="url(#dataGradient)"
      strokeWidth="2"
      fill="none"
      className={cx("icon__bar", "icon__bar--3")}
    />

    <circle cx="22" cy="30" r="2" fill="url(#dataGradient)" />
    <circle cx="36" cy="18" r="2" fill="url(#dataGradient)" />
    <circle cx="50" cy="12" r="2" fill="url(#dataGradient)" />
  </svg>
);
