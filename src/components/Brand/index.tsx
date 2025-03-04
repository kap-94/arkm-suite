import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./Brand.module.scss";

const cx = classNames.bind(styles);

export type BrandSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BrandVariant =
  | "default"
  | "double-border"
  | "asymmetric"
  | "wide-separator"
  | "framed";

export interface BrandProps {
  variant?: BrandVariant;
  size?: BrandSize;
  className?: string;
}

export const Brand: React.FC<BrandProps> = ({
  className,
  variant = "default",
  size = "md",
}) => (
  <div className={cx("brand", className)}>
    <Link href="/" className={cx("logo", `logo--${variant}`, `logo--${size}`)}>
      <div className={cx("logo-container")}>
        <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
        <div className={cx("logo-separator")} />
        {/* <svg
          style={{
            height: "28px",
          }}
        >
          <text y="28" fill="none" stroke="#6366f1" strokeWidth="1.2">
            WEB
          </text>
        </svg> */}
        <svg
          style={{
            height: "28px",
            maxWidth: "54px",
          }}
        >
          <defs>
            <linearGradient
              id="shimmerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.45)" />
              {/* <stop offset="30%" stopColor="rgba(99, 102, 241, .6)" /> */}
              <stop offset="100%" stopColor="rgba(99, 102, 241, .95)" />
            </linearGradient>
          </defs>
          <text
            y="28"
            fill="none"
            stroke="url(#shimmerGradient)"
            strokeWidth="1.25"
          >
            WEB
          </text>
        </svg>
      </div>
    </Link>
  </div>
);

export default Brand;
