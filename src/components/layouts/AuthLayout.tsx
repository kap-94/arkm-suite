// components/layouts/AuthLayout/AuthLayout.tsx
"use client";

import { Language } from "@/config/i18n";
import { UIProvider } from "@/context/UIContext";
import { useLanguage } from "@/context/LanguageContext";
import { Brand } from "@/components/Header/components";
import { Gauge, Layers, BarChart, ArrowLeft } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./AuthLayout.module.scss";

const cx = classNames.bind(styles);

interface AuthLayoutProps {
  children: React.ReactNode;
  lang: Language;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useLanguage();

  const features = [
    {
      icon: Gauge,
      title: t("auth.signin.features.projectControl.title"),
      description: t("auth.signin.features.projectControl.description"),
    },
    {
      icon: Layers,
      title: t("auth.signin.features.assetManagement.title"),
      description: t("auth.signin.features.assetManagement.description"),
    },
    {
      icon: BarChart,
      title: t("auth.signin.features.analytics.title"),
      description: t("auth.signin.features.analytics.description"),
    },
  ] as const;

  return (
    <UIProvider>
      <div className={cx("auth")}>
        {/* Desktop Layout */}
        <div className={cx("auth__container")}>
          <section className={cx("auth__form-section")}>
            <Link href="/" className={cx("auth__home-link")}>
              <ArrowLeft size={24} className={cx("auth__home-icon")} />
            </Link>
            {children}
          </section>

          <section className={cx("auth__info")}>
            <Brand variant="double-border" size="sm" />
            <div className={cx("auth__content")}>
              <div className={cx("auth__header")}>
                <h1 className={cx("auth__title")}>
                  {t("auth.signin.clientSuite.title")}
                </h1>
                <p className={cx("auth__subtitle")}>
                  {t("auth.signin.clientSuite.subtitle")}
                </p>
              </div>
              <div className={cx("auth__features")}>
                {features.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Mobile Layout */}
        <div className={cx("auth__mobile-container")}>
          <div className={cx("auth__mobile-header")}>
            <Brand variant="double-border" size="sm" />
            <Link href="/" className={cx("auth__home-link-mobile")}>
              <ArrowLeft size={24} className={cx("auth__home-icon")} />
            </Link>
          </div>
          <div className={cx("auth__mobile-features")}>
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant="mobile"
              />
            ))}
          </div>
          {children}
        </div>
      </div>
    </UIProvider>
  );
}
