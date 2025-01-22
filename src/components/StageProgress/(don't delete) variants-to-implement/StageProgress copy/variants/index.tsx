// variants/index.ts
import { ProgressVariant, VariantProps } from "../types";
import { DiagonalVariant } from "./DiagonalVariant";
import { DefaultVariant } from "./DefaultVariant";
import { LadderVariant } from "./LadderVariant";
import { StackedVariant } from "./StackedVariant";
import { StepsVariant } from "./StepsVariant";
import { TimelineVariant } from "./TimelineVariant";

const VARIANTS: Record<ProgressVariant, React.FC<VariantProps>> = {
  default: DefaultVariant,
  steps: StepsVariant,
  timeline: TimelineVariant,
  ladder: LadderVariant,
  diagonal: DiagonalVariant,
  stacked: StackedVariant,
};

export {
  VARIANTS,
  DiagonalVariant,
  DefaultVariant,
  LadderVariant,
  StackedVariant,
  StepsVariant,
  TimelineVariant,
};
