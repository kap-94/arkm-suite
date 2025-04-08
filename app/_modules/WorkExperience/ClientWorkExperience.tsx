"use client";

import React, { useState } from "react";
import classNames from "classnames/bind";

import SectionHeading from "@/app/_components/SectionHeading";
import { WorkExperienceDictionary } from "@/app/_types/dictionary/home.types";
import styles from "./WorkExperience.module.scss";
import JobDetailsCard from "@/app/_components/JobDetailsCard";
import InteractiveJobSelector from "@/app/_components/JobSelector/InteractiveJobSelector";
import AboutMeSelector from "@/app/_components/AboutMeSelector";
import AboutMeCard from "@/app/_components/AboutMeCard";
import { Fintech3D } from "@/app/_components/animations/Fintech3D";
import MultiBuildings3D from "@/app/_components/animations/MultiBuildings3D/MultiBuildings3D";
import Building3D from "@/app/_components/animations/Building3D/Building3D";
import Computer3D from "@/app/_components/animations/Computer3D/Computer3D";
import MarketingAudience3D from "@/app/_components/animations/MarketingAudience3D/MarketingAudience3D";

interface ClientWorkExperienceProps {
  dictionary: WorkExperienceDictionary;
  customAnchorId?: string;
}

const cx = classNames.bind(styles);

export default function ClientWorkExperience({
  dictionary,
  customAnchorId,
}: ClientWorkExperienceProps) {
  const [activeJobIndex, setActiveJobIndex] = useState<number>(-1); // Start with -1 to show about me by default
  const { positions, title, subtitle, aboutMe } = dictionary;

  // Handle showing about me or job details
  const isAboutMeActive = activeJobIndex === -1;
  const activeJob = isAboutMeActive ? null : positions[activeJobIndex];

  // Función para seleccionar el componente 3D según el ID del trabajo
  const getJobSvgComponent = (jobId?: number) => {
    if (!jobId) return <Computer3D />;

    // Mapeo de ID de trabajo a componente 3D
    switch (jobId) {
      case 1: // Gendra REM - Fintech
        return <Fintech3D />;
      case 2: // Nebulosa Studio - Marketing
        return <MarketingAudience3D />;
      case 3: // DOKA Systems - Construcción
        return <MultiBuildings3D />;
      case 4: // CENIDET, UNAM - Educación
        return <Computer3D />;
      default:
        return <Building3D />;
    }
  };

  return (
    <section className={cx("section")} id={customAnchorId}>
      <div className={cx("section__header")}>
        <SectionHeading
          title={title}
          align="center"
          subtitle={subtitle}
          titleProps={{
            variant: "h2",
            color: "primary",
            theme: "dark",
            align: "center",
          }}
          subtitleProps={{
            variant: "h5",
            color: "tertiary",
            theme: "dark",
            align: "center",
          }}
        />
      </div>

      <div className={cx("section__content")}>
        <div className={cx("section__card")}>
          {isAboutMeActive ? (
            <AboutMeCard aboutMe={aboutMe} />
          ) : (
            activeJob && (
              <JobDetailsCard
                company={activeJob.company}
                role={activeJob.role}
                location={activeJob.location}
                description={activeJob.description}
                period={activeJob.period}
                technologies={activeJob.technologies}
                svgComponent={getJobSvgComponent(activeJob.id)}
              />
            )
          )}
        </div>

        <ul className={cx("section__jobs-list")}>
          {/* About Me Selector */}
          <li>
            <AboutMeSelector
              isActive={isAboutMeActive}
              aboutMe={aboutMe}
              onClick={() => setActiveJobIndex(-1)}
            />
          </li>

          {/* Job Selectors */}
          {positions.map((job, index) => (
            <li key={job.id} data-tab={index}>
              <InteractiveJobSelector
                isActive={index === activeJobIndex}
                imageUrl={job.imageUrl}
                company={job.company}
                role={job.role}
                industry={job.industry}
                iconType={job.iconType}
                onClick={() => setActiveJobIndex(index)}
              />
            </li>
          ))}
        </ul>

        <ul className={cx("dots")}>
          {/* About Me Dot */}
          <li
            data-tab="-1"
            className="job-item"
            onClick={() => setActiveJobIndex(-1)}
          >
            <div
              className={cx("dots__dot", {
                "dots__dot--active": isAboutMeActive,
              })}
            />
          </li>

          {/* Job Dots */}
          {positions.map((job, index) => (
            <li
              key={job.id}
              data-tab={index}
              className="job-item"
              onClick={() => setActiveJobIndex(index)}
            >
              <div
                className={cx("dots__dot", {
                  "dots__dot--active": index === activeJobIndex,
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
