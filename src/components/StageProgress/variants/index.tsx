// variants/index.ts
import { ProgressVariant, VariantProps } from "../types";
import { TimelineVariant } from "./TimelineVariant/TimelineVariant";
// import { DiagonalVariant } from "./DiagonalVariant";
// import { LadderVariant } from "./LadderVariant";
// import { StackedVariant } from "./StackedVariant";
// import { StepsVariant } from "./StepsVariant";

const VARIANTS: Record<ProgressVariant, React.FC<VariantProps>> = {
  timeline: TimelineVariant,
  // steps: StepsVariant,
  // ladder: LadderVariant,
  // diagonal: DiagonalVariant,
  // stacked: StackedVariant,
};

export {
  VARIANTS,
  TimelineVariant,
  // DiagonalVariant,
  // LadderVariant,
  // StackedVariant,
  // StepsVariant,
};
