import * as Yup from "yup";

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
