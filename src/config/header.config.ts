import { HeaderConfig } from "@/components/Header";
export const headerConfig: HeaderConfig = {
  navigation: [
    {
      href: "/services",
      translationKey: "navigation.solutions",
    },
    {
      href: "/portfolio",
      translationKey: "navigation.portfolio",
    },
    {
      href: "/about",
      translationKey: "navigation.impact",
    },
    {
      href: "/blog",
      translationKey: "navigation.blog",
    },
    {
      href: "/contact",
      translationKey: "navigation.contact",
    },
  ],
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
  language: {
    enabled: true,
    variant: "split-line",
    position: "inline",
    showLabels: false,
    accentColor: "#6366f1",
  },
  // Adding empty acti  ons array to satisfy type requirements
  actions: [],
};
