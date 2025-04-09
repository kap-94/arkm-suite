"use client"; // Importante para componentes del cliente en App Router

import { useRouter } from "next/navigation"; // Importa desde next/navigation
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./Brand.module.scss";

const cx = classNames.bind(styles);

export type BrandSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BrandVariant = "minimal" | "minimal-right";
export type BrandTheme = "dark" | "light" | "custom";

export interface BrandProps {
  variant?: BrandVariant;
  size?: BrandSize;
  className?: string;
  showStudio?: boolean;
  theme?: BrandTheme;
}

export const Brand: React.FC<BrandProps> = ({
  className,
  variant = "minimal",
  size = "md",
  showStudio = true,
  theme = "dark",
}) => {
  const router = useRouter();

  // Función para manejar el clic y forzar scroll hacia arriba
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    // Navegar a la ruta y luego hacer scroll hacia arriba
    router.push("/");

    // Usar setTimeout para asegurar que el scroll ocurra después de la navegación
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Puedes cambiar a "auto" para scroll instantáneo
      });
    }, 100);
  };

  return (
    <div className={cx("brand", className)}>
      <a
        href="/"
        className={cx("logo", `logo--${variant}`, `logo--${size}`, {
          "logo--light": theme === "light",
        })}
        onClick={handleClick}
      >
        {/* Variation: Minimal - clean and simple with smaller STUDIO underneath */}
        {variant === "minimal" && (
          <div className={cx("logo-container", "logo-container--minimal")}>
            <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
            {showStudio && (
              <span
                className={cx("logo-text", "logo-text--studio-under")}
                style={{ marginRight: "-1px" }}
              >
                SUITE
              </span>
            )}
          </div>
        )}

        {/* Variation: Minimal Right - clean and simple with smaller STUDIO on the right */}
        {variant === "minimal-right" && (
          <div
            className={cx("logo-container", "logo-container--minimal-right")}
          >
            <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
            {showStudio && (
              <span
                className={cx("logo-text", "logo-text--studio-right-aligned")}
              >
                SUITE
              </span>
            )}
          </div>
        )}
      </a>
    </div>
  );
};

export default Brand;
