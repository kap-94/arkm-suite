// src/components/Benefits/Benefits.tsx
import { Typography } from "../Typography";
import classNames from "classnames/bind";
import {
  ProgressIcon,
  CollaborationIcon,
  DocumentIcon,
  ChatIcon,
  DataIcon,
  CalendarIcon,
} from "@/app/_modules/ClientSuitePreview/ClientSuiteIcons";
import styles from "./Benefits.module.scss";

const cx = classNames.bind(styles);

export interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Default benefits data as fallback
const defaultBenefitsData: Omit<BenefitProps, "icon">[] = [
  {
    title: "Effective Collaboration",
    description: "Communicate directly with our team and evaluate each phase.",
  },
  {
    title: "Real-Time Tracking",
    description: "Monitor your project's progress with real-time metrics.",
  },
  {
    title: "Document Management",
    description:
      "Access all project documentation, resources, and deliverables.",
  },
  {
    title: "Metrics and Reports",
    description:
      "Analyze performance and progress with detailed reports and metrics.",
  },
  {
    title: "Clear Planning",
    description:
      "Visualize milestones, key dates, and detailed project timelines.",
  },
  {
    title: "Direct Communication",
    description: "Dedicated communication channel with conversation tracking.",
  },
];

// Icons mapping
const benefitIcons = [
  <CollaborationIcon key="collaboration" />,
  <ProgressIcon key="progress" />,
  <DocumentIcon key="document" />,
  <DataIcon key="data" />,
  <CalendarIcon key="calendar" />,
  <ChatIcon key="chat" />,
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

interface BenefitsProps {
  benefits?: Omit<BenefitProps, "icon">[];
}

export const Benefits = ({ benefits }: BenefitsProps) => {
  // Use provided benefits from dictionary or fallback to default data
  const benefitsData = benefits || defaultBenefitsData;

  // Map benefits data with icons
  const benefitsWithIcons = benefitsData.map((benefit, index) => ({
    ...benefit,
    icon: benefitIcons[index % benefitIcons.length],
  }));

  return (
    <div className={cx("benefits")}>
      {benefitsWithIcons.map((benefit, index) => (
        <BenefitItem key={index} {...benefit} delay={index} />
      ))}
    </div>
  );
};

export default Benefits;
