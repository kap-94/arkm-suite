import { Language } from "@/lib/config/i18n";
import moment from "moment";

interface BarPosition {
  left: string;
  width: string;
  visibility: "visible" | "hidden";
}

interface TimeRange {
  start: moment.Moment;
  end: moment.Moment;
}

const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const capitalizeMonth = (dateStr: string): string => {
  return dateStr.replace(/^[a-záéíóúñ]/i, (letter) => letter.toUpperCase());
};

/**
 * Normaliza una fecha a UTC y la establece al inicio del día
 */
export const normalizeDate = (date: string | Date) => {
  return moment.utc(date).startOf("day").toISOString();
};

/**
 * Obtiene el primer día del mes
 */
export const getFirstDayOfMonth = (date: Date) => {
  return moment.utc(date).startOf("month").toDate();
};

/**
 * Obtiene el último día del mes
 */
export const getLastDayOfMonth = (date: Date) => {
  return moment.utc(date).endOf("month").endOf("day").toDate();
};

/**
 * Obtiene el primer día de la semana
 */
export const getFirstDayOfWeek = (date: Date) => {
  return moment.utc(date).startOf("week").toDate();
};

/**
 * Obtiene el último día de la semana
 */
export const getLastDayOfWeek = (date: Date) => {
  return moment.utc(date).endOf("week").endOf("day").toDate();
};

/**
 * Formatea una fecha para el encabezado del Gantt según el idioma
 */
// export const formatGanttHeader = (
//   date: Date,
//   view: "year" | "month" | "week",
//   language: Language = "en"
// ): string => {
//   const momentDate = moment.utc(date).locale(language);

//   switch (view) {
//     case "year":
//       return momentDate.format("YYYY");

//     case "month":
//       if (language === "es") {
//         const month = capitalizeMonth(momentDate.format("MMMM"));
//         return `${month} de ${momentDate.format("YYYY")}`;
//       }
//       return momentDate.format("MMMM YYYY");

//     case "week":
//       if (language === "es") {
//         const startMonth = capitalizeMonth(momentDate.format("MMMM"));
//         const endMonth = capitalizeMonth(
//           moment.utc(date).locale(language).endOf("week").format("MMMM")
//         );
//         const startDay = momentDate.format("D");
//         const endDay = moment.utc(date).endOf("week").format("D");
//         const year = moment.utc(date).endOf("week").format("YYYY");

//         // Si los meses son diferentes
//         if (startMonth !== endMonth) {
//           return `${startDay} de ${startMonth} - ${endDay} de ${endMonth} de ${year}`;
//         }
//         // Si es el mismo mes
//         return `${startDay} - ${endDay} de ${startMonth} de ${year}`;
//       }
//       return `${momentDate.format("MMMM D")} - ${moment
//         .utc(date)
//         .locale(language)
//         .endOf("week")
//         .format("MMMM D, YYYY")}`;

//     default:
//       return momentDate.format("L");
//   }
// };
export const formatGanttHeader = (
  date: Date,
  view: "year" | "month" | "week",
  language: Language = "en"
): string => {
  const momentDate = moment.utc(date).locale(language);

  switch (view) {
    case "year":
      return momentDate.format("YYYY");
    case "month":
      if (language === "es") {
        const month = capitalizeMonth(momentDate.format("MMMM"));
        return `${month} de ${momentDate.format("YYYY")}`;
      }
      return momentDate.format("MMMM YYYY");
    case "week":
      if (language === "es") {
        return `${momentDate.format("D [de] MMMM")} - ${moment
          .utc(date)
          .locale(language)
          .endOf("week")
          .format("D [de] MMMM [de] YYYY")}`;
      }
      return `${momentDate.format("MMMM D")} - ${moment
        .utc(date)
        .locale(language)
        .endOf("week")
        .format("MMMM D, YYYY")}`;
    default:
      return momentDate.format("L");
  }
};

/**
 * Formatea la etiqueta del día en el Gantt
 */
export const formatDayLabel = (
  date: Date,
  view: "year" | "month" | "week"
): string => {
  const momentDate = moment.utc(date);

  if (view === "year") {
    return momentDate.format("MMM");
  }
  if (view === "week") {
    return momentDate.format("ddd");
  }
  return momentDate.format("dd")[0];
};

const convertToPercentage = (value: number): string => `${value}%`;

const isOutsideRange = (bar: TimeRange, view: TimeRange): boolean => {
  return bar.end.isBefore(view.start) || bar.start.isAfter(view.end);
};

const calculateYearViewPosition = (
  bar: TimeRange,
  yearRange: TimeRange
): BarPosition => {
  // Calculate position based on months for alignment with grid
  const monthsInYear = 12;
  const startMonth = bar.start.month();
  const endMonth = bar.end.month();

  // Calculate day position within start month
  const daysInStartMonth = bar.start.daysInMonth();
  const startDayInMonth = bar.start.date() - 1;
  const startMonthOffset = startDayInMonth / daysInStartMonth;

  // Calculate day position within end month
  const daysInEndMonth = bar.end.daysInMonth();
  const endDayInMonth = bar.end.date();
  const endMonthOffset = endDayInMonth / daysInEndMonth;

  // Calculate final positions
  const left = ((startMonth + startMonthOffset) / monthsInYear) * 100;
  const width =
    ((endMonth - startMonth + endMonthOffset - startMonthOffset) /
      monthsInYear) *
    100;

  return {
    left: convertToPercentage(left),
    width: convertToPercentage(width),
    visibility: "visible",
  };
};

const calculateDayViewPosition = (
  bar: TimeRange,
  view: TimeRange
): BarPosition => {
  const totalTime = view.end.valueOf() - view.start.valueOf();
  const effectiveStart = moment.max(bar.start, view.start);
  const effectiveEnd = moment.min(bar.end, view.end);

  const startOffset = effectiveStart.valueOf() - view.start.valueOf();
  const duration = effectiveEnd.valueOf() - effectiveStart.valueOf();

  return {
    left: convertToPercentage((startOffset / totalTime) * 100),
    width: convertToPercentage((duration / totalTime) * 100),
    visibility: "visible",
  };
};

export const calculateBarPosition = (
  startDate: Date,
  endDate: Date,
  timelineStart: Date,
  timelineEnd: Date,
  view: "year" | "month" | "week"
): BarPosition => {
  const bar = {
    start: moment.utc(startDate).startOf("day"),
    end: moment.utc(endDate).endOf("day"),
  };

  const viewRange = {
    start: moment.utc(timelineStart).startOf("day"),
    end: moment.utc(timelineEnd).endOf("day"),
  };

  if (isOutsideRange(bar, viewRange)) {
    return { left: "0%", width: "0%", visibility: "hidden" };
  }

  if (view === "year") {
    const yearRange = {
      start: moment.utc(timelineStart).startOf("year"),
      end: moment.utc(timelineEnd).endOf("year"),
    };
    return calculateYearViewPosition(bar, yearRange);
  }

  return calculateDayViewPosition(bar, viewRange);
};

/**
 * Calcula la posición del indicador del día actual
 */
export const calculateCurrentDayPosition = (
  today: Date,
  timelineStart: Date,
  timelineEnd: Date,
  view: "year" | "month" | "week"
): { position: number; visible: boolean } => {
  const currentDay = moment.utc(today).startOf("day");
  const viewStart = moment.utc(timelineStart).startOf("day");
  const viewEnd = moment.utc(timelineEnd).endOf("day");

  // Verificar si el día actual está en el rango visible
  if (currentDay.isBefore(viewStart) || currentDay.isAfter(viewEnd)) {
    return { position: 0, visible: false };
  }

  if (view === "year") {
    const monthStart = moment.utc(timelineStart).startOf("year");
    const monthDiff = currentDay.diff(monthStart, "months");
    const daysInMonth = currentDay.daysInMonth();
    const dayOfMonth = currentDay.date() - 1;

    // Calcular posición dentro del mes
    const monthPosition = monthDiff;
    const dayProgress = dayOfMonth / daysInMonth;
    const position = ((monthPosition + dayProgress) / 12) * 100;

    return { position, visible: true };
  } else {
    const totalTime = viewEnd.valueOf() - viewStart.valueOf();
    const dayOffset = currentDay.valueOf() - viewStart.valueOf();
    const position = (dayOffset / totalTime) * 100;

    return { position, visible: true };
  }
};

/**
 * Calcula la posición de un milestone en el timeline
 */
export const calculateMilestonePosition = (
  milestoneDate: Date,
  timelineStart: Date,
  timelineEnd: Date,
  view: "year" | "month" | "week"
): { position: number; visible: boolean } => {
  const milestone = moment.utc(milestoneDate).startOf("day");
  const start = moment.utc(timelineStart).startOf("day");
  const end = moment.utc(timelineEnd).endOf("day");

  // Verificar si el milestone está en el rango visible
  if (milestone.isBefore(start) || milestone.isAfter(end)) {
    return { position: 0, visible: false };
  }

  if (view === "year") {
    const monthStart = moment.utc(timelineStart).startOf("year");
    const monthDiff = milestone.diff(monthStart, "months");
    const daysInMonth = milestone.daysInMonth();
    const dayOfMonth = milestone.date() - 1;

    // Calcular posición con el día centrado en el mes
    const monthPosition = monthDiff;
    const dayProgress = (dayOfMonth + 0.5) / daysInMonth; // Añadimos 0.5 para centrar
    const position = ((monthPosition + dayProgress) / 12) * 100;

    return { position, visible: true };
  } else {
    const totalTime = end.valueOf() - start.valueOf();
    const timeOffset = milestone.valueOf() - start.valueOf();
    // Añadimos medio día para centrar en el día
    const position = ((timeOffset + 43200000) / totalTime) * 100; // 43200000 es medio día en milisegundos

    return { position, visible: true };
  }
};

/**
 * Verifica si una fecha está dentro de un rango
 */
export const isDateInRange = (
  date: Date,
  startDate: Date,
  endDate: Date
): boolean => {
  const momentDate = moment.utc(date).startOf("day");
  const rangeStart = moment.utc(startDate).startOf("day");
  const rangeEnd = moment.utc(endDate).endOf("day");

  return momentDate.isBetween(rangeStart, rangeEnd, "day", "[]");
};
