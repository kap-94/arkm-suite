import { StageProgressProps } from "./types";
import { VARIANTS } from "./variants";
import { sortStages } from "./utils";

const StageProgress: React.FC<StageProgressProps> = ({
  progress,
  stages = [],
  variant = "timeline",
  type = "Other",
  size = "default",
  theme = { type: "light" },
  gradientVariant = "progressive",
}) => {
  const sortedStages = sortStages(stages);
  const SelectedVariant = VARIANTS[variant];

  return (
    <SelectedVariant
      progress={progress}
      stages={sortedStages}
      gradientVariant={gradientVariant}
      size={size}
      type={type}
      theme={theme}
    />
  );
};

export default StageProgress;
