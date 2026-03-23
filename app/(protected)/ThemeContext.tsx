/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  setDarkMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") {
      setDarkModeState(true);
      document.documentElement.classList.add("theme-dark"); // ← .theme-dark, hindi .dark
    }
  }, []);

  const setDarkMode = (val: boolean) => {
    setDarkModeState(val);
    localStorage.setItem("darkMode", String(val));
    document.documentElement.classList.toggle("theme-dark", val); // ← .theme-dark
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);