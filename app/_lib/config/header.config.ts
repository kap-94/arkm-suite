import { HeaderConfig } from "@/app/_components/Header";

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
    variant: "glass",
    breakpoint: 768,
    menuPosition: "left",
  },
  // Adding empty actions array to satisfy type requirements
  // actions: [],
};
