import { useCallback, useEffect, useRef } from "react";
import { useGanttContext } from "../GanttContext";

export const useStageCardSync = (
  stageId: string
): React.RefObject<HTMLDivElement> => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { registerStageCardHeight } = useGanttContext();
  const initialHeightSet = useRef(false);

  // Memoize the height measurement function
  const measureAndRegisterHeight = useCallback(() => {
    try {
      const cardElement = cardRef.current;
      if (!cardElement) return;

      const height = cardElement.getBoundingClientRect().height;
      if (height > 0) {
        // Ensure we only register valid heights
        registerStageCardHeight(stageId, height);
      }
    } catch (error) {
      console.error("Error measuring stage card height:", error);
    }
  }, [stageId, registerStageCardHeight]);

  useEffect(() => {
    if (!cardRef.current) return;

    // Initial measurement
    if (!initialHeightSet.current) {
      measureAndRegisterHeight();
      initialHeightSet.current = true;
    }

    // Set up ResizeObserver
    let observer: ResizeObserver;
    try {
      observer = new ResizeObserver((entries) => {
        // Batch height updates in requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          measureAndRegisterHeight();
        });
      });

      observer.observe(cardRef.current);
    } catch (error) {
      console.error("Error setting up ResizeObserver:", error);
      // Fallback to just the initial measurement if ResizeObserver fails
      measureAndRegisterHeight();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [stageId, registerStageCardHeight, measureAndRegisterHeight]);

  return cardRef;
};
