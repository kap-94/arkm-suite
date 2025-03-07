export interface Feature {
  title: string;
  description?: string;
  subtitle?: string;
  icon: string | undefined;
}

export interface LayoutMeta {
  version: string;
  lastUpdated: string;
  description: string;
  maintainer: string;
}

export interface Header {
  title: string;
  subtitle: string;
  icon: string;
}

export interface AuthLayoutDictionary {
  meta: LayoutMeta;
  header: Header;
  features: {
    projectControl: Feature;
    assetManagement: Feature;
    documentation: Feature;
  };
}
