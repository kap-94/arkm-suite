// src/components/ProjectForm/index.tsx
"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProjectForm.module.scss";

const cx = classNames.bind(styles);

interface ProjectFormProps {
  onCloseModal?: () => void;
}

interface ProjectData {
  type: string;
  customType?: string;
  budget: string;
  timeline: string;
  features: string[];
  companyName: string;
  email: string;
  phone?: string;
  preferredContact: string;
  currentStep: number;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onCloseModal }) => {
  const [formData, setFormData] = useState<ProjectData>({
    type: "web-design",
    budget: "0-5k",
    timeline: "1-2-months",
    features: [],
    companyName: "",
    email: "",
    preferredContact: "email",
    currentStep: 1,
  });

  const updateFormData = (data: Partial<ProjectData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handlePrevStep = () => {
    setFormData((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1),
    }));
  };

  const handleNextStep = () => {
    if (formData.currentStep < 4) {
      setFormData((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      // Aquí iría la lógica de envío del formulario
      console.log("Form submitted:", formData);
      onCloseModal?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getCurrentStep = () => {
    switch (formData.currentStep) {
      case 1:
        return (
          <div className={cx("project-form")}>
            <h2 className={cx("project-form__title")}>
              Let's Create Something Amazing
            </h2>
            <p className={cx("project-form__subtitle")}>
              Tell us about your project vision
            </p>

            <div className={cx("project-form__group")}>
              <label className={cx("project-form__label")}>Project Type</label>
              <select
                className={cx("project-form__select")}
                value={formData.type}
                onChange={(e) => updateFormData({ type: e.target.value })}
              >
                <option value="web-design">Web Design</option>
                <option value="web-development">Web Development</option>
                <option value="digital-branding">Digital Branding</option>
                <option value="e-commerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.type === "other" && (
              <div className={cx("project-form__group")}>
                <label className={cx("project-form__label")}>
                  Please specify
                </label>
                <input
                  type="text"
                  className={cx("project-form__input")}
                  value={formData.customType}
                  onChange={(e) =>
                    updateFormData({ customType: e.target.value })
                  }
                />
              </div>
            )}

            <div className={cx("project-form__buttons")}>
              <button
                className={cx(
                  "project-form__button",
                  "project-form__button--primary"
                )}
                onClick={handleNextStep}
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={cx("project-form")}>
            <h2 className={cx("project-form__title")}>Project Scope</h2>
            <p className={cx("project-form__subtitle")}>
              Help us understand your needs
            </p>

            <div className={cx("project-form__group")}>
              <label className={cx("project-form__label")}>Budget Range</label>
              <select
                className={cx("project-form__select")}
                value={formData.budget}
                onChange={(e) => updateFormData({ budget: e.target.value })}
              >
                <option value="0-5k">$0 - $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k+">$50,000+</option>
              </select>
            </div>

            <div className={cx("project-form__group")}>
              <label className={cx("project-form__label")}>Timeline</label>
              <select
                className={cx("project-form__select")}
                value={formData.timeline}
                onChange={(e) => updateFormData({ timeline: e.target.value })}
              >
                <option value="1-2-months">1-2 Months</option>
                <option value="2-3-months">2-3 Months</option>
                <option value="3-6-months">3-6 Months</option>
                <option value="6+-months">6+ Months</option>
              </select>
            </div>

            <div className={cx("project-form__buttons")}>
              <button
                className={cx(
                  "project-form__button",
                  "project-form__button--secondary"
                )}
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button
                className={cx(
                  "project-form__button",
                  "project-form__button--primary"
                )}
                onClick={handleNextStep}
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={cx("project-form")}>
            <h2 className={cx("project-form__title")}>Contact Information</h2>
            <p className={cx("project-form__subtitle")}>Let's stay in touch</p>

            <div className={cx("project-form__group")}>
              <label className={cx("project-form__label")}>Company Name</label>
              <input
                type="text"
                className={cx("project-form__input")}
                value={formData.companyName}
                onChange={(e) =>
                  updateFormData({ companyName: e.target.value })
                }
                placeholder="Your company name"
              />
            </div>

            <div className={cx("project-form__group")}>
              <label className={cx("project-form__label")}>Email</label>
              <input
                type="email"
                className={cx("project-form__input")}
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className={cx("project-form__group")}>
              <label className={cx("project-form__label")}>
                Phone (optional)
              </label>
              <input
                type="tel"
                className={cx("project-form__input")}
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className={cx("project-form__group")}>
              <label className={cx("project-form__label")}>
                Preferred Contact Method
              </label>
              <select
                className={cx("project-form__select")}
                value={formData.preferredContact}
                onChange={(e) =>
                  updateFormData({ preferredContact: e.target.value })
                }
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="video-call">Video Call</option>
              </select>
            </div>

            <div className={cx("project-form__buttons")}>
              <button
                className={cx(
                  "project-form__button",
                  "project-form__button--secondary"
                )}
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button
                className={cx(
                  "project-form__button",
                  "project-form__button--primary"
                )}
                onClick={handleNextStep}
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={cx("project-form")}>
            <h2 className={cx("project-form__title")}>Almost There!</h2>
            <p className={cx("project-form__subtitle")}>
              Review your project details
            </p>

            <div className={cx("project-form__summary")}>
              <div className={cx("project-form__summary-section")}>
                <h3 className={cx("project-form__summary-title")}>
                  Project Details
                </h3>
                <dl className={cx("project-form__summary-list")}>
                  <dt className={cx("project-form__summary-term")}>Type:</dt>
                  <dd className={cx("project-form__summary-description")}>
                    {formData.type === "other"
                      ? formData.customType
                      : formData.type}
                  </dd>
                  <dt className={cx("project-form__summary-term")}>Budget:</dt>
                  <dd className={cx("project-form__summary-description")}>
                    {formData.budget}
                  </dd>
                  <dt className={cx("project-form__summary-term")}>
                    Timeline:
                  </dt>
                  <dd className={cx("project-form__summary-description")}>
                    {formData.timeline}
                  </dd>
                </dl>
              </div>

              <div className={cx("project-form__summary-section")}>
                <h3 className={cx("project-form__summary-title")}>
                  Contact Information
                </h3>
                <dl className={cx("project-form__summary-list")}>
                  <dt className={cx("project-form__summary-term")}>Company:</dt>
                  <dd className={cx("project-form__summary-description")}>
                    {formData.companyName}
                  </dd>
                  <dt className={cx("project-form__summary-term")}>Email:</dt>
                  <dd className={cx("project-form__summary-description")}>
                    {formData.email}
                  </dd>
                  {formData.phone && (
                    <>
                      <dt className={cx("project-form__summary-term")}>
                        Phone:
                      </dt>
                      <dd className={cx("project-form__summary-description")}>
                        {formData.phone}
                      </dd>
                    </>
                  )}
                  <dt className={cx("project-form__summary-term")}>
                    Preferred Contact:
                  </dt>
                  <dd className={cx("project-form__summary-description")}>
                    {formData.preferredContact}
                  </dd>
                </dl>
              </div>
            </div>

            <div className={cx("project-form__buttons")}>
              <button
                className={cx(
                  "project-form__button",
                  "project-form__button--secondary"
                )}
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button
                className={cx(
                  "project-form__button",
                  "project-form__button--primary"
                )}
                onClick={handleSubmit}
              >
                Complete
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cx("project-form__wrapper")}>
      <div className={cx("project-form__progress")}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cx("project-form__progress-step", {
              "project-form__progress-step--active":
                index + 1 === formData.currentStep,
              "project-form__progress-step--completed":
                index + 1 < formData.currentStep,
            })}
          />
        ))}
      </div>
      {getCurrentStep()}
    </div>
  );
};

export default ProjectForm;
