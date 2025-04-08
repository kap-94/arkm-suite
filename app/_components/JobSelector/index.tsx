import classNames from "classnames/bind";
import { Typography } from "@/app/_components/Typography";
import { Code, Database, Layout, Briefcase, Code2 } from "lucide-react";
import styles from "./JobSelector.module.scss";

interface JobSelectorProps {
  isActive: boolean;
  company: string;
  role: string;
  industry?: string;
  iconType?: string;
}

const cx = classNames.bind(styles);

export default function JobSelector({
  isActive,
  company,
  role,
  industry,
  iconType,
}: JobSelectorProps) {
  // Función para renderizar el icono según el tipo
  const renderIcon = () => {
    switch (iconType?.toLowerCase()) {
      case "development":
        return <Code2 className={cx("selector__icon")} size={18} />;
      case "data":
        return <Database className={cx("selector__icon")} size={18} />;
      case "design":
        return <Layout className={cx("selector__icon")} size={18} />;
      default:
        return <Briefcase className={cx("selector__icon")} size={18} />;
    }
  };

  return (
    <div
      className={cx("selector__info", { "selector__info--active": isActive })}
    >
      <div className={cx("selector__header")}>
        <Typography
          variant="p1"
          fontWeight={600}
          fontFamily="sofia"
          color="secondary"
          theme="dark"
          className={cx("selector__company")}
        >
          {company}
        </Typography>

        {industry && (
          <div className={cx("selector__industry-container")}>
            <Typography
              variant="p3"
              fontFamily="sofia"
              color="secondary"
              theme="dark"
              fontWeight={500}
              className={cx("selector__industry")}
            >
              {industry}
            </Typography>
          </div>
        )}
      </div>

      <div className={cx("selector__role-container")}>
        {/* {iconType && (
          <div className={cx("selector__icon-container")}>{renderIcon()}</div>
        )} */}
        <Typography
          variant="p3"
          fontFamily="sofia"
          color="secondary"
          theme="dark"
          fontWeight={500}
          className={cx("selector__role")}
        >
          {role}
        </Typography>
      </div>
    </div>
  );
}
