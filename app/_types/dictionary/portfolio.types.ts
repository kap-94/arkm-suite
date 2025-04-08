// types/dictionary/portfolio.types.ts

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: ProjectImage[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface PortfolioDictionary {
  title: string;
  subtitle?: string;
  projects: ProjectData[];
}
