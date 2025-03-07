export { Tab, TabList, TabPanel } from "./components";
import { Tabs as TabsHOC, Tab, TabList, TabPanel } from "./components";
export type { TabsProps, TabsTheme } from "./types";
import { TabsHOCProps } from "./types";

export const Tabs: TabsHOCProps = Object.assign(TabsHOC, {
  Tab,
  TabList,
  TabPanel,
});

export default Tabs;
