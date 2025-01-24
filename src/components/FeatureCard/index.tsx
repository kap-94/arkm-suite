import classNames from "classnames/bind";
import { LucideIcon } from "lucide-react";
import Typography from "@/components/Typography";
import styles from "./featureCard.module.scss";

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
          variant="p3"
          color="secondary"
          fontWeight={500}
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
          variant="h5"
          // color="secondary"
          fontWeight={500}
          theme={{ type: "dark" }}
          className={cx("feature-card__title")}
        >
          {title}
        </Typography>
        <Typography
          variant="p1"
          color="secondary"
          fontWeight={300}
          theme={{ type: "dark" }}
        >
          {description}
        </Typography>
      </div>
    </div>
  );
}
