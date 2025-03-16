import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames/bind";
import moment from "moment";
import { ThemedTypography } from "../Typography/ThemedTypography";
import { ThemedDropdown } from "../Dropdown/Dropdown";
import { GanttViewProps, GanttStage } from "./types";
import StickyWrapper from "../StickyWrapper";
import { StageCard } from "./components/StageCard";
import { StageBar } from "./components/StageBar";
import { useGantt } from "./hooks/useGantt";
import { GanttProvider } from "./GanttContext";
import { calculateCurrentDayPosition } from "./gantt-date-calculations";
import { formatCustomDateUTC } from "@/app/_utils/date-utils";
import { useDashboard } from "../../_context/DashboardContext";
import styles from "./GanttView.module.scss";
import {
  GanttViewOption,
  ProjectStatus,
} from "@/app/_types/dictionary/projectDetails.types";

const cx = classNames.bind(styles);

const GanttContent = ({
  theme,
  dictionary,
  gridStyle,
  stages,
  projectType,
  timelineData,
  view,
  showWeekends,
  dateFormatter,
  getHeaderLabel,
  getStagePosition,
  currentDate,
  setView,
  updateCurrentDate,
  navigatePeriod,
  selectedStageId,
  toggleStageSelection,
  stageCardHeights,
  useStageCardSync,
  showCurrentDay,
  totalUnits,
  totalDays,
}: any) => {
  const { dimensions, language } = useDashboard();

  const renderCurrentDayIndicator = () => {
    if (!showCurrentDay) return null;

    const today = moment.utc().startOf("day").toDate();
    const timelineStart = timelineData.gridItems[0];
    const timelineEnd =
      timelineData.gridItems[timelineData.gridItems.length - 1];

    const { position, visible } = calculateCurrentDayPosition(
      today,
      timelineStart,
      timelineEnd,
      view
    );

    if (!visible) return null;

    return (
      <div
        className={cx("gantt__current-day-indicator")}
        style={{ left: `${position}%` }}
      />
    );
  };

  const renderGridOverlay = () => {
    if (gridStyle === "none") return null;

    const numberOfRows = 8;
    const cells = Array.from({
      length:
        timelineData.totalUnits * (gridStyle === "cells" ? numberOfRows : 1),
    });

    return (
      <div
        className={cx(
          "gantt__grid-overlay",
          `gantt__grid-overlay--${gridStyle}`
        )}
        style={
          {
            "--total-days": timelineData.totalUnits,
            "--start-date": formatCustomDateUTC(
              timelineData.gridItems[0],
              "YYYY-MM-DD"
            ),
          } as React.CSSProperties
        }
      >
        {cells.map((_, index) => (
          <div key={index} />
        ))}
      </div>
    );
  };

  return (
    <div className={cx("gantt", `gantt--theme-${theme.type}`)} data-view={view}>
      <div className={cx("gantt__header")}>
        <div className={cx("gantt__controls")}>
          <div className={cx("gantt__period")}>
            <button
              className={cx("gantt__period-nav")}
              onClick={() => navigatePeriod("prev")}
            >
              <ChevronLeft size={16} strokeWidth={1.8} />
            </button>
            <ThemedTypography variant="p2" noWrap fontWeight={500}>
              {dateFormatter(currentDate, language)}
            </ThemedTypography>
            <button
              className={cx("gantt__period-nav")}
              onClick={() => navigatePeriod("next")}
            >
              <ChevronRight size={16} strokeWidth={1.8} />
            </button>
          </div>

          <div className={cx("gantt__right-controls")}>
            <div className={cx("gantt__status-legend")}>
              {dictionary.controls.statusLegend.map((status: ProjectStatus) => (
                <div key={status.label} className={cx("gantt__status-item")}>
                  <span
                    className={cx(
                      "gantt__status-dot",
                      `gantt__status-dot--${status.color}`
                    )}
                  />
                  <ThemedTypography
                    variant="p3"
                    fontWeight={500}
                    noWrap
                    color="secondary"
                  >
                    {status.label}
                  </ThemedTypography>
                </div>
              ))}
            </div>

            <div className={cx("gantt__view-controls")}>
              <ThemedDropdown
                options={dictionary.controls.viewOptions}
                selected={{
                  value: view,
                  label:
                    dictionary.controls.viewOptions.find(
                      (opt: GanttViewOption) => opt.value === view
                    )?.label || view,
                }}
                onSelectedChange={(option) => {
                  const newView = option.value as "year" | "month" | "week";
                  setView(newView);
                  updateCurrentDate(newView);
                }}
                theme={theme}
                icon={<ChevronDown size={16} />}
                className={cx("gantt__view-select")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={cx("gantt__content")}>
        <div className={cx("gantt__info-column")}>
          <div className={cx("gantt__stage-header")}>
            <ThemedTypography variant="p2" fontWeight={500} color="secondary">
              {projectType}
            </ThemedTypography>
          </div>

          <div className={cx("gantt__stage-info-list")}>
            {stages.map((stage: GanttStage) => {
              const cardRef = useStageCardSync(stage.id);
              return (
                <div
                  key={stage.id}
                  className={cx("gantt__stage-info-item", {
                    "gantt__stage-info-item--selected":
                      selectedStageId === stage.id,
                  })}
                  onClick={() => toggleStageSelection(stage.id)}
                >
                  <StageCard
                    ref={cardRef}
                    stage={stage}
                    dictionary={dictionary.stageCard.labels}
                    theme={theme}
                    isSelected={selectedStageId === stage.id}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className={cx("gantt__timeline-column")}>
          <div className={cx("gantt__timeline-wrapper")}>
            {renderGridOverlay()}
            {renderCurrentDayIndicator()}

            <StickyWrapper
              stickyDirection="top"
              stickyOffset={dimensions.headerHeight}
              zIndex={dimensions.headerZIndex - 12}
            >
              <div className={cx("gantt__timeline-header")}>
                <div
                  className={cx("gantt__days-grid")}
                  style={
                    {
                      "--total-days": timelineData.totalUnits,
                      "--is-year-view": view === "year" ? 1 : 0,
                    } as React.CSSProperties
                  }
                >
                  {timelineData.gridItems.map((date: Date, index: number) => {
                    const dayMoment = moment.utc(date).startOf("day");
                    const isWeekend =
                      view !== "year" &&
                      showWeekends &&
                      [0, 6].includes(dayMoment.day());
                    const isMonthStart = dayMoment.date() === 1;

                    return (
                      <div
                        key={index}
                        className={cx("gantt__day", {
                          "gantt__day--weekend": isWeekend,
                          "gantt__day--month-start": isMonthStart,
                        })}
                        aria-label={
                          isWeekend
                            ? dictionary.timeline.header.aria.weekendDay
                            : undefined
                        }
                      >
                        <div className={cx("gantt__day-label")}>
                          <ThemedTypography variant="p3" color="tertiary">
                            {getHeaderLabel(date, view, dictionary)}
                          </ThemedTypography>
                        </div>
                        {view !== "year" && (
                          <div
                            className={cx("gantt__day-number")}
                            aria-label={
                              isMonthStart
                                ? dictionary.timeline.header.aria.monthStart
                                : undefined
                            }
                          >
                            <ThemedTypography variant="p3" color="secondary">
                              {dayMoment.date()}
                            </ThemedTypography>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </StickyWrapper>

            <div className={cx("gantt__timeline-stages")}>
              {stages.map((stage: GanttStage) => (
                <div
                  key={stage.id}
                  className={cx("gantt__timeline-stage-row", {
                    "gantt__timeline-stage-row--selected":
                      selectedStageId === stage.id,
                  })}
                  style={{
                    height: `${stageCardHeights[stage.id] || 88}px`,
                    transition: "height 0.2s ease-out",
                  }}
                  onClick={() => toggleStageSelection(stage.id)}
                >
                  <StageBar
                    stage={stage}
                    isSelected={selectedStageId === stage.id}
                    timelineData={timelineData}
                    view={view}
                    getStagePosition={getStagePosition}
                    theme={theme}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GanttView = (props: GanttViewProps) => {
  return (
    <GanttProvider>
      <GanttViewInner {...props} />
    </GanttProvider>
  );
};

const GanttViewInner = ({
  projectId,
  projectType,
  theme = { type: "light" },
  showCurrentDay = true,
  gridStyle = "lines",
  stages,
  dictionary,
}: GanttViewProps) => {
  const ganttProps = useGantt({ stages });

  return (
    <GanttContent
      theme={theme}
      gridStyle={gridStyle}
      showCurrentDay={showCurrentDay}
      projectType={projectType}
      dictionary={dictionary}
      {...ganttProps}
    />
  );
};

export default GanttView;
