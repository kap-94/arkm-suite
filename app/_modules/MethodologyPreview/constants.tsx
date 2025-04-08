import {
  ResearchIcon,
  VisualDirectionIcon,
  UIDesignIcon,
  DevelopmentIcon,
  LaunchIcon,
  TestsIcon,
} from "./MethodologyIcons";
import { MethodologyStep } from "./types";

// Default steps data
export const DEFAULT_STEPS: MethodologyStep[] = [
  {
    title: "Research",
    description:
      "We analyze your brand essence and market position via targeted dialogues to create a strong foundation, identifying opportunities that set your brand apart.",
    icon: <ResearchIcon />,
  },
  {
    title: "Visual Direction",
    description:
      "Our team crafts an exceptional visual identity by exploring colors, graphics, and UI patterns that resonate with your audience and express your brand values.",
    icon: <VisualDirectionIcon />,
  },
  {
    title: "UI Design",
    description:
      "We create a robust design system and refine each page until the interface is visually harmonious and usable, ensuring every element functions effectively.",
    icon: <UIDesignIcon />,
  },
  {
    title: "Development",
    description:
      "Using the React ecosystem, we deliver an exceptionally pixel-perfect website that works flawlessly on all devices, with code fully optimized for speed and SEO.",
    icon: <DevelopmentIcon />,
  },
  {
    title: "Tests",
    description:
      "Our partnership continues with technical support, updates, and improvements to keep your site cutting-edge, providing analytics to evolve your digital presence.",
    icon: <TestsIcon />,
  },
  {
    title: "Launch",
    description:
      "ARKM guides you through deployment with support on hosting, CI/CD pipelines, and content migration, implementing testing to ensure peak performance.",
    icon: <LaunchIcon />,
  },
];

export const DEFAULT_TITLE = "My Creative Process";
export const DEFAULT_SUBTITLE =
  "Transforming Business Ideas, from Concept to Reality";
