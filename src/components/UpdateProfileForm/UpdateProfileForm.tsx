// UpdateProfileForm.tsx
"use client";

import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import { ThemedTypography } from "@/components/Typography/ThemedTypography";
import { UpdateProfileFormProps, User } from "./types";
import styles from "./UpdateProfileForm.module.scss";
import { Button } from "../Button";

const cx = classNames.bind(styles);

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  nationality: Yup.string().required("Nationality is required"),
  nationalID: Yup.string().required("National ID is required"),
});

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  user,
  children,
  theme = { type: "light" },
  onSubmit,
}) => {
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
      {({ errors, touched, isSubmitting }) => (
        <Form
          className={cx("profile-form", `profile-form--theme-${theme.type}`)}
        >
          <div className={cx("profile-form__field")}>
            <ThemedTypography
              as="label"
              variant="label"
              className={cx("profile-form__field-label")}
              theme={theme.type}
            >
              Full name
            </ThemedTypography>
            <Field
              id="fullName"
              name="fullName"
              disabled
              className={cx("profile-form__field-input", {
                "profile-form__field-input--error":
                  errors.fullName && touched.fullName,
              })}
            />
            {errors.fullName && touched.fullName && (
              <div className={cx("profile-form__error")}>{errors.fullName}</div>
            )}
          </div>

          <div className={cx("profile-form__field")}>
            <ThemedTypography
              as="label"
              variant="label"
              className={cx("profile-form__field-label")}
              theme={theme.type}
            >
              Email address
            </ThemedTypography>
            <Field
              id="email"
              name="email"
              disabled
              className={cx("profile-form__field-input", {
                "profile-form__field-input--error":
                  errors.email && touched.email,
              })}
            />
            {errors.email && touched.email && (
              <div className={cx("profile-form__error")}>{errors.email}</div>
            )}
          </div>

          <div
            className={cx(
              "profile-form__field",
              "profile-form__field--with-flag"
            )}
          >
            <div className={cx("profile-form__field-header")}>
              <ThemedTypography
                as="label"
                variant="label"
                className={cx("profile-form__field-label")}
                theme={theme.type}
              >
                Where are you from?
              </ThemedTypography>
            </div>
            <div className={cx("profile-form__field--with-flag-container")}>
              {children}
              <img
                src={user.countryFlag}
                alt="Country flag"
                className={cx("profile-form__field--with-flag-image")}
              />
            </div>
            {errors.nationality && touched.nationality && (
              <div className={cx("profile-form__error")}>
                {errors.nationality}
              </div>
            )}
          </div>

          <div className={cx("profile-form__field")}>
            <ThemedTypography
              as="label"
              variant="label"
              className={cx("profile-form__field-label")}
              theme={theme.type}
            >
              National ID number
            </ThemedTypography>
            <Field
              id="nationalID"
              name="nationalID"
              className={cx("profile-form__field-input", {
                "profile-form__field-input--error":
                  errors.nationalID && touched.nationalID,
              })}
            />
            {errors.nationalID && touched.nationalID && (
              <div className={cx("profile-form__error")}>
                {errors.nationalID}
              </div>
            )}
          </div>

          <div className={cx("profile-form__actions")}>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              radius="lg"
              className={cx("profile-form__submit")}
            >
              {isSubmitting ? "Updating..." : "Update profile"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProfileForm;
