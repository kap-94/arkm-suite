import { DeliverableResponse } from "../../_repositories/types";
import { DeliverableCardDictionary } from "@/app/_types/dictionary/projectDetails.types";
export type ThemeType = "light" | "dark" | "custom";

export interface DeliverableCardTheme {
  type: ThemeType;
  colors?: {
    background?: string;
    border?: string;
    text?: string;
    secondaryText?: string;
    sectionDivider?: string;
    navBackground?: string;
    dropdownBackground?: string;
  };
}
export interface DeliverableCardProps {
  dictionary: DeliverableCardDictionary;
  deliverable: DeliverableResponse;
  theme?: DeliverableCardTheme;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onAddComment?: (deliverableId: string) => void;
  onContentClick?: (contentId: string, deliverableId: string) => void;
}
