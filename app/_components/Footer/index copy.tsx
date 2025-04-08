"use client";

import dynamic from "next/dynamic";
import classNames from "classnames/bind";
import Typography from "../Typography";
import { FiTwitter, FiGithub, FiInstagram } from "react-icons/fi";
import Modal from "../Modal";
import { Button } from "../Button";
import ProjectForm from "../ProjectForm";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

// Importamos FooterParticles de forma dinámica con SSR desactivado
// para que únicamente se cargue/renderice en el cliente.
const FooterParticles = dynamic(
  () => import("./advanced-backgrounds/FooterParticlesOption3"),
  {
    ssr: false,
  }
);

interface FooterProps {
  dictionary?: any;
}

export const Footer = ({ dictionary }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  // Fallback text for when dictionary is not available
  const footerText = {
    description:
      dictionary?.description ||
      "Creating digital experiences that inspire, transform and innovate.",
    cta: dictionary?.cta || "Connect With Us Today",
    links: {
      showcase: dictionary?.links?.showcase || "Showcase",
      solutions: dictionary?.links?.solutions || "Solutions",
      clientSuite: dictionary?.links?.clientSuite || "Client's Suite",
      journey: dictionary?.links?.journey || "Journey",
    },
    copyright: (
      dictionary?.copyright || "© {year} ARKM Studio. All rights reserved."
    ).replace("{year}", currentYear),
  };

  return (
    <footer className={cx("footer")}>
      {/* Partículas de fondo */}
      <div className={cx("footer__particles-wrapper")}>
        {/* <FooterParticles /> */}
      </div>

      {/* Contenedor principal */}
      <div className={cx("footer__container")}>
        {/* Contenido a la izquierda */}
        <div className={cx("footer__content")}>
          <div className={cx("footer__information")}>
            {/* Descripción */}
            <Typography
              variant="h3"
              theme="dark"
              fontFamily="sofia"
              color="primary"
              fontWeight={500}
              style={{ maxWidth: "420px" }}
            >
              {footerText.description}
            </Typography>

            {/* Redes sociales */}
            <div className={cx("footer__social")}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("footer__social-link")}
              >
                <FiTwitter strokeWidth={2.2} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("footer__social-link")}
              >
                <FiGithub strokeWidth={2.2} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("footer__social-link")}
              >
                <FiInstagram strokeWidth={2.2} />
              </a>
            </div>

            <Modal>
              <Modal.Open opens="project-form">
                <Button size="md" className={cx("footer__cta")}>
                  {footerText.cta}
                </Button>
              </Modal.Open>
              <Modal.Window name="project-form">
                <ProjectForm />
              </Modal.Window>
            </Modal>
          </div>

          {/* Links */}
          <div className={cx("footer__links")}>
            <a href="/showcase" className={cx("footer__link")}>
              <Typography
                variant="p2"
                theme="dark"
                fontFamily="sofia"
                color="secondary"
                fontWeight={400}
              >
                {footerText.links.showcase}
              </Typography>
            </a>
            <a href="/solutions" className={cx("footer__link")}>
              <Typography
                fontFamily="sofia"
                variant="p2"
                theme="dark"
                color="secondary"
                fontWeight={400}
              >
                {footerText.links.solutions}
              </Typography>
            </a>
            <a href="/client-suite" className={cx("footer__link")}>
              <Typography
                variant="p2"
                fontFamily="sofia"
                theme="dark"
                color="secondary"
                fontWeight={400}
              >
                {footerText.links.clientSuite}
              </Typography>
            </a>
            <a href="/process" className={cx("footer__link")}>
              <Typography
                variant="p2"
                theme="dark"
                color="secondary"
                fontWeight={400}
              >
                {footerText.links.journey}
              </Typography>
            </a>
          </div>
        </div>

        {/* Parte inferior del footer con copyright */}
        <div className={cx("footer__bottom-wrapper")}>
          <div className={cx("footer__bottom")}>
            <div className={cx("footer__copyright")}>
              <Typography
                variant="p3"
                theme="dark"
                color="tertiary"
                fontWeight={300}
              >
                {footerText.copyright}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
