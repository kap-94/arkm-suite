import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import * as Yup from "yup";
import { FormValues } from "../types";
import { initialValues } from "../constants";
import Step1ProjectType from "../components/Step1ProjectType";
import Step2ProjectScope from "../components/Step2ProjectScope";
import Step3ContactInfo from "../components/Step3ContactInfo";
import Step4Summary from "../components/Step4Summary";
import { ProjectFormDictionary } from "@/app/_types/dictionary/home.types";
import { createValidationSchemas } from "../validators/FormSchemas";

export const useProjectFormLogic = (
  formikRef: React.RefObject<any>,
  dictionary?: ProjectFormDictionary
) => {
  // Estado para el paso actual
  const [currentStep, setCurrentStep] = useState(1);
  // Estados internos para errores y control
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [attemptedNext, setAttemptedNext] = useState(false);
  const [fieldsTouched, setFieldsTouched] = useState<Record<string, boolean>>(
    {}
  );

  // Ref para mantener los valores previos sin necesidad de re-renderizar
  const prevValuesRef = useRef<FormValues>(initialValues);

  // Esquemas de validación para cada paso, memorizados y con mensajes del diccionario
  const validationSchema = useMemo(() => {
    return createValidationSchemas(dictionary);
  }, [dictionary]);

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

  // Handler para el botón "Siguiente/Completar"
  const handleNextStep = useCallback(
    (
      submitForm: () => void,
      values: FormValues,
      setFormikErrors: (errors: any) => void,
      setTouched: (touched: any) => void
    ) => {
      // Si es el último paso, enviar el formulario
      if (currentStep === 4) {
        submitForm();
        return true;
      }

      // Avanzar al siguiente paso
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      return true;
    },
    [currentStep]
  );

  // Handler para el botón "Anterior"
  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

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

        // Marcar el campo como tocado
        setFieldsTouched((prev) => ({
          ...prev,
          [name]: true,
        }));

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
        dictionary,
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
    [currentStep, validationErrors, createShouldShowError, dictionary]
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
