// Tipos específicos para el formulario del proyecto
export interface FormValues {
  type: string;
  customType: string;
  budget: string;
  timeline: string;
  companyName: string;
  email: string;
  phone: string;
  preferredContact: string;
}

export interface ProjectFormProps {
  onCloseModal?: () => void;
}

export interface DropdownOption {
  label: string;
  value: string;
}

// Tipo más específico para errores y touched
export interface FormStepProps {
  values: FormValues;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  shouldShowError: (fieldName: string) => boolean;
}
