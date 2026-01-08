"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bell, ArrowLeft } from "lucide-react";

export default function NotificationsPage() {
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
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">Preferences</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">Notifications</div>
            <div className="mt-1 text-sm text-white/85">Manage your notification preferences</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Bell className="h-6 w-6 text-zinc-400" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Notification settings coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

