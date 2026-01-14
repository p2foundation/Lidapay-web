"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Laptop, Moon, Sun } from "lucide-react";

const KEY = "lidapay_theme";
type ThemeMode = "light" | "dark" | "system";

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  if (theme === "system") {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    if (prefersDark) root.classList.add("dark");
    else root.classList.remove("dark");
    return;
  }
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const icon = useMemo(() => {
    if (theme === "system") return Laptop;
    return theme === "dark" ? Sun : Moon;
  }, [theme]);
  const Icon = icon;

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as ThemeMode | null) ?? null;
    const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    const initial = stored ?? (systemDark ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    media?.addEventListener?.("change", handler);
    return () => media?.removeEventListener?.("change", handler);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        const next: ThemeMode =
          theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
        setTheme(next);
        localStorage.setItem(KEY, next);
        applyTheme(next);
      }}
      aria-label={`Theme: ${theme}`}
      title={`Theme: ${theme}`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}


