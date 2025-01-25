import { HeaderConfig } from "@/components/Header";

export const headerConfig: HeaderConfig = {
  appearance: {
    blur: true,
    height: 98,
    padding: {
      desktop: 24,
      mobile: 24,
    },
  },
  settings: {
    variant: "transparent",
    breakpoint: 768,
    menuPosition: "right",
  },
  // Adding empty actions array to satisfy type requirements
  actions: [],
};
