// Opciones para los diferentes selectores en el formulario
import { DropdownOption, FormValues } from "./types";

export const projectTypeOptions: DropdownOption[] = [
  { label: "Web Design", value: "web-design" },
  { label: "Web Development", value: "web-development" },
  { label: "Digital Branding", value: "digital-branding" },
  { label: "E-commerce", value: "e-commerce" },
  { label: "Other", value: "other" },
];

export const budgetOptions: DropdownOption[] = [
  { label: "$0 - $5,000", value: "0-5k" },
  { label: "$5,000 - $10,000", value: "5k-10k" },
  { label: "$10,000 - $25,000", value: "10k-25k" },
  { label: "$25,000 - $50,000", value: "25k-50k" },
  { label: "$50,000+", value: "50k+" },
];

export const timelineOptions: DropdownOption[] = [
  { label: "1-2 Months", value: "1-2-months" },
  { label: "2-3 Months", value: "2-3-months" },
  { label: "3-6 Months", value: "3-6-months" },
  { label: "6+ Months", value: "6+-months" },
];

export const contactMethodOptions: DropdownOption[] = [
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Video Call", value: "video-call" },
];

// Valores iniciales del formulario
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
