// components/Tabs.tsx
import React, { createContext, useState, useEffect } from "react";
import classNames from "classnames/bind";
import type { TabsProps, TabsContextProps } from "../types";
import styles from "../Tabs.module.scss";

const cx = classNames.bind(styles);

export const TabsContext = createContext<TabsContextProps | undefined>(
  undefined
);

export const Tabs: React.FC<TabsProps> = ({
  children,
  style,
  className,
  theme = { type: "light" },
  activeTab,
  onTabChange,
}) => {
  // Estado interno para modo no controlado
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);

  // Usar el estado controlado si se proporciona, de lo contrario usar el estado interno
  const activeIndex = activeTab ?? internalActiveIndex;

  // Manejador unificado para cambios de tab
  const handleTabChange = (index: number) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActiveIndex(index);
    }
  };

  // Actualizar el estado interno cuando cambia activeTab
  useEffect(() => {
    if (typeof activeTab === "number") {
      setInternalActiveIndex(activeTab);
    }
  }, [activeTab]);

  return (
    <TabsContext.Provider
      value={{
        activeIndex,
        setActiveIndex: handleTabChange,
        theme,
      }}
    >
      <div
        className={cx(
          "tab__container",
          `tab__container--theme-${theme.type}`,
          className
        )}
        style={{
          ...style,
          ...(theme.type === "custom" && theme.colors
            ? {
                "--tabs-background": theme.colors.background,
                "--tabs-border": theme.colors.border,
                "--tabs-text": theme.colors.text,
                "--tabs-secondary-text": theme.colors.secondaryText,
                "--tabs-active-border": theme.colors.activeBorder,
                "--tabs-hover-bg": theme.colors.hoverBg,
              }
            : {}),
        }}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};
