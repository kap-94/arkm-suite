import {
  MetaContent,
  AccessibilityLabels,
  ActionButton,
  StatusMessages,
  PageHeader,
} from "./base.types";

export interface SettingsSection {
  title: string;
  description: string;
  aria: string;
  options: Record<string, ActionButton | AccessibilityLabels>;
}

export interface SettingsDictionary {
  meta: MetaContent;
  header: PageHeader;
  sections: {
    appearance: SettingsSection;
    language: SettingsSection;
  };
  tooltips: Record<string, string>;
  messages: StatusMessages; // Ahora soporta campos adicionales como resetConfirm
  dialogs: {
    reset: {
      title: string;
      message: string;
      confirm: string;
      cancel: string;
    };
  };
}
