// page.tsx
import type { Language } from "../../_lib/config/i18n";
import { DashboardClient } from "./_components/DashboardClient";
import {
  dashboardDictionary,
  getPageDictionary,
} from "../../_utils/dictionary";
import {
  getDashboardNotifications,
  getDashboardStats,
  getProjectCards,
  getRecentContents,
} from "../../_services/dashboardService";

export default async function DashboardPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const [projects, stats, recentContents, notifications, dict] =
    await Promise.all([
      getProjectCards(lang),
      getDashboardStats(lang),
      getRecentContents(lang),
      getDashboardNotifications(lang),
      getPageDictionary(dashboardDictionary, lang),
    ]);

  return (
    <DashboardClient
      projects={projects}
      stats={stats}
      recentContents={recentContents}
      notifications={notifications}
      dictionary={{ dict }}
    />
  );
}
