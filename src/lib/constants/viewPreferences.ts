// src/lib/constants/viewPreferences.ts
export const VIEW_PREFERENCES = {
  COOKIE_NAME: "preferredView",
  DEFAULT_VIEW: "list",
  MAX_AGE: 60 * 60 * 24 * 365, // 1 año
} as const;

export type ViewMode = "list" | "grid";
