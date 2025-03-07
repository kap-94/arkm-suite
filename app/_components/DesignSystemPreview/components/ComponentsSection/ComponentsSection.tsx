import React, { FC } from "react";
import classNames from "classnames/bind";
import { Mail, ArrowRight, Eye, AlertCircle } from "lucide-react";
import { Formik, Form } from "formik";
import { ThemedTypography } from "../../../Typography/ThemedTypography";
import { Button } from "../../../Button/Button";
import { ThemedTextField } from "../../../TextField/ThemedTextField";
import { ThemeConfig } from "../../types";
import styles from "./ComponentsSection.module.scss";

const cx = classNames.bind(styles);

interface ComponentsSectionProps {
  theme: ThemeConfig;
  labels: {
    buttons: {
      title: string;
      variants: {
        primary: string;
        secondary: string;
      };
      sizes: {
        large: string;
        default: string;
        small: string;
      };
      states: {
        withIcon: string;
        loading: string;
        disabled: string;
      };
    };
    formControls: {
      title: string;
      labels: {
        default: string;
        withIcon: string;
        floating: string;
        error: string;
        disabled: string;
      };
      placeholders: {
        default: string;
      };
      errorMessage: string;
    };
  };
}

const initialFormValues = {
  primaryInput: "",
  secondaryInput: "",
  errorInput: "",
  disabledInput: "",
  passwordInput: "",
};

export const ComponentsSection: FC<ComponentsSectionProps> = ({
  theme,
  labels,
}) => {
  const textFieldTheme = {
    type: theme.type,
    customValues:
      theme.type === "custom"
        ? {
            background: theme.colors?.background,
            text: theme.colors?.text,
            border: theme.colors?.border,
          }
        : undefined,
  };

  return (
    <section className={cx("components-section")}>
      <div className={cx("components-section__grid")}>
        {/* Buttons Card */}
        <div className={cx("components-section__card")}>
          <div className={cx("components-section__card-header")}>
            <ThemedTypography variant="h4" fontWeight={500}>
              {labels.buttons.title}
            </ThemedTypography>
          </div>

          <div className={cx("components-section__buttons")}>
            <div className={cx("components-section__buttons-group")}>
              <ThemedTypography variant="p2" color="tertiary" fontWeight={500}>
                {labels.buttons.variants.primary}
              </ThemedTypography>
              <div className={cx("components-section__buttons-row")}>
                <Button size="lg">{labels.buttons.sizes.large}</Button>
                <Button>{labels.buttons.sizes.default}</Button>
                <Button size="sm">{labels.buttons.sizes.small}</Button>
                <Button icon={<Mail size={16} />}>
                  {labels.buttons.states.withIcon}
                </Button>
                <Button isLoading>{labels.buttons.states.loading}</Button>
                <Button disabled>{labels.buttons.states.disabled}</Button>
              </div>
            </div>

            <div className={cx("components-section__buttons-group")}>
              <ThemedTypography variant="p2" color="tertiary" fontWeight={500}>
                {labels.buttons.variants.secondary}
              </ThemedTypography>
              <div className={cx("components-section__buttons-row")}>
                <Button variant="secondary" size="lg">
                  {labels.buttons.sizes.large}
                </Button>
                <Button variant="secondary">
                  {labels.buttons.sizes.default}
                </Button>
                <Button variant="secondary" size="sm">
                  {labels.buttons.sizes.small}
                </Button>
                <Button variant="secondary" icon={<ArrowRight size={16} />}>
                  {labels.buttons.states.withIcon}
                </Button>
                <Button variant="secondary" disabled>
                  {labels.buttons.states.disabled}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("components-section__divider")} />

        {/* Form Controls Card */}
        <div className={cx("components-section__card")}>
          <div className={cx("components-section__card-header")}>
            <ThemedTypography variant="h4" fontWeight={500}>
              {labels.formControls.title}
            </ThemedTypography>
          </div>

          <Formik initialValues={initialFormValues} onSubmit={() => {}}>
            <Form className={cx("components-section__form-controls")}>
              <div className={cx("components-section__inputs-group")}>
                <ThemedTypography
                  variant="p2"
                  color="tertiary"
                  fontWeight={500}
                >
                  {labels.buttons.variants.primary}
                </ThemedTypography>
                <div className={cx("components-section__inputs-row")}>
                  <ThemedTextField
                    name="primaryInput"
                    label={labels.formControls.labels.default}
                    placeholder={labels.formControls.placeholders.default}
                    theme={textFieldTheme}
                    variant="primary"
                  />
                  <ThemedTextField
                    name="passwordInput"
                    label={labels.formControls.labels.withIcon}
                    type="password"
                    icon={<Eye size={20} />}
                    theme={textFieldTheme}
                    variant="primary"
                  />
                </div>
              </div>

              <div className={cx("components-section__inputs-group")}>
                <ThemedTypography
                  variant="p2"
                  color="tertiary"
                  fontWeight={500}
                >
                  {labels.buttons.variants.secondary}
                </ThemedTypography>
                <div className={cx("components-section__inputs-row")}>
                  <ThemedTextField
                    name="secondaryInput"
                    label={labels.formControls.labels.floating}
                    theme={textFieldTheme}
                    variant="secondary"
                  />
                  <ThemedTextField
                    name="errorInput"
                    label={labels.formControls.labels.error}
                    icon={<AlertCircle size={20} />}
                    theme={textFieldTheme}
                    variant="secondary"
                    showError
                    error={labels.formControls.errorMessage}
                  />
                  <ThemedTextField
                    name="disabledInput"
                    label={labels.formControls.labels.disabled}
                    theme={textFieldTheme}
                    variant="secondary"
                    disabled
                  />
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};
