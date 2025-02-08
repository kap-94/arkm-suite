import { ContentPreviewDictionary } from "@/types/dictionary/contentPreview.types";
import { Content } from "@/types/models/Content";

export interface ContentPreviewProps {
  dictionary: ContentPreviewDictionary;
  content: Content;
  onError?: (error: string) => void;
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
}
