// src/components/Benefits/Benefits.tsx
import { Typography } from "@/components/Typography";
import classNames from "classnames/bind";
import {
  ProgressIcon,
  CollaborationIcon,
  DocumentIcon,
  ChatIcon,
  DataIcon,
  CalendarIcon,
} from "@/modules/ClientSuitePreview/ClientSuiteIcons";
import styles from "./Benefits.module.scss";

const cx = classNames.bind(styles);

export interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const benefitsData: BenefitProps[] = [
  {
    icon: <CollaborationIcon />,
    title: "Colaboración efectiva",
    description:
      "Comunícate directamente con nuestro equipo y evalua cada fase.",
  },
  {
    icon: <ProgressIcon />,
    title: "Seguimiento en tiempo real",
    description:
      "Monitorea el progreso de tu proyecto con métricas en tiempo real.",
  },
  {
    icon: <DocumentIcon />,
    title: "Gestión de los documentos",
    description:
      "Accede a toda la documentación, recursos y entregables del proyecto.",
  },
  {
    icon: <DataIcon />,
    title: "Métricas y reportes",
    description:
      "Analiza el rendimiento y avance con reportes y métricas detalladas.",
  },
  {
    icon: <CalendarIcon />,
    title: "Planificación clara",
    description:
      "Visualiza hitos, fechas clave y cronogramas detallados del proyecto.",
  },
  {
    icon: <ChatIcon />,
    title: "Comunicación directa",
    description:
      "Canal de comunicación dedicado con seguimiento de conversaciones.",
  },
];

const BenefitItem = ({
  icon,
  title,
  description,
  delay,
}: BenefitProps & { delay: number }) => (
  <div
    className={cx("benefit")}
    style={{ "--delay": `${delay * 0.1}s` } as React.CSSProperties}
  >
    <div className={cx("benefit__content")}>
      <div className={cx("benefit__header")}>
        <Typography
          variant="h3"
          color="primary"
          fontFamily="usual"
          theme="dark"
          fontWeight={400}
          className={cx("benefit__title")}
        >
          {title}
        </Typography>
        <div className={cx("benefit__icon")}>{icon}</div>
      </div>

      <Typography
        variant="p2"
        color="tertiary"
        theme="dark"
        fontWeight={300}
        fontFamily="usual"
        className={cx("benefit__description")}
      >
        {description}
      </Typography>
    </div>
  </div>
);

export const Benefits = () => (
  <div className={cx("benefits")}>
    {benefitsData.map((benefit, index) => (
      <BenefitItem key={index} {...benefit} delay={index} />
    ))}
  </div>
);
