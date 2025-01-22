import { useState } from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

interface SignInValues {
  email: string;
  password: string;
}

export const useSignInForm = () => {
  // const { t } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email(t("auth.signin.form.errors.invalidEmail"))
  //     .required(t("auth.signin.form.errors.emailRequired")),
  //   password: Yup.string()
  //     .min(8, t("auth.signin.form.errors.passwordMin"))
  //     .matches(/[A-Z]/, t("auth.signin.form.errors.passwordUppercase"))
  //     .matches(/[a-z]/, t("auth.signin.form.errors.passwordLowercase"))
  //     .matches(/[0-9]/, t("auth.signin.form.errors.passwordNumber"))
  //     .matches(/[^A-Za-z0-9]/, t("auth.signin.form.errors.passwordSpecial"))
  //     .required(t("auth.signin.form.errors.passwordRequired")),
  // });
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("auth.signin.form.errors.invalidEmail")
      .required("auth.signin.form.errors.emailRequired"),
    password: Yup.string()
      .min(8, "auth.signin.form.errors.passwordMin")
      .matches(/[A-Z]/, "auth.signin.form.errors.passwordUppercase")
      .matches(/[a-z]/, "auth.signin.form.errors.passwordLowercase")
      .matches(/[0-9]/, "auth.signin.form.errors.passwordNumber")
      .matches(/[^A-Za-z0-9]/, "auth.signin.form.errors.passwordSpecial")
      .required("auth.signin.form.errors.passwordRequired"),
  });

  const handleSubmit = async (
    values: SignInValues,
    { setSubmitting, setTouched, setErrors }: FormikHelpers<SignInValues>
  ) => {
    try {
      setIsLoading(true);
      setError(""); // Limpiar cualquier error previo

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        // Si hay un error, configurar el mensaje de error
        // setError(t("auth.signin.form.errors.invalidCredentials"));
        setError("auth.signin.form.errors.invalidCredentials");
        // Asegurarse de que los campos sean tocados para mostrar los errores
        setTouched({ email: true, password: true });
      } else if (result?.ok) {
        // Si el inicio de sesión es exitoso, puedes redirigir al usuario o manejar el estado
        console.log("Usuario autenticado correctamente");
        // Redirect to dashboard
        router.replace("/dashboard");
      }
    } catch (err) {
      setError("auth.signin.form.errors.unexpected");
      // setError(t("auth.signin.form.errors.unexpected"));
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return {
    isLoading,
    error,
    validationSchema,
    handleSubmit,
  };
};
