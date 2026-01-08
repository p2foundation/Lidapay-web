"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ComposedChart,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  Download, 
  Calendar, 
  Filter, 
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from "lucide-react";
import { format, subDays } from "date-fns";

// Mock analytics data
const revenueData = [
  { month: "Jan", revenue: 125000, profit: 45000, users: 1200 },
  { month: "Feb", revenue: 132000, profit: 48000, users: 1350 },
  { month: "Mar", revenue: 145000, profit: 52000, users: 1500 },
  { month: "Apr", revenue: 158000, profit: 58000, users: 1680 },
  { month: "May", revenue: 172000, profit: 65000, users: 1850 },
  { month: "Jun", revenue: 195000, profit: 75000, users: 2100 }
];

const userGrowthData = [
  { date: "2024-01", newUsers: 450, activeUsers: 1200, churnedUsers: 50 },
  { date: "2024-02", newUsers: 520, activeUsers: 1350, churnedUsers: 45 },
  { date: "2024-03", newUsers: 580, activeUsers: 1500, churnedUsers: 40 },
  { date: "2024-04", newUsers: 620, activeUsers: 1680, churnedUsers: 38 },
  { date: "2024-05", newUsers: 700, activeUsers: 1850, churnedUsers: 35 },
  { date: "2024-06", newUsers: 850, activeUsers: 2100, churnedUsers: 30 }
];

const transactionMetrics = [
  { metric: "Volume", value: 85, fullMark: 100 },
  { metric: "Speed", value: 92, fullMark: 100 },
  { metric: "Success", value: 88, fullMark: 100 },
  { metric: "Security", value: 95, fullMark: 100 },
  { metric: "Satisfaction", value: 78, fullMark: 100 }
];

const countryData = [
  { country: "Ghana", users: 4500, revenue: 125000, growth: 12.5 },
  { country: "Nigeria", users: 3200, revenue: 98000, growth: 18.2 },
  { country: "Kenya", users: 2100, revenue: 65000, growth: 15.8 },
  { country: "South Africa", users: 1800, revenue: 54000, growth: 8.9 },
  { country: "Others", users: 1200, revenue: 32000, growth: 22.1 }
];

const deviceData = [
  { device: "Android", users: 65, percentage: 65 },
  { device: "iOS", users: 25, percentage: 25 },
  { device: "Web", users: 10, percentage: 10 }
];

const COLORS = ['#ec4899', '#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export default function AdminAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m");
  const [chartType, setChartType] = useState("revenue");

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">Analytics Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700">
            {["1m", "3m", "6m", "1y"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg text-xs sm:text-sm"
              >
                {period}
              </Button>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="hidden sm:flex">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* KPI Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">$925,000</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+15.3%</span>
              <span className="ml-1 hidden sm:inline">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Users</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">12,800</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+8.7%</span>
              <span className="ml-1 hidden sm:inline">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Avg. Transaction</CardTitle>
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">$72.30</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">-2.1%</span>
              <span className="ml-1 hidden sm:inline">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">38.5%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">+3.2%</span>
              <span className="ml-1 hidden sm:inline">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue & Growth Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue & Profit Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#ec4899" fillOpacity={1} fill="url(#colorRevenue)" />
                <Line type="monotone" dataKey="profit" stroke="#4f46e5" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Growth Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="newUsers" fill="#10b981" />
                <Bar dataKey="activeUsers" fill="#4f46e5" />
                <Bar dataKey="churnedUsers" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Metrics & Geographic Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={transactionMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" fontSize={12} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                <Radar name="Performance" dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countryData.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                    <div>
                      <div className="font-medium text-sm">{country.country}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {country.users.toLocaleString()} users
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">${country.revenue.toLocaleString()}</div>
                    <div className={`text-xs sm:text-sm ${
                      country.growth > 10 ? 'text-green-600' : 'text-zinc-600'
                    }`}>
                      +{country.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Device Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Device Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="users"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
