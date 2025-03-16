import React from "react";
import classNames from "classnames/bind";
import { Typography } from "../../Typography";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

// Add this to your ProjectForm.module.scss
// .summary-option__icon-svg {
//   fill: $white-base;
//   stroke: $black-base;
// }

interface SummaryItem {
  term: string;
  description: string;
}

interface SummarySectionProps {
  title: string;
  items: SummaryItem[];
}

import {
  Shapes,
  CircleDollarSign,
  Clock,
  Building,
  Mail,
  Phone,
  User,
  FileText,
} from "lucide-react";

export const SummarySection: React.FC<SummarySectionProps> = ({
  title,
  items,
}) => {
  // Función para obtener el icono basado en el término
  const getIcon = (term: string) => {
    // We'll let CSS handle the colors through the className
    const iconProps = {
      size: 16,
      fill: "white", // This will be overridden by CSS
      stroke: "black", // This will be overridden by CSS
      strokeWidth: 1.5,
      className: cx("summary-option__icon-svg"),
    };

    // Special case for FileText which has a different size
    const fileTextProps = {
      size: 18,
      fill: "white", // This will be overridden by CSS
      stroke: "black", // This will be overridden by CSS
      strokeWidth: 1.5,
      className: cx("summary-option__icon-svg"),
    };

    if (term.includes("Type")) return <Shapes {...iconProps} />;
    if (term.includes("Budget")) return <CircleDollarSign {...iconProps} />;
    if (term.includes("Timeline")) return <Clock {...iconProps} />;
    if (term.includes("Company")) return <Building {...iconProps} />;
    if (term.includes("Email")) return <Mail {...iconProps} />;
    if (term.includes("Phone")) return <Phone {...iconProps} />;
    if (term.includes("Contact")) return <User {...iconProps} />;
    return <FileText {...fileTextProps} />;
  };

  return (
    <div className={cx("summary-option")}>
      <div className={cx("summary-option__header")}>
        <Typography
          theme="dark"
          fontFamily="sofia"
          fontWeight={600}
          variant="p2"
          className={cx("summary-option__title")}
        >
          {title}
        </Typography>
      </div>
      <div className={cx("summary-option__items")}>
        {items.map((item, index) => (
          <div key={index} className={cx("summary-option__item")}>
            <div className={cx("summary-option__icon")}>
              <span className={cx("icon-wrapper")}>{getIcon(item.term)}</span>
            </div>
            <div className={cx("summary-option__content")}>
              <Typography
                theme="dark"
                variant="p2"
                color="tertiary"
                fontWeight={400}
                fontFamily="sofia"
                className={cx("summary-option__term")}
              >
                {item.term}
              </Typography>
              <Typography
                theme="dark"
                variant="p2"
                color="secondary"
                fontWeight={500}
                fontFamily="sofia"
                className={cx("summary-option__description")}
              >
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummarySection;
