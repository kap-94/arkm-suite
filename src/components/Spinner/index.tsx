// Spinner.tsx
import classNames from "classnames/bind";
import styles from "./Spinner.module.scss";

const cx = classNames.bind(styles);

interface SpinnerProps {
  className?: string;
  theme?: {
    type: "light" | "dark" | "custom";
  };
  size?: "sm" | "md" | "lg";
}

const Spinner: React.FC<SpinnerProps> = ({
  className,
  theme = { type: "light" },
  size = "md",
}) => {
  return (
    <div
      className={cx(
        "spinner",
        `spinner--theme-${theme.type}`,
        `spinner--${size}`,
        className
      )}
    >
      <div className={cx("spinner__element")}></div>
    </div>
  );
};

export default Spinner;
