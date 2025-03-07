"use client";
import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  FC,
  useContext,
  ReactNode,
  useMemo,
} from "react";

export type CursorStyle = "pointer" | "hovered" | "locked" | "white" | "";

// Define the shape of your global state
interface UIState {
  theme: string | null; // Allow null for initial state
  cursorType: CursorStyle;
  cursorStyles: string[];
}

// Define the types of actions you can dispatch
type Action =
  | { type: "SET_THEME"; theme: string }
  | { type: "CURSOR_TYPE"; cursorType: CursorStyle };

// Define the context type
interface UIContextType {
  state: UIState;
  dispatch: React.Dispatch<Action>;
  onCursor: (cursorType: CursorStyle) => void;
  toggleTheme: () => void;
  theme: string | null;
}

// Create the context
const UIContext = createContext<UIContextType | undefined>(undefined);

// Reducer function for managing state
const uiReducer = (state: UIState, action: Action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.theme,
      };
    case "CURSOR_TYPE":
      return {
        ...state,
        cursorType: action.cursorType,
      };
    default:
      return state;
  }
};

interface UIProviderProps {
  children: ReactNode;
}
// The UIProvider FC
const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const initialState: UIState = {
    theme: null,
    cursorType: "",
    cursorStyles: ["pointer", "hovered", "locked", "white"],
  };

  const [state, dispatch] = useReducer(uiReducer, initialState);

  const onCursor = useCallback(
    (cursorType: CursorStyle) => {
      if (state.cursorType !== cursorType) {
        cursorType = state.cursorStyles.includes(cursorType) ? cursorType : "";
        dispatch({ type: "CURSOR_TYPE", cursorType });
      }
    },
    [state.cursorStyles, state.cursorType]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    dispatch({ type: "SET_THEME", theme: newTheme });
    document.documentElement.classList.toggle("light", newTheme === "light");
    window.localStorage.setItem("portf-k-theme", newTheme);
  }, [state.theme]);

  useEffect(() => {
    const localTheme = window.localStorage.getItem("portf-k-theme");
    if (localTheme) {
      document.documentElement.classList.add("no-transition");
      dispatch({ type: "SET_THEME", theme: localTheme });
      document.documentElement.classList.toggle(
        "light",
        localTheme === "light"
      );
      document.documentElement.classList.remove("no-transition");
    } else {
      dispatch({ type: "SET_THEME", theme: "dark" });
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      onCursor,
      toggleTheme,
      theme: state.theme,
    }),
    [state, onCursor, toggleTheme]
  );

  if (state.theme === null) {
    return null; // Or a loading spinner/component
  }

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

// Hook for accessing the global context
const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};

export { UIProvider, UIContext, useUIContext };
