// src/app/[lang]/auth/signin/page.tsx
import { AuthModule } from "@/modules/AuthModule";
import { AuthScreenType } from "@/modules/AuthModule/types/auth.types";
import { Language } from "@/config/i18n";

interface SignInPageProps {
  params: {
    lang: string;
  };
}

export default async function SignInPage({
  params: { lang },
}: SignInPageProps) {
  return <AuthModule screen={AuthScreenType.SIGN_IN} lang={lang as Language} />;
}
