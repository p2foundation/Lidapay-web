"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Info, ArrowLeft, ExternalLink } from "lucide-react";

export default function AboutPage() {
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
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">About</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">About LidaPay</div>
            <div className="mt-1 text-sm text-white/85">App version and information</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center">
                <Info className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
                  LidaPay Web
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Version 1.0.0
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Platform</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">Web</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Build</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">2025</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <p className="text-zinc-900 dark:text-zinc-50">
                LidaPay is a modern fintech platform that enables seamless digital payments, 
                airtime top-ups, and data bundle purchases across multiple countries.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://www.lidapay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="block text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Terms of Service
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

