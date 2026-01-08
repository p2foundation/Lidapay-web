"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Settings, 
  Shield, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  UserPlus,
  DollarSign,
  Activity,
  Eye,
  Download,
  Filter,
  Calendar,
  Globe,
  Smartphone,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  RefreshCw,
  Phone,
  MapPin,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { format, subDays } from "date-fns";
import { getStoredUser } from "@/lib/storage";
import { getProfile, getBalance, getUserPoints, getTransactions } from "@/lib/api";

// Mock data for demonstration
const analyticsData = [
  { name: "Mon", revenue: 4000, users: 240, transactions: 120 },
  { name: "Tue", revenue: 3000, users: 198, transactions: 98 },
  { name: "Wed", revenue: 5000, users: 290, transactions: 156 },
  { name: "Thu", revenue: 4500, users: 280, transactions: 142 },
  { name: "Fri", revenue: 6000, users: 340, transactions: 189 },
  { name: "Sat", revenue: 5500, users: 320, transactions: 178 },
  { name: "Sun", revenue: 4800, users: 298, transactions: 167 }
];

const transactionData = [
  { name: "Airtime", value: 45, color: "#ec4899" },
  { name: "Data", value: 30, color: "#4f46e5" },
  { name: "Transfers", value: 25, color: "#10b981" }
];

const recentTransactions = [
  { id: "TXN001", user: "John Doe", type: "Airtime", amount: "$50.00", status: "success", time: "2 min ago" },
  { id: "TXN002", user: "Jane Smith", type: "Data Bundle", amount: "$25.00", status: "success", time: "5 min ago" },
  { id: "TXN003", user: "Bob Johnson", type: "Transfer", amount: "$100.00", status: "pending", time: "8 min ago" },
  { id: "TXN004", user: "Alice Brown", type: "Airtime", amount: "$30.00", status: "failed", time: "12 min ago" },
  { id: "TXN005", user: "Charlie Wilson", type: "Data Bundle", amount: "$40.00", status: "success", time: "15 min ago" }
];

const activeUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active", lastSeen: "2 min ago", spent: "$1,234.56" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", lastSeen: "5 min ago", spent: "$987.32" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "inactive", lastSeen: "2 hours ago", spent: "$2,345.67" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", status: "active", lastSeen: "10 min ago", spent: "$3,456.78" }
];

const notifications = [
  { id: 1, type: "alert", message: "Server load above 80%", time: "5 min ago", read: false },
  { id: 2, type: "success", message: "New user milestone: 10,000 users", time: "1 hour ago", read: false },
  { id: 3, type: "warning", message: "Payment gateway latency increased", time: "2 hours ago", read: true },
  { id: 4, type: "info", message: "System backup completed successfully", time: "3 hours ago", read: true }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [points, setPoints] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      
      // Fetch user data with better error handling
      getProfile()
        .then(setUser)
        .catch((error: any) => {
          // Don't log 401 errors - they're handled by the API layer
          if (error?.status !== 401 && process.env.NODE_ENV === 'development') {
            console.error('Failed to fetch profile:', error);
          }
          // Keep using stored user if API fails
        });
      
      getBalance()
        .then(setBalance)
        .catch((e: any) => {
          // 404 is expected for balance endpoint, 401 is handled by API layer
          if (e?.status !== 401 && e?.status !== 404 && process.env.NODE_ENV === 'development') {
            console.error("Failed to fetch balance:", e);
          }
          setBalance({ balance: 0, currency: "GHS" });
        });
      
      getUserPoints()
        .then(setPoints)
        .catch((error: any) => {
          if (error?.status !== 401 && process.env.NODE_ENV === 'development') {
            console.error('Failed to fetch points:', error);
          }
          setPoints({ points: 0 });
        });
      
      getTransactions({ limit: 5 })
        .then(res => {
          setTransactions(res?.data?.transactions || res?.transactions || []);
        })
        .catch((error: any) => {
          if (error?.status !== 401 && process.env.NODE_ENV === 'development') {
            console.error('Failed to fetch transactions:', error);
          }
          setTransactions([]);
        });
    }
  }, []);

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "Not provided";
    // Format as (024) 458-8584
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 overflow-x-hidden">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6 lg:mb-8"
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome back, {user?.firstName || 'Admin'}! 👋
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1 sm:mt-2">
          Here's what's happening with your LidaPay admin dashboard today.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
      >
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Wallet Balance</CardTitle>
            <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="text-xl sm:text-2xl font-bold">
              {typeof balance?.balance === 'number' ? `$${balance.balance.toFixed(2)}` :
               typeof balance?.balance === 'string' ? `$${parseFloat(balance.balance).toFixed(2)}` :
               '$0.00'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Available balance
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Reward Points</CardTitle>
            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="text-xl sm:text-2xl font-bold">
              {points?.points || points?.data?.points || '0'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total points earned
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="text-xl sm:text-2xl font-bold">$32,450</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
              <span className="text-green-500">+12.5%</span>
              <span className="ml-1 hidden sm:inline">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Users</CardTitle>
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="text-xl sm:text-2xl font-bold">10,234</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
              <span className="text-green-500">+8.2%</span>
              <span className="ml-1 hidden sm:inline">from last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
      >
        <Card className="overflow-hidden">
          <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-4 lg:px-6 pb-4 sm:pb-6">
            <div className="w-full" style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#ec4899" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Transaction Types</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-4 lg:px-6 pb-4 sm:pb-6">
            <div className="w-full" style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transactionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {transactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="space-y-3 sm:space-y-4">
              {transactions.length > 0 ? transactions.map((transaction, idx) => {
                const txId = transaction?._id || transaction?.id || transaction?.transId || `tx-${idx}`;
                const txType = typeof transaction?.transType === 'string' ? transaction.transType : 
                              typeof transaction?.type === 'string' ? transaction.type :
                              typeof transaction?.service === 'string' ? transaction.service :
                              'Transaction';
                const txStatus = typeof transaction?.status === 'string' ? transaction.status : 'unknown';
                const txAmount = typeof transaction?.amount === 'number' ? transaction.amount :
                               typeof transaction?.amount === 'string' ? parseFloat(transaction.amount) :
                               transaction?.monetary?.amount || 0;
                const txDate = transaction?.createdAt ? 
                             (typeof transaction.createdAt === 'string' ? transaction.createdAt :
                              transaction.createdAt instanceof Date ? transaction.createdAt.toLocaleString() :
                              'Just now') : 'Just now';
                
                return (
                  <div key={txId} className="flex items-center justify-between gap-2 sm:gap-4 py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className={`h-2 w-2 rounded-full flex-shrink-0 ${
                        txStatus?.toLowerCase() === 'completed' || txStatus?.toLowerCase() === 'success' ? 'bg-green-500' :
                        txStatus?.toLowerCase() === 'pending' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-medium truncate">{txType}</div>
                        <div className="text-xs text-muted-foreground truncate">{txDate}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs sm:text-sm font-medium">${txAmount.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground capitalize">{txStatus}</div>
                    </div>
                  </div>
                );
              }) : recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between gap-2 sm:gap-4 py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className={`h-2 w-2 rounded-full flex-shrink-0 ${
                      transaction.status === 'success' ? 'bg-green-500' :
                      transaction.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-medium truncate">{transaction.user}</div>
                      <div className="text-xs text-muted-foreground truncate">{transaction.type}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs sm:text-sm font-medium">{transaction.amount}</div>
                    <div className="text-xs text-muted-foreground">{transaction.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
