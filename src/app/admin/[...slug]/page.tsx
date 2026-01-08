"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle, 
  Download, 
  ExternalLink, 
  Filter, 
  Globe, 
  Phone, 
  Plus, 
  Search, 
  Users, 
  XCircle,
  Activity,
  Key,
  Shield,
  Bell,
  Mail,
  MessageSquare,
  Settings,
  FileText,
  Server,
  Database,
  TrendingUp,
  DollarSign,
  Award,
  Gift,
  Star,
  Target,
  ShoppingCart,
  Wifi,
  Receipt,
  Lock,
  AlertTriangle,
  Archive,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type BadgeVariant = "success" | "warning" | "danger" | "neutral";

function Badge({ variant, children }: { variant: BadgeVariant; children: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
        variant === "success" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        variant === "warning" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        variant === "danger" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        variant === "neutral" && "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
      )}
    >
      {children}
    </span>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</div>
        {hint && <div className="mt-1 text-xs text-zinc-500">{hint}</div>}
      </CardContent>
    </Card>
  );
}

type UserRow = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  role: string;
  kyc: "verified" | "pending" | "rejected";
  lastActive: string;
};

type TxRow = {
  id: string;
  user: string;
  type: "airtime" | "data" | "transfer";
  amount: string;
  status: "success" | "pending" | "failed";
  time: string;
};

const MOCK_USERS: UserRow[] = [
  { id: "USR-001", name: "John Doe", email: "john@example.com", status: "active", role: "premium", kyc: "verified", lastActive: "2m ago" },
  { id: "USR-002", name: "Jane Smith", email: "jane@example.com", status: "active", role: "user", kyc: "pending", lastActive: "10m ago" },
  { id: "USR-003", name: "Samuel Mensah", email: "samuel@example.com", status: "inactive", role: "user", kyc: "rejected", lastActive: "2d ago" },
  { id: "USR-004", name: "Akosua Owusu", email: "akosua@example.com", status: "active", role: "admin", kyc: "verified", lastActive: "1h ago" },
  { id: "USR-005", name: "Kwame Asante", email: "kwame@example.com", status: "active", role: "user", kyc: "verified", lastActive: "5m ago" },
];

const MOCK_TX: TxRow[] = [
  { id: "TX-1001", user: "John Doe", type: "airtime", amount: "GHS 10.00", status: "success", time: "2m ago" },
  { id: "TX-1002", user: "Jane Smith", type: "data", amount: "GHS 25.00", status: "pending", time: "6m ago" },
  { id: "TX-1003", user: "Samuel Mensah", type: "transfer", amount: "GHS 120.00", status: "failed", time: "1h ago" },
  { id: "TX-1004", user: "Akosua Owusu", type: "airtime", amount: "GHS 50.00", status: "success", time: "3h ago" },
  { id: "TX-1005", user: "Kwame Asante", type: "data", amount: "GHS 15.00", status: "success", time: "5h ago" },
];

type NavItem = { label: string; href: string };

type SectionConfig = {
  title: string;
  description: string;
  links: NavItem[];
};

const SECTIONS: Record<string, SectionConfig> = {
  users: {
    title: "User Management",
    description: "Manage users, roles and verification status.",
    links: [
      { label: "All Users", href: "/admin/users" },
      { label: "Active Users", href: "/admin/users/active" },
      { label: "Inactive Users", href: "/admin/users/inactive" },
      { label: "User Roles", href: "/admin/users/roles" },
    ],
  },
  transactions: {
    title: "Transactions",
    description: "Monitor activity and investigate issues.",
    links: [
      { label: "All Transactions", href: "/admin/transactions" },
      { label: "Airtime", href: "/admin/transactions/airtime" },
      { label: "Data Bundles", href: "/admin/transactions/data" },
      { label: "Transfers", href: "/admin/transactions/transfers" },
      { label: "Failed", href: "/admin/transactions/failed" },
    ],
  },
  analytics: {
    title: "Analytics",
    description: "Explore performance across key metrics.",
    links: [
      { label: "Overview", href: "/admin/analytics" },
      { label: "Revenue", href: "/admin/analytics/revenue" },
      { label: "Users", href: "/admin/analytics/users" },
      { label: "Transactions", href: "/admin/analytics/transactions" },
      { label: "Geographic", href: "/admin/analytics/geographic" },
    ],
  },
  rewards: {
    title: "Rewards & Points",
    description: "Manage points, rewards programs and redemptions.",
    links: [
      { label: "Overview", href: "/admin/rewards" },
      { label: "Points System", href: "/admin/rewards/points" },
      { label: "Rewards Program", href: "/admin/rewards/program" },
      { label: "Leaderboard", href: "/admin/rewards/leaderboard" },
      { label: "Redemptions", href: "/admin/rewards/redemptions" },
    ],
  },
  services: {
    title: "Services",
    description: "Airtime, data, bills and transfers operations.",
    links: [
      { label: "Overview", href: "/admin/services" },
      { label: "Airtime Service", href: "/admin/services/airtime" },
      { label: "Data Service", href: "/admin/services/data" },
      { label: "Bill Payment", href: "/admin/services/bills" },
      { label: "International Transfer", href: "/admin/services/transfer" },
    ],
  },
  security: {
    title: "Security",
    description: "Audit logs, access control and API keys.",
    links: [
      { label: "Overview", href: "/admin/security" },
      { label: "Audit Logs", href: "/admin/security/audit" },
      { label: "Access Control", href: "/admin/security/access" },
      { label: "API Keys", href: "/admin/security/api-keys" },
      { label: "Security Alerts", href: "/admin/security/alerts" },
    ],
  },
  system: {
    title: "System",
    description: "Server status, backups and logs.",
    links: [
      { label: "Overview", href: "/admin/system" },
      { label: "Database", href: "/admin/system/database" },
      { label: "Server Status", href: "/admin/system/status" },
      { label: "Backups", href: "/admin/system/backups" },
      { label: "System Logs", href: "/admin/system/logs" },
    ],
  },
  reports: {
    title: "Reports",
    description: "Generate and export reports.",
    links: [
      { label: "Overview", href: "/admin/reports" },
      { label: "Financial", href: "/admin/reports/financial" },
      { label: "Users", href: "/admin/reports/users" },
      { label: "Transactions", href: "/admin/reports/transactions" },
      { label: "Custom", href: "/admin/reports/custom" },
    ],
  },
  communications: {
    title: "Communications",
    description: "Notifications and messaging templates.",
    links: [
      { label: "Overview", href: "/admin/communications" },
      { label: "Notifications", href: "/admin/communications/notifications" },
      { label: "SMS Templates", href: "/admin/communications/sms" },
      { label: "Email Templates", href: "/admin/communications/email" },
      { label: "Push Notifications", href: "/admin/communications/push" },
    ],
  },
  settings: {
    title: "Settings",
    description: "Configure payments, SMS providers and API settings.",
    links: [
      { label: "Overview", href: "/admin/settings" },
      { label: "General", href: "/admin/settings/general" },
      { label: "Payment Gateways", href: "/admin/settings/payments" },
      { label: "SMS Providers", href: "/admin/settings/sms" },
      { label: "API Configuration", href: "/admin/settings/api" },
    ],
  },
  help: {
    title: "Help & Support",
    description: "Docs, support tickets and FAQs.",
    links: [
      { label: "Overview", href: "/admin/help" },
      { label: "Documentation", href: "/admin/help/docs" },
      { label: "Support Tickets", href: "/admin/help/tickets" },
      { label: "FAQ", href: "/admin/help/faq" },
    ],
  },
};

const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  transactions: DollarSign,
  analytics: TrendingUp,
  rewards: Award,
  services: Wifi,
  security: Shield,
  system: Server,
  reports: FileText,
  communications: MessageSquare,
  settings: Settings,
  help: HelpCircle,
};

export default function AdminDynamicSectionPage() {
  const params = useParams();
  const slug = ((params as any)?.slug as string[] | undefined) ?? [];
  const section = slug[0] ?? "";
  const sub = slug[1] ?? "";

  const config = SECTIONS[section];
  const [q, setQ] = useState("");

  // Filter users based on sub-route and search
  const usersFiltered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return MOCK_USERS.filter((u) => {
      const matchesSearch = !s || u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
      if (sub === "active") return matchesSearch && u.status === "active";
      if (sub === "inactive") return matchesSearch && u.status === "inactive";
      if (sub === "roles") return matchesSearch;
      return matchesSearch;
    });
  }, [q, sub]);

  // Filter transactions based on sub-route and search
  const txFiltered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return MOCK_TX.filter((t) => {
      const matchesSearch = !s || t.id.toLowerCase().includes(s) || t.user.toLowerCase().includes(s);
      if (sub === "airtime") return matchesSearch && t.type === "airtime";
      if (sub === "data") return matchesSearch && t.type === "data";
      if (sub === "transfers") return matchesSearch && t.type === "transfer";
      if (sub === "failed") return matchesSearch && t.status === "failed";
      return matchesSearch;
    });
  }, [q, sub]);

  // Get page title based on sub-route
  const pageTitle = useMemo(() => {
    if (!config) return "Admin";
    if (!sub) return config.title;
    const match = config.links.find((l) => l?.href && typeof l.href === 'string' && l.href.endsWith(`/${sub}`));
    return match?.label ?? config.title;
  }, [config, sub]);

  if (!config) {
    return (
      <div className="p-3 sm:p-4 lg:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Page not found</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              This admin section hasn&apos;t been added yet.
            </p>
          </div>
          <Link href="/admin">
            <Button variant="secondary" size="sm">Go to Dashboard</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-6 text-sm text-zinc-600 dark:text-zinc-400">
            Requested route: <span className="font-semibold text-zinc-900 dark:text-zinc-50">/admin/{slug.join("/")}</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  const SectionIcon = SECTION_ICONS[section] ?? Activity;

  // Render Users section
  if (section === "users") {
    return (
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
            <h1 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">{pageTitle}</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{config.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add User</Button>
            <Button variant="secondary" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Total Users" value={String(MOCK_USERS.length)} hint="+12% this month" />
          <StatCard label="Active" value={String(MOCK_USERS.filter(u => u.status === "active").length)} />
          <StatCard label="Inactive" value={String(MOCK_USERS.filter(u => u.status === "inactive").length)} />
          <StatCard label="Verified" value={String(MOCK_USERS.filter(u => u.kyc === "verified").length)} />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users..."
              className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/users"><Button variant={!sub ? "secondary" : "ghost"} size="sm">All</Button></Link>
            <Link href="/admin/users/active"><Button variant={sub === "active" ? "secondary" : "ghost"} size="sm">Active</Button></Link>
            <Link href="/admin/users/inactive"><Button variant={sub === "inactive" ? "secondary" : "ghost"} size="sm">Inactive</Button></Link>
            <Link href="/admin/users/roles"><Button variant={sub === "roles" ? "secondary" : "ghost"} size="sm">Roles</Button></Link>
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <CardContent className="px-0 pb-0">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-300">
                  <tr>
                    <th className="text-left font-semibold px-6 py-3">User</th>
                    <th className="text-left font-semibold px-6 py-3">Status</th>
                    <th className="text-left font-semibold px-6 py-3">Role</th>
                    <th className="text-left font-semibold px-6 py-3">KYC</th>
                    <th className="text-left font-semibold px-6 py-3">Last Active</th>
                    <th className="text-right font-semibold px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersFiltered.map((u) => (
                    <tr key={u.id} className="border-t border-zinc-100 dark:border-zinc-800">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-50">{u.name}</div>
                        <div className="text-xs text-zinc-500">{u.email}</div>
                      </td>
                      <td className="px-6 py-4"><Badge variant={u.status === "active" ? "success" : "neutral"}>{u.status}</Badge></td>
                      <td className="px-6 py-4"><Badge variant={u.role === "admin" ? "warning" : "neutral"}>{u.role}</Badge></td>
                      <td className="px-6 py-4"><Badge variant={u.kyc === "verified" ? "success" : u.kyc === "pending" ? "warning" : "danger"}>{u.kyc}</Badge></td>
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{u.lastActive}</td>
                      <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm">View</Button></td>
                    </tr>
                  ))}
                  {usersFiltered.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-zinc-500">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
              {usersFiltered.map((u) => (
                <div key={u.id} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{u.name}</div>
                      <div className="text-xs text-zinc-500 truncate">{u.email}</div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="text-zinc-500">Status</div>
                    <div className="text-right"><Badge variant={u.status === "active" ? "success" : "neutral"}>{u.status}</Badge></div>
                    <div className="text-zinc-500">Role</div>
                    <div className="text-right"><Badge variant={u.role === "admin" ? "warning" : "neutral"}>{u.role}</Badge></div>
                    <div className="text-zinc-500">KYC</div>
                    <div className="text-right"><Badge variant={u.kyc === "verified" ? "success" : u.kyc === "pending" ? "warning" : "danger"}>{u.kyc}</Badge></div>
                  </div>
                </div>
              ))}
              {usersFiltered.length === 0 && <div className="px-4 py-10 text-center text-sm text-zinc-500">No users found.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render Transactions section
  if (section === "transactions") {
    return (
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
            <h1 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">{pageTitle}</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{config.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
            <Button variant="ghost" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard label="Total" value={String(MOCK_TX.length)} hint="Last 30 days" />
          <StatCard label="Success" value={String(MOCK_TX.filter(t => t.status === "success").length)} />
          <StatCard label="Pending" value={String(MOCK_TX.filter(t => t.status === "pending").length)} />
          <StatCard label="Failed" value={String(MOCK_TX.filter(t => t.status === "failed").length)} />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/transactions"><Button variant={!sub ? "secondary" : "ghost"} size="sm">All</Button></Link>
            <Link href="/admin/transactions/airtime"><Button variant={sub === "airtime" ? "secondary" : "ghost"} size="sm">Airtime</Button></Link>
            <Link href="/admin/transactions/data"><Button variant={sub === "data" ? "secondary" : "ghost"} size="sm">Data</Button></Link>
            <Link href="/admin/transactions/transfers"><Button variant={sub === "transfers" ? "secondary" : "ghost"} size="sm">Transfers</Button></Link>
            <Link href="/admin/transactions/failed"><Button variant={sub === "failed" ? "secondary" : "ghost"} size="sm">Failed</Button></Link>
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <CardContent className="px-0 pb-0">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-300">
                  <tr>
                    <th className="text-left font-semibold px-6 py-3">ID</th>
                    <th className="text-left font-semibold px-6 py-3">User</th>
                    <th className="text-left font-semibold px-6 py-3">Type</th>
                    <th className="text-left font-semibold px-6 py-3">Status</th>
                    <th className="text-left font-semibold px-6 py-3">Time</th>
                    <th className="text-right font-semibold px-6 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {txFiltered.map((t) => (
                    <tr key={t.id} className="border-t border-zinc-100 dark:border-zinc-800">
                      <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-50">{t.id}</td>
                      <td className="px-6 py-4 text-zinc-700 dark:text-zinc-200">{t.user}</td>
                      <td className="px-6 py-4"><Badge variant="neutral">{t.type}</Badge></td>
                      <td className="px-6 py-4"><Badge variant={t.status === "success" ? "success" : t.status === "pending" ? "warning" : "danger"}>{t.status}</Badge></td>
                      <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{t.time}</td>
                      <td className="px-6 py-4 text-right font-semibold text-zinc-900 dark:text-zinc-50">{t.amount}</td>
                    </tr>
                  ))}
                  {txFiltered.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-zinc-500">No transactions found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-zinc-100 dark:divide-zinc-800">
              {txFiltered.map((t) => (
                <div key={t.id} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-50">{t.user}</div>
                      <div className="text-xs text-zinc-500">{t.id} • {t.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-50">{t.amount}</div>
                      <Badge variant={t.status === "success" ? "success" : t.status === "pending" ? "warning" : "danger"}>{t.status}</Badge>
                    </div>
                  </div>
                  <div className="mt-2"><Badge variant="neutral">{t.type}</Badge></div>
                </div>
              ))}
              {txFiltered.length === 0 && <div className="px-4 py-10 text-center text-sm text-zinc-500">No transactions found.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default: Render section overview with navigation cards
  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <h1 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-50">{pageTitle}</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{config.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Total Items" value="128" hint="All time" />
        <StatCard label="Active" value="96" />
        <StatCard label="Pending" value="24" />
        <StatCard label="This Month" value="42" hint="+18% vs last month" />
      </div>

      {/* Search */}
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search in ${config.title.toLowerCase()}...`}
          className="w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      {/* Navigation Cards */}
      <Card className="overflow-hidden">
        <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <SectionIcon className="h-5 w-5" />
            {config.title} Pages
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {config.links
              .filter((l) => {
                const s = q.trim().toLowerCase();
                return !s || l.label.toLowerCase().includes(s);
              })
              .map((l) => (
                <Link key={l.href} href={l.href} className="group">
                  <div className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-50">{l.label}</div>
                      <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-brand-500" />
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">{l.href}</div>
                  </div>
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Placeholder */}
      <Card className="overflow-hidden">
        <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-900 dark:text-zinc-50 truncate">Activity item {i}</div>
                  <div className="text-xs text-zinc-500">{i * 2}h ago • Completed successfully</div>
                </div>
                <Badge variant="success">done</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
