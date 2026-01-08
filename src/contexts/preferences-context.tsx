"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getLanguage, setLanguage as saveLanguage, getCurrency, setCurrency as saveCurrency, type Language } from "@/lib/storage";
import { t as translate } from "@/lib/translations";

type PreferencesContextType = {
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (curr: string) => void;
  t: (key: string) => string;
  formatMoney: (amount: unknown, currencyOverride?: string) => string;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>("en");
  const [currency, setCurrencyState] = useState<string>("GHS");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLanguageState(getLanguage());
    setCurrencyState(getCurrency());
  }, []);

  const setLanguage = (lang: string) => {
    // Validate language code
    const validLang: Language = (lang === "en" || lang === "fr" || lang === "es" || lang === "pt" || lang === "ar" || lang === "sw") ? lang : "en";
    setLanguageState(validLang);
    saveLanguage(validLang);
    // Trigger a re-render by updating document language
    if (typeof document !== "undefined") {
      document.documentElement.lang = validLang;
    }
  };

  const setCurrency = (curr: string) => {
    setCurrencyState(curr);
    saveCurrency(curr);
  };

  const t = (key: string): string => {
    return translate(key, language as Language);
  };

  const formatMoney = (amount: unknown, currencyOverride?: string): string => {
    const curr = currencyOverride || currency;
    const n = typeof amount === "number" ? amount : Number(amount);
    if (!Number.isFinite(n)) return `${curr} —`;
    try {
      return new Intl.NumberFormat(language === "ar" ? "ar-SA" : language, {
        style: "currency",
        currency: curr
      }).format(n);
    } catch {
      return `${curr} ${n.toFixed(2)}`;
    }
  };

  if (!mounted) {
    // Return default values during SSR
    return (
      <PreferencesContext.Provider
        value={{
          language: "en",
          currency: "GHS",
          setLanguage,
          setCurrency,
          t: (key: string) => translate(key, "en"),
          formatMoney: (amount: unknown, currencyOverride?: string) => {
            const curr = currencyOverride || "GHS";
            const n = typeof amount === "number" ? amount : Number(amount);
            if (!Number.isFinite(n)) return `${curr} —`;
            return `${curr} ${n.toFixed(2)}`;
          },
        }}
      >
        {children}
      </PreferencesContext.Provider>
    );
  }

  return (
    <PreferencesContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        t,
        formatMoney,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}