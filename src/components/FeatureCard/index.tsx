// components/ui/feature-card.tsx
import { LucideIcon } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./featureCard.module.scss";

const cx = classNames.bind(styles);

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "mobile";
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "default",
}: FeatureCardProps) {
  if (variant === "mobile") {
    return (
      <div className={cx("feature-card-mobile")}>
        <span className={cx("feature-card-mobile__icon")}>
          <Icon size={18} strokeWidth={1.5} />
        </span>
        <h3 className={cx("feature-card-mobile__title")}>{title}</h3>
      </div>
    );
  }

  return (
    <div className={cx("feature-card")}>
      <span className={cx("feature-card__icon")}>
        <Icon size={22} strokeWidth={1.5} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
