import { ContentPreviewDictionary } from "../../_types/dictionary/contentPreview.types";
import { Content } from "../../_types/models/Content";

export interface ContentPreviewProps {
  dictionary: ContentPreviewDictionary;
  content: Content;
  onError?: (error: string) => void;
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
}
