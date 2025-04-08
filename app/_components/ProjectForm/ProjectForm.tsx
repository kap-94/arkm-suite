"use client";

import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import { Formik, Form } from "formik";
import { ProjectFormProps, FormValues } from "./types";
import { initialValues } from "./constants";
import { FormProgress } from "./components/FormProgress";
import { FormControls } from "./components/FormControls";
import { useProjectFormLogic } from "./hooks/useProjectFormLogic";
import { sendProjectEmail } from "@/app/_services/emailService";
import { useUIContext } from "@/app/_context/UIContext";
import styles from "./ProjectForm.module.scss";

const cx = classNames.bind(styles);

export const ProjectForm: React.FC<ProjectFormProps> = ({
  onCloseModal,
  dictionary,
}) => {
  const formikRef = useRef<any>(null);
  const [isSending, setIsSending] = useState(false);
  const { showSnackbar } = useUIContext();

  const {
    currentStep,
    createNextButtonHandler,
    createCustomChangeHandler,
    renderStep,
    handlePrevStep,
    setValidationErrors,
  } = useProjectFormLogic(formikRef, dictionary);

  // Valores por defecto en caso de que no haya diccionario
  const successMessage =
    dictionary?.success ||
    "Email sent successfully. Thank you for submitting your project.";
  const errorMessage =
    dictionary?.error || "Error sending email. Please try again.";

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={false}
      onSubmit={async (values: FormValues) => {
        setIsSending(true);
        try {
          await sendProjectEmail(values);
          showSnackbar(successMessage, "success");
          onCloseModal?.();
        } catch (error) {
          console.error("Error sending email:", error);
          showSnackbar(errorMessage, "error");
        } finally {
          setIsSending(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        submitForm,
        setErrors,
        setTouched,
      }) => {
        const customHandleChange = createCustomChangeHandler(
          handleChange,
          values
        );
        const handleNextButtonClick = createNextButtonHandler(
          submitForm,
          values,
          setErrors,
          setTouched
        );

        return (
          <Form noValidate>
            <div className={cx("project-form__wrapper")}>
              <FormProgress currentStep={currentStep} totalSteps={4} />
              {renderStep(
                values,
                errors,
                touched,
                customHandleChange,
                handleBlur,
                setFieldValue
              )}
              <FormControls
                currentStep={currentStep}
                onPrevStep={() => {
                  setValidationErrors({});
                  handlePrevStep();
                }}
                onNextStep={handleNextButtonClick}
                isLastStep={currentStep === 4}
                isSending={isSending}
                dictionary={dictionary?.controls}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProjectForm;
