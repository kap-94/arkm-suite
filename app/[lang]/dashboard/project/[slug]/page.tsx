// app/[lang]/dashboard/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { ProjectDetails } from "../../../../_components/ProjectDetails";
import { getProjectBySlug } from "../../../../_services/projectsService";
import { Language } from "../../../../_lib/config/i18n";
import {
  getPageDictionary,
  projectDetailsDictionary,
} from "../../../../_utils/dictionary";

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
