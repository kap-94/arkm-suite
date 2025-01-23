import { getMultipleDictionaries } from "@/utils/getDictionary";
import type { Language } from "@/config/i18n";
import { DashboardClient } from "./DashboardClient";
import { dashboardDictionary, getPageDictionary } from "@/utils/dictionary";
import { getProjects } from "@/services/projectsService";

export default async function DashboardPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const { dashboard: dashboardOld, common } = await getMultipleDictionaries(
    lang,
    ["dashboard", "common"]
  );

  const [projects, dict] = await Promise.all([
    getProjects(lang),
    getPageDictionary(dashboardDictionary, lang),
  ]);

  return (
    <DashboardClient
      projects={projects}
      dictionary={{ dashboardOld, dict, common }}
    />
  );
}
