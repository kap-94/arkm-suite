import { Language } from "@/config/i18n";
import { MainLayout } from "@/components/layouts";

export default function MainLayoutWrapper({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return <MainLayout lang={lang as Language}>{children}</MainLayout>;
}
