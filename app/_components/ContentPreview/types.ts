import { ContentPreviewDictionary } from "@/app/_types/dictionary/contentPreview.types";
import { Content } from "@/app/_types/models/Content";

export interface ContentPreviewProps {
  dictionary: ContentPreviewDictionary;
  content: Content;
  onError?: (error: string) => void;
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
}
