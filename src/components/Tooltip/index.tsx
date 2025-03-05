import { useRef, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Typography } from "../Typography";
import styles from "./Tooltip.module.scss";
import { ThemedTypography } from "../Typography/ThemedTypography";

const cx = classNames.bind(styles);

export interface TooltipProps {
  content: string;
  theme?: {
    type: "light" | "dark" | "custom";
    customValues?: {
      bg?: string;
      text?: string;
      border?: string;
    };
  };
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  show?: boolean;
  spacing?: number;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  theme = { type: "light" },
  position = "right",
  className,
  show,
  spacing = 8,
  children,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!containerRef.current || !tooltipRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = -tooltipRect.height - spacing;
        left = (containerRect.width - tooltipRect.width) / 2;
        break;
      case "right":
        top = (containerRect.height - tooltipRect.height) / 2;
        left = containerRect.width + spacing;
        break;
      case "bottom":
        top = containerRect.height + spacing;
        left = (containerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = (containerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - spacing;
        break;
    }

    setTooltipPosition({ top, left });
  };

  useEffect(() => {
    if (show !== undefined) {
      setIsVisible(show);
    }
  }, [show]);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    if (show === undefined) {
      setIsVisible(true);
      calculatePosition();
    }
  };

  const handleMouseLeave = () => {
    if (show === undefined) {
      setIsVisible(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cx("tooltip-container", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cx("tooltip", `tooltip--${position}`, "tooltip--visible")}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            ...(theme.type === "custom" && theme.customValues
              ? {
                  "--tooltip-bg": theme.customValues.bg,
                  "--tooltip-text": theme.customValues.text,
                  "--tooltip-border": theme.customValues.border,
                }
              : {}),
          }}
          data-theme={theme.type}
        >
          <ThemedTypography variant="p3" className={cx("tooltip__content")}>
            {content}
          </ThemedTypography>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
