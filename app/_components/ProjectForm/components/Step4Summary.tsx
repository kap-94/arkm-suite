import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { Typography } from "../../Typography";
import { FormStepProps } from "../types";
import { SummarySection } from "./SummarySection";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

const Step4Summary: React.FC<FormStepProps> = ({ values, dictionary }) => {
  const dict = dictionary?.steps?.step4 || {
    title: "Almost There!",
    subtitle: "Review your project details",
    projectDetails: "Project Details",
    contactInformation: "Contact Information",
    terms: {
      type: "Type:",
      budget: "Budget:",
      timeline: "Timeline:",
      company: "Company:",
      email: "Email:",
      phone: "Phone:",
      preferredContact: "Preferred Contact:",
    },
  };

  const projectTypeOptions = dictionary?.options?.projectType || [];
  const budgetOptions = dictionary?.options?.budget || [];
  const timelineOptions = dictionary?.options?.timeline || [];
  const contactMethodOptions = dictionary?.options?.contactMethod || [];

  // Preparar los datos para las secciones de resumen
  const projectDetailItems = [
    {
      term: dict.terms.type,
      description:
        projectTypeOptions.find((option) => option.value === values.type)
          ?.label ||
        (values.type === "other" ? values.customType : values.type),
    },
    {
      term: dict.terms.budget,
      description:
        budgetOptions.find((option) => option.value === values.budget)?.label ||
        values.budget,
    },
    {
      term: dict.terms.timeline,
      description:
        timelineOptions.find((option) => option.value === values.timeline)
          ?.label || values.timeline,
    },
  ];

  const contactInfoItems = [
    {
      term: dict.terms.company,
      description: values.companyName,
    },
    {
      term: dict.terms.email,
      description: values.email,
    },
    ...(values.phone
      ? [
          {
            term: dict.terms.phone,
            description: values.phone,
          },
        ]
      : []),
    {
      term: dict.terms.preferredContact,
      description:
        contactMethodOptions.find(
          (option) => option.value === values.preferredContact
        )?.label || values.preferredContact,
    },
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
      <div className={cx("project-form__summary")}>
        <SummarySection
          title={dict.projectDetails}
          items={projectDetailItems}
        />
        <SummarySection
          title={dict.contactInformation}
          items={contactInfoItems}
        />
      </div>
    </div>
  );
};

export default Step4Summary;
