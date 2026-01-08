"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, extractErrorMessage } from "@/lib/api";
import { getStoredUser } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useMemo } from "react";
import { toDateTimeText, toText, getTransactionAmount, getTransactionCurrency } from "@/lib/format";
import { ExportMenu } from "@/components/export-menu";
import type { Transaction } from "@/lib/export";
import { 
  ReceiptText, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  ChevronsLeft, 
  ChevronsRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Calendar,
  Filter,
  Download,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
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
  ResponsiveContainer 
} from "recharts";
import { format, subDays, startOfDay, endOfDay, isWithinInterval } from "date-fns";

export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7d");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const limit = 5; // Show 5 transactions per page

  // Get current user ID for cache isolation
  const user = getStoredUser();
  const userId = user?.id || "anonymous";

  const txQ = useQuery({
    queryKey: ["transactions", userId, page, statusFilter, typeFilter],
    queryFn: () => getTransactions({ 
      page, 
      limit,
      ...(statusFilter !== "all" && { status: statusFilter }),
      ...(typeFilter !== "all" && { transType: typeFilter })
    }),
    refetchOnWindowFocus: false,
    enabled: !!user?.id // Only fetch if user is logged in
  });

  // Parse API response - API returns { transactions, total, totalPages }
  const txs = txQ.data?.transactions ?? txQ.data?.data?.transactions ?? [];
  const total = txQ.data?.total ?? txQ.data?.data?.total ?? 0;
  const totalPages = txQ.data?.totalPages ?? txQ.data?.data?.totalPages ?? Math.ceil(total / limit);

  // Filter transactions based on search and date range (client-side)
  const filteredTransactions = useMemo(() => {
    let filtered = [...txs];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        toText(tx?.recipientName)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toText(tx?.description)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toText(tx?.transType)?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter (client-side fallback - main filtering is server-side)
    if (statusFilter !== "all") {
      filtered = filtered.filter(tx => {
        const status = toText(tx?.status || tx?.transStatus || tx?.serviceStatus);
        const statusLower = status.toLowerCase();
        if (statusFilter === "success") {
          return statusLower === "success" || statusLower === "ok" || statusLower === "completed";
        }
        if (statusFilter === "pending") {
          return statusLower === "pending" || statusLower === "inprogress";
        }
        if (statusFilter === "failed") {
          return statusLower === "failed" || statusLower === "fail";
        }
        return statusLower === statusFilter.toLowerCase();
      });
    }
    
    // Type filter (client-side fallback - main filtering is server-side)
    if (typeFilter !== "all") {
      filtered = filtered.filter(tx => {
        const transType = toText(tx?.transType || tx?.type);
        const transTypeLower = transType.toLowerCase();
        if (typeFilter === "airtime") {
          return transTypeLower.includes("airtime");
        }
        if (typeFilter === "data") {
          return transTypeLower.includes("data") || transTypeLower.includes("bundle");
        }
        return transTypeLower.includes(typeFilter.toLowerCase());
      });
    }
    
    // Date range filter
    const now = new Date();
    let startDate;
    switch (dateRange) {
      case "24h":
        startDate = subDays(now, 1);
        break;
      case "7d":
        startDate = subDays(now, 7);
        break;
      case "30d":
        startDate = subDays(now, 30);
        break;
      case "90d":
        startDate = subDays(now, 90);
        break;
      default:
        startDate = subDays(now, 7);
    }
    
    filtered = filtered.filter(tx => {
      const txDate = new Date(tx?.createdAt || tx?.timestamp);
      if (isNaN(txDate.getTime())) return true; // Include if date is invalid
      return isWithinInterval(txDate, { start: startOfDay(startDate), end: endOfDay(now) });
    });
    
    return filtered;
  }, [txs, searchTerm, statusFilter, typeFilter, dateRange]);

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalAmount = filteredTransactions.reduce((sum, tx) => sum + (Number(tx?.amount) || 0), 0);
    const successfulTxs = filteredTransactions.filter(tx => toText(tx?.status) === "success").length;
    const failedTxs = filteredTransactions.filter(tx => toText(tx?.status) === "failed").length;
    const pendingTxs = filteredTransactions.filter(tx => toText(tx?.status) === "pending").length;
    
    // Calculate trend (last 7 days vs previous 7 days)
    const now = new Date();
    const last7Days = filteredTransactions.filter(tx => 
      isWithinInterval(new Date(tx?.createdAt), { 
        start: startOfDay(subDays(now, 7)), 
        end: endOfDay(now) 
      })
    );
    const previous7Days = filteredTransactions.filter(tx => 
      isWithinInterval(new Date(tx?.createdAt), { 
        start: startOfDay(subDays(now, 14)), 
        end: endOfDay(subDays(now, 7)) 
      })
    );
    
    const last7DaysAmount = last7Days.reduce((sum, tx) => sum + (Number(tx?.amount) || 0), 0);
    const previous7DaysAmount = previous7Days.reduce((sum, tx) => sum + (Number(tx?.amount) || 0), 0);
    const trend = previous7DaysAmount > 0 ? ((last7DaysAmount - previous7DaysAmount) / previous7DaysAmount) * 100 : 0;
    
    // Prepare chart data
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = startOfDay(subDays(now, i));
      const dayTransactions = filteredTransactions.filter(tx => {
        const txDate = new Date(tx?.createdAt || tx?.timestamp);
        if (isNaN(txDate.getTime())) return false;
        return isWithinInterval(txDate, { 
          start: date, 
          end: endOfDay(date) 
        });
      });
      chartData.push({
        date: format(date, "MMM dd"),
        amount: dayTransactions.reduce((sum, tx) => sum + getTransactionAmount(tx), 0),
        count: dayTransactions.length
      });
    }
    
    // Transaction type distribution
    const typeDistribution = filteredTransactions.reduce((acc, tx) => {
      const type = toText(tx?.transType) || "Other";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    const pieData = Object.entries(typeDistribution).map(([name, value]) => ({
      name,
      value
    }));
    
    return {
      totalAmount,
      successfulTxs,
      failedTxs,
      pendingTxs,
      trend,
      chartData,
      pieData,
      successRate: filteredTransactions.length > 0 ? (successfulTxs / filteredTransactions.length) * 100 : 0
    };
  }, [filteredTransactions]);

  const COLORS = ['#ec4899', '#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-indigoBrand-600 p-8 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-wider text-white/80">Analytics Dashboard</div>
              <div className="mt-2 text-3xl font-black tracking-tight">Transaction History</div>
              <div className="mt-1 text-sm text-white/85">Monitor your global transactions and insights</div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/20 hover:bg-white/30"
                onClick={() => setShowExportMenu(true)}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => txQ.refetch()}
                disabled={txQ.isLoading}
                className="bg-white/20 hover:bg-white/30"
              >
                <RefreshCw className={`h-4 w-4 ${txQ.isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analytics.totalAmount.toFixed(2)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {analytics.trend > 0 ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">+{analytics.trend.toFixed(1)}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                    <span className="text-red-500">{analytics.trend.toFixed(1)}%</span>
                  </>
                )}
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.successRate.toFixed(1)}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
                {analytics.successfulTxs} successful
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.pendingTxs}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2" />
                Awaiting confirmation
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.failedTxs}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <div className="h-2 w-2 bg-red-500 rounded-full mr-2" />
                Requires attention
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Transaction Volume (7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.chartData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#ec4899" 
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Transaction Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <option value="all">All Types</option>
                  <option value="airtime">Airtime</option>
                  <option value="data">Data</option>
                  <option value="transfer">Transfer</option>
                </select>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} transactions
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {txQ.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-brand-600" />
                </div>
              ) : txQ.isError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
                  {extractErrorMessage(txQ.error, "Failed to load transactions")}
                </div>
              ) : filteredTransactions.length > 0 ? (
                <div className="space-y-1">
                  {filteredTransactions.map((t: any, idx: number) => {
                    const txId = t?._id ?? t?.id ?? idx;
                    const txType = toText(t?.transType || t?.type || "Transaction");
                    const isAirtime = txType.toLowerCase().includes('airtime');
                    const isData = txType.toLowerCase().includes('data');
                    const detailPath = isAirtime ? `/airtime/${txId}` : isData ? `/data/${txId}` : `/transactions/${txId}`;
                    
                    return (
                    <Link
                      key={txId}
                      href={detailPath}
                    >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex items-center justify-between gap-4 rounded-xl p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          (() => {
                            const status = toText(t?.status || t?.transStatus || t?.serviceStatus);
                            const statusLower = status.toLowerCase();
                            if (statusLower === 'success' || statusLower === 'ok' || statusLower === 'completed') {
                              return 'bg-green-100 dark:bg-green-900/30';
                            }
                            if (statusLower === 'pending' || statusLower === 'inprogress') {
                              return 'bg-yellow-100 dark:bg-yellow-900/30';
                            }
                            return 'bg-red-100 dark:bg-red-900/30';
                          })()
                        }`}>
                          {(() => {
                            const status = toText(t?.status || t?.transStatus || t?.serviceStatus);
                            const statusLower = status.toLowerCase();
                            if (statusLower === 'success' || statusLower === 'ok' || statusLower === 'completed') {
                              return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
                            }
                            if (statusLower === 'pending' || statusLower === 'inprogress') {
                              return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
                            }
                            return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
                          })()}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-semibold">
                            {(() => {
                              // Try recipientName first
                              const recipientName = toText(t?.recipientName);
                              if (recipientName) return recipientName;
                              
                              // Try recipientNumber
                              const recipientNumber = toText(t?.recipientNumber);
                              if (recipientNumber) return recipientNumber;
                              
                              // Try description or commentary
                              const description = toText(t?.description || t?.commentary || t?.serviceMessage);
                              if (description) return description;
                              
                              // Fallback to transaction type
                              return toText(t?.transType || t?.type) || "Transaction";
                            })()}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="capitalize">{toText(t?.transType || t?.type) || "Transfer"}</span>
                            <span>•</span>
                            <span>{toDateTimeText(t?.createdAt || t?.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {getTransactionCurrency(t)} {getTransactionAmount(t).toFixed(2)}
                        </div>
                        <div className={`text-xs capitalize ${
                          (() => {
                            const status = toText(t?.status || t?.transStatus || t?.serviceStatus);
                            const statusLower = status.toLowerCase();
                            if (statusLower === 'success' || statusLower === 'ok' || statusLower === 'completed') {
                              return 'text-green-600 dark:text-green-400';
                            }
                            if (statusLower === 'pending' || statusLower === 'inprogress') {
                              return 'text-yellow-600 dark:text-yellow-400';
                            }
                            return 'text-red-600 dark:text-red-400';
                          })()
                        }`}>
                          {toText(t?.status || t?.transStatus || t?.serviceStatus) || "Unknown"}
                        </div>
                      </div>
                    </motion.div>
                    </Link>
                  )})}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <ReceiptText className="mx-auto h-12 w-12 text-zinc-400" />
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    No transactions found matching your criteria.
                  </p>
                </div>
              )}

              {/* Pagination - Only show if there are more than 5 transactions */}
              {total > limit && totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPage(1)}
                      disabled={page === 1}
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      return (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? "primary" : "secondary"}
                          size="sm"
                          onClick={() => setPage(pageNum)}
                          className="min-w-[2.5rem]"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPage(totalPages)}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Export Menu Modal */}
      {showExportMenu && (
        <ExportMenu
          transactions={filteredTransactions as Transaction[]}
          onClose={() => setShowExportMenu(false)}
        />
      )}
    </AppShell>
  );
}


