"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Lock, 
  CreditCard, 
  Wallet, 
  Globe, 
  Moon, 
  Sun, 
  HelpCircle, 
  Info, 
  LogOut,
  Settings as SettingsIcon,
  Shield,
  Bell,
  ChevronRight,
  DollarSign
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { clearAuth } from "@/lib/storage";
import { useState, useEffect } from "react";
import { getProfile } from "@/lib/api";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getProfile()
      .then((data: any) => {
        const userData = data?.user ?? data?.data?.user ?? data;
        setUser(userData);
      })
      .catch(() => {
        // Handle error silently
      });
  }, []);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          title: "Profile",
          description: "View and edit your profile information",
          href: "/settings/profile",
          color: "from-blue-500 to-blue-600"
        },
        {
          icon: Lock,
          title: "Change Password",
          description: "Update your account password",
          href: "/settings/password",
          color: "from-purple-500 to-purple-600"
        },
        {
          icon: Shield,
          title: "Security",
          description: "Manage security settings",
          href: "/settings/security",
          color: "from-emerald-500 to-emerald-600",
          disabled: true
        }
      ]
    },
    {
      title: "Payment & Wallet",
      items: [
        {
          icon: CreditCard,
          title: "Payment Methods",
          description: "Manage your payment methods",
          href: "/settings/payment-methods",
          color: "from-indigo-500 to-indigo-600",
          disabled: true
        },
        {
          icon: Wallet,
          title: "Wallet",
          description: "View wallet balance and history",
          href: "/settings/wallet",
          color: "from-amber-500 to-amber-600"
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Globe,
          title: "Language",
          description: "Change app language",
          href: "/settings/language",
          color: "from-cyan-500 to-cyan-600"
        },
        {
          icon: DollarSign,
          title: "Currency",
          description: "Change display currency",
          href: "/settings/currency",
          color: "from-green-500 to-green-600"
        },
        {
          icon: Moon,
          title: "Theme",
          description: "Light or dark mode",
          href: null,
          color: "from-zinc-500 to-zinc-600",
          customAction: true
        },
        {
          icon: Bell,
          title: "Notifications",
          description: "Manage notification preferences",
          href: "/settings/notifications",
          color: "from-pink-500 to-pink-600",
          disabled: true
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          title: "Help Center",
          description: "Get help and support",
          href: "/settings/help",
          color: "from-orange-500 to-orange-600"
        },
        {
          icon: Info,
          title: "About",
          description: "App version and information",
          href: "/settings/about",
          color: "from-slate-500 to-slate-600"
        }
      ]
    }
  ];

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 px-6 py-6 text-white shadow-glow">
          <div className="text-xs font-bold uppercase tracking-wider text-white/80">Settings</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight">Account Settings</div>
          <div className="mt-1 text-sm text-white/85">
            Manage your account, preferences, and security
          </div>
        </div>

        {/* User Info Card */}
        {user && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center text-white text-2xl font-extrabold">
                  {user.firstName?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user.firstName || user.username || user.email || "User"}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {user.email || user.phoneNumber || "No contact info"}
                  </div>
                  {user.roles && (
                    <div className="mt-2">
                      <span className="inline-block px-2 py-0.5 rounded-md text-xs font-semibold bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                        {Array.isArray(user.roles) ? user.roles[0] : user.roles}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIdx) => (
          <Card key={sectionIdx}>
            <CardHeader>
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <div key={itemIdx}>
                    {item.customAction ? (
                      <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                              {item.title}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <ThemeToggle />
                      </div>
                    ) : item.disabled ? (
                      <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 opacity-60">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                              {item.title}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">Coming soon</span>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                              {item.title}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-brand-600 dark:group-hover:text-brand-400" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}

        {/* Logout Button */}
        <Card>
          <CardContent className="p-6">
            <Button
              variant="secondary"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

