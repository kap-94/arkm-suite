// components/Tab.tsx
import { FC, useContext } from "react";
import classNames from "classnames/bind";
import { TabsContext } from "./Tabs";
import styles from "../Tabs.module.scss";
import { TabProps } from "../types";
import { ThemedTypography } from "../../Typography/ThemedTypography";

const cx = classNames.bind(styles);

export const Tab: FC<TabProps> = ({ index, label }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within a Tabs");

  const { activeIndex, setActiveIndex } = context;
  const isActive = activeIndex === index;

  const handleClick = () => {
    setActiveIndex(index);
  };

  return (
    <div
      className={cx("tab__item", { "tab__item--active": isActive })}
      onClick={handleClick}
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
    >
      <ThemedTypography variant="p2" color="tertiary" fontWeight={500}>
        {label}
      </ThemedTypography>
    </div>
  );
};
