import classNames from "classnames/bind";
import { Typography } from "@/app/_components/Typography";
import { Benefits } from "@/app/_components/Benefits";
import { ImageSlider } from "@/app/_components/ImageSlider";
import styles from "./ClientSuitePreview.module.scss";

const cx = classNames.bind(styles);

interface ClientSuitePreviewProps {
  dictionary?: any;
}

export const ClientSuitePreview = ({ dictionary }: ClientSuitePreviewProps) => {
  return (
    <section className={cx("suite")}>
      <div className={cx("suite__container")}>
        <div className={cx("suite__header")}>
          <Typography
            variant="h2"
            color="primary"
            fontFamily="sofia"
            fontWeight={400}
            theme="dark"
            className={cx("suite__title")}
            align="left"
          >
            {dictionary?.title || "Access our Client Suite"}
          </Typography>
          <Typography
            variant="p1"
            color="tertiary"
            theme="dark"
            fontWeight={300}
            fontFamily="sofia"
            className={cx("suite__subtitle")}
          >
            {dictionary?.subtitle ||
              "A comprehensive platform that centralizes project management with real-time visibility and tracking tools."}
          </Typography>
        </div>

        <div className={cx("suite__preview")}>
          <ImageSlider />
        </div>

        <Benefits benefits={dictionary?.benefits} />
      </div>
    </section>
  );
};

export default ClientSuitePreview;
