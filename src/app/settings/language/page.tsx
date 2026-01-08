"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { usePreferences } from "@/contexts/preferences-context";
import { toast } from "sonner";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
];

export default function LanguagePage() {
  const { language, setLanguage, t } = usePreferences();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    setLanguage(langCode);
    toast.success(t("language.saved"), {
      description: t("language.select") + ": " + LANGUAGES.find(l => l.code === langCode)?.name
    });
    // Force a page refresh to apply translations
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/settings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("common.back")}
            </Button>
          </Link>
          <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 px-6 py-6 text-white shadow-glow flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">{t("settings.title")}</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">{t("language.title")}</div>
            <div className="mt-1 text-sm text-white/85">{t("language.subtitle")}</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("language.select")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span className="text-xl mb-1">{lang.flag}</span>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                        {lang.name}
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {lang.code.toUpperCase()}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="absolute top-1.5 right-1.5 h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                {t("language.saved")}. {t("common.loading")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

