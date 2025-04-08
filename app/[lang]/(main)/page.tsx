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
import MethodologyPreview from "@/app/_modules/MethodologyPreview";
import WorkExperienceSection from "@/app/_modules/WorkExperience";
import GlowBackground from "@/app/_components/GlowBackground";
import ContactSection from "@/app/_modules/ContactSection";

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
          <Hero
            dictionary={dictionary.hero}
            projectFormDictionary={dictionary.forms.projectForm}
          />
          <SolutionsModule
            dictionary={dictionary.solutions}
            customAnchorId="abilities"
          />
        </ShaderBackground>

        <GlowBackground variant="nebula">
          <MethodologyPreview
            dictionary={dictionary.methodology}
            customAnchorId="method"
          />

          <WorkExperienceSection
            customAnchorId="experience"
            dictionary={dictionary.workExperience}
          />
        </GlowBackground>

        <ContactSection
          dictionary={dictionary.contact}
          customAnchorId="contact"
        />
      </div>
      <Snackbar duration={6000} position="top" />
    </UIProvider>
  );
}
