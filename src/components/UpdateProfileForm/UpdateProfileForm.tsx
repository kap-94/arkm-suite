"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import { ThemedTextField } from "@/components/TextField";
import type { UpdateProfileFormProps } from "./types";
import { Button } from "@/components/Button";
import { AtSign } from "lucide-react";
import { User } from "@/types/User.types";
import { ProfileDictionary } from "@/types/dictionary/profile.types";
import styles from "./UpdateProfileForm.module.scss";

const cx = classNames.bind(styles);

const createValidationSchema = (dictionary: ProfileDictionary) =>
  Yup.object().shape({
    fullName: Yup.string().required(
      dictionary.form.validation.fullNameRequired
    ),
    email: Yup.string()
      .email(dictionary.form.validation.emailInvalid)
      .required(dictionary.form.validation.emailRequired)
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{,}$/,
        dictionary.form.validation.emailInvalid
      )
      .max(254, dictionary.form.validation.emailTooLong),
    nationality: Yup.string().required(
      dictionary.form.validation.nationalityRequired
    ),
    nationalID: Yup.string().required(
      dictionary.form.validation.nationalIDRequired
    ),
  });

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  user,
  children,
  theme = { type: "light" },
  onSubmit,
  dictionary,
}) => {
  const validationSchema = createValidationSchema(dictionary);

  const handleSubmit = async (
    values: User,
    { setSubmitting }: FormikHelpers<User>
  ) => {
    try {
      await onSubmit?.(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={user}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form
          className={cx("profile-form", `profile-form--theme-${theme.type}`)}
          noValidate // Prevents browser's default email validation
        >
          <div className={cx("profile-form__field")}>{children}</div>

          <ThemedTextField
            label={dictionary.form.fields.email.label}
            name="email"
            type="email"
            theme={theme}
            variant="primary"
            showError
            // disabled={isSubmitting}
            disabled
            icon={<AtSign size={18} />}
            placeholder={dictionary.form.fields.email.placeholder}
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            aria-label={dictionary.aria.emailInput}
            aria-required="true"
          />

          <div className={cx("profile-form__actions")}>
            <Button
              type="submit"
              // disabled={isSubmitting}
              disabled
              size="lg"
              radius="md"
              className={cx("profile-form__submit")}
            >
              {isSubmitting
                ? dictionary.form.buttons.submitting
                : dictionary.form.buttons.submit}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProfileForm;
