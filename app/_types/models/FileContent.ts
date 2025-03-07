import { BaseContent } from "./Common";

export interface FileContent extends BaseContent {
  type: "file";
  size: number;
  url: string;
  fileType: string; // pdf, doc, xls, etc
}
