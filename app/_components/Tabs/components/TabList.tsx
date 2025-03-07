import { FC } from "react";
import classNames from "classnames/bind";
import styles from "../Tabs.module.scss";
import { TabListProps } from "../types";

const cx = classNames.bind(styles);

export const TabList: FC<TabListProps> = ({ children, className }) => {
  return <div className={cx("tab__header", className)}>{children}</div>;
};
