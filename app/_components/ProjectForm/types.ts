// Tipos específicos para el formulario del proyecto
import { ProjectFormDictionary } from "@/app/_types/dictionary/home.types";

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
  dictionary?: ProjectFormDictionary;
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
  dictionary?: ProjectFormDictionary; // Diccionario específico para ProjectForm
}

// Tipo para los controles del formulario
export interface FormControlsProps {
  currentStep: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  isLastStep: boolean;
  isSending?: boolean;
  dictionary?: {
    back: string;
    continue: string;
    complete: string;
  };
}
