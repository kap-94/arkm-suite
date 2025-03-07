import { notFound } from "next/navigation";
import { ContentPreview } from "../../../../../../_components/ContentPreview";
import {
  findContent,
  getProjectBySlug,
} from "../../../../../../_services/projectsService";
import {
  contentPreviewDictionary,
  getPageDictionary,
} from "../../../../../../_utils/dictionary";
import { Language } from "../../../../../../_lib/config/i18n";

interface ContentPageProps {
  params: {
    lang: Language;
    slug: string;
    contentId: string;
  };
}
export default async function ContentPage({ params }: ContentPageProps) {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  // First, verify the project exists with this slug
  const project = await getProjectBySlug(params.slug, params.lang);

  if (!project) {
    notFound();
  }

  // Get dictionary and content
  const dictionary = await getPageDictionary(
    contentPreviewDictionary,
    params.lang
  );

  // Pass the projectSlug to findContent
  const result = await findContent(params.contentId, params.lang, params.slug);

  // If no content found or content doesn't belong to this project, return 404
  if (!result || result.context.projectSlug !== params.slug) {
    notFound();
  }

  const { content } = result;

  return <ContentPreview content={content} dictionary={dictionary} />;
}
