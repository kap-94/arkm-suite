import React from "react";
import classNames from "classnames/bind";
import { ChevronDown } from "lucide-react";
import { Typography } from "../../Typography";
import { Dropdown } from "../../Dropdown";
import { FormStepProps } from "../types";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

export const Step2ProjectScope: React.FC<FormStepProps> = ({
  values,
  setFieldValue,
  dictionary,
}) => {
  const dict = dictionary?.steps?.step2 || {
    title: "Project Scope",
    subtitle: "Help us understand your needs",
    budgetRange: "Budget Range",
    timeline: "Timeline",
  };

  const budgetOptions = dictionary?.options?.budget || [
    { label: "$0 - $5,000", value: "0-5k" },
    { label: "$5,000 - $10,000", value: "5k-10k" },
    { label: "$10,000 - $25,000", value: "10k-25k" },
    { label: "$25,000 - $50,000", value: "25k-50k" },
    { label: "$50,000+", value: "50k+" },
  ];

  const timelineOptions = dictionary?.options?.timeline || [
    { label: "1-2 Months", value: "1-2-months" },
    { label: "2-3 Months", value: "2-3-months" },
    { label: "3-6 Months", value: "3-6-months" },
    { label: "6+ Months", value: "6+-months" },
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
        variant="p1"
        className={cx("project-form__subtitle")}
      >
        {dict.subtitle}
      </Typography>
      <div className={cx("project-form__group")}>
        <Dropdown
          fontFamily="sofia"
          icon={<ChevronDown />}
          label={dict.budgetRange}
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
          label={dict.timeline}
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
