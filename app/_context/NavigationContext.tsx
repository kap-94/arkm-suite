// src/context/NavigationContext.tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { usePathname } from "next/navigation";
import { isPathActive } from "../_utils/path";
import type { NavItem } from "../_components/Sidebar/types/sidebar.types";

interface NavigationState {
  activeItemId?: string;
  openItems: string[]; // Cambiado de Set a array
}

interface NavigationContextValue {
  state: NavigationState;
  setActiveItem: (id: string) => void;
  toggleItem: (id: string) => void;
  isItemOpen: (id: string) => boolean;
  expandItem: (id: string) => void;
  collapseItem: (id: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined
);

interface NavigationProviderProps {
  children: React.ReactNode;
  items: NavItem[];
}

export function NavigationProvider({
  children,
  items,
}: NavigationProviderProps) {
  const pathname = usePathname();
  const [state, setState] = useState<NavigationState>({
    activeItemId: undefined,
    openItems: [], // Inicializado como array vacío
  });

  // Auto-expand items based on current route
  useLayoutEffect(() => {
    const findActiveItem = (items: NavItem[]): string | undefined => {
      for (const item of items) {
        if (isPathActive(pathname, item.path)) {
          return item.id;
        }
        if (item.children?.length) {
          const childId = findActiveItem(item.children);
          if (childId) {
            // Expand parent when child is active
            setState((prev) => ({
              ...prev,
              openItems: prev.openItems.includes(item.id)
                ? prev.openItems
                : [...prev.openItems, item.id],
              activeItemId: childId,
            }));
            return childId;
          }
        }
      }
    };

    findActiveItem(items);
  }, [pathname, items]);

  const setActiveItem = useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeItemId: id }));
  }, []);

  const toggleItem = useCallback((id: string) => {
    setState((prev) => {
      const isOpen = prev.openItems.includes(id);
      const newOpenItems = isOpen
        ? prev.openItems.filter((itemId) => itemId !== id)
        : [...prev.openItems, id];
      return { ...prev, openItems: newOpenItems };
    });
  }, []);

  const isItemOpen = useCallback(
    (id: string) => {
      return state.openItems.includes(id);
    },
    [state.openItems]
  );

  const expandItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      openItems: prev.openItems.includes(id)
        ? prev.openItems
        : [...prev.openItems, id],
    }));
  }, []);

  const collapseItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      openItems: prev.openItems.filter((itemId) => itemId !== id),
    }));
  }, []);

  const value = useMemo(
    () => ({
      state,
      setActiveItem,
      toggleItem,
      isItemOpen,
      expandItem,
      collapseItem,
    }),
    [state, setActiveItem, toggleItem, isItemOpen, expandItem, collapseItem]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};
