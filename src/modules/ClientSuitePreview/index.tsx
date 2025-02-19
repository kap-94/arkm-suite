import classNames from "classnames/bind";
import { Typography } from "@/components/Typography";
import { Benefits } from "@/components/Benefits";
import { ImageSlider } from "@/components/ImageSlider";
import styles from "./ClientSuitePreview.module.scss";

const cx = classNames.bind(styles);

export const ClientSuitePreview = () => {
  return (
    <section className={cx("suite")}>
      <div className={cx("suite__container")}>
        <div className={cx("suite__header")}>
          <Typography
            variant="h2"
            color="primary"
            fontFamily="kranto"
            fontWeight={400}
            theme="dark"
            className={cx("suite__title")}
            align="left"
          >
            Acceda a nuestra Suite del Cliente
          </Typography>
          <Typography
            variant="p1"
            color="tertiary"
            theme="dark"
            fontWeight={300}
            fontFamily="usual"
            className={cx("suite__subtitle")}
          >
            Una plataforma integral que centraliza la gestión de proyectos con
            visibilidad en tiempo real y herramientas de seguimiento.
          </Typography>
        </div>

        <div className={cx("suite__preview")}>
          <ImageSlider />
        </div>

        <Benefits />
      </div>
    </section>
  );
};

export default ClientSuitePreview;
