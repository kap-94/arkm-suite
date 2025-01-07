"use client";

// src/components/AuthModule/components/SigninForm/index.tsx
import { Formik, Form } from "formik";
import classNames from "classnames/bind";
import { Loader, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TextField } from "@/components/TextField";
import { Button } from "@/components/Button";
import { GoogleButton } from "@/components/GoogleButton";
import { useSignInForm } from "../../hooks/useSignInForm";
import styles from "./SigninForm.module.scss";

const cx = classNames.bind(styles);

interface SigninFormProps {
  className?: string;
}

export function SigninForm({ className }: SigninFormProps) {
  const { t } = useLanguage();
  const { isLoading, error, validationSchema, handleSubmit } = useSignInForm();

  return (
    <div className={cx("signin-form", className)}>
      <h2 className={cx("signin-form__title")}>{t("auth.signin.title")}</h2>
      <p className={cx("signin-form__description")}>
        {t("auth.signin.enterDashboard")}
      </p>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isValid, isSubmitting }) => (
          <Form className={cx("signin-form__container")}>
            {error && (
              <div className={cx("signin-form__error")}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <TextField
              name="email"
              label={t("auth.signin.form.email.label")}
              type="email"
              icon="email"
              placeholder={t("auth.signin.form.email.placeholder")}
              variant="secondary"
              className={cx("signin-form__text-field")}
            />

            <TextField
              name="password"
              label={t("auth.signin.form.password.label")}
              type="password"
              placeholder={t("auth.signin.form.password.placeholder")}
              variant="secondary"
              className={cx("signin-form__password-field")}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              radius="md"
              disabled={isLoading || !isValid || isSubmitting}
              className={cx("signin-form__submit")}
            >
              {isLoading ? (
                <Loader className={cx("signin-form__spinner")} size={20} />
              ) : (
                t("auth.signin.form.buttons.access")
              )}
            </Button>

            <div className={cx("signin-form__separator")}>
              <span>{t("auth.signin.form.buttons.or")}</span>
            </div>

            <GoogleButton
              variant="outline"
              size="md"
              radius="md"
              className={cx("signin-form__google-button")}
            >
              {t("auth.signin.form.buttons.google")}
            </GoogleButton>

            <small className={cx("signin-form__note")}>
              {t("auth.signin.adminNote")}
            </small>
          </Form>
        )}
      </Formik>
    </div>
  );
}
