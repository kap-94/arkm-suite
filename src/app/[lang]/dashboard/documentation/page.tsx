// app/documentation/page.tsx
import { DocumentationPage } from "@/components/pages/DocumentationPage";
import { documentationService } from "@/services/documentationService";

// Aseguramos que no se genere página estática
export const dynamic = "force-dynamic";
// Deshabilitamos la generación de metadata
export const generateMetadata = () => {
  return {
    robots: "noindex, nofollow",
  };
};

interface DocumentationPageProps {
  params: {
    lang: "es" | "en";
  };
}

export default async function Documentation({
  params,
}: DocumentationPageProps) {
  const data = await documentationService.getDocumentation(params.lang);

  return <DocumentationPage data={data} />;
}
