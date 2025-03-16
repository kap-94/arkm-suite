// useProjectFormLogic.ts
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import * as Yup from "yup";
import { FormValues } from "../types";
import { initialValues } from "../constants";
import { useFormSteps } from "./useFormSteps";
import Step1ProjectType from "../components/Step1ProjectType";
import Step2ProjectScope from "../components/Step2ProjectScope";
import Step3ContactInfo from "../components/Step3ContactInfo";
import Step4Summary from "../components/Step4Summary";

export const useProjectFormLogic = (formikRef: React.RefObject<any>) => {
  // Se reutiliza el hook de steps
  const { currentStep, fieldsTouched, handleNextStep, handlePrevStep } =
    useFormSteps();

  // Estados internos para errores y control de intento de avanzar
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [attemptedNext, setAttemptedNext] = useState(false);

  // Ref para mantener los valores previos sin necesidad de re-renderizar
  const prevValuesRef = useRef<FormValues>(initialValues);

  // Esquemas de validación para cada paso, memorizados
  const validationSchema = useMemo(() => {
    return {
      1: Yup.object({
        type: Yup.string().required("Project Type is required"),
        customType: Yup.string().when("type", {
          is: "other",
          then: (schema) => schema.required("Custom Project Type is required"),
          otherwise: (schema) => schema.optional(),
        }),
      }),
      2: Yup.object({
        budget: Yup.string().required("Budget Range is required"),
        timeline: Yup.string().required("Timeline is required"),
      }),
      3: Yup.object({
        companyName: Yup.string().required("Company Name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email Address is required"),
        phone: Yup.string().optional(),
        preferredContact: Yup.string().required(
          "Preferred Contact Method is required"
        ),
      }),
      4: Yup.object({}),
    };
  }, []);

  // Función para validar el paso actual usando el esquema correspondiente
  const validateCurrentStep = useCallback(
    (values: FormValues) => {
      const schema =
        validationSchema[currentStep as keyof typeof validationSchema];
      if (!schema) return { isValid: true, errors: {} };

      try {
        schema.validateSync(values, { abortEarly: false });
        return { isValid: true, errors: {} };
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors: Record<string, string> = {};
          error.inner.forEach((err) => {
            if (err.path) errors[err.path] = err.message;
          });
          return { isValid: false, errors };
        }
        return { isValid: false, errors: {} };
      }
    },
    [validationSchema, currentStep]
  );

  // Generador de función para determinar si se debe mostrar un error en un campo
  const createShouldShowError = useCallback(
    (combinedErrors: Record<string, string>) => {
      return (fieldName: string) => {
        const hasError = !!combinedErrors[fieldName];
        const isTouched = !!fieldsTouched[fieldName];
        return (isTouched && hasError) || (attemptedNext && hasError);
      };
    },
    [fieldsTouched, attemptedNext]
  );

  // Efecto para detectar cambios en los valores de Formik usando el ref
  useEffect(() => {
    if (!formikRef.current) return;
    const currentValues: FormValues = formikRef.current.values;
    if (!currentValues) return;

    // Si no hay errores, solo actualizamos los valores previos
    if (Object.keys(validationErrors).length === 0) {
      prevValuesRef.current = currentValues;
      return;
    }

    // Comparar campos que hayan cambiado
    const changedFields = (
      Object.keys(currentValues) as (keyof FormValues)[]
    ).filter((key) => currentValues[key] !== prevValuesRef.current[key]);

    if (changedFields.length > 0) {
      const { errors } = validateCurrentStep(currentValues);
      const updatedErrors = { ...validationErrors };
      let hasChanges = false;

      changedFields.forEach((field) => {
        if (validationErrors[field] && !errors[field]) {
          delete updatedErrors[field];
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setValidationErrors(updatedErrors);
      }
      prevValuesRef.current = currentValues;
    }
  }, [formikRef.current?.values, validationErrors, validateCurrentStep]);

  // Handler para el botón "Siguiente"
  const createNextButtonHandler = useCallback(
    (
      submitForm: () => void,
      values: FormValues,
      setFormikErrors: (errors: any) => void,
      setTouched: (touched: any) => void
    ) => {
      return () => {
        setAttemptedNext(true);
        const { isValid, errors } = validateCurrentStep(values);
        setValidationErrors(errors);
        if (isValid) {
          const success = handleNextStep(
            submitForm,
            values,
            setFormikErrors,
            setTouched
          );
          if (success) {
            setAttemptedNext(false);
            setValidationErrors({});
          }
          return success;
        }
        return false;
      };
    },
    [validateCurrentStep, handleNextStep]
  );

  // Handler personalizado para onChange que limpia errores cuando el campo cambia
  const createCustomChangeHandler = useCallback(
    (
      handleFormikChange: (e: React.ChangeEvent<any>) => void,
      values: FormValues
    ) => {
      return (e: React.ChangeEvent<any>) => {
        handleFormikChange(e);
        const { name } = e.target;
        if (validationErrors[name]) {
          const updatedValues = {
            ...values,
            [name]: e.target.value,
          } as FormValues;
          const { errors } = validateCurrentStep(updatedValues);
          if (!errors[name]) {
            const newErrors = { ...validationErrors };
            delete newErrors[name];
            setValidationErrors(newErrors);
          }
        }
      };
    },
    [validateCurrentStep, validationErrors]
  );

  // Función para renderizar el paso actual con todos los props necesarios
  const renderStep = useCallback(
    (
      values: FormValues,
      formikErrors: Record<string, string>,
      touched: Record<string, boolean>,
      handleChange: (e: React.ChangeEvent<any>) => void,
      handleBlur: (e: React.FocusEvent<any>) => void,
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
      ) => void
    ) => {
      const combinedErrors = { ...formikErrors, ...validationErrors };
      const shouldShowError = createShouldShowError(combinedErrors);
      const stepProps = {
        values,
        errors: combinedErrors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        shouldShowError,
      };

      switch (currentStep) {
        case 1:
          return <Step1ProjectType {...stepProps} />;
        case 2:
          return <Step2ProjectScope {...stepProps} />;
        case 3:
          return <Step3ContactInfo {...stepProps} />;
        case 4:
          return <Step4Summary {...stepProps} />;
        default:
          return <div>Invalid step: {currentStep}</div>;
      }
    },
    [currentStep, validationErrors, createShouldShowError]
  );

  return {
    currentStep,
    fieldsTouched,
    createNextButtonHandler,
    createCustomChangeHandler,
    renderStep,
    handlePrevStep,
    validationErrors,
    setValidationErrors,
  };
};
