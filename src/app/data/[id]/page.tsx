"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/lib/api";
import { toText, toDateTimeText, getTransactionAmount, getTransactionCurrency } from "@/lib/format";
import { ArrowLeft, Wifi, CheckCircle, XCircle, Clock, Copy, Share2 } from "lucide-react";
import { useState } from "react";

export default function DataTransactionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const transactionId = params.id as string;
  const [copied, setCopied] = useState(false);

  // Fetch all transactions to find the one we need
  const { data, isLoading } = useQuery({
    queryKey: ["data-transaction-detail", transactionId],
    queryFn: async () => {
      const allTxs: any[] = [];
      for (let page = 1; page <= 5; page++) {
        const result = await getTransactions({ 
          page, 
          limit: 20,
          transType: "DATA"
        });
        const txs = result?.data?.transactions ?? result?.transactions ?? [];
        allTxs.push(...txs);
        if (txs.length < 20) break;
      }
      return allTxs.find((t: any) => 
        (t?._id ?? t?.id ?? "") === transactionId
      );
    },
    enabled: !!transactionId
  });

  const transaction = data;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTransaction = () => {
    if (!transaction) return;
    const text = `Data Purchase\nStatus: ${toText(transaction.status)}\nAmount: ${getTransactionCurrency(transaction)} ${getTransactionAmount(transaction).toFixed(2)}\nData: ${transaction.dataAmount ? `${Number(transaction.dataAmount).toFixed(2)} ${transaction.dataUnit || "GB"}` : "N/A"}\nPhone: ${toText(transaction.recipientPhone)}\nDate: ${toDateTimeText(transaction.createdAt)}\nTransaction ID: ${toText(transaction._id) || toText(transaction.id)}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      copyToClipboard(text);
    }
  };

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase();
    if (s === "COMPLETED" || s === "SUCCESS") {
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    }
    if (s === "PENDING" || s === "PROCESSING") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    }
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  };

  const getStatusIcon = (status: string) => {
    const s = status?.toUpperCase();
    if (s === "COMPLETED" || s === "SUCCESS") {
      return <CheckCircle className="h-5 w-5" />;
    }
    if (s === "PENDING" || s === "PROCESSING") {
      return <Clock className="h-5 w-5" />;
    }
    return <XCircle className="h-5 w-5" />;
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-600 border-r-transparent"></div>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">Loading transaction details...</p>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!transaction) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Card>
              <CardContent className="py-12 text-center">
                <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  Transaction Not Found
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  The transaction you're looking for doesn't exist or has been removed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    );
  }

  const status = toText(transaction.status) || "UNKNOWN";
  const statusColor = getStatusColor(status);

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                Transaction Details
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={shareTransaction}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      Data Purchase
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {toText(transaction.transType) || "DATA"}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${statusColor}`}>
                  {getStatusIcon(status)}
                  <span className="text-sm font-semibold">{status}</span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center py-6 border-y border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Amount</p>
                <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  {getTransactionCurrency(transaction)} {getTransactionAmount(transaction).toFixed(2)}
                </p>
                {transaction.dataAmount && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                    {Number(transaction.dataAmount).toFixed(2)} {transaction.dataUnit || "GB"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Transaction Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start py-2 border-b border-zinc-100 dark:border-zinc-900">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Recipient Phone</span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 text-right">
                    {toText(transaction.recipientPhone) || "N/A"}
                  </span>
                </div>
                {transaction.recipientName && (
                  <div className="flex justify-between items-start py-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Recipient Name</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 text-right">
                      {toText(transaction.recipientName)}
                    </span>
                  </div>
                )}
                {transaction.dataAmount && (
                  <div className="flex justify-between items-start py-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Data Amount</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 text-right">
                      {Number(transaction.dataAmount).toFixed(2)} {transaction.dataUnit || "GB"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-start py-2 border-b border-zinc-100 dark:border-zinc-900">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Date & Time</span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 text-right">
                    {toDateTimeText(transaction.createdAt)}
                  </span>
                </div>
                {transaction.note && (
                  <div className="flex justify-between items-start py-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Note</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 text-right max-w-xs">
                      {toText(transaction.note)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-start py-2">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Transaction ID</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-zinc-900 dark:text-zinc-50">
                      {toText(transaction._id) || toText(transaction.id) || "N/A"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(toText(transaction._id) || toText(transaction.id) || "")}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className={`h-3 w-3 ${copied ? 'text-emerald-600' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          {transaction.paymentMethod && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                  Payment Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start py-2 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Payment Method</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {toText(transaction.paymentMethod)}
                    </span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Currency</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {getTransactionCurrency(transaction)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}

