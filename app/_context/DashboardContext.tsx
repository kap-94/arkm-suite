import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type { Language } from "../_lib/config/i18n";
import {
  DashboardConfig,
  DEFAULT_DASHBOARD_CONFIG,
} from "../_components/Sidebar/types/sidebar.types";

export interface DashboardDimensions {
  headerHeight: number;
  headerZIndex: number;
  sidebarWidth: number;
  sidebarCollapsedWidth: number;
  contentPadding: number;
}

interface DashboardState {
  isSidebarExpanded: boolean;
  isMobileSidebar: boolean;
  language: Language;
}

export interface DashboardContextState {
  dimensions: DashboardDimensions;
  state: DashboardState;
  config: DashboardConfig;
  updateDimensions: (dimensions: Partial<DashboardDimensions>) => void;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
  setLanguage: (lang: Language) => void;
  language: Language;
}

const initialDimensions: DashboardDimensions = {
  headerHeight: 72,
  headerZIndex: 99,
  sidebarWidth: DEFAULT_DASHBOARD_CONFIG.width.expanded,
  sidebarCollapsedWidth: DEFAULT_DASHBOARD_CONFIG.width.collapsed,
  contentPadding: 24,
};

const initialState = (lang: Language): DashboardState => ({
  isSidebarExpanded: false,
  isMobileSidebar: false,
  language: lang,
});

const DashboardContext = createContext<DashboardContextState | undefined>(
  undefined
);

export interface DashboardProviderProps {
  children: React.ReactNode;
  initialDimensions?: Partial<DashboardDimensions>;
  defaultSidebarExpanded?: boolean;
  customConfig?: Partial<DashboardConfig>;
  initialLang: Language;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  initialDimensions: userInitialDimensions,
  defaultSidebarExpanded = false,
  customConfig,
  initialLang,
}) => {
  const config = useMemo(
    () => ({
      ...DEFAULT_DASHBOARD_CONFIG,
      ...customConfig,
    }),
    [customConfig]
  );

  const [dimensions, setDimensions] = useState<DashboardDimensions>({
    ...initialDimensions,
    sidebarWidth: config.width.expanded,
    sidebarCollapsedWidth: config.width.collapsed,
    ...userInitialDimensions,
  });

  const [state, setState] = useState<DashboardState>({
    ...initialState(initialLang),
    isSidebarExpanded: defaultSidebarExpanded,
  });

  // Handle mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        isMobileSidebar: window.innerWidth < config.breakpoints.mobile,
      }));
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [config.breakpoints.mobile]);

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
    setState((prev) => ({
      ...prev,
      isSidebarExpanded: !prev.isSidebarExpanded,
    }));
  }, []);

  const expandSidebar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSidebarExpanded: true,
    }));
  }, []);

  const collapseSidebar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isSidebarExpanded: false,
    }));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setState((prev) => ({
      ...prev,
      language: lang,
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      dimensions,
      state,
      config,
      updateDimensions,
      toggleSidebar,
      expandSidebar,
      collapseSidebar,
      setLanguage,
      language: state.language,
    }),
    [
      dimensions,
      state,
      config,
      updateDimensions,
      toggleSidebar,
      expandSidebar,
      collapseSidebar,
      setLanguage,
    ]
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
