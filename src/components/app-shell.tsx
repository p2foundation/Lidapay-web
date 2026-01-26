"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { clearAuth, getStoredUser } from "@/lib/storage";
import { Gift, Home, LogOut, Phone, ReceiptText, Settings, Wifi, Shield, BarChart3, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAccessToken, setStoredUser, isRecentLogin } from "@/lib/storage";
import { getProfile } from "@/lib/api";
import { usePreferences } from "@/contexts/preferences-context";
import { Footer } from "@/components/footer";

const navKeys = [
  { href: "/app", key: "nav.dashboard", icon: Home },
  { href: "/airtime", key: "nav.airtime", icon: Phone },
  { href: "/data", key: "nav.data", icon: Wifi },
  { href: "/rewards", key: "nav.rewards", icon: Gift },
  { href: "/transactions", key: "nav.transactions", icon: ReceiptText },
  { href: "/chat", key: "nav.chat", icon: Sparkles },
  { href: "/settings", key: "nav.settings", icon: Settings }
];

const adminNav = [
  { href: "/admin", label: "Admin Dashboard", icon: BarChart3 },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/users", label: "User Management", icon: Shield }
];

function NavLink({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (href === pathname) {
      e.preventDefault();
      return;
    }
    setLoading(true);
    router.push(href);
    // Reset loading after navigation completes
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-all",
        active
          ? "bg-gradient-to-r from-brand-500/10 to-indigoBrand-600/10 text-zinc-900 dark:text-zinc-50"
          : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900",
        loading && "opacity-70"
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-brand-600" />
      ) : (
        <Icon className={cn("h-4 w-4", active ? "text-brand-600" : "text-zinc-500")} />
      )}
      {label}
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = usePreferences();
  const [userLabel, setUserLabel] = useState<string>("Account");
  const [userRole, setUserRole] = useState<string>("");
  
  const nav = navKeys.map(item => ({ ...item, label: t(item.key) }));

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const u = getStoredUser();
    if (u) {
      setUserLabel(u.firstName || u.username || u.email || "Account");
      setUserRole(u.role || "");
      return;
    }

    // Token exists but user not stored (e.g. hard refresh). Fetch profile.
    // Add a delay to allow login flow to complete and token to be set
    setTimeout(() => {
      // Check if we just logged in - if so, wait longer before fetching profile
      const justLoggedIn = isRecentLogin(20000); // 20 seconds grace period
      const delay = justLoggedIn ? 3000 : 1000; // Longer delay if just logged in
      
      setTimeout(() => {
        // Double-check we're not in grace period before making the call
        const stillRecentLogin = isRecentLogin(20000);
        if (stillRecentLogin) {
          // If still in grace period, skip profile fetch to avoid 401 errors
          // User data will be fetched later when grace period expires
          return;
        }
        
        // Only fetch profile if we have a token
        const hasToken = getAccessToken();
        if (!hasToken) {
          // No token, skip profile fetch to avoid 401 errors on public pages
          return;
        }
        
        getProfile()
          .then((raw: any) => {
            const user = raw?.user ?? raw?.data?.user ?? raw;
            const id = user?._id ?? user?.id;
            if (!id) return;
            setStoredUser({
              id,
              username: user?.username ?? null,
              email: user?.email ?? null,
              firstName: user?.firstName ?? null,
              lastName: user?.lastName ?? null,
              phoneNumber: user?.phoneNumber ?? null,
              role: user?.role ?? null
            });
            setUserLabel(user?.firstName || user?.username || user?.email || "Account");
            setUserRole(user?.role || "");
          })
          .catch((error: any) => {
            // Only clear auth and redirect if it's a 401 and we're not in the grace period
            if (error?.status === 401) {
              const stillHasToken = getAccessToken();
              const finalRecentLogin = isRecentLogin(20000);
              
              // Don't clear auth if we just logged in (grace period)
              if (stillHasToken && !finalRecentLogin) {
                // Wait a bit more to ensure it's not a race condition
                setTimeout(() => {
                  const finalTokenCheck = getAccessToken();
                  const finalCheckRecentLogin = isRecentLogin(20000);
                  if (finalTokenCheck && !finalCheckRecentLogin) {
                    clearAuth();
                    router.push("/login");
                  }
                }, 2000);
              }
            }
          });
      }, delay);
    }, 500); // Initial delay
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-brand-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <header className="sticky top-0 z-20 border-b border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-900 dark:bg-zinc-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/app" className="group flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-glow" />
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Lidapay</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Web</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden text-sm font-semibold text-zinc-700 dark:text-zinc-200 sm:block">{userLabel}</div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearAuth();
                router.push("/login");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t("nav.logout")}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 mx-auto grid max-w-6xl w-full grid-cols-1 gap-4 px-4 py-6 pb-24 md:grid-cols-[240px_1fr]">
        <aside className="md:sticky md:top-[72px] md:h-[calc(100vh-72px-60px)]">
          <nav className="rounded-2xl bg-white shadow-soft ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-900">
            <div className="px-4 py-4">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {t("nav.dashboard")}
              </div>
            </div>
            <div className="px-2 pb-2">
              {nav.map((n) => {
                const active = pathname === n.href;
                return (
                  <NavLink
                    key={n.href}
                    href={n.href}
                    icon={n.icon}
                    label={n.label}
                    active={active}
                  />
                );
              })}
            </div>
            
            {/* Admin Navigation - Show only for admin roles */}
            {(userRole === "ADMIN" || userRole === "DEVELOPER" || userRole === "ANALYST") && (
              <>
                <div className="px-4 py-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Admin
                  </div>
                </div>
                <div className="px-2 pb-2">
                  {adminNav.map((n) => {
                    const active = pathname === n.href;
                    return (
                      <NavLink
                        key={n.href}
                        href={n.href}
                        icon={n.icon}
                        label={n.label}
                        active={active}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </nav>
        </aside>

        <main className="min-w-0 flex flex-col">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}


