"use client";

import type { CSSProperties } from "react";

export type SwitchModeProps = {
  isDark: boolean;
  onToggle: () => void;
  width?: number;
  height?: number;
  darkColor?: string;
  lightColor?: string;
  knobDarkColor?: string;
  knobLightColor?: string;
  borderDarkColor?: string;
  borderLightColor?: string;
  className?: string;
};

export default function SwitchMode({
  isDark,
  onToggle,
  width = 55,
  height = 26,
  darkColor = "#171614",
  lightColor = "#f4f0e9",
  knobDarkColor = "#302b26",
  knobLightColor = "#ded6ca",
  borderDarkColor = "#514b43",
  borderLightColor = "#d9d2c8",
  className,
}: SwitchModeProps) {
  const knobSize = height + 1;
  const knobInset = -1;
  const knobOffset = width - knobSize - knobInset * 2 - 2;
  const activeIconColor = isDark ? lightColor : darkColor;
  const inactiveIconColor = isDark ? "#aaa39a" : "#716d66";
  const style = {
    "--switch-track": isDark ? darkColor : lightColor,
    "--switch-border": isDark ? borderDarkColor : borderLightColor,
    "--switch-knob": isDark ? knobDarkColor : knobLightColor,
  } as CSSProperties;

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={onToggle}
      className={`relative inline-flex shrink-0 appearance-none items-center overflow-visible rounded-full border p-0 leading-none transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${className ?? ""}`}
      style={{
        ...style,
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        boxSizing: "border-box",
        backgroundColor: "var(--switch-track)",
        borderColor: "var(--switch-border)",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute rounded-full border transition-transform duration-200 ease-out motion-reduce:transition-none"
        style={{
          top: `${knobInset}px`,
          left: `${knobInset}px`,
          width: `${knobSize}px`,
          height: `${knobSize}px`,
          boxSizing: "border-box",
          backgroundColor: "var(--switch-knob)",
          borderColor: "var(--switch-border)",
          boxShadow: isDark
            ? "0 2px 7px rgb(0 0 0 / 0.18)"
            : "0 2px 7px rgb(23 22 20 / 0.08)",
          transform: `translateX(${isDark ? knobOffset : 0}px)`,
        }}
      />

      <span
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 flex items-center justify-center transition-colors duration-200 ease-out motion-reduce:transition-none"
        style={{
          width: `${height}px`,
          height: `${height}px`,
          color: isDark ? inactiveIconColor : activeIconColor,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>

      <span
        aria-hidden="true"
        className="absolute right-0 top-0 z-10 flex items-center justify-center transition-colors duration-200 ease-out motion-reduce:transition-none"
        style={{
          width: `${height}px`,
          height: `${height}px`,
          color: isDark ? activeIconColor : inactiveIconColor,
        }}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />
        </svg>
      </span>
    </button>
  );
}
