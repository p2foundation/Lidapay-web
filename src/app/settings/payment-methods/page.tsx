"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, ArrowLeft, Plus } from "lucide-react";

export default function PaymentMethodsPage() {
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
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">Payment</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">Payment Methods</div>
            <div className="mt-1 text-sm text-white/85">Manage your payment methods</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Payment Methods</CardTitle>
              <Button size="sm" disabled>
                <Plus className="h-4 w-4 mr-2" />
                Add Method
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-zinc-400" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No payment methods added yet
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                Payment method management coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

