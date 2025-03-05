import { Visibility } from "@/types/models/Common";
import * as yup from "yup";

// Reusable schemas
const labeledEnumSchema = yup.object({
  label: yup.string().required(),
  value: yup.string().required(),
});

const entityReferenceSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
});

// Project schema
export const projectSchema = yup.object({
  name: yup.string().required(),
  description: yup
    .string()
    .max(168, "La descripción no puede exceder los 168 caracteres")
    .required(),
  type: labeledEnumSchema.required(),
  status: labeledEnumSchema.required(),
  priority: labeledEnumSchema.required(),
  progress: yup.number().min(0).max(100).required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  owner: yup.object().required(),
  client: yup.object().required(),
  teamMembers: yup.array().of(yup.object()).required(),
  budget: yup.object().required(),
  stages: yup.array().of(yup.object()).required(),
  deliverables: yup.array().of(yup.object()).required(),
  metrics: yup.object().required(),
  recentActivities: yup.array().of(yup.object()).required(),
  nextMilestone: yup.object().nullable(),
  tags: yup.array().of(yup.string()),
  customFields: yup.object(),
  visibility: yup.string().oneOf(Object.values(Visibility)).required(),
  settings: yup.object({
    timeTracking: yup.boolean(),
    clientAccess: yup.boolean(),
    notificationPreferences: yup.object().shape({
      email: yup.boolean(),
      push: yup.boolean(),
    }),
  }),
});
