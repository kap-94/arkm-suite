import { DeliverableResponse } from "@/repositories/types";
import { DeliverablesViewDictionary } from "@/types/dictionary/projectDetails.types";
import { Deliverable } from "@/types/models";

// types.ts
export type ThemeType = "light" | "dark" | "custom";

export interface DeliverableTheme {
  type: ThemeType;
  colors?: {
    background?: string;
    border?: string;
    text?: string;
    secondaryText?: string;
    gradient?: string;
    hover?: string;
    dropdownBackground?: string;
  };
}

export interface DeliverablesViewProps {
  deliverables: DeliverableResponse[];
  dictionary: DeliverablesViewDictionary;
  // handleAddComment: (deliverableId: string, comment: string) => void;
  theme?: DeliverableTheme;
  stageOrder?: string[];
}
