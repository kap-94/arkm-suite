import { DeliverableResponse } from "../../_repositories/types";
import { DeliverablesViewDictionary } from "@/app/_types/dictionary/projectDetails.types";
import { Deliverable } from "@/app/_types/models";

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
