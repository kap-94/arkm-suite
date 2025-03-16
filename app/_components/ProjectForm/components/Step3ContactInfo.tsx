import React, { memo } from "react";
import classNames from "classnames/bind";
import { ChevronDown } from "lucide-react";
import { Typography } from "../../Typography";
import { Dropdown } from "../../Dropdown";
import TextField from "../../TextField/TextField";
import { FormStepProps } from "../types";
import { contactMethodOptions } from "../constants";
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
}) => {
  return (
    <div className={cx("project-form")}>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="h3"
        className={cx("project-form__title")}
      >
        Contact Information
      </Typography>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="p1"
        className={cx("project-form__subtitle")}
      >
        Let's stay in touch
      </Typography>

      <div className={cx("project-form__group")}>
        <TextField
          variant="secondary"
          label="Company Name"
          name="companyName"
          placeholder="Your company name"
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
          label="Email Address"
          name="email"
          type="email"
          placeholder="your@email.com"
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
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
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
          label="Preferred Contact Method"
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
