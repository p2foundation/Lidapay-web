"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, ArrowLeft, CheckCircle } from "lucide-react";

export default function SecurityPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/settings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 px-6 py-6 text-white shadow-glow flex-1">
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">Security</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">Security Settings</div>
            <div className="mt-1 text-sm text-white/85">Manage your account security</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Security Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      Two-Factor Authentication
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Add an extra layer of security
                    </div>
                  </div>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Coming soon</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      Active Sessions
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      View and manage active sessions
                    </div>
                  </div>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Coming soon</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

