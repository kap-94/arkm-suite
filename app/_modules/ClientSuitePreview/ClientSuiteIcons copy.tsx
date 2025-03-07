// src/components/ClientSuite/SuiteIcons.tsx
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
    <circle
      className={cx("icon__circle")}
      cx="32"
      cy="32"
      r="23"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <path
      className={cx("icon__progress")}
      d="M32 8C44.1503 8 54 17.8497 54 30"
      stroke="currentColor"
      strokeWidth="3.7"
      strokeLinecap="round"
    />
    {/* <path
      className={cx("icon__pointer")}
      d="M32 14L38 20L26 20L32 14Z"
      fill="currentColor"
    /> */}
  </svg>
);

export const CollaborationIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--collaboration")}
  >
    {/* <circle
      className={cx("icon__orbit")}
      cx="32"
      cy="32"
      r="20"
      stroke="currentColor"
      strokeWidth="2"
    /> */}
    <circle
      className={cx("icon__point", "icon__point--1")}
      cx="32"
      cy="12"
      r="4"
      fill="currentColor"
    />
    <circle
      className={cx("icon__point", "icon__point--2")}
      cx="52"
      cy="32"
      r="4"
      fill="currentColor"
    />
    <circle
      className={cx("icon__point", "icon__point--3")}
      cx="32"
      cy="52"
      r="4"
      fill="currentColor"
    />
    <circle
      className={cx("icon__point", "icon__point--4")}
      cx="12"
      cy="32"
      r="4"
      fill="currentColor"
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
    {/* Fondo con sombra sutil (altura reducida) */}
    <rect
      className={cx("icon__shadow")}
      x="18"
      y="11"
      width="30"
      height="44"
      rx="2"
    />

    {/* Página principal (altura reducida) */}
    <path
      className={cx("icon__page")}
      d="M15 9H41L49 17V52H15V9Z" // Cambiado de "M16 9H40L48 17V53H16V9Z"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Esquina doblada */}
    <path
      className={cx("icon__corner")}
      d="M40 9L40 17H48"
      stroke="currentColor"
      strokeWidth="2"
    />

    <path
      className={cx("icon__lines")}
      d="M24 24H40M24 32H40M24 40H40"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.9"
    />

    {/* Indicador de estado (opcional, descomenta si lo deseas) */}
    {/* <rect
      className={cx("icon__shadow")}
      x="18"
      y="11"
      width="30"
      height="42"
      rx="2"
    /> */}
  </svg>
);

export const ChatIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cx("icon", "icon--chat")}
  >
    <path
      className={cx("icon__bubble", "icon__bubble--main")}
      d="M8 16H56V40H40L32 48L24 40H8V16Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      className={cx("icon__dot", "icon__dot--1")}
      cx="24"
      cy="28"
      r="3"
      fill="currentColor"
      opacity="0.9"
    />
    <circle
      className={cx("icon__dot", "icon__dot--2")}
      cx="32"
      cy="28"
      r="3"
      fill="currentColor"
      opacity="0.9"
    />
    <circle
      className={cx("icon__dot", "icon__dot--3")}
      cx="40"
      cy="28"
      r="3"
      fill="currentColor"
      opacity="0.9"
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
    {/* Marco exterior refinado - ajustado para alinear con los demás iconos */}
    <rect
      className={cx("icon__frame")}
      x="13"
      y="14"
      width="38"
      height="38"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />

    {/* Elemento superior abstracto */}
    <path
      className={cx("icon__top")}
      d="M13 23H51"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Indicadores abstractos horizontales */}
    <path
      className={cx("icon__marker")}
      d="M22 33H42"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.9"
    />
    <path
      className={cx("icon__marker")}
      d="M22 41H42"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.9"
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
    <path
      className={cx("icon__bar", "icon__bar--1")}
      d="M16 48V32"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      className={cx("icon__bar", "icon__bar--2")}
      d="M28 48V24"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      className={cx("icon__bar", "icon__bar--3")}
      d="M40 48V16"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* <path
      className={cx("icon__line")}
      d="M8 48H56"
      stroke="currentColor"
      strokeWidth="2"
    /> */}
  </svg>
);
