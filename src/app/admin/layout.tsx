"use client";

import { ReactNode, useState, useEffect } from "react";
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
  Mail,
  Building,
  FileText,
  HelpCircle,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Lock,
  Key,
  Database,
  Server,
  Wifi,
  ShoppingCart,
  Gift,
  Star,
  MessageSquare,
  Archive,
  Trash2,
  Edit,
  Plus,
  ChevronDown,
  UserCheck,
  UserX,
  Receipt,
  CreditCard as CardIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStoredUser } from "@/lib/storage";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      setIsDesktop(mq.matches);
      if (mq.matches) setMobileMenuOpen(false);
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      badge: null
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      href: "/admin/users",
      badge: "2.5k",
      children: [
        { id: "all-users", label: "All Users", href: "/admin/users", icon: Users },
        { id: "active-users", label: "Active Users", href: "/admin/users/active", icon: UserCheck },
        { id: "inactive-users", label: "Inactive Users", href: "/admin/users/inactive", icon: UserX },
        { id: "user-roles", label: "User Roles", href: "/admin/users/roles", icon: Shield }
      ]
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: CreditCard,
      href: "/admin/transactions",
      badge: "124",
      children: [
        { id: "all-transactions", label: "All Transactions", href: "/admin/transactions", icon: CreditCard },
        { id: "airtime", label: "Airtime", href: "/admin/transactions/airtime", icon: Phone },
        { id: "data", label: "Data Bundles", href: "/admin/transactions/data", icon: Wifi },
        { id: "transfers", label: "Transfers", href: "/admin/transactions/transfers", icon: ArrowUpRight },
        { id: "failed", label: "Failed Transactions", href: "/admin/transactions/failed", icon: AlertTriangle }
      ]
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
      href: "/admin/analytics",
      children: [
        { id: "overview", label: "Overview", href: "/admin/analytics", icon: BarChart3 },
        { id: "revenue", label: "Revenue", href: "/admin/analytics/revenue", icon: DollarSign },
        { id: "user-analytics", label: "User Analytics", href: "/admin/analytics/users", icon: Users },
        { id: "transaction-analytics", label: "Transaction Analytics", href: "/admin/analytics/transactions", icon: CreditCard },
        { id: "geographic", label: "Geographic", href: "/admin/analytics/geographic", icon: Globe }
      ]
    },
    {
      id: "rewards",
      label: "Rewards & Points",
      icon: Award,
      href: "/admin/rewards",
      children: [
        { id: "points-system", label: "Points System", href: "/admin/rewards/points", icon: Star },
        { id: "rewards-program", label: "Rewards Program", href: "/admin/rewards/program", icon: Gift },
        { id: "leaderboard", label: "Leaderboard", href: "/admin/rewards/leaderboard", icon: Target },
        { id: "redemptions", label: "Redemptions", href: "/admin/rewards/redemptions", icon: ShoppingCart }
      ]
    },
    {
      id: "services",
      label: "Services",
      icon: Smartphone,
      href: "/admin/services",
      children: [
        { id: "airtime-service", label: "Airtime Service", href: "/admin/services/airtime", icon: Phone },
        { id: "data-service", label: "Data Service", href: "/admin/services/data", icon: Wifi },
        { id: "bill-payment", label: "Bill Payment", href: "/admin/services/bills", icon: Receipt },
        { id: "international-transfer", label: "International Transfer", href: "/admin/services/transfer", icon: Globe }
      ]
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      href: "/admin/security",
      children: [
        { id: "audit-logs", label: "Audit Logs", href: "/admin/security/audit", icon: FileText },
        { id: "access-control", label: "Access Control", href: "/admin/security/access", icon: Lock },
        { id: "api-keys", label: "API Keys", href: "/admin/security/api-keys", icon: Key },
        { id: "security-alerts", label: "Security Alerts", href: "/admin/security/alerts", icon: AlertTriangle }
      ]
    },
    {
      id: "system",
      label: "System",
      icon: Server,
      href: "/admin/system",
      children: [
        { id: "database", label: "Database", href: "/admin/system/database", icon: Database },
        { id: "server-status", label: "Server Status", href: "/admin/system/status", icon: Activity },
        { id: "backups", label: "Backups", href: "/admin/system/backups", icon: Archive },
        { id: "logs", label: "System Logs", href: "/admin/system/logs", icon: FileText }
      ]
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      href: "/admin/reports",
      children: [
        { id: "financial-reports", label: "Financial Reports", href: "/admin/reports/financial", icon: DollarSign },
        { id: "user-reports", label: "User Reports", href: "/admin/reports/users", icon: Users },
        { id: "transaction-reports", label: "Transaction Reports", href: "/admin/reports/transactions", icon: CreditCard },
        { id: "custom-reports", label: "Custom Reports", href: "/admin/reports/custom", icon: Edit }
      ]
    },
    {
      id: "communications",
      label: "Communications",
      icon: MessageSquare,
      href: "/admin/communications",
      children: [
        { id: "notifications", label: "Notifications", href: "/admin/communications/notifications", icon: Bell },
        { id: "sms-templates", label: "SMS Templates", href: "/admin/communications/sms", icon: MessageSquare },
        { id: "email-templates", label: "Email Templates", href: "/admin/communications/email", icon: Mail },
        { id: "push-notifications", label: "Push Notifications", href: "/admin/communications/push", icon: Smartphone }
      ]
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      children: [
        { id: "general", label: "General", href: "/admin/settings/general", icon: Settings },
        { id: "payment-gateways", label: "Payment Gateways", href: "/admin/settings/payments", icon: CardIcon },
        { id: "sms-providers", label: "SMS Providers", href: "/admin/settings/sms", icon: MessageSquare },
        { id: "api-config", label: "API Configuration", href: "/admin/settings/api", icon: Key }
      ]
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      href: "/admin/help",
      children: [
        { id: "documentation", label: "Documentation", href: "/admin/help/docs", icon: FileText },
        { id: "support-tickets", label: "Support Tickets", href: "/admin/help/tickets", icon: MessageSquare },
        { id: "faq", label: "FAQ", href: "/admin/help/faq", icon: HelpCircle }
      ]
    }
  ];

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return "Not provided";
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href || pathname === "/admin/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          width: isDesktop ? (sidebarOpen ? 260 : 64) : 260,
          x: isDesktop ? 0 : (mobileMenuOpen ? 0 : -260)
        }}
        className={`fixed lg:relative lg:translate-x-0 z-50 h-full bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300 overflow-hidden`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 border-b border-zinc-200 dark:border-zinc-700 flex-shrink-0">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1"
              >
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900 dark:text-zinc-50 truncate">LidaPay Admin</span>
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (isDesktop) {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              {isDesktop ? (
                sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* User Profile in Sidebar */}
          {sidebarOpen && user && (
            <div className="px-3 py-3 border-b border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName?.[0] || user?.email?.[0] || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-zinc-500 truncate">{user?.role || 'Administrator'}</div>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <Phone className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{formatPhoneNumber(user?.phoneNumber || '0244588584')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{user?.country || 'Ghana'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <Mail className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{user?.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2 sm:p-3">
            <div className="space-y-3 sm:space-y-4">
              {menuItems.map((section) => (
                <div key={section.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-8 sm:h-9 text-xs sm:text-sm ${!sidebarOpen && "px-1"}`}
                    onClick={() => {
                      // Navigate to main section
                      window.location.href = section.href;
                    }}
                  >
                    <section.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="ml-2 sm:ml-3 flex-1 text-left truncate">{section.label}</span>
                        {section.badge && (
                          <span className="ml-2 rounded-full bg-zinc-100 dark:bg-zinc-700 px-1.5 sm:px-2 py-0.5 text-xs flex-shrink-0">
                            {section.badge}
                          </span>
                        )}
                        {section.children && (
                          <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                        )}
                      </>
                    )}
                  </Button>

                  {/* Submenu */}
                  {sidebarOpen && section.children && isActive(section.href) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-1 ml-3 sm:ml-4 space-y-1"
                    >
                      {section.children.map((item) => (
                        <Link key={item.id} href={item.href}>
                          <Button
                            variant={isActive(item.href) ? "secondary" : "ghost"}
                            className="w-full justify-start h-7 sm:h-8 text-xs sm:text-sm px-2"
                          >
                            <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-2 flex-shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </Button>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Logout */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 p-2 sm:p-3 flex-shrink-0">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-8 sm:h-9 text-xs sm:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={() => {
                // Handle logout
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
            >
              <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              {sidebarOpen && <span className="ml-2 sm:ml-3">Logout</span>}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-9 w-9 p-0 flex-shrink-0"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="relative max-w-md flex-1 min-w-0">
                <Search className="absolute left-2 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-zinc-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search users, transactions, settings..."
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm border border-zinc-200 rounded-lg bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
              <Button variant="ghost" size="sm" className="relative h-9 w-9 sm:h-10 sm:w-10 p-0">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 sm:h-10 sm:w-10 p-0">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {user?.firstName?.[0] || user?.email?.[0] || 'A'}
                </div>
                <div className="hidden md:block min-w-0">
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-zinc-500 truncate">{user?.email}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
