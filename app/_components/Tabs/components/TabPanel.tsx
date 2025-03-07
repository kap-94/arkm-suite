import { FC, useContext } from "react";
import classNames from "classnames/bind";
import { TabPanelProps } from "../types";
import { TabsContext } from "./Tabs";
import styles from "../Tabs.module.scss";

const cx = classNames.bind(styles);

export const TabPanel: FC<TabPanelProps> = ({ index, children }) => {
  const context = useContext(TabsContext);

  if (!context) throw new Error("TabPanel must be used within a Tabs");

  const { activeIndex } = context;

  return activeIndex === index ? (
    <div className={cx("tab__panel")}>{children}</div>
  ) : null;
};
