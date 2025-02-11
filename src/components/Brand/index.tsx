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
        <span className={cx("logo-text")}>Studio</span>
      </div>
    </Link>
  </div>
);

export default Brand;
