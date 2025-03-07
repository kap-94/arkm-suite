import Link from "next/link";
import classNames from "classnames/bind";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Language } from "@/app/_lib/config/i18n";
import {
  authLayoutDictionary,
  getPageDictionary,
} from "@/app/_utils/dictionary";
import { UIProvider } from "../../_context/UIContext";
import { Brand } from "../Header/components";
import { FeatureCard } from "../FeatureCard";
import { getIconComponent } from "@/app/_utils/iconUtils";
import Typography from "../Typography";
import styles from "./AuthLayout.module.scss";

const cx = classNames.bind(styles);

interface AuthLayoutProps {
  children: React.ReactNode;
  params: {
    lang: Language;
  };
}

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const dict = await getPageDictionary(authLayoutDictionary, params.lang);

  return (
    <UIProvider>
      <div className={cx("auth")}>
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
                <Typography variant="h2" className={cx("auth__title")}>
                  {dict.header.title}
                </Typography>
                <Typography
                  variant="p1"
                  color="secondary"
                  fontWeight={400}
                  theme={{ type: "dark" }}
                  className={cx("auth__subtitle")}
                >
                  {dict.header.subtitle}
                </Typography>
              </div>
              <div className={cx("auth__features")}>
                {Object.entries(dict.features).map(([key, feature]) => (
                  <FeatureCard
                    key={key}
                    icon={getIconComponent(feature.icon)}
                    title={feature.title}
                    description={feature.description || feature.subtitle || ""}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className={cx("auth__mobile-container")}>
          <div className={cx("auth__mobile-header")}>
            <Brand variant="double-border" size="sm" />
            <Link href="/" className={cx("auth__home-link-mobile")}>
              <ArrowLeft size={24} className={cx("auth__home-icon")} />
            </Link>
          </div>
          <div className={cx("auth__mobile-features")}>
            {Object.entries(dict.features).map(([key, feature]) => (
              <FeatureCard
                key={key}
                icon={getIconComponent(feature.icon)}
                title={feature.title}
                description={feature.description || feature.subtitle || ""}
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
