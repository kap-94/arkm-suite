"use client";

import { useState, useMemo, useCallback } from "react";
import moment from "moment";
import { GanttStage } from "../types";
import { useGanttContext } from "../GanttContext";
import { useStageCardSync } from "./useStageCardSync";
import { Stage } from "../../../_types/models";
import {
  normalizeDate,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  isDateInRange,
  calculateBarPosition,
  formatGanttHeader,
} from "../gantt-date-calculations";
import { useDashboard } from "../../../_context/DashboardContext";

interface DateState {
  year: Date;
  month: Date;
  week: Date;
}

interface UseGanttProps {
  showWeekends?: boolean;
  stages: Stage[];
}

export const useGantt = ({ stages, showWeekends = true }: UseGanttProps) => {
  const { language } = useDashboard();
  const [selectedStage, setSelectedStage] = useState<GanttStage | null>(null);
  const [showWeekendsState, setShowWeekends] = useState(showWeekends);

  const { stageCardHeights, selectedStageId, toggleStageSelection } =
    useGanttContext();

  // Normalizar las fechas de los stages a UTC
  const normalizedStages = useMemo(() => {
    return stages.map((stage) => ({
      ...stage,
      startDate: normalizeDate(stage.startDate),
      endDate: normalizeDate(stage.endDate),
    }));
  }, [stages]);

  // Calcular fechas iniciales y vista
  const { defaultStartDate, defaultEndDate, initialView } = useMemo(() => {
    const dates = normalizedStages.flatMap((stage) => [
      moment.utc(stage.startDate).toDate(),
      moment.utc(stage.endDate).toDate(),
    ]);

    const startDate = moment
      .utc(Math.min(...dates.map((d) => d.getTime())))
      .toDate();
    const endDate = moment
      .utc(Math.max(...dates.map((d) => d.getTime())))
      .toDate();

    let view: "year" | "month" | "week" = "year";

    const momentStart = moment.utc(startDate);
    const momentEnd = moment.utc(endDate);
    const sameMonth =
      momentStart.format("YYYY-MM") === momentEnd.format("YYYY-MM");
    const daysDiff = momentEnd.diff(momentStart, "days");

    if (sameMonth) {
      view = momentStart.isSame(momentEnd, "week") ? "week" : "month";
    } else if (daysDiff <= 31) {
      view = "month";
    }

    return {
      defaultStartDate: startDate,
      defaultEndDate: endDate,
      initialView: view,
    };
  }, [normalizedStages]);

  const [view, setView] = useState<"year" | "month" | "week">(initialView);
  const [dates, setDates] = useState<DateState>({
    year: moment.utc(defaultStartDate).startOf("year").toDate(),
    month: defaultStartDate,
    week: defaultStartDate,
  });
  const [currentDate, setCurrentDate] = useState(dates[initialView]);

  const updateCurrentDate = useCallback(
    (newView: typeof view) => {
      setCurrentDate(dates[newView]);
    },
    [dates]
  );

  // Calcular fechas de inicio y fin según la vista

  const { startDate, endDate, totalDays } = useMemo(() => {
    let start = moment.utc(currentDate).toDate();
    let end: Date;
    let days: number;

    switch (view) {
      case "year":
        start = moment.utc(start).startOf("year").toDate();
        end = moment.utc(start).endOf("year").toDate();
        days = 12;
        break;
      case "month":
        start = getFirstDayOfMonth(start);
        end = getLastDayOfMonth(start);
        days = moment.utc(end).diff(moment.utc(start), "days") + 1;
        break;
      case "week":
        start = getFirstDayOfWeek(start);
        end = getLastDayOfWeek(start);
        days = 7;
        break;
    }
    return { startDate: start, endDate: end, totalDays: days };
  }, [currentDate, view]);

  // Calcular datos del timeline
  const timelineData = useMemo(() => {
    if (view === "year") {
      const months = Array.from({ length: 12 }, (_, i) =>
        moment.utc(startDate).startOf("year").add(i, "months").toDate()
      );
      return { gridItems: months, totalUnits: 12 };
    } else {
      const startMoment = moment.utc(startDate).startOf(view);
      const endMoment = moment.utc(endDate).endOf(view);
      const totalDays = endMoment.diff(startMoment, "days") + 1;

      const days = Array.from({ length: totalDays }, (_, i) =>
        moment
          .utc(startDate)
          .startOf(view)
          .add(i, "days")
          .startOf("day")
          .toDate()
      );

      return { gridItems: days, totalUnits: totalDays };
    }
  }, [view, startDate, endDate]);

  // Navegación entre períodos
  const navigatePeriod = useCallback(
    (direction: "prev" | "next") => {
      const newDate = moment.utc(currentDate);

      switch (view) {
        case "year":
          newDate.add(direction === "next" ? 1 : -1, "years");
          break;
        case "month":
          newDate.add(direction === "next" ? 1 : -1, "months");
          break;
        case "week":
          newDate.add(direction === "next" ? 7 : -7, "days");
          break;
      }

      const updatedDate = newDate.toDate();
      setCurrentDate(updatedDate);
      setDates((prev) => ({ ...prev, [view]: updatedDate }));
    },
    [currentDate, view]
  );

  // Formatear fechas para la UI
  const dateFormatter = useCallback(
    (date: Date) => {
      return formatGanttHeader(date, view, language);
    },
    [view, language]
  );

  // Calcular posición de los stages en el timeline
  const getStagePosition = useCallback(
    (stage: GanttStage) => {
      const stageStart = moment.utc(stage.startDate).startOf("day").toDate();
      const stageEnd = moment.utc(stage.endDate).endOf("day").toDate();
      const timelineStart = moment.utc(startDate).startOf("day").toDate();
      const timelineEnd = moment.utc(endDate).endOf("day").toDate();

      if (
        !isDateInRange(stageStart, timelineStart, timelineEnd) &&
        !isDateInRange(stageEnd, timelineStart, timelineEnd)
      ) {
        return { left: "0%", width: "0%", visibility: "hidden" as const };
      }

      const position = calculateBarPosition(
        stageStart,
        stageEnd,
        timelineStart,
        timelineEnd,
        view
      );

      return {
        ...position,
        visibility: "visible" as const,
      };
    },
    [startDate, endDate, view]
  );

  const getHeaderLabel = (date: Date, view: string, dictionary: any) => {
    const dayMoment = moment.utc(date);
    if (view === "year") {
      return dictionary.timeline.header.months.short[dayMoment.month()];
    } else if (view === "month") {
      return dictionary.timeline.header.weekDays.short[dayMoment.day()];
    }
    return dictionary.timeline.header.weekDays.long[dayMoment.day()];
  };

  return {
    selectedStage,
    setSelectedStage,
    showWeekends: showWeekendsState,
    setShowWeekends,
    view,
    setView,
    currentDate,
    timelineData,
    navigatePeriod,
    dateFormatter,
    getStagePosition,
    getHeaderLabel,
    updateCurrentDate,
    stages: normalizedStages,
    selectedStageId,
    toggleStageSelection,
    stageCardHeights,
    useStageCardSync,
    totalDays,
  };
};
