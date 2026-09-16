"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

const THEME_STORAGE_KEY = "darkMode";
const THEME_CHANGE_EVENT = "expense-tracker-theme-change";

function getStoredTheme() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(THEME_STORAGE_KEY) === "true";
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function applyTheme(enabled: boolean) {
  document.documentElement.classList.toggle("theme-dark", enabled);
  document.documentElement.style.colorScheme = enabled ? "dark" : "light";
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    () => false,
  );

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  const setDarkMode = useCallback((enabled: boolean) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, String(enabled));
    applyTheme(enabled);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
