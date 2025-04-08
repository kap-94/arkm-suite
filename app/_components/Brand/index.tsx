"use client"; // Importante para componentes del cliente en App Router

import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Brand.module.scss";

const cx = classNames.bind(styles);

export type BrandSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface BrandProps {
  size?: BrandSize;
  className?: string;
  showStudio?: boolean;
}

export const Brand: React.FC<BrandProps> = ({
  className,
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
        className={cx("logo", `logo--minimal`, `logo--${size}`)}
        onClick={handleClick}
      >
        <div className={cx("logo-container", "logo-container--minimal")}>
          <div className={cx("logo-image-container")}>
            <Image
              src="/images/logo.png" // Asegúrate de tener este archivo en tu carpeta public
              alt="Logo"
              width={48}
              height={48}
              className={cx("logo-image")}
              priority // Añadido para cargar el logo con prioridad
            />
          </div>
          {/* {showStudio && (
            <span className={cx("logo-text", "logo-text--studio-under")}>
              Pablo Karam
            </span>
          )} */}
        </div>
      </a>
    </div>
  );
};

export default Brand;
