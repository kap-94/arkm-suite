export const getFileType = (filename: string): string => {
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  const fileTypes = {
    image: ["jpg", "jpeg", "png", "gif", "webp"],
    video: ["mp4", "webm", "ogg"],
    audio: ["mp3", "wav", "ogg"],
    document: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"],
  };

  return (
    Object.entries(fileTypes).find(([_, extensions]) =>
      extensions.includes(extension)
    )?.[0] || "other"
  );
};

export const downloadFile = async (
  url: string,
  filename: string
): Promise<void> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Download failed");

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};
