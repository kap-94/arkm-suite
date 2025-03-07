import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import { DeliverableCard } from "../DeliverableCard";
import { ThemedTypography } from "../Typography/ThemedTypography";
import { Dropdown } from "../Dropdown";
import { ChevronDown } from "lucide-react";
import styles from "./DeliverablesView.module.scss";
import { DeliverablesViewProps } from "./types";
import StickyWrapper from "../StickyWrapper";
import { DeliverableResponse } from "../../_repositories/types";

const cx = classNames.bind(styles);

const DEFAULT_STAGE_ORDER = [
  "stage_discovery",
  "stage_design",
  "stage_development",
  "stage_testing",
  "stage_launch",
];

interface GroupedDeliverables {
  name: string;
  items: DeliverableResponse[];
}

export const DeliverablesView: React.FC<DeliverablesViewProps> = ({
  deliverables,
  dictionary,
  // handleAddComment,
  theme = { type: "light" },
  stageOrder = DEFAULT_STAGE_ORDER,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const deliverablesByStage = useMemo(() => {
    const grouped = deliverables.reduce((acc, deliverable) => {
      const stageId = deliverable.stage.id;
      if (!acc[stageId]) {
        acc[stageId] = {
          name: deliverable.stage.name,
          items: [],
        };
      }
      acc[stageId].items.push(deliverable);
      return acc;
    }, {} as Record<string, GroupedDeliverables>);

    return Object.entries(grouped).sort(([stageIdA, a], [stageIdB, b]) => {
      const indexA = stageOrder.indexOf(stageIdA);
      const indexB = stageOrder.indexOf(stageIdB);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return a.name.localeCompare(b.name);
    });
  }, [deliverables, stageOrder]);

  React.useEffect(() => {
    if (!selectedStageId && deliverablesByStage.length > 0) {
      setSelectedStageId(deliverablesByStage[0][0]);
    }
  }, [deliverablesByStage, selectedStageId]);

  const selectedStage = deliverablesByStage.find(
    ([stageId]) => stageId === selectedStageId
  )?.[1];

  // Convert stages to dropdown options
  const stageOptions = deliverablesByStage.map(([id, stage]) => ({
    value: id,
    label: stage.name,
  }));

  const selectedStageOption =
    stageOptions.find((option) => option.value === selectedStageId) ||
    stageOptions[0];

  // Handle card expansion
  const handleCardExpand = (cardId: string) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <div className={cx("deliverables", `deliverables--theme-${theme.type}`)}>
      <div className={cx("deliverables__content")}>
        {/* Desktop Navigation */}
        <div className={cx("deliverables__desktop-nav")}>
          <StickyWrapper>
            <nav className={cx("deliverables__stages-nav")}>
              {deliverablesByStage.map(([stageId, stage]) => (
                <button
                  key={stageId}
                  className={cx("deliverables__stage-button", {
                    "deliverables__stage-button--active":
                      stageId === selectedStageId,
                  })}
                  onClick={() => setSelectedStageId(stageId)}
                >
                  <ThemedTypography
                    variant="p1"
                    fontWeight={300}
                    color="tertiary"
                    className={cx("deliverables__stage-name")}
                  >
                    {stage.name}
                  </ThemedTypography>
                </button>
              ))}
            </nav>
          </StickyWrapper>
        </div>

        {/* Mobile/Tablet Navigation */}
        <div className={cx("deliverables__mobile-nav")}>
          <Dropdown
            className={cx("deliverables__dropdown")}
            options={stageOptions}
            selected={selectedStageOption}
            onSelectedChange={(option) => setSelectedStageId(option.value)}
            theme={theme}
            icon={<ChevronDown size={20} />}
          />
        </div>

        {/* Deliverables Grid */}
        {selectedStage && (
          <div className={cx("deliverables__cards-container")}>
            <div className={cx("deliverables__header")}>
              <ThemedTypography
                variant="h4"
                fontWeight={300}
                className={cx("deliverables__selected-stage")}
              >
                {selectedStage.name}
              </ThemedTypography>
              <ThemedTypography
                variant="p2"
                fontWeight={400}
                color="tertiary"
                className={cx("deliverables__stage-count")}
              >
                {`${selectedStage.items.length} ${
                  selectedStage.items.length !== 1
                    ? dictionary?.texts?.deliverables
                    : dictionary?.texts?.deliverable
                }`}
              </ThemedTypography>
            </div>
            <div className={cx("deliverables__grid")}>
              {selectedStage.items.map((deliverable) => {
                return (
                  <DeliverableCard
                    key={deliverable.id}
                    dictionary={dictionary.card}
                    deliverable={deliverable}
                    // onAddComment={handleAddComment}
                    theme={theme}
                    isExpanded={expandedCardId === deliverable.id}
                    onToggleExpand={() => handleCardExpand(deliverable.id)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliverablesView;
