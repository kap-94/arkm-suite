import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

export interface DashboardDimensions {
  headerHeight: number;
  headerZIndex: number; // Añadido headerZIndex
  sidebarWidth: number;
  sidebarCollapsedWidth: number;
  contentPadding: number;
}

export interface DashboardContextState {
  dimensions: DashboardDimensions;
  isSidebarExpanded: boolean;
  updateDimensions: (dimensions: Partial<DashboardDimensions>) => void;
  toggleSidebar: () => void;
}

const initialDimensions: DashboardDimensions = {
  headerHeight: 71,
  headerZIndex: 99, // Añadido valor inicial
  sidebarWidth: 256,
  sidebarCollapsedWidth: 71,
  contentPadding: 24,
};

const DashboardContext = createContext<DashboardContextState | undefined>(
  undefined
);

export interface DashboardProviderProps {
  children: React.ReactNode;
  initialDimensions?: Partial<DashboardDimensions>;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  initialDimensions: userInitialDimensions,
}) => {
  const [dimensions, setDimensions] = useState<DashboardDimensions>({
    ...initialDimensions,
    ...userInitialDimensions,
  });
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const updateDimensions = useCallback(
    (newDimensions: Partial<DashboardDimensions>) => {
      setDimensions((prev) => ({
        ...prev,
        ...newDimensions,
      }));
    },
    []
  );

  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded((prev) => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      dimensions,
      isSidebarExpanded,
      updateDimensions,
      toggleSidebar,
    }),
    [dimensions, isSidebarExpanded, updateDimensions, toggleSidebar]
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
