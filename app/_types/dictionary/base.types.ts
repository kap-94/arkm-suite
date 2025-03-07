export interface MetaContent {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface PageHeader {
  title: string;
  subtitle: string;
  aria: string;
}

export interface AccessibilityLabels {
  aria: string;
  label?: string;
  description?: string;
}

export interface ActionButton {
  label: string;
  tooltip?: string;
  aria?: string;
}

export interface StatusMessages {
  loading?: string;
  error: string;
  empty?: string;
  success?: string;
  resetConfirm?: string;
}

export interface FilterOptions {
  all: string;
  [key: string]: string;
}

export interface ProjectFilters {
  status: {
    allStatus: string;
    inProgress: string;
    completed: string;
    onHold: string;
  };
  priority: {
    allPriority: string;
    high: string;
    medium: string;
    low: string;
  };
}
