// import { useState, useCallback, useRef } from "react";
// import * as Yup from "yup";
// import { FormValues } from "../types";
// import { fieldsPerStep } from "../constants";
// import { stepSchemas } from "../validators/FormSchemas";

// export const useFormSteps = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [fieldsTouched, setFieldsTouched] = useState<Record<string, boolean>>(
//     {}
//   );

//   // Referencia para almacenar errores actuales - no se usa directamente en el componente, eliminable
//   // pero lo mantenemos para depuración si es necesario
//   const currentErrorsRef = useRef<Record<string, string>>({});

//   // Función para marcar campos como tocados - optimizada
//   const markFieldsAsTouched = useCallback(
//     (step: number, values: FormValues) => {
//       const fields = fieldsPerStep[step as keyof typeof fieldsPerStep] || [];
//       const newTouchedFields: Record<string, boolean> = {};

//       fields.forEach((field) => {
//         if (field !== "customType" || values.type === "other") {
//           newTouchedFields[field] = true;
//         }
//       });

//       setFieldsTouched((prev) => ({
//         ...prev,
//         ...newTouchedFields,
//       }));

//       return newTouchedFields;
//     },
//     []
//   );

//   // Función de validación optimizada
//   const validateStep = useCallback((step: number, values: FormValues) => {
//     const schema = stepSchemas[step as keyof typeof stepSchemas];

//     if (!schema) {
//       return { isValid: true, errors: {} };
//     }

//     try {
//       schema.validateSync(values, { abortEarly: false });
//       return { isValid: true, errors: {} };
//     } catch (error) {
//       if (error instanceof Yup.ValidationError) {
//         const errors: Record<string, string> = {};
//         error.inner.forEach((err) => {
//           if (err.path) {
//             errors[err.path] = err.message;
//           }
//         });

//         // Guardar errores en la referencia para depuración
//         currentErrorsRef.current = errors;

//         return { isValid: false, errors };
//       }
//       return { isValid: false, errors: {} };
//     }
//   }, []);

//   // Función para avanzar al siguiente paso - optimizada
//   const handleNextStep = useCallback(
//     (
//       submitForm: () => void,
//       values: FormValues,
//       setErrors: (errors: any) => void,
//       setTouched: (touched: any) => void
//     ) => {
//       // Mark fields as touched
//       const touchedFields = markFieldsAsTouched(currentStep, values);

//       // Actualizar el estado touched en Formik
//       setTouched((prev: any) => ({
//         ...prev,
//         ...touchedFields,
//       }));

//       // Validate current step
//       const { isValid, errors } = validateStep(currentStep, values);

//       // Handle validation errors
//       if (!isValid) {
//         setErrors(errors);
//         return false; // Indicar que no se pudo avanzar
//       }

//       // Clear errors for the current step's fields
//       const currentStepFields =
//         fieldsPerStep[currentStep as keyof typeof fieldsPerStep] || [];
//       const clearedErrors: Record<string, undefined> = {};
//       currentStepFields.forEach((field) => {
//         clearedErrors[field] = undefined;
//       });

//       // Apply cleared errors
//       setErrors((prev: any) => ({
//         ...prev,
//         ...clearedErrors,
//       }));

//       // Handle final step submission
//       if (currentStep === 4) {
//         submitForm();
//         return true;
//       }

//       // Move to next step
//       setCurrentStep((prevStep) => prevStep + 1);
//       return true; // Indicar que se avanzó exitosamente
//     },
//     [currentStep, markFieldsAsTouched, validateStep]
//   );

//   // Función para retroceder - simplificada
//   const handlePrevStep = useCallback(() => {
//     setCurrentStep((prevStep) => Math.max(1, prevStep - 1));
//   }, []);

//   // Return stable object references
//   return {
//     currentStep,
//     fieldsTouched,
//     handleNextStep,
//     handlePrevStep,
//   };
// };

// export default useFormSteps;
