// app/[lang]/dashboard/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ProjectDetails } from "@/components/ProjectDetails";
import { getProjectBySlug } from "@/services/projectsService";
import { Language } from "@/lib/config/i18n";
import {
  getPageDictionary,
  projectDetailsDictionary,
} from "@/utils/dictionary";

interface PageProps {
  params: {
    slug: string;
    lang: Language;
  };
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const [project, dictionary] = await Promise.all([
    getProjectBySlug(params.slug, params.lang),
    getPageDictionary(projectDetailsDictionary, params.lang),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} dictionary={dictionary} />;
}
