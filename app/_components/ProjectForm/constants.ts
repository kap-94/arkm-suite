import * as Yup from "yup";
import { DropdownOption, FormValues } from "./types";

export const stepSchemas = {
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
  // Añadimos un esquema para el paso 4 (aunque no requiera validaciones)
  4: Yup.object({}),
};

// Estos valores siempre se mantendrán por defecto, pero las opciones
// se cargarán dinámicamente desde el diccionario
export const initialValues: FormValues = {
  type: "web-design",
  customType: "",
  budget: "0-5k",
  timeline: "1-2-months",
  companyName: "",
  email: "",
  phone: "",
  preferredContact: "email",
};

// Define exactamente qué campos pertenecen a cada paso
export const fieldsPerStep = {
  1: ["type", "customType"],
  2: ["budget", "timeline"],
  3: ["companyName", "email", "phone", "preferredContact"],
  4: [], // El paso 4 no tiene campos que validar
};
