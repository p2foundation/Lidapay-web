"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getBalance, getRewards, getTransactions, getUserPoints } from "@/lib/api";
import { getStoredUser } from "@/lib/storage";
import Link from "next/link";
import { 
  Gift, 
  ReceiptText, 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Wifi,
  CreditCard,
  Activity,
  Calendar,
  DollarSign,
  Sparkles,
  Zap,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { getTransactionAmount, getTransactionCurrency, toText } from "@/lib/format";
import { format, subDays } from "date-fns";
import { usePreferences } from "@/contexts/preferences-context";

export default function AppDashboardPage() {
  const { t, formatMoney, currency: userCurrency } = usePreferences();
  const balanceQ = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(),
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 404) return false;
      return failureCount < 2;
    },
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const pointsQ = useQuery({
    queryKey: ["points"],
    queryFn: () => getUserPoints(),
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 404) return false;
      return failureCount < 2;
    },
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const rewardsQ = useQuery({
    queryKey: ["rewards"],
    queryFn: () => getRewards(),
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 404) return false;
      return failureCount < 2;
    },
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  // Get current user ID for cache isolation
  const user = getStoredUser();
  const userId = user?.id || "anonymous";

  const txQ = useQuery({
    queryKey: ["transactions", userId, 1],
    queryFn: () => getTransactions({ page: 1, limit: 5 }), // Fetch only 5 recent transactions
    enabled: !!user?.id, // Only fetch if user is logged in
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 404) return false;
      return failureCount < 2;
    },
    retryOnMount: false,
    refetchOnWindowFocus: false
  });

  const balance = balanceQ.data?.data?.balance ?? balanceQ.data?.balance ?? 0;
  const backendCurrency = balanceQ.data?.data?.currency ?? balanceQ.data?.currency ?? "GHS";
  // Use user's preferred currency, but fallback to backend currency if no preference
  const displayCurrency = userCurrency !== "GHS" ? userCurrency : backendCurrency;
  const points = pointsQ.data?.data?.points ?? pointsQ.data?.points ?? pointsQ.data?.user?.points ?? 0;
  const rewardsCount =
    rewardsQ.data?.data?.rewards?.length ?? rewardsQ.data?.rewards?.length ?? rewardsQ.data?.length ?? 0;
  const txs = txQ.data?.data?.transactions ?? txQ.data?.transactions ?? txQ.data?.metadata ?? [];

  // Calculate analytics
  const now = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(now, 6 - i);
    return {
      date: format(date, "MMM dd"),
      day: format(date, "EEE"),
      spending: 0,
      transactions: 0
    };
  });

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(now, 29 - i);
    return {
      date: format(date, "MMM dd"),
      spending: 0,
      transactions: 0
    };
  });

  // Process transactions
  let totalSpent = 0;
  let totalReceived = 0;
  let totalTransactions = 0;
  const categoryBreakdown: Record<string, number> = {};
  const statusBreakdown: Record<string, number> = {};

  if (Array.isArray(txs)) {
    txs.forEach((tx: any) => {
      const amount = getTransactionAmount(tx);
      const txCurrency = getTransactionCurrency(tx);
      const txDate = tx?.createdAt ? new Date(tx.createdAt) : null;
      const txType = tx?.transType || tx?.type || tx?.service || "Other";
      const txStatus = tx?.status || "unknown";

      if (amount > 0) {
        totalReceived += amount;
      } else {
        totalSpent += Math.abs(amount);
      }

      totalTransactions++;

      // Category breakdown
      if (!categoryBreakdown[txType]) {
        categoryBreakdown[txType] = 0;
      }
      categoryBreakdown[txType] += Math.abs(amount);

      // Status breakdown
      if (!statusBreakdown[txStatus]) {
        statusBreakdown[txStatus] = 0;
      }
      statusBreakdown[txStatus]++;

      // Daily spending
      if (txDate && amount < 0) {
        const daysAgo = Math.floor((now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysAgo >= 0 && daysAgo < 7) {
          last7Days[6 - daysAgo].spending += Math.abs(amount);
          last7Days[6 - daysAgo].transactions++;
        }
        if (daysAgo >= 0 && daysAgo < 30) {
          last30Days[29 - daysAgo].spending += Math.abs(amount);
          last30Days[29 - daysAgo].transactions++;
        }
      }
    });
  }

  // Calculate trends (mock for now)
  const spendingTrend = last7Days.length > 1 
    ? ((last7Days[6].spending - last7Days[0].spending) / (last7Days[0].spending || 1)) * 100 
    : 0;
  const transactionTrend = last7Days.length > 1
    ? ((last7Days[6].transactions - last7Days[0].transactions) / (last7Days[0].transactions || 1)) * 100
    : 0;

  // Prepare chart data
  const categoryData = Object.entries(categoryBreakdown)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const COLORS = ['#ec4899', '#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  const statusData = Object.entries(statusBreakdown).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-indigoBrand-600 px-6 py-8 text-white shadow-2xl"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold uppercase tracking-wider text-white/80">{t("dashboard.welcome")}</div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">{t("dashboard.title")}</h1>
                <p className="mt-1 text-sm text-white/90">{t("dashboard.welcome")}</p>
              </div>
              <div className="hidden md:block">
                <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
                  <Activity className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-l-4 border-l-brand-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.walletBalance")}</CardTitle>
                <Wallet className="h-4 w-4 text-brand-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatMoney(balance, displayCurrency)}</div>
                <p className="text-xs text-muted-foreground mt-1">{t("wallet.available")}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>Active</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.totalSpent")}</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatMoney(totalSpent, displayCurrency)}</div>
                <p className="text-xs text-muted-foreground mt-1">This month</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
                  <TrendingDown className="h-3 w-3" />
                  <span>{spendingTrend > 0 ? `+${spendingTrend.toFixed(1)}%` : `${spendingTrend.toFixed(1)}%`}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t("dashboard.rewardPoints")}</CardTitle>
                <Gift className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{points.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">{t("dashboard.rewardPoints")}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                  <Sparkles className="h-3 w-3" />
                  <span>{rewardsCount} {t("nav.rewards")}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                <ReceiptText className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTransactions}</div>
                <p className="text-xs text-muted-foreground mt-1">Total count</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-purple-600">
                  <Activity className="h-3 w-3" />
                  <span>{transactionTrend > 0 ? `+${transactionTrend.toFixed(1)}%` : `${transactionTrend.toFixed(1)}%`}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Spending Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-brand-600" />
                    Spending Overview
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">Last 7 days</span>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={last7Days}>
                    <defs>
                      <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }}
                      stroke="#888"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#888"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="spending" 
                      stroke="#ec4899" 
                      fillOpacity={1} 
                      fill="url(#colorSpending)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-indigo-600" />
                    Category Breakdown
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number | undefined) => formatMoney(value || 0, displayCurrency)}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
                    No transaction data available
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions & Recent Transactions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-brand-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/airtime">
                  <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <div className="rounded-lg bg-brand-100 p-2 dark:bg-brand-900/20">
                      <Phone className="h-5 w-5 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{t("dashboard.buyAirtime")}</div>
                      <div className="text-xs text-muted-foreground">Top up any number</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
                <Link href="/data">
                  <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/20">
                      <Wifi className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{t("dashboard.buyData")}</div>
                      <div className="text-xs text-muted-foreground">Data bundles</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
                <Link href="/transactions">
                  <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/20">
                      <ReceiptText className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{t("dashboard.viewHistory")}</div>
                      <div className="text-xs text-muted-foreground">All transactions</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
                <Link href="/rewards">
                  <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/20">
                      <Gift className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Rewards</div>
                      <div className="text-xs text-muted-foreground">Redeem points</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-brand-600" />
                  {t("dashboard.recentTransactions")}
                </CardTitle>
                <Link href="/transactions">
                  <span className="text-xs font-medium text-brand-600 hover:underline">{t("dashboard.viewAll")}</span>
                </Link>
              </CardHeader>
              <CardContent>
                {Array.isArray(txs) && txs.length > 0 ? (
                  <div className="space-y-3">
                    {txs.slice(0, 5).map((t: any, idx: number) => {
                      const amount = getTransactionAmount(t);
                      const txCurrency = getTransactionCurrency(t);
                      const txType = toText(t?.transType || t?.type || t?.service || "Transaction");
                      const txStatus = toText(t?.status || "unknown");
                      const txDate = t?.createdAt ? new Date(t.createdAt) : null;
                      const isPositive = amount > 0;
                      const statusColor = 
                        txStatus.toLowerCase() === 'completed' || txStatus.toLowerCase() === 'success' 
                          ? 'text-green-600' 
                          : txStatus.toLowerCase() === 'pending' 
                          ? 'text-yellow-600' 
                          : 'text-red-600';
                      
                      // Extract display text properly - prevent [object Object]
                      const getDisplayText = () => {
                        // Try recipientName (string or object)
                        if (t?.recipientName) {
                          if (typeof t.recipientName === 'string' && t.recipientName.trim()) {
                            return t.recipientName;
                          }
                          if (typeof t.recipientName === 'object' && t.recipientName !== null) {
                            // Safely extract from object without calling toString()
                            const name = t.recipientName.name || t.recipientName.phone || t.recipientName.value;
                            if (name && typeof name === 'string') return name;
                          }
                        }
                        // Try recipientPhone
                        if (t?.recipientPhone) {
                          if (typeof t.recipientPhone === 'string' && t.recipientPhone.trim()) {
                            return t.recipientPhone;
                          }
                          if (typeof t.recipientPhone === 'object' && t.recipientPhone !== null) {
                            const phone = t.recipientPhone.phone || t.recipientPhone.number || t.recipientPhone.value;
                            if (phone && typeof phone === 'string') return phone;
                          }
                        }
                        // Try description
                        if (t?.description && typeof t.description === 'string' && t.description.trim()) {
                          return t.description;
                        }
                        // Try note
                        if (t?.note && typeof t.note === 'string' && t.note.trim()) {
                          return t.note;
                        }
                        // Fallback to transaction type
                        return txType;
                      };
                      
                      const displayText = getDisplayText();
                      const txId = t?._id ?? t?.id ?? idx;
                      const isAirtime = txType.toLowerCase().includes('airtime');
                      const isData = txType.toLowerCase().includes('data');
                      const detailPath = isAirtime ? `/airtime/${txId}` : isData ? `/data/${txId}` : `/transactions/${txId}`;

                      return (
                        <Link
                          key={txId}
                          href={detailPath}
                          className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 cursor-pointer"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`rounded-lg p-2 ${
                              isAirtime ? 'bg-brand-100 dark:bg-brand-900/20' :
                              isData ? 'bg-indigo-100 dark:bg-indigo-900/20' :
                              'bg-zinc-100 dark:bg-zinc-800'
                            }`}>
                              {isAirtime ? (
                                <Phone className="h-4 w-4 text-brand-600" />
                              ) : isData ? (
                                <Wifi className="h-4 w-4 text-indigo-600" />
                              ) : (
                                <CreditCard className="h-4 w-4 text-zinc-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate">
                                {displayText}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="capitalize">{txType}</span>
                                <span>•</span>
                                <span className={statusColor}>{txStatus}</span>
                                {txDate && (
                                  <>
                                    <span>•</span>
                                    <span>{format(txDate, "MMM dd, HH:mm")}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <div className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-zinc-900 dark:text-zinc-50'}`}>
                              {isPositive ? '+' : '-'}{formatMoney(Math.abs(amount), txCurrency)}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                      <ReceiptText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">{t("dashboard.noTransactions")}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t("dashboard.getStarted")}</p>
                    <Link href="/airtime" className="mt-4">
                      <span className="text-sm font-medium text-brand-600 hover:underline">{t("dashboard.getStarted")}</span>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
