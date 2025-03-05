// src/components/AuthModule/AuthModule.tsx
import { FC } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { SigninForm } from "./components";
import { AuthScreenType, AuthScreenProps } from "./types/auth.types";
import { authLayoutDictionary, getPageDictionary } from "@/utils/dictionary";

// Definir el mapeo fuera del componente
const ComponentMapping: { [key: string]: FC<any> } = {
  [AuthScreenType.SIGN_IN]: SigninForm,
  // [AuthScreenType.LOGIN]: LoginScreen,
  // [AuthScreenType.FORGOT_PASSWORD]: ForgotPasswordScreen,
  // [AuthScreenType.RESET_PASSWORD]: ResetPasswordScreen,
};

const AuthModule: FC<AuthScreenProps> = ({
  screen = AuthScreenType.SIGN_IN,
  nameFormat,
  dictionary,
  lang,
}) => {
  const FormView = ComponentMapping[screen] || null;

  return (
    <>
      {FormView && (
        <AuthLayout params={{ lang }}>
          <FormView nameFormat={nameFormat} dictionary={dictionary} />
        </AuthLayout>
      )}
    </>
  );
};

export default AuthModule;
