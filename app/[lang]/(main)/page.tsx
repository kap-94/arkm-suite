import { Metadata } from "next";
import { Language } from "@/app/_lib/config/i18n";
import { Hero } from "@/app/_modules/Hero";
import { getPageDictionary, homeDictionary } from "@/app/_utils/dictionary";
import ClientSuitePreview from "@/app/_modules/ClientSuitePreview";
import SolutionsModule from "@/app/_modules/SolutionsModule";
import { HomeDictionary } from "@/app/_types/dictionary/home.types";
import ShaderBackground from "@/app/_modules/ShaderBackground";
import styles from "./page.module.scss";
import classNames from "classnames/bind";
import { UIProvider } from "@/app/_context/UIContext";
import Snackbar from "@/app/_components/Snackbar";

const cx = classNames.bind(styles);

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
    <UIProvider>
      <div className={cx("home-page")}>
        <ShaderBackground>
          <Hero dictionary={dictionary.hero} />
          <SolutionsModule dictionary={dictionary.solutions} />
        </ShaderBackground>
        <ClientSuitePreview dictionary={dictionary.clientSuite} />
      </div>
      <Snackbar duration={6000} position="top" />
    </UIProvider>
  );
}
