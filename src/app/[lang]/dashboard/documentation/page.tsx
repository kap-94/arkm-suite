// app/documentation/page.tsx
import { DocumentationPage } from "@/components/pages/DocumentationPage";
import { Suspense } from "react";

import Spinner from "@/components/Spinner";
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

  return (
    // <ErrorBoundary fallback={<div>Error loading documentation</div>}>
    <Suspense fallback={<Spinner />}>
      <DocumentationPage data={data} />
    </Suspense>
    // </ErrorBoundary>
  );
}
