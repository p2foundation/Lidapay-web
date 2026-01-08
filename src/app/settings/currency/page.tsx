"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Check, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { usePreferences } from "@/contexts/preferences-context";
import { toast } from "sonner";

const CURRENCIES = [
  { code: "GHS", name: "Ghana Cedi", symbol: "₵", flag: "🇬🇭" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", flag: "🇺🇬" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", flag: "🇹🇿" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", flag: "🇪🇹" },
];

export default function CurrencyPage() {
  const { currency, setCurrency, t, formatMoney } = usePreferences();
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency]);

  const handleCurrencyChange = (currCode: string) => {
    setSelectedCurrency(currCode);
    setCurrency(currCode);
    toast.success(t("currency.saved"), {
      description: t("currency.select") + ": " + CURRENCIES.find(c => c.code === currCode)?.name
    });
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
            <div className="mt-2 text-2xl font-extrabold tracking-tight">{t("currency.title")}</div>
            <div className="mt-1 text-sm text-white/85">{t("currency.subtitle")}</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {t("currency.select")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {CURRENCIES.map((curr) => {
                const isSelected = selectedCurrency === curr.code;
                return (
                  <button
                    key={curr.code}
                    onClick={() => handleCurrencyChange(curr.code)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span className="text-xl mb-1">{curr.flag}</span>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                        {curr.name}
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {curr.code} • {curr.symbol}
                      </div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-mono">
                        {formatMoney(1000, curr.code)}
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
                {t("currency.saved")}. {t("common.loading")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
