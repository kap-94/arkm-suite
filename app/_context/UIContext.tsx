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

// Definimos el estado del Snackbar
interface SnackbarState {
  open: boolean;
  message: string;
  type: "success" | "error" | "";
}

// Define el shape del estado global
interface UIState {
  theme: string | null;
  cursorType: CursorStyle;
  cursorStyles: string[];
  snackbar: SnackbarState;
}

// Acciones disponibles
type Action =
  | { type: "SET_THEME"; theme: string }
  | { type: "CURSOR_TYPE"; cursorType: CursorStyle }
  | {
      type: "SHOW_SNACKBAR";
      message: string;
      snackbarType: "success" | "error";
    }
  | { type: "HIDE_SNACKBAR" };

// Define el tipo del context
interface UIContextType {
  state: UIState;
  dispatch: React.Dispatch<Action>;
  onCursor: (cursorType: CursorStyle) => void;
  toggleTheme: () => void;
  theme: string | null;
  showSnackbar: (message: string, type: "success" | "error") => void;
  hideSnackbar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

const uiReducer = (state: UIState, action: Action): UIState => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.theme };
    case "CURSOR_TYPE":
      return { ...state, cursorType: action.cursorType };
    case "SHOW_SNACKBAR":
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message,
          type: action.snackbarType,
        },
      };
    case "HIDE_SNACKBAR":
      return {
        ...state,
        snackbar: { ...state.snackbar, open: false },
      };
    default:
      return state;
  }
};

interface UIProviderProps {
  children: ReactNode;
}

const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const initialState: UIState = {
    theme: null,
    cursorType: "",
    cursorStyles: ["pointer", "hovered", "locked", "white"],
    snackbar: { open: false, message: "", type: "" },
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

  const showSnackbar = useCallback(
    (message: string, type: "success" | "error") => {
      dispatch({ type: "SHOW_SNACKBAR", message, snackbarType: type });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    dispatch({ type: "HIDE_SNACKBAR" });
  }, []);

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
      showSnackbar,
      hideSnackbar,
    }),
    [state, onCursor, toggleTheme, showSnackbar, hideSnackbar]
  );

  if (state.theme === null) {
    return null; // O un spinner de carga
  }

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};

export { UIProvider, UIContext, useUIContext };
