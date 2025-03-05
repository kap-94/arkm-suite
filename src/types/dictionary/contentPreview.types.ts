export interface ContentPreviewDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  header: {
    download: {
      label: string;
      loading: string;
      ariaLabel: string;
    };
    metadata: {
      createdBy: string;
      updated: string;
      project: string;
      size: string;
      separator: string;
    };
  };
  preview: {
    errors: {
      downloadError: string;
      pdfGenerationError: string;
      previewError: string;
    };
    components: {
      designSystem: {
        title: string;
      };
      marketResearch: {
        title: string;
      };
      userPersonas: {
        title: string;
      };
      unavailable: {
        message: string;
      };
    };
  };
}
