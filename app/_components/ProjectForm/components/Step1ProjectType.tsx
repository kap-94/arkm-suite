import React from "react";
import classNames from "classnames/bind";
import { ChevronDown, Edit3 } from "lucide-react";
import { Typography } from "../../Typography";
import { Dropdown } from "../../Dropdown";
import TextField from "../../TextField/TextField";
import { FormStepProps } from "../types";
import { projectTypeOptions } from "../constants";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

export const Step1ProjectType: React.FC<FormStepProps> = ({
  values,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  shouldShowError,
}) => {
  return (
    <div className={cx("project-form")}>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="h3"
        className={cx("project-form__title")}
      >
        Let's Create Something Amazing
      </Typography>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        color="secondary"
        variant="p1"
        className={cx("project-form__subtitle")}
      >
        Tell us about your project vision
      </Typography>
      <div className={cx("project-form__group")}>
        <Dropdown
          fontFamily="sofia"
          icon={<ChevronDown />}
          label="Project Type"
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
            label="Please specify"
            name="customType"
            placeholder="Specify your project type"
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
