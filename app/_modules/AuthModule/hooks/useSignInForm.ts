import { useState } from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignInFormValidationMessages } from "../../../_types/dictionary/signin.types";

interface SignInValues {
  email: string;
  password: string;
}

export const useSignInForm = (
  validationMessages: SignInFormValidationMessages
) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(validationMessages.emailInvalid)
      .required(validationMessages.emailRequired),
    password: Yup.string()
      .min(8, validationMessages.passwordMin)
      .matches(/[A-Z]/, validationMessages.passwordUppercase)
      .matches(/[a-z]/, validationMessages.passwordLowercase)
      .matches(/[0-9]/, validationMessages.passwordNumber)
      .matches(/[^A-Za-z0-9]/, validationMessages.passwordSpecial)
      .required(validationMessages.passwordRequired),
  });

  const handleSubmit = async (
    values: SignInValues,
    { setSubmitting, setTouched, setErrors }: FormikHelpers<SignInValues>
  ) => {
    try {
      setIsLoading(true);
      setError("");

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError(validationMessages.invalidCredentials);
        setTouched({ email: true, password: true });
      } else if (result?.ok) {
        router.replace("/dashboard");
      }
    } catch (err) {
      setError(validationMessages.unexpected);
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
