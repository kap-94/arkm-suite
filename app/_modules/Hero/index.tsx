"use client";

import React from "react";
import classNames from "classnames/bind";
import Link from "next/link"; // Importar Link de Next.js

import ProjectForm from "@/app/_components/ProjectForm";
import Modal from "@/app/_components/Modal";
import { Typography } from "@/app/_components/Typography";
import { Button } from "@/app/_components/Button";

import { HeroDictionary } from "@/app/_types/dictionary/home.types";

import styles from "./Hero.module.scss";

const cx = classNames.bind(styles);

interface HeroProps {
  dictionary: HeroDictionary;
  projectFormDictionary?: any; // Se recibe como prop separada
}

export const Hero = ({ dictionary, projectFormDictionary }: HeroProps) => (
  <section id="home" className={cx("hero")}>
    <div className={cx("hero__content")}>
      <div className={cx("hero__spacer")} />

      <div className={cx("hero__info")}>
        <Typography
          variant="h1"
          color="primary"
          fontWeight={600}
          fontFamily="sofia"
          theme="dark"
          className={cx("hero__info-text")}
        >
          {dictionary.description.description}
        </Typography>
        <Typography
          variant="h5"
          color="secondary"
          fontWeight={600}
          fontFamily="sofia"
          theme="dark"
          className={cx("hero__info-subtitle")}
        >
          {dictionary.title.main}
          <span className={cx("hero__info-subtitle-and-character")}>
            {dictionary.title.connector}
          </span>
          {dictionary.title.secondary}
        </Typography>
      </div>

      <div className={cx("hero__actions")}>
        {/* Reemplazar el Modal con un Link que navega a /portfolio */}
        <Link href="/portfolio">
          <Button
            size="lg"
            variant="gradient"
            className={cx("hero__cta-button")}
          >
            {dictionary.description.cta}
          </Button>
        </Link>

        <div className={cx("hero__scroll")}>
          <Typography
            variant="p3"
            color="secondary"
            fontFamily="sofia"
            fontWeight={600}
            theme="dark"
            className={cx("hero__scroll-text")}
          >
            {dictionary.scroll}
          </Typography>

          <div className={cx("hero__scroll-indicator")} />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
