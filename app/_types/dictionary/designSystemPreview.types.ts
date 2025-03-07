// Dictionary types for static text
export interface DesignSystemDictionary {
  sections: {
    colors: {
      title: string;
      copiedText: string;
    };
    typography: {
      title: string;
      sampleText: string;
    };
    spacing: {
      title: string;
      unitsLabel: string;
    };
    components: {
      title: string;
      buttons: {
        title: string;
        variants: {
          primary: string;
          secondary: string;
        };
        sizes: {
          large: string;
          default: string;
          small: string;
        };
        states: {
          withIcon: string;
          loading: string;
          disabled: string;
        };
      };
      formControls: {
        title: string;
        labels: {
          default: string;
          withIcon: string;
          floating: string;
          error: string;
          disabled: string;
        };
        placeholders: {
          default: string;
        };
        errorMessage: string;
      };
    };
  };
  themeLabels: {
    custom: string;
  };
}
