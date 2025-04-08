import classNames from "classnames/bind";
import { LucideIcon } from "lucide-react";
import Typography from "../Typography";
import styles from "./FeatureCard.module.scss";

const cx = classNames.bind(styles);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "mobile";
}

export function FeatureCard({
  icon,
  title,
  description,
  variant = "default",
}: FeatureCardProps) {
  if (variant === "mobile") {
    return (
      <div className={cx("feature-card-mobile")}>
        <span className={cx("feature-card-mobile__icon")}>{icon}</span>
        <Typography
          fontFamily="sofia"
          variant="p3"
          color="secondary"
          fontWeight={400}
          align="center"
          theme={{ type: "dark" }}
          className={cx("feature-card-mobile__title")}
        >
          {title}
        </Typography>
      </div>
    );
  }

  return (
    <div className={cx("feature-card")}>
      <span className={cx("feature-card__icon")}>{icon}</span>
      <div>
        <Typography
          fontFamily="sofia"
          variant="p1"
          // color="secondary"
          fontWeight={500}
          theme={{ type: "dark" }}
          className={cx("feature-card__title")}
        >
          {title}
        </Typography>
        <Typography
          fontFamily="sofia"
          variant="p1"
          color="secondary"
          fontWeight={300}
          theme={{ type: "dark" }}
          className={cx("feature-card__description")}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
}
