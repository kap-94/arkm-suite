import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { Typography } from "../../Typography";
import { FormStepProps } from "../types";
import { SummarySection } from "./SummarySection";
import {
  projectTypeOptions,
  budgetOptions,
  timelineOptions,
  contactMethodOptions,
} from "../constants";
import styles from "../ProjectForm.module.scss";

const cx = classNames.bind(styles);

const Step4Summary: React.FC<FormStepProps> = ({ values }) => {
  // Log cuando se monta el componente
  useEffect(() => {
    console.log("Step4Summary montado");
    console.log("Valores para resumen:", values);

    // Verificar existencia de elementos DOM después del renderizado
    setTimeout(() => {
      const summaryElement = document.querySelector(".project-form__summary");
      console.log(
        "¿Se encuentra el elemento project-form__summary?",
        !!summaryElement
      );
    }, 0);

    return () => {
      console.log("Step4Summary desmontado");
    };
  }, [values]);

  // Preparar los datos para las secciones de resumen
  const projectDetailItems = [
    {
      term: "Type:",
      description:
        projectTypeOptions.find((option) => option.value === values.type)
          ?.label ||
        (values.type === "other" ? values.customType : values.type),
    },
    {
      term: "Budget:",
      description:
        budgetOptions.find((option) => option.value === values.budget)?.label ||
        values.budget,
    },
    {
      term: "Timeline:",
      description:
        timelineOptions.find((option) => option.value === values.timeline)
          ?.label || values.timeline,
    },
  ];

  const contactInfoItems = [
    {
      term: "Company:",
      description: values.companyName,
    },
    {
      term: "Email:",
      description: values.email,
    },
    ...(values.phone
      ? [
          {
            term: "Phone:",
            description: values.phone,
          },
        ]
      : []),
    {
      term: "Preferred Contact:",
      description:
        contactMethodOptions.find(
          (option) => option.value === values.preferredContact
        )?.label || values.preferredContact,
    },
  ];

  console.log("Renderizando Step4Summary con items:", {
    projectDetailItems,
    contactInfoItems,
  });

  return (
    <div className={cx("project-form")}>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="h3"
        className={cx("project-form__title")}
      >
        Almost There!
      </Typography>
      <Typography
        theme="dark"
        fontFamily="sofia"
        fontWeight={400}
        variant="p1"
        className={cx("project-form__subtitle")}
      >
        Review your project details
      </Typography>
      <div className={cx("project-form__summary")}>
        <SummarySection title="Project Details" items={projectDetailItems} />
        <SummarySection title="Contact Information" items={contactInfoItems} />
      </div>
    </div>
  );
};

export default Step4Summary;
