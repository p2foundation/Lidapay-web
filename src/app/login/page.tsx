"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login, extractErrorMessage } from "@/lib/api";
import { getAccessToken } from "@/lib/storage";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-brand-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="absolute left-4 top-6 z-10">
        <Button
          variant="ghost"
          size="sm"
          disabled={busy}
          onClick={() => router.push("/")}
          className="rounded-full gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <div className="mx-auto flex max-w-lg flex-col gap-6 px-4 py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-glow" />
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Sign in to Lidapay Web</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setBusy(true);
                
                // Validate inputs
                if (!username.trim()) {
                  toast.error("Username is required");
                  setBusy(false);
                  return;
                }
                
                if (!password) {
                  toast.error("Password is required");
                  setBusy(false);
                  return;
                }

                const loginToast = toast.loading("Signing in...", {
                  description: "Please wait while we authenticate you"
                });

                try {
                  await login(username.trim(), password);
                  
                  if (!getAccessToken()) {
                    toast.error("Login failed", {
                      description: "Authentication token was not received. Please try again."
                    });
                    setBusy(false);
                    return;
                  }

                  toast.success("Login successful!", {
                    description: "Redirecting to dashboard...",
                    id: loginToast
                  });

                  // Small delay to show success message before redirect
                  setTimeout(() => {
                    router.push("/app");
                  }, 500);
                } catch (e: any) {
                  const errorMessage = extractErrorMessage(e, "Login failed. Please check your credentials.");
                  toast.error("Login failed", {
                    description: errorMessage,
                    id: loginToast
                  });
                  setBusy(false);
                }
              }}
            >
              <label className="block">
                <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Username
                </div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                  placeholder="e.g. john_doe"
                  autoComplete="username"
                  required
                  disabled={busy}
                />
              </label>

              <label className="block">
                <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Password
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  disabled={busy}
                />
              </label>

              <Button className="w-full" type="submit" loading={busy}>
                Sign in
              </Button>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Tip: tokens are stored locally so you can reload and stay signed in.
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            disabled={busy}
            className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 disabled:opacity-50"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}


