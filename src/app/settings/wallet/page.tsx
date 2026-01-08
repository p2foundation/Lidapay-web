"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getBalance } from "@/lib/api";
import { Wallet, ArrowLeft, Loader2 } from "lucide-react";
import { usePreferences } from "@/contexts/preferences-context";

export default function WalletPage() {
  const { t, formatMoney, currency: userCurrency } = usePreferences();
  const balanceQ = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance()
  });

  const balance = balanceQ.data?.data?.balance ?? balanceQ.data?.balance ?? 0;
  const backendCurrency = balanceQ.data?.data?.currency ?? balanceQ.data?.currency ?? "GHS";
  // Use user's preferred currency, but fallback to backend currency if no preference
  const displayCurrency = userCurrency !== "GHS" ? userCurrency : backendCurrency;

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
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">{t("wallet.title")}</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">{t("wallet.title")}</div>
            <div className="mt-1 text-sm text-white/85">{t("wallet.balance")}</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("wallet.balance")}</CardTitle>
          </CardHeader>
          <CardContent>
            {balanceQ.isLoading ? (
              <div className="py-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-brand-600" />
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("common.loading")}</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-2">
                  {formatMoney(balance, displayCurrency)}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t("wallet.available")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("wallet.history")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-zinc-400" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("wallet.comingSoon")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

