// home.types.ts
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

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface SolutionData {
  id: string;
  title: string;
  description: string;
  features: SolutionFeature[];
}

export interface SolutionsDictionary {
  title: string;
  subtitle: string;
  solutions: SolutionData[];
}

export interface BenefitData {
  title: string;
  description: string;
}

export interface ClientSuiteDictionary {
  title: string;
  subtitle: string;
  benefits: BenefitData[];
}

export interface HomeDictionary {
  meta: Meta;
  hero: HeroDictionary;
  solutions: SolutionsDictionary;
  clientSuite: ClientSuiteDictionary;
}
