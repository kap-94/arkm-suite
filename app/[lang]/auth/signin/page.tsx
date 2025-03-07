// src/app/[lang]/auth/signin/page.tsx
import { AuthModule } from "@/app/_modules/AuthModule";
import { AuthScreenType } from "@/app/_modules/AuthModule/types/auth.types";
import { Language } from "@/app/_lib/config/i18n";
import { getPageDictionary, signInDictionary } from "@/app/_utils/dictionary";

export default async function SignInPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const dict = await getPageDictionary(signInDictionary, lang);

  return (
    <AuthModule
      dictionary={dict}
      screen={AuthScreenType.SIGN_IN}
      lang={lang as Language}
    />
  );
}
