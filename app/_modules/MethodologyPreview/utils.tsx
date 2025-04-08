import { MethodologyDictionary, BulbConfig } from "./types";
import { DEFAULT_STEPS } from "./constants";
import {
  ResearchIcon,
  VisualDirectionIcon,
  UIDesignIcon,
  DevelopmentIcon,
  LaunchIcon,
  TestsIcon,
} from "./MethodologyIcons";

// Helper function to check if running on a high-performance device
export const isHighPerformanceDevice = (): boolean => {
  // Basic mobile device check
  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  // Memory check
  const hasHighMemory =
    typeof navigator !== "undefined" &&
    "deviceMemory" in navigator &&
    // @ts-ignore - ignore TypeScript error for browsers that support this API
    (navigator as any).deviceMemory > 4;

  return !isMobileDevice && (hasHighMemory || true);
};

// Function to find the last word containing an 'i'
export const findLastWordWithI = (text: string): number => {
  const words = text.split(" ");
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i].toLowerCase().includes("i")) {
      return i;
    }
  }
  return -1; // No 'i' found
};

// Function to find the last 'i' in a word
export const findLastIInWord = (word: string): number => {
  return word.lastIndexOf("i");
};

// Function to generate bulb config
export const generateBulbConfig = (title: string): BulbConfig | undefined => {
  const lastWordWithIIndex = findLastWordWithI(title);

  return lastWordWithIIndex !== -1
    ? {
        wordIndex: lastWordWithIIndex,
        letterIndex: findLastIInWord(title.split(" ")[lastWordWithIIndex]),
      }
    : undefined;
};

// Function to build steps from dictionary or use defaults
export const buildMethodologySteps = (dictionary?: MethodologyDictionary) => {
  if (!dictionary?.steps) return DEFAULT_STEPS;

  return [
    {
      title: dictionary.steps.research.title || DEFAULT_STEPS[0].title,
      description:
        dictionary.steps.research.description || DEFAULT_STEPS[0].description,
      icon: <ResearchIcon />,
    },
    {
      title: dictionary.steps.visualDirection.title || DEFAULT_STEPS[1].title,
      description:
        dictionary.steps.visualDirection.description ||
        DEFAULT_STEPS[1].description,
      icon: <VisualDirectionIcon />,
    },
    {
      title: dictionary.steps.uiDesign.title || DEFAULT_STEPS[2].title,
      description:
        dictionary.steps.uiDesign.description || DEFAULT_STEPS[2].description,
      icon: <UIDesignIcon />,
    },
    {
      title: dictionary.steps.development.title || DEFAULT_STEPS[3].title,
      description:
        dictionary.steps.development.description ||
        DEFAULT_STEPS[3].description,
      icon: <DevelopmentIcon />,
    },
    {
      title: dictionary.steps.testing.title || DEFAULT_STEPS[5].title,
      description:
        dictionary.steps.testing.description || DEFAULT_STEPS[4].description,
      icon: <TestsIcon />,
    },
    {
      title: dictionary.steps.launch.title || DEFAULT_STEPS[4].title,
      description:
        dictionary.steps.launch.description || DEFAULT_STEPS[5].description,
      icon: <LaunchIcon />,
    },
  ];
};
