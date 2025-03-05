// src/app/[lang]/auth/signin/page.tsx
import { AuthModule } from "@/modules/AuthModule";
import { AuthScreenType } from "@/modules/AuthModule/types/auth.types";
import { Language } from "@/lib/config/i18n";
import { getPageDictionary, signInDictionary } from "@/utils/dictionary";

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
