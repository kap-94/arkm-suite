import React from "react";
import classNames from "classnames/bind";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  totalSteps = 4,
}) => {
  return (
    <div className={cx("project-form__progress")}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cx("project-form__progress-step", {
            "project-form__progress-step--active": index + 1 === currentStep,
            "project-form__progress-step--completed": index + 1 < currentStep,
          })}
        />
      ))}
    </div>
  );
};

export default FormProgress;
