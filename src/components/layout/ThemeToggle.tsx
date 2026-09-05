"use client";

import { useSyncExternalStore } from "react";
import SwitchMode from "@/components/ui/SwitchMode";

const STORAGE_KEY = "gaming-pc-theme";
type Theme = "light" | "dark";

function setDocumentTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function subscribe(onChange: () => void) {
  const handleThemeChange = () => onChange();
  document.addEventListener("themechange", handleThemeChange);

  return () => {
    document.removeEventListener("themechange", handleThemeChange);
  };
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const handleToggle = () => {
    const nextTheme: Theme = isDark ? "light" : "dark";
    setDocumentTheme(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Theme still applies for the current session when storage is unavailable.
    }
    document.dispatchEvent(new Event("themechange"));
  };

  return (
    <SwitchMode
      isDark={isDark}
      onToggle={handleToggle}
      width={55}
      height={26}
      darkColor="var(--ink)"
      lightColor="var(--ink)"
      knobDarkColor="var(--panel-raised)"
      knobLightColor="var(--panel-raised)"
      borderDarkColor="var(--line)"
      borderLightColor="var(--line)"
    />
  );
}
