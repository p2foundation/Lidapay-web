"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle, ArrowLeft, Mail, MessageCircle, Phone, MapPin } from "lucide-react";

export default function HelpPage() {
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
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">Support</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">Help Center</div>
            <div className="mt-1 text-sm text-white/85">Get help and support</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="mailto:info@advansistechnologies.com"
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Email Support
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    info@advansistechnologies.com
                  </div>
                </div>
              </a>
              <a
                href="tel:+233244588584"
                className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Phone Support
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    0244588584
                  </div>
                </div>
              </a>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Office Location
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    6 Tanbu Lane, East Legon, Accra
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    How do I buy airtime?
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Go to Buy Airtime, select country, enter phone number, choose amount, and confirm.
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    How do I add funds to my wallet?
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Payment methods and wallet top-up coming soon.
                  </div>
                </div>
                <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    How do I change my password?
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Go to Settings → Change Password and follow the steps.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Google Maps Section */}
        <Card>
          <CardHeader>
            <CardTitle>Find Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <MapPin className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    Office Address
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    6 Tanbu Lane, East Legon, Accra, Ghana
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <iframe
                  src="https://www.google.com/maps?q=6+Tanbu+Lane,+East+Legon,+Accra,+Ghana&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Office Location - 6 Tanbu Lane, East Legon, Accra"
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=6+Tanbu+Lane,+East+Legon,+Accra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

