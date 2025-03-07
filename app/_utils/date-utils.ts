// date-utils.ts
import moment from "moment";
import "moment/locale/es";
moment.updateLocale("es", {
  monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
  months:
    "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
      "_"
    ),
});

interface DateFormatOptions {
  format?: string;
  fallback?: string;
  locale?: string;
}

// Constantes para los formatos
const DATE_FORMATS = {
  short: {
    en: "MMM D",
    es: "D [de] MMM",
  },
  medium: {
    en: "MMMM D",
    es: "D [de] MMMM",
  },
  long: {
    en: "MMMM D, YYYY",
    es: "D [de] MMMM [del] YYYY",
  },
  fallback: {
    en: "Date not specified",
    es: "Fecha no especificada",
  },
  invalid: {
    en: "Invalid date",
    es: "Fecha inválida",
  },
} as const;

// Helper para limpiar puntos de las abreviaturas
const cleanMonthAbbrev = (formattedDate: string): string => {
  return formattedDate.replace(/\./g, "");
};

/**
 * Obtiene el formato de fecha según el idioma
 */
const getDateFormat = (
  type: keyof typeof DATE_FORMATS,
  locale: string = "es"
) => {
  const lang = locale.startsWith("es") ? "es" : "en";
  return DATE_FORMATS[type][lang];
};

/**
 * Formatea una fecha simple
 */
export const formatDate = (
  date: string | Date,
  locale: string = "es"
): string => {
  const lang = locale.startsWith("es") ? "es" : "en";
  const formatted = moment(date)
    .locale(lang)
    .format(getDateFormat("short", lang));
  return cleanMonthAbbrev(formatted);
};

/**
 * Formatea fecha y hora
 */
export const formatDateTime = (
  date: string | Date,
  locale: string = "es"
): string => {
  const lang = locale.startsWith("es") ? "es" : "en";
  const formatted = moment(date)
    .locale(lang)
    .format(`${getDateFormat("short", lang)} HH:mm`);
  return cleanMonthAbbrev(formatted);
};

/**
 * Formato seguro de fechas usando Moment.js con manejo de UTC
 */
export const formatDateSafe = (
  input: string | Date | null | undefined,
  options: DateFormatOptions = {}
): string => {
  const lang = options.locale?.startsWith("es") ? "es" : "en";
  const {
    format = getDateFormat("short", lang),
    fallback = DATE_FORMATS.fallback[lang],
    locale = lang,
  } = options;

  if (!input) return fallback;

  const date = moment.utc(input);
  if (!date.isValid()) return fallback;

  const formatted = date.locale(locale).format(format);
  return cleanMonthAbbrev(formatted);
};

/**
 * Formato seguro para rangos de fecha
 */
export const formatDateRangeSafe = (
  startDate: string | Date | null | undefined,
  endDate: string | Date | null | undefined,
  options: DateFormatOptions = {}
): string => {
  const lang = options.locale?.startsWith("es") ? "es" : "en";
  const {
    format = getDateFormat("short", lang),
    fallback = DATE_FORMATS.fallback[lang],
    locale = lang,
  } = options;

  const start = moment.utc(startDate);
  const end = moment.utc(endDate);

  if (!start.isValid() || !end.isValid()) {
    return fallback;
  }

  const formattedStart = start.locale(locale).format(format);
  const formattedEnd = end.locale(locale).format(format);

  return `${formattedStart} - ${formattedEnd}`;
};

/**
 * Verifica si una fecha es válida
 */
export const isDateValid = (
  input: string | Date | null | undefined
): boolean => {
  if (!input) return false;
  return moment.utc(input).isValid();
};

/**
 * Formatea una fecha con formato personalizado usando hora local
 */
export const formatCustomDateUTC = (
  date: string | Date | null | undefined,
  customFormat = "DD/M/YYYY",
  locale: string = "es"
): string => {
  const lang = locale.startsWith("es") ? "es" : "en";
  if (!date) return DATE_FORMATS.fallback[lang];

  const momentDate = moment.utc(date);
  if (!momentDate.isValid()) return DATE_FORMATS.invalid[lang];

  const formatted = momentDate.locale(lang).format(customFormat);
  return cleanMonthAbbrev(formatted);
};

/**
 * Formatea una fecha con formato personalizado usando UTC
 */
export const formatCustomDate = (
  date: string | Date | null | undefined,
  customFormat = "DD/M/YYYY",
  locale: string = "es"
): string => {
  const lang = locale.startsWith("es") ? "es" : "en";
  if (!date) return DATE_FORMATS.fallback[lang];

  const momentDate = moment(date);
  if (!momentDate.isValid()) return DATE_FORMATS.invalid[lang];

  const formatted = momentDate.locale(lang).format(customFormat);
  return cleanMonthAbbrev(formatted);
};
/**
 * Formatea una fecha para mostrar día y mes
 */
export const formatDayMonth = (
  date: string | Date | null | undefined,
  locale: string = "es"
): string => {
  const lang = locale.startsWith("es") ? "es" : "en";
  if (!date) return DATE_FORMATS.fallback[lang];

  const momentDate = moment.utc(date);
  if (!momentDate.isValid()) return DATE_FORMATS.invalid[lang];

  const formatted = momentDate
    .locale(lang)
    .format(getDateFormat("medium", lang));
  return cleanMonthAbbrev(formatted);
};

/**
 * Formatea una fecha mostrando el día, mes y año
 */
export const formatFullDate = (
  date: string | Date | null | undefined,
  locale: string = "es"
): string => {
  const lang = locale.startsWith("es") ? "es" : "en";
  if (!date) return DATE_FORMATS.fallback[lang];

  const momentDate = moment.utc(date);
  if (!momentDate.isValid()) return DATE_FORMATS.invalid[lang];

  const formatted = momentDate.locale(lang).format(getDateFormat("long", lang));
  return cleanMonthAbbrev(formatted);
};
