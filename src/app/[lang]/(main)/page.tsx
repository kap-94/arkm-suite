import { Metadata } from "next";
import { Language } from "@/lib/config/i18n";
import { Hero } from "@/modules/Hero";
import { getPageDictionary, homeDictionary } from "@/utils/dictionary";
import ClientSuitePreview from "@/modules/ClientSuitePreview";
import SolutionsModule from "@/modules/SolutionsModule";
import SharedBackgroundLayout from "@/modules/SharedBackgroundLayout";
import { HomeDictionary } from "@/types/dictionary/home.types";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Language };
}): Promise<Metadata> {
  const dictionary = await getPageDictionary<HomeDictionary>(
    homeDictionary,
    lang
  );
  const meta = dictionary.meta;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: meta.authors,
    creator: meta.creator,
    publisher: meta.publisher,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const dictionary = await getPageDictionary<HomeDictionary>(
    homeDictionary,
    lang
  );

  return (
    <div>
      <SharedBackgroundLayout>
        <Hero dictionary={dictionary.hero} />
        <SolutionsModule dictionary={dictionary.solutions} />
        <ClientSuitePreview dictionary={dictionary.clientSuite} />
      </SharedBackgroundLayout>
    </div>
  );
}
