import { Metadata } from "next";
import { Language } from "../../_lib/config/i18n";
import { Hero } from "../../_modules/Hero";
import { getPageDictionary, homeDictionary } from "../../_utils/dictionary";
import ClientSuitePreview from "../../_modules/ClientSuitePreview";
import SolutionsModule from "../../_modules/SolutionsModule";
import SharedBackgroundLayout from "../../_modules/SharedBackgroundLayout";
import { HomeDictionary } from "../../_types/dictionary/home.types";

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
