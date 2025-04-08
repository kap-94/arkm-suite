"use client";

import { Formik, Form } from "formik";
import classNames from "classnames/bind";
import { Loader, AlertCircle } from "lucide-react";
import { TextField } from "../../../../_components/TextField/TextField";
import { Button } from "../../../../_components/Button";
import { GoogleButton } from "../../../../_components/GoogleButton";
import { useSignInForm } from "../../hooks/useSignInForm";
import { SignInDictionary } from "../../../../_types/dictionary/signin.types";
import { getIconComponent } from "../../../../_utils/iconUtils";
import Typography from "../../../../_components/Typography";
import styles from "./SigninForm.module.scss";

const cx = classNames.bind(styles);

interface SigninFormProps {
  className?: string;
  dictionary: SignInDictionary;
}

export function SigninForm({ className, dictionary }: SigninFormProps) {
  const { isLoading, error, validationSchema, handleSubmit } = useSignInForm(
    dictionary.form.validation
  );

  return (
    <div className={cx("signin-form", className)}>
      <Typography
        fontFamily="sofia"
        variant="h3"
        theme={{ type: "dark" }}
        className={cx("signin-form__title")}
      >
        {dictionary.header.title}
      </Typography>
      <Typography
        fontFamily="sofia"
        variant="p1"
        fontWeight={400}
        theme={{ type: "dark" }}
        className={cx("signin-form__subtitle")}
      >
        {dictionary.header.subtitle}
      </Typography>

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
                <Typography
                  fontFamily="sofia"
                  as="span"
                  color="error"
                  variant="p2"
                >
                  {error}
                </Typography>
              </div>
            )}

            <TextField
              name="email"
              theme={{ type: "dark" }}
              label={dictionary.form.fields.email.label}
              type="email"
              icon={getIconComponent(dictionary.form.fields.email.icon)}
              placeholder={dictionary.form.fields.email.placeholder}
              variant="secondary"
              className={cx("signin-form__text-field")}
              showError
            />

            <TextField
              name="password"
              theme={{ type: "dark" }}
              label={dictionary.form.fields.password.label}
              type="password"
              placeholder={dictionary.form.fields.password.placeholder}
              variant="secondary"
              className={cx("signin-form__password-field")}
              showError
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              radius="md"
              fullWidth
              disabled={isLoading || !isValid || isSubmitting}
              className={cx("signin-form__submit")}
            >
              {isLoading ? (
                <Loader className={cx("signin-form__spinner")} size={20} />
              ) : (
                dictionary.form.buttons.primary.label
              )}
            </Button>

            <div className={cx("signin-form__separator")}>
              <Typography
                fontFamily="sofia"
                as="span"
                color="secondary"
                theme={{ type: "dark" }}
              >
                {dictionary.form.buttons.separator.text}
              </Typography>
            </div>

            <GoogleButton
              variant="outline"
              size="md"
              radius="md"
              className={cx("signin-form__google-button")}
            >
              <Typography
                fontFamily="sofia"
                variant="p1"
                theme={{ type: "dark" }}
              >
                {dictionary.form.buttons.google.label}
              </Typography>
            </GoogleButton>

            <Typography
              fontFamily="sofia"
              variant="p3"
              theme={{ type: "dark" }}
              className={cx("signin-form__note")}
            >
              {dictionary.form.note}
            </Typography>
          </Form>
        )}
      </Formik>
    </div>
  );
}
