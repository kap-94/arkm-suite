import React, { memo, useCallback } from "react";
import classNames from "classnames/bind";
import { Typography } from "../../Typography";
import Spinner from "../../Spinner"; // Ajusta la ruta según tu estructura de carpetas
import { FormControlsProps } from "../types";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

export const FormControls: React.FC<FormControlsProps> = ({
  currentStep,
  onPrevStep,
  onNextStep,
  isLastStep,
  isSending = false,
  dictionary = {
    back: "Back",
    continue: "Continue",
    complete: "Complete",
  },
}) => {
  // Función para manejar el clic en el botón principal - memorizada
  const handleMainButtonClick = useCallback(
    (e: React.MouseEvent) => {
      // Si no es el último paso, prevenimos el envío y llamamos a onNextStep
      if (!isLastStep) {
        e.preventDefault();
        onNextStep();
      }
      // Si es el último paso, se permite el envío natural del formulario
    },
    [isLastStep, onNextStep]
  );

  return (
    <>
      <div className={cx("project-form__divider")} />
      <div className={cx("project-form__buttons")}>
        {currentStep > 1 && (
          <button
            type="button"
            className={cx(
              "project-form__button",
              "project-form__button--secondary"
            )}
            onClick={onPrevStep}
          >
            <Typography
              theme="dark"
              fontFamily="sofia"
              fontWeight={500}
              variant="button"
            >
              {dictionary.back}
            </Typography>
          </button>
        )}

        <button
          // Si es el último paso, se utiliza el botón de tipo "submit"
          type={isLastStep ? "submit" : "button"}
          className={cx(
            "project-form__button",
            "project-form__button--primary"
          )}
          onClick={handleMainButtonClick}
          disabled={isLastStep && isSending}
        >
          {isLastStep && isSending ? (
            <Spinner size="sm" />
          ) : (
            <Typography
              theme="dark"
              fontFamily="sofia"
              fontWeight={500}
              variant="button"
            >
              {isLastStep ? dictionary.complete : dictionary.continue}
            </Typography>
          )}
        </button>
      </div>
    </>
  );
};

export default memo(FormControls);
