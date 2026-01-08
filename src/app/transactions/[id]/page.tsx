"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, getProfile } from "@/lib/api";
import { getStoredUser } from "@/lib/storage";
import { toText, toDateTimeText, getTransactionAmount, getTransactionCurrency } from "@/lib/format";
import { 
  ArrowLeft, 
  ReceiptText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Copy, 
  Share2, 
  Phone, 
  Wifi, 
  CreditCard,
  MapPin,
  Globe,
  User,
  Mail,
  Calendar,
  Hash,
  DollarSign,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { format } from "date-fns";

// World map component with location visualization
function WorldMapVisualization({ 
  senderCountry, 
  recipientCountry 
}: { 
  senderCountry?: string; 
  recipientCountry?: string 
}) {
  // Default to Ghana if not provided
  const sender = senderCountry || "GH";
  const recipient = recipientCountry || "NG";
  
  // Country coordinates (simplified for visualization)
  const countryCoords: Record<string, { x: number; y: number; name: string }> = {
    "GH": { x: 50, y: 45, name: "Ghana" },
    "NG": { x: 52, y: 50, name: "Nigeria" },
    "KE": { x: 58, y: 55, name: "Kenya" },
    "ZA": { x: 55, y: 80, name: "South Africa" },
    "US": { x: 20, y: 35, name: "United States" },
    "GB": { x: 48, y: 25, name: "United Kingdom" },
  };

  const senderPos = countryCoords[sender] || countryCoords["GH"];
  const recipientPos = countryCoords[recipient] || countryCoords["NG"];

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl overflow-hidden border border-blue-200 dark:border-blue-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Connection line */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <motion.line
          x1={`${senderPos.x}%`}
          y1={`${senderPos.y}%`}
          x2={`${recipientPos.x}%`}
          y2={`${recipientPos.y}%`}
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Sender location */}
      <motion.div
        className="absolute"
        style={{ 
          left: `${senderPos.x}%`, 
          top: `${senderPos.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-75" />
          <div className="relative bg-gradient-to-br from-pink-500 to-rose-600 rounded-full p-3 shadow-lg border-2 border-white dark:border-zinc-900">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className="bg-white dark:bg-zinc-800 px-2 py-1 rounded text-xs font-semibold shadow-lg border border-zinc-200 dark:border-zinc-700">
              {senderPos.name}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recipient location */}
      <motion.div
        className="absolute"
        style={{ 
          left: `${recipientPos.x}%`, 
          top: `${recipientPos.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-75" />
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-3 shadow-lg border-2 border-white dark:border-zinc-900">
            <Phone className="h-4 w-4 text-white" />
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <div className="bg-white dark:bg-zinc-800 px-2 py-1 rounded text-xs font-semibold shadow-lg border border-zinc-200 dark:border-zinc-700">
              {recipientPos.name}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pink-400 rounded-full"
          style={{
            left: `${senderPos.x + (recipientPos.x - senderPos.x) * (i / 5)}%`,
            top: `${senderPos.y + (recipientPos.y - senderPos.y) * (i / 5)}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export default function TransactionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const transactionId = params.id as string;
  const [copied, setCopied] = useState(false);

  // Get current user ID for cache isolation
  const user = getStoredUser();
  const userId = user?.id || "anonymous";

  // Fetch transaction by ID
  const { data: transaction, isLoading } = useQuery({
    queryKey: ["transaction-detail", userId, transactionId],
    queryFn: async () => {
      if (!user?.id) return null;
      // Fetch multiple pages to find the transaction
      const allTxs: any[] = [];
      for (let page = 1; page <= 10; page++) {
        const result = await getTransactions({ 
          page, 
          limit: 20
        });
        const txs = result?.data?.transactions ?? result?.transactions ?? result?.metadata ?? [];
        allTxs.push(...txs);
        const found = allTxs.find((t: any) => 
          (t?._id ?? t?.id ?? "") === transactionId
        );
        if (found) return found;
        if (txs.length < 20) break; // No more pages
      }
      return null;
    },
    enabled: !!transactionId && !!user?.id
  });

  // Fetch user profile for sender info
  const { data: userProfile } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getProfile(),
    enabled: !!transaction
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTransaction = () => {
    if (!transaction) return;
    
    const txId = transaction._id ?? transaction.id ?? "N/A";
    const amount = getTransactionAmount(transaction);
    const currency = getTransactionCurrency(transaction);
    const txType = toText(transaction.transType) || toText(transaction.type) || "Transaction";
    const status = toText(transaction.status) || "Unknown";
    const date = toDateTimeText(transaction.createdAt);
    
    const shareText = `Transaction Details\n\nType: ${txType}\nAmount: ${currency} ${amount.toFixed(2)}\nStatus: ${status}\nDate: ${date}\nTransaction ID: ${txId}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Transaction Details',
        text: shareText
      }).catch(() => {
        copyToClipboard(shareText);
      });
    } else {
      copyToClipboard(shareText);
    }
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'success' || s === 'completed') return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30';
    if (s === 'pending') return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30';
  };

  const getStatusIcon = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'success' || s === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
    }
    if (s === 'pending') {
      return <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
    }
    return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
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
          <div className="max-w-4xl mx-auto">
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
  const amount = getTransactionAmount(transaction);
  const currency = getTransactionCurrency(transaction);
  const txType = toText(transaction.transType) || toText(transaction.type) || "Transaction";
  const txId = transaction._id ?? transaction.id ?? "N/A";
  
  // Extract sender info (user already declared above)
  const profileData = userProfile?.user || userProfile?.data?.user || userProfile || {};
  const senderName = profileData?.firstName && profileData?.lastName 
    ? `${profileData.firstName} ${profileData.lastName}` 
    : profileData?.username || user?.username || "You";
  const senderEmail = profileData?.email || user?.email || "";
  const senderPhone = profileData?.phoneNumber || user?.phoneNumber || "";
  const senderCountry = "GH"; // Default to Ghana

  // Extract recipient info
  const recipientName = typeof transaction.recipientName === 'string' 
    ? transaction.recipientName 
    : transaction.recipientName?.name || transaction.recipientName?.phone || "";
  const recipientPhone = typeof transaction.recipientPhone === 'string'
    ? transaction.recipientPhone
    : transaction.recipientPhone?.phone || transaction.recipientPhone?.number || "";
  const recipientEmail = transaction.recipientEmail || "";
  const recipientCountry = transaction.recipientCountryCode || transaction.countryCode || "NG";

  const isAirtime = txType.toLowerCase().includes('airtime');
  const isData = txType.toLowerCase().includes('data');
  const txDate = transaction.createdAt ? new Date(transaction.createdAt) : null;

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Transaction Details
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Complete transaction information and journey
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={shareTransaction}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </motion.div>

          {/* Status Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-xl p-4 ${
                      isAirtime ? 'bg-gradient-to-br from-pink-500 to-rose-600' :
                      isData ? 'bg-gradient-to-br from-indigo-500 to-purple-600' :
                      'bg-gradient-to-br from-zinc-500 to-zinc-600'
                    }`}>
                      {isAirtime ? (
                        <Phone className="h-8 w-8 text-white" />
                      ) : isData ? (
                        <Wifi className="h-8 w-8 text-white" />
                      ) : (
                        <ReceiptText className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {currency} {amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">
                        {txType}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${statusColor}`}>
                    {getStatusIcon(status)}
                    <span className="font-semibold capitalize">
                      {status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-brand-600" />
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    Transaction Journey
                  </h3>
                </div>
                <WorldMapVisualization 
                  senderCountry={senderCountry}
                  recipientCountry={recipientCountry}
                />
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500" />
                    <span className="text-zinc-600 dark:text-zinc-400">Sender: {senderCountry}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                    <span className="text-zinc-600 dark:text-zinc-400">Recipient: {recipientCountry}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sender & Recipient Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Sender Card */}
            <Card className="border-2 border-pink-200 dark:border-pink-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                    <User className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    Sender
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Name</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {senderName}
                    </div>
                  </div>
                  {senderPhone && (
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Phone</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {senderPhone}
                      </div>
                    </div>
                  )}
                  {senderEmail && (
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Email</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {senderEmail}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Location</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {senderCountry}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipient Card */}
            <Card className="border-2 border-indigo-200 dark:border-indigo-900/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                    <Phone className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    Recipient
                  </h3>
                </div>
                <div className="space-y-3">
                  {recipientName && (
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Name</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {recipientName}
                      </div>
                    </div>
                  )}
                  {recipientPhone && (
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Phone</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {recipientPhone}
                      </div>
                    </div>
                  )}
                  {recipientEmail && (
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Email</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {recipientEmail}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Location</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {recipientCountry}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transaction Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-brand-600" />
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    Transaction Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                    <Hash className="h-5 w-5 text-zinc-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Transaction ID</div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                          {txId}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(txId)}
                          className="h-6 w-6 p-0 flex-shrink-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                    <DollarSign className="h-5 w-5 text-zinc-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Amount</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {currency} {amount.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                    <Calendar className="h-5 w-5 text-zinc-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Date & Time</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {txDate ? format(txDate, "MMM dd, yyyy 'at' HH:mm") : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                    <ReceiptText className="h-5 w-5 text-zinc-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Type</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 capitalize">
                        {txType}
                      </div>
                    </div>
                  </div>
                </div>

                {transaction.description && (
                  <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Description</div>
                    <div className="text-sm text-zinc-900 dark:text-zinc-50">
                      {typeof transaction.description === 'string' 
                        ? transaction.description 
                        : toText(transaction.description)}
                    </div>
                  </div>
                )}

                {transaction.note && (
                  <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Note</div>
                    <div className="text-sm text-zinc-900 dark:text-zinc-50">
                      {typeof transaction.note === 'string' 
                        ? transaction.note 
                        : toText(transaction.note)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
