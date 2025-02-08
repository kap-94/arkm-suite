interface Meta {
  title: string;
  description: string;
  keywords: string[];
  authors: { name: string }[];
  creator: string;
  publisher: string;
}

export interface HeroDictionary {
  headline: {
    create: string;
    scale: string;
    transform: string;
  };
  description: {
    subtitle: string;
    description: string;
    cta: string;
  };
  scroll: string;
}

export interface HomeDictionary {
  meta: Meta;
  hero: HeroDictionary;
}
