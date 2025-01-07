"use client";

import { createContext, useContext } from "react";
import { HeaderContextType } from "../types/header.types";

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("Header components must be used within HeaderProvider");
  }
  return context;
};

export default HeaderContext;
