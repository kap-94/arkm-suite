import React, { memo } from "react";
import classNames from "classnames/bind";
import { ChevronDown } from "lucide-react";
import { Typography } from "../../Typography";
import { Dropdown } from "../../Dropdown";
import TextField from "../../TextField/TextField";
import { FormStepProps } from "../types";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

const Step3ContactInfo: React.FC<FormStepProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  shouldShowError,
  dictionary,
}) => {
  const dict = dictionary?.steps?.step3 || {
    title: "Contact Information",
    subtitle: "Let's stay in touch",
    companyName: "Company Name",
    companyNamePlaceholder: "Your company name",
    emailAddress: "Email Address",
    emailPlaceholder: "your@email.com",
    phone: "Phone",
    phonePlaceholder: "+1 (555) 000-0000",
    preferredContact: "Preferred Contact Method",
  };

  const contactMethodOptions = dictionary?.options?.contactMethod || [
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" },
    { label: "Video Call", value: "video-call" },
  ];

  return (
    <div className={cx("project-form")}>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="h3"
        className={cx("project-form__title")}
      >
        {dict.title}
      </Typography>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="p1"
        className={cx("project-form__subtitle")}
      >
        {dict.subtitle}
      </Typography>

      <div className={cx("project-form__group")}>
        <TextField
          variant="secondary"
          label={dict.companyName}
          name="companyName"
          placeholder={dict.companyNamePlaceholder}
          theme={{ type: "dark" }}
          fontFamily="sofia"
          error={errors.companyName}
          value={values.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          showError={shouldShowError("companyName")}
          required={true}
        />
      </div>

      <div className={cx("project-form__group")}>
        <TextField
          variant="secondary"
          label={dict.emailAddress}
          name="email"
          type="email"
          placeholder={dict.emailPlaceholder}
          theme={{ type: "dark" }}
          fontFamily="sofia"
          error={errors.email}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          showError={shouldShowError("email")}
          required={true}
        />
      </div>

      <div className={cx("project-form__group")}>
        <TextField
          variant="secondary"
          label={dict.phone}
          name="phone"
          type="tel"
          placeholder={dict.phonePlaceholder}
          theme={{ type: "dark" }}
          fontFamily="sofia"
          error={errors.phone}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          showError={shouldShowError("phone")}
          required={false}
        />
      </div>

      <div className={cx("project-form__group")}>
        <Dropdown
          fontFamily="sofia"
          icon={<ChevronDown />}
          label={dict.preferredContact}
          id="preferred-contact"
          options={contactMethodOptions}
          selected={
            contactMethodOptions.find(
              (option) => option.value === values.preferredContact
            )!
          }
          onSelectedChange={(option) =>
            setFieldValue("preferredContact", option.value)
          }
          theme={{ type: "dark" }}
        />
        {shouldShowError("preferredContact") && errors.preferredContact && (
          <div
            className="error-message"
            style={{ color: "red", marginTop: "4px" }}
          >
            {errors.preferredContact}
          </div>
        )}
      </div>
    </div>
  );
};

// Usar memo para evitar renderizados innecesarios
export default memo(Step3ContactInfo);
