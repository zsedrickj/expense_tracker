"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/(protected)/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();
  const label = darkMode ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setDarkMode(!darkMode)}
      aria-label={label}
      aria-pressed={darkMode}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {darkMode ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}
