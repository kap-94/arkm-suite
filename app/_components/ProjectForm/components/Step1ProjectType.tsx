import React from "react";
import classNames from "classnames/bind";
import { ChevronDown, Edit3 } from "lucide-react";
import { Typography } from "../../Typography";
import { Dropdown } from "../../Dropdown";
import TextField from "../../TextField/TextField";
import { FormStepProps } from "../types";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

export const Step1ProjectType: React.FC<FormStepProps> = ({
  values,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  shouldShowError,
  dictionary,
}) => {
  const dict = dictionary?.steps?.step1 || {
    title: "Let's Create Something Amazing",
    subtitle: "Tell us about your project vision",
    projectType: "Project Type",
    pleaseSpecify: "Please specify",
    specifyPlaceholder: "Specify your project type",
  };

  const projectTypeOptions = dictionary?.options?.projectType || [
    { label: "Web Design", value: "web-design" },
    { label: "Web Development", value: "web-development" },
    { label: "Digital Branding", value: "digital-branding" },
    { label: "E-commerce", value: "e-commerce" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className={cx("project-form")}>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="h3"
        className={cx("project-form__title")}
      >
        {dict.title}
      </Typography>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        color="secondary"
        variant="p1"
        className={cx("project-form__subtitle")}
      >
        {dict.subtitle}
      </Typography>
      <div className={cx("project-form__group")}>
        <Dropdown
          fontFamily="sofia"
          icon={<ChevronDown />}
          label={dict.projectType}
          id="project-type"
          options={projectTypeOptions}
          selected={
            projectTypeOptions.find((option) => option.value === values.type)!
          }
          onSelectedChange={(option) => setFieldValue("type", option.value)}
          theme={{ type: "dark" }}
        />
      </div>
      {values.type === "other" && (
        <div className={cx("project-form__group")}>
          <TextField
            variant="secondary"
            label={dict.pleaseSpecify}
            name="customType"
            placeholder={dict.specifyPlaceholder}
            theme={{ type: "dark" }}
            icon={<Edit3 size={20} />}
            fontFamily="sofia"
            value={values.customType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.customType}
            showError={shouldShowError("customType")}
            required={values.type === "other"}
          />
        </div>
      )}
    </div>
  );
};

export default Step1ProjectType;
