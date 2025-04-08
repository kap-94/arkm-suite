"use client";

import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography } from "../Typography";
import TextField from "../TextField/TextField";
import TextArea from "../TextArea";
import Spinner from "../Spinner";
import { Mail, User, MessageSquare } from "lucide-react";
import { useUIContext } from "@/app/_context/UIContext";
import { sendContactEmail } from "@/app/_services/emailService";
import { ContactFormDictionary } from "@/app/_types/dictionary/mainLayout.types";
import styles from "./ContactForm.module.scss";

const cx = classNames.bind(styles);

interface ContactFormProps {
  onCloseModal?: () => void;
  dictionary?: Partial<ContactFormDictionary>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onCloseModal,
  dictionary,
}) => {
  const formikRef = useRef<any>(null);
  const [isSending, setIsSending] = useState(false);
  const { showSnackbar } = useUIContext();

  // Default messages in case no dictionary is provided
  const formLabels = {
    title: dictionary?.title || "Get in Touch",
    subtitle: dictionary?.subtitle || "I'd love to hear from you",
    name: dictionary?.name || "Name",
    namePlaceholder: dictionary?.namePlaceholder || "Your name",
    email: dictionary?.email || "Email",
    emailPlaceholder: dictionary?.emailPlaceholder || "your@email.com",
    message: dictionary?.message || "Message",
    messagePlaceholder: dictionary?.messagePlaceholder || "Your message",
    submit: dictionary?.submit || "Send Message",
    successMessage:
      dictionary?.success ||
      "Message sent successfully. Thank you for reaching out!",
    errorMessage:
      dictionary?.error || "Error sending message. Please try again.",
    validation: {
      nameRequired: dictionary?.validation?.nameRequired || "Name is required",
      emailRequired:
        dictionary?.validation?.emailRequired || "Email is required",
      emailInvalid:
        dictionary?.validation?.emailInvalid || "Invalid email address",
      messageRequired:
        dictionary?.validation?.messageRequired || "Message is required",
    },
  };

  // Validation schema using dictionary values
  const contactFormSchema = Yup.object({
    name: Yup.string().required(formLabels.validation.nameRequired),
    email: Yup.string()
      .email(formLabels.validation.emailInvalid)
      .required(formLabels.validation.emailRequired),
    message: Yup.string().required(formLabels.validation.messageRequired),
  });

  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={contactFormSchema}
      validateOnChange={true}
      validateOnBlur={true}
      validateOnMount={false}
      onSubmit={async (values, { resetForm }) => {
        setIsSending(true);
        try {
          await sendContactEmail({
            name: values.name,
            email: values.email,
            message: values.message,
          });
          showSnackbar(formLabels.successMessage, "success");
          resetForm();
          if (onCloseModal) onCloseModal();
        } catch (error) {
          console.error("Error sending message:", error);
          showSnackbar(formLabels.errorMessage, "error");
        } finally {
          setIsSending(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isValid }) => (
        <Form noValidate className={cx("contact-form__wrapper")}>
          <Typography
            theme="dark"
            fontFamily="sofia"
            fontWeight={400}
            variant="h3"
            className={cx("contact-form__title")}
          >
            {formLabels.title}
          </Typography>

          <Typography
            theme="dark"
            fontFamily="sofia"
            fontWeight={400}
            variant="p1"
            className={cx("contact-form__subtitle")}
          >
            {formLabels.subtitle}
          </Typography>

          <div className={cx("contact-form__group")}>
            <TextField
              variant="secondary"
              label={formLabels.name}
              name="name"
              placeholder={formLabels.namePlaceholder}
              theme={{ type: "dark" }}
              icon={<User size={20} />}
              fontFamily="sofia"
              error={errors.name}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              showError={touched.name && !!errors.name}
              required={true}
            />
          </div>

          <div className={cx("contact-form__group")}>
            <TextField
              variant="secondary"
              label={formLabels.email}
              name="email"
              type="email"
              placeholder={formLabels.emailPlaceholder}
              theme={{ type: "dark" }}
              icon={<Mail size={20} />}
              fontFamily="sofia"
              error={errors.email}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              showError={touched.email && !!errors.email}
              required={true}
            />
          </div>

          <div className={cx("contact-form__group")}>
            <TextArea
              variant="secondary"
              label={formLabels.message}
              name="message"
              placeholder={formLabels.messagePlaceholder}
              theme={{ type: "dark" }}
              icon={<MessageSquare size={20} />}
              fontFamily="sofia"
              error={errors.message}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              showError={touched.message && !!errors.message}
              required={true}
              rows={5}
            />
          </div>

          <div className={cx("contact-form__divider")} />

          <button
            type="submit"
            className={cx(
              "contact-form__button",
              "contact-form__button--primary"
            )}
            disabled={isSending}
          >
            {isSending ? (
              <Spinner size="sm" />
            ) : (
              <Typography
                theme="dark"
                fontFamily="sofia"
                fontWeight={500}
                variant="button"
              >
                {formLabels.submit}
              </Typography>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
