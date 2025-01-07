export type FileType = string;

export interface RecentFileType {
  id: string;
  name: string;
  size: string;
  type: FileType;
  lastModified: Date;
}

export interface RecentFileProps {
  file: RecentFileType;
  onClick?: (id: string) => void;
}
