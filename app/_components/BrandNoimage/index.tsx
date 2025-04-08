"use client"; // Importante para componentes del cliente en App Router

import { useRouter } from "next/navigation"; // Importa desde next/navigation
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
  | "framed"
  | "minimal"
  | "minimal-right"
  | "stacked"
  | "bracket"
  | "elevated"
  | "underlined"
  | "perspective"
  | "twist"
  | "fold"
  | "depth";

export interface BrandProps {
  variant?: BrandVariant;
  size?: BrandSize;
  className?: string;
  showStudio?: boolean;
}

export const Brand: React.FC<BrandProps> = ({
  className,
  variant = "default",
  size = "md",
  showStudio = true,
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
        className={cx("logo", `logo--${variant}`, `logo--${size}`)}
        onClick={handleClick}
      >
        {/* Variation 1: Default with studio to the right */}
        {variant === "default" && (
          <div className={cx("logo-container")}>
            <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
            {showStudio && (
              <>
                <div className={cx("logo-separator")} />
                <span className={cx("logo-text", "logo-text--studio")}>
                  STUDIO
                </span>
              </>
            )}
          </div>
        )}

        {/* Variation 2: Minimal - clean and simple with smaller STUDIO underneath */}
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

        {/* Variation 3: Stacked - vertical alignment */}
        {variant === "stacked" && (
          <div className={cx("logo-container", "logo-container--stacked")}>
            <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
            {showStudio && (
              <span className={cx("logo-text", "logo-text--studio")}>
                SUITE
              </span>
            )}
          </div>
        )}

        {/* Variation 4: Bracket - with elegant brackets */}
        {variant === "bracket" && (
          <div className={cx("logo-container", "logo-container--bracket")}>
            <span className={cx("logo-bracket", "logo-bracket--left")}>[</span>
            <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
            {showStudio && (
              <span className={cx("logo-text", "logo-text--studio")}>
                SUITE
              </span>
            )}
            <span className={cx("logo-bracket", "logo-bracket--right")}>]</span>
          </div>
        )}

        {/* Variation 5: Elevated - STUDIO as superscript */}
        {variant === "elevated" && (
          <div className={cx("logo-container", "logo-container--elevated")}>
            <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
            {showStudio && (
              <span className={cx("logo-text", "logo-text--studio-elevated")}>
                SUITE
              </span>
            )}
          </div>
        )}

        {/* Variation 6: Underlined with Studio underneath */}
        {variant === "underlined" && (
          <div className={cx("logo-container", "logo-container--underlined")}>
            <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
            <div className={cx("logo-underline")} />
            {showStudio && (
              <span
                className={cx(
                  "logo-text",
                  "logo-text--studio-under",
                  "logo-text--studio-right"
                )}
              >
                SUITE
              </span>
            )}
          </div>
        )}

        {/* Variation 7: Perspective - Text with 3D perspective effect */}
        {variant === "perspective" && (
          <div className={cx("logo-container", "logo-container--perspective")}>
            <span className={cx("logo-text", "logo-text--perspective")}>
              <span className={cx("logo-text-char")}>A</span>
              <span className={cx("logo-text-char")}>R</span>
              <span className={cx("logo-text-char")}>K</span>
              <span className={cx("logo-text-char")}>M</span>
            </span>
            {showStudio && (
              <span
                className={cx(
                  "logo-text",
                  "logo-text--studio",
                  "logo-text--studio-perspective"
                )}
              >
                SUITE
              </span>
            )}
          </div>
        )}

        {/* Variation 8: Twist - Middle characters twisted/rotated */}
        {variant === "twist" && (
          <div className={cx("logo-container", "logo-container--twist")}>
            <div className={cx("logo-text", "logo-text--twist")}>
              <span className={cx("logo-text-char")}>A</span>
              <span className={cx("logo-text-char", "logo-text-char--twist")}>
                R
              </span>
              <span className={cx("logo-text-char", "logo-text-char--twist")}>
                K
              </span>
              <span className={cx("logo-text-char")}>M</span>
            </div>
            {showStudio && (
              <span
                className={cx(
                  "logo-text",
                  "logo-text--studio",
                  "logo-text--studio-twist"
                )}
              >
                SUITE
              </span>
            )}
          </div>
        )}

        {/* Variation 9: Fold - Folded effect in the middle */}
        {variant === "fold" && (
          <div className={cx("logo-container", "logo-container--fold")}>
            <div className={cx("logo-text", "logo-text--fold")}>
              <span className={cx("logo-text-fold", "logo-text-fold--left")}>
                AR
              </span>
              <span className={cx("logo-text-fold-line")}></span>
              <span className={cx("logo-text-fold", "logo-text-fold--right")}>
                KM
              </span>
            </div>
            {showStudio && (
              <span
                className={cx(
                  "logo-text",
                  "logo-text--studio",
                  "logo-text--studio-fold"
                )}
              >
                SUITE
              </span>
            )}
          </div>
        )}

        {/* Variation 10: Depth - Subtle shadow/layer effect for depth */}
        {variant === "depth" && (
          <div className={cx("logo-container", "logo-container--depth")}>
            <div className={cx("logo-text", "logo-text--depth")}>
              <span className={cx("logo-text-shadow")}>ARKM</span>
              <span className={cx("logo-text-front")}>ARKM</span>
            </div>
            {showStudio && (
              <span
                className={cx(
                  "logo-text",
                  "logo-text--studio",
                  "logo-text--studio-depth"
                )}
              >
                SUITE
              </span>
            )}
          </div>
        )}

        {/* Other variants from the original component */}
        {(variant === "double-border" ||
          variant === "asymmetric" ||
          variant === "wide-separator" ||
          variant === "framed") && (
          <div className={cx("logo-container")}>
            <span className={cx("logo-text", "logo-text--bold")}>ARKM</span>
            {showStudio && (
              <>
                <div className={cx("logo-separator")} />
                <span className={cx("logo-text", "logo-text--studio")}>
                  STUDIO
                </span>
              </>
            )}
          </div>
        )}
      </a>
    </div>
  );
};

export default Brand;
