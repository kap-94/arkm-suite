// types.ts
import { FC, ReactNode } from "react";

export type ThemeType = "light" | "dark" | "custom";

export interface TabsTheme {
  type: ThemeType;
  colors?: {
    background?: string;
    border?: string;
    text?: string;
    secondaryText?: string;
    activeBorder?: string;
    hoverBg?: string;
  };
}

export interface TabsContextProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  theme?: TabsTheme;
}

export interface TabsProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  theme?: TabsTheme;
  // Nuevas props para manejar el estado controlado
  activeTab?: number;
  onTabChange?: (index: number) => void;
}

// El resto de las interfaces permanecen igual
export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export interface TabProps {
  index: number;
  label: string;
}

export interface TabPanelProps {
  index: number;
  children: ReactNode;
}

export interface TabsHOCProps extends FC<TabsProps> {
  TabList: FC<TabListProps>;
  Tab: FC<TabProps>;
  TabPanel: FC<TabPanelProps>;
}
