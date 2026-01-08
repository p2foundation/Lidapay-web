"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const processCallback = async () => {
      const statusParam = searchParams.get("status");
      const token = searchParams.get("token");
      const orderId = searchParams.get("order-id");

      if (!statusParam || !orderId) {
        setStatus("failed");
        setMessage("Invalid payment callback parameters");
        return;
      }

      if (statusParam === "success") {
        setStatus("success");
        setMessage("Payment completed successfully!");
        
        // Notify parent window if opened from popup
        if (window.opener) {
          window.opener.postMessage({
            type: 'payment-callback',
            status: 'COMPLETE',
            orderId,
            token
          }, '*');
          
          // Close window after a short delay
          setTimeout(() => {
            window.close();
          }, 2000);
        } else {
          // If not in popup, redirect to dashboard
          setTimeout(() => {
            router.push("/app");
          }, 3000);
        }
      } else {
        setStatus("failed");
        setMessage("Payment was cancelled or failed");
        
        // Notify parent window if opened from popup
        if (window.opener) {
          window.opener.postMessage({
            type: 'payment-callback',
            status: 'FAILED',
            orderId,
            token
          }, '*');
          
          // Close window after a short delay
          setTimeout(() => {
            window.close();
          }, 2000);
        }
      }
    };

    processCallback();
  }, [searchParams, router]);

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                {status === "loading" && (
                  <>
                    <Loader2 className="h-12 w-12 text-brand-600 animate-spin mb-4" />
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Processing Payment
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {message}
                    </p>
                  </>
                )}

                {status === "success" && (
                  <>
                    <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Payment Successful!
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      {message}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      This window will close automatically...
                    </p>
                  </>
                )}

                {status === "failed" && (
                  <>
                    <XCircle className="h-12 w-12 text-red-600 mb-4" />
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Payment Failed
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                      {message}
                    </p>
                    <Button onClick={() => window.close()}>
                      Close Window
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={
      <AppShell>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Loader2 className="h-12 w-12 text-brand-600 animate-spin mb-4" />
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                    Loading...
                  </h2>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    }>
      <PaymentCallbackContent />
    </Suspense>
  );
}
