import * as Yup from "yup";
import { ProjectFormDictionary } from "@/app/_types/dictionary/home.types";

// Función para crear esquemas de validación basados en el diccionario
export const createValidationSchemas = (dictionary?: ProjectFormDictionary) => {
  // Mensajes de error por defecto
  const errorMessages = {
    projectTypeRequired: "Project Type is required",
    customTypeRequired: "Custom Project Type is required",
    budgetRequired: "Budget Range is required",
    timelineRequired: "Timeline is required",
    companyNameRequired: "Company Name is required",
    emailRequired: "Email Address is required",
    emailInvalid: "Invalid email address",
    preferredContactRequired: "Preferred Contact Method is required",
  };

  // Si hay un diccionario disponible, usar sus mensajes
  if (dictionary?.validation) {
    Object.assign(errorMessages, dictionary.validation);
  }

  return {
    1: Yup.object({
      type: Yup.string().required(errorMessages.projectTypeRequired),
      customType: Yup.string().when("type", {
        is: "other",
        then: (schema) => schema.required(errorMessages.customTypeRequired),
        otherwise: (schema) => schema.optional(),
      }),
    }),
    2: Yup.object({
      budget: Yup.string().required(errorMessages.budgetRequired),
      timeline: Yup.string().required(errorMessages.timelineRequired),
    }),
    3: Yup.object({
      companyName: Yup.string().required(errorMessages.companyNameRequired),
      email: Yup.string()
        .email(errorMessages.emailInvalid)
        .required(errorMessages.emailRequired),
      phone: Yup.string().optional(),
      preferredContact: Yup.string().required(
        errorMessages.preferredContactRequired
      ),
    }),
    // Añadimos un esquema para el paso 4 (aunque no requiera validaciones)
    4: Yup.object({}),
  };
};
