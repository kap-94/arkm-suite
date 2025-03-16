import React from "react";
import classNames from "classnames/bind";
import { ChevronDown } from "lucide-react";
import { Typography } from "../../Typography";
import { Dropdown } from "../../Dropdown";
import { FormStepProps } from "../types";
import { budgetOptions, timelineOptions } from "../constants";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

export const Step2ProjectScope: React.FC<FormStepProps> = ({
  values,
  setFieldValue,
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
        Project Scope
      </Typography>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="p1"
        className={cx("project-form__subtitle")}
      >
        Help us understand your needs
      </Typography>
      <div className={cx("project-form__group")}>
        <Dropdown
          fontFamily="sofia"
          icon={<ChevronDown />}
          label="Budget Range"
          id="budget-range"
          options={budgetOptions}
          selected={
            budgetOptions.find((option) => option.value === values.budget)!
          }
          onSelectedChange={(option) => setFieldValue("budget", option.value)}
          theme={{ type: "dark" }}
        />
      </div>
      <div className={cx("project-form__group")}>
        <Dropdown
          fontFamily="sofia"
          icon={<ChevronDown />}
          label="Timeline"
          id="timeline"
          options={timelineOptions}
          selected={
            timelineOptions.find((option) => option.value === values.timeline)!
          }
          onSelectedChange={(option) => setFieldValue("timeline", option.value)}
          theme={{ type: "dark" }}
        />
      </div>
    </div>
  );
};

export default Step2ProjectScope;
