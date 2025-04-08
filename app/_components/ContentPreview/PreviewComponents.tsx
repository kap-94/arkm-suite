import classNames from "classnames/bind";
import { Eye } from "lucide-react";
import { FileContent } from "@/app/_types/models/FileContent";
import { getFileType } from "./utils";
import { ThemedTypography } from "../Typography/ThemedTypography";
import styles from "./ContentPreview.module.scss";

const cx = classNames.bind(styles);

interface MediaPreviewProps {
  url: string;
  title: string;
  onError: (message: string) => void;
}

export const ImagePreview: React.FC<MediaPreviewProps> = ({
  url,
  title,
  onError,
}) => (
  <div className={cx("preview__media-container")}>
    <img
      src={url}
      alt={title}
      className={cx("preview__image")}
      onError={() => onError("Error loading image")}
    />
  </div>
);

export const VideoPreview: React.FC<MediaPreviewProps> = ({
  url,
  title,
  onError,
}) => (
  <div className={cx("preview__media-container")}>
    <video
      controls
      className={cx("preview__video")}
      onError={() => onError("Error loading video")}
    >
      <source src={url} />
      Your browser does not support video playback.
    </video>
  </div>
);

export const AudioPreview: React.FC<MediaPreviewProps> = ({
  url,
  title,
  onError,
}) => (
  <div className={cx("preview__media-container")}>
    <audio
      controls
      className={cx("preview__audio")}
      onError={() => onError("Error loading audio")}
    >
      <source src={url} />
      Your browser does not support audio playback.
    </audio>
  </div>
);

interface PlaceholderPreviewProps {
  message: string;
}

export const PlaceholderPreview: React.FC<PlaceholderPreviewProps> = ({
  message,
}) => (
  <div className={cx("preview__placeholder")}>
    <Eye size={48} />
    <ThemedTypography variant="p1" color="secondary">
      {message}
    </ThemedTypography>
  </div>
);

export const FilePreviewFactory = {
  createPreview(fileContent: FileContent, onError: (message: string) => void) {
    const { url, title } = fileContent;
    const props = { url, title, onError };

    switch (getFileType(title)) {
      case "image":
        return <ImagePreview {...props} />;
      case "video":
        return <VideoPreview {...props} />;
      case "audio":
        return <AudioPreview {...props} />;
      case "document":
        return (
          <PlaceholderPreview message="Document preview not available. Click download to view the file." />
        );
      default:
        return (
          <PlaceholderPreview message="Preview not available. Click download to view the file." />
        );
    }
  },
};
