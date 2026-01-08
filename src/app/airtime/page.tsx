"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CountryFlag } from "@/components/country-flag";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, getCountries, autoDetectOperator, validatePhoneForCountry, getProfile, initiateAdvansiPayPayment, checkPaymentStatus, rechargeAirtime, topupGhanaAirtime, extractErrorMessage, type AirtimeProvider, type OperatorInfo } from "@/lib/api";
import { getStoredUser } from "@/lib/storage";
import { toDateTimeText, toText, getTransactionAmount, getTransactionCurrency } from "@/lib/format";
import { Phone, ChevronLeft, ChevronRight, RefreshCw, CheckCircle, XCircle, Loader2, Globe, DollarSign, Check, Search, ChevronsLeft, ChevronsRight, Wifi, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const STEPS = [
  { id: 0, title: "Country", icon: Globe },
  { id: 1, title: "Phone", icon: Phone },
  { id: 2, title: "Network", icon: Wifi },
  { id: 3, title: "Amount", icon: DollarSign },
  { id: 4, title: "Confirm", icon: CheckCircle }
];

export default function AirtimePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [provider, setProvider] = useState<AirtimeProvider>("reloadly");
  const [countryCode, setCountryCode] = useState("GH");
  const [countrySearch, setCountrySearch] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [amount, setAmount] = useState<number>(1);
  const [operator, setOperator] = useState<OperatorInfo | null>(null);
  const [detectingOperator, setDetectingOperator] = useState(false);
  const [userPhone, setUserPhone] = useState<string>("");
  const [loadingNext, setLoadingNext] = useState(false);

  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [txPage, setTxPage] = useState(1);
  const txLimit = 5;

  // Track if component is mounted to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load user's phone number on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser?.phoneNumber) {
      setUserPhone(storedUser.phoneNumber);
    } else {
      // Fetch from API if not in storage
      getProfile().then((profile) => {
        if (profile?.phoneNumber) {
          setUserPhone(profile.phoneNumber);
        }
      }).catch(console.error);
    }
  }, []);

  // Fetch countries from API
  const { data: countries = [], isLoading: countriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
    staleTime: 1000 * 60 * 60
  });

  // Get current user ID for cache isolation
  const currentUser = getStoredUser();
  const userId = currentUser?.id || "anonymous";

  // Fetch airtime transactions
  const txQ = useQuery({
    queryKey: ["airtime-transactions", userId, txPage],
    queryFn: () => getTransactions({ 
      page: txPage, 
      limit: txLimit,
      transType: "GLOBAL AIRTIME"
    }),
    refetchOnWindowFocus: false,
    enabled: isMounted && !!currentUser?.id // Only fetch if mounted and user is logged in
  });

  const txs = txQ.data?.data?.transactions ?? txQ.data?.transactions ?? [];
  const totalTxs = txQ.data?.data?.total ?? txQ.data?.total ?? 0;
  const totalPages = Math.ceil(totalTxs / txLimit);

  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];
  // Get calling code and ensure it has + prefix
  let callingCode = selectedCountry?.callingCodes?.[0] || "+233";
  if (callingCode && !callingCode.startsWith('+')) {
    callingCode = `+${callingCode}`;
  }

  // Filter countries based on search
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // For Reloadly API: amounts are in SENDER currency (USD), not destination currency
  // Get min/max from operator in SENDER currency (what user pays)
  const minAmount = operator?.minAmount || 1;
  const maxAmount = operator?.maxAmount || 1000000;
  
  // Get local min/max for display purposes (what recipient receives)
  const localMinAmount = operator?.localMinAmount;
  const localMaxAmount = operator?.localMaxAmount;
  const fxRate = operator?.fx?.rate || 1;

  // Get quick amounts in SENDER currency (suggestedAmounts are in sender currency)
  const allQuickAmounts = operator?.suggestedAmounts?.length 
    ? operator.suggestedAmounts
    : operator?.fixedAmounts?.length
    ? operator.fixedAmounts
    : [1, 5, 10, 15, 20, 25, 30, 50]; // Defaults in sender currency
  
  // Filter quick amounts to only show those within valid range (in sender currency)
  const quickAmounts = allQuickAmounts
    .filter((amt: number) => amt >= minAmount && amt <= maxAmount)
    .slice(0, 8);
  
  // If no valid quick amounts, generate some based on min/max (in sender currency)
  const finalQuickAmounts = quickAmounts.length > 0 
    ? quickAmounts 
    : (() => {
        const amounts: number[] = [];
        const step = Math.max(0.5, Math.floor((maxAmount - minAmount) / 7));
        for (let i = 0; i < 8 && minAmount + (i * step) <= maxAmount; i++) {
          amounts.push(Math.round((minAmount + (i * step)) * 100) / 100); // Round to 2 decimals
        }
        return amounts.length > 0 ? amounts : [minAmount];
      })();

  // Validate phone number against selected country
  const validatePhoneNumber = async (): Promise<boolean> => {
    if (!recipientPhone || recipientPhone.length < 7) return false;
    
    setDetectingOperator(true);
    setError(null);
    
    try {
      // Format phone for validation
      let formattedPhone = recipientPhone.replace(/\D/g, '');
      if (countryCode === "GH" && !formattedPhone.startsWith("233")) {
        formattedPhone = "233" + formattedPhone.replace(/^0+/, '');
      }
      
      // Validate phone number matches the selected country
      const validation = await validatePhoneForCountry(formattedPhone, countryCode);
      if (!validation.valid) {
        setError(validation.message || `This phone number does not match ${selectedCountry?.name || 'the selected country'}. Please check the number or select the correct country.`);
        return false;
      }
      
      return true;
    } catch (e: any) {
      setError("Failed to validate phone number. Please try again.");
      return false;
    } finally {
      setDetectingOperator(false);
    }
  };

  // Map Ghana operator names to network codes
  const getGhanaNetworkCode = (operatorName: string | null | undefined): number => {
    if (!operatorName) return 0; // Auto-detect
    
    const name = operatorName.toLowerCase();
    
    // Network code mapping for Ghana
    if (name.includes("airteltigo") || name.includes("airtel") || name.includes("tigo")) return 1;
    if (name.includes("expresso")) return 2;
    if (name.includes("glo")) return 3;
    if (name.includes("mtn")) {
      if (name.includes("yellow")) return 13;
      return 4;
    }
    if (name.includes("busy")) return 8;
    if (name.includes("surfline")) return 9;
    if (name.includes("telecel")) return 6;
    
    return 0; // Auto-detect if unknown
  };

  // Auto-detect operator when moving to Network step
  const detectOperator = async (): Promise<boolean> => {
    if (!recipientPhone || recipientPhone.length < 7) return false;
    
    setDetectingOperator(true);
    setError(null);
    
    try {
      // Format phone for API (add country code if needed)
      let formattedPhone = recipientPhone.replace(/\D/g, '');
      if (countryCode === "GH" && !formattedPhone.startsWith("233")) {
        formattedPhone = "233" + formattedPhone.replace(/^0+/, '');
      }
      
      const result = await autoDetectOperator(formattedPhone, countryCode);
      if (result) {
        setOperator(result);
        // Set default amount to mostPopularAmount or first suggested
        if (result.mostPopularAmount) {
          setAmount(result.mostPopularAmount);
        } else if (result.suggestedAmounts?.length) {
          setAmount(result.suggestedAmounts[0]);
        }
        return true;
      } else {
        setError("Could not detect network. Please check the phone number.");
        return false;
      }
    } catch (e: any) {
      setError("Failed to detect network. Please try again.");
      return false;
    } finally {
      setDetectingOperator(false);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: return countryCode.length > 0;
      case 1: return recipientPhone.trim().length >= 7;
      case 2: return operator !== null;
      case 3: {
        // Allow any amount >= 1, but check against operator limits if available
        if (amount < 1) return false;
        if (operator && minAmount && amount < minAmount) return false;
        if (operator && maxAmount && amount > maxAmount) return false;
        return true;
      }
      case 4: return true;
      default: return false;
    }
  };

  const nextStep = async () => {
    if (!validateStep(currentStep) || loadingNext) return;
    
    setLoadingNext(true);
    setError(null);
    
    try {
      // When moving from Phone to Network step, validate phone and auto-detect operator
      if (currentStep === 1) {
        // First validate phone number matches the country
        const isValid = await validatePhoneNumber();
        if (!isValid) {
          setLoadingNext(false);
          return; // Don't proceed if validation fails
        }
        
        // Then auto-detect operator
        const operatorDetected = await detectOperator();
        if (!operatorDetected) {
          setLoadingNext(false);
          return; // Don't proceed if operator detection fails
        }
      }
      
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error("Error in nextStep:", error);
    } finally {
      setLoadingNext(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
      // Reset operator if going back before network step
      if (currentStep <= 2) {
        setOperator(null);
      }
    }
  };

  const useMyNumber = () => {
    if (userPhone) {
      // Remove country code prefix if present for display
      let phone = userPhone.replace(/\D/g, '');
      if (phone.startsWith("233")) {
        phone = "0" + phone.slice(3);
      }
      setRecipientPhone(phone);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setResult(null);
    setBusy(true);
    
    let purchaseToast = toast.loading("Processing purchase...", {
      description: "Setting up your purchase"
    });

    try {
      // Format recipient phone for API
      let formattedRecipientPhone = recipientPhone.replace(/\D/g, '');
      if (countryCode === "GH" && !formattedRecipientPhone.startsWith("233")) {
        formattedRecipientPhone = "233" + formattedRecipientPhone.replace(/^0+/, '');
      }

      // Check if this is Ghana Prymo flow
      const isGhanaPrymo = provider === "prymo" && countryCode === "GH";

      // Get user information (needed for both flows)
      const user = getStoredUser();
      if (!user?.id) {
        throw new Error("User not found. Please log in again.");
      }

      // Get user profile for complete info
      const profile = await getProfile();
      const profileData = profile?.user || profile?.data?.user || profile;
      const userId = user.id;
      const firstName = profileData?.firstName || user.firstName || "User";
      const lastName = profileData?.lastName || user.lastName || "";
      const email = profileData?.email || user.email || "";
      const username = profileData?.username || user.username || "";
      const phoneNumber = profileData?.phoneNumber || user.phoneNumber || "";

      // Format sender phone
      let formattedSenderPhone = phoneNumber.replace(/\D/g, '');
      if (countryCode === "GH" && !formattedSenderPhone.startsWith("233")) {
        formattedSenderPhone = "233" + formattedSenderPhone.replace(/^0+/, '');
      }

      // Generate order ID
      const orderId = `ADV-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const orderDesc = `${firstName} airtime payment to ${recipientPhone} on ${new Date().toLocaleDateString('en-GB').replace(/\//g, '')}`;

      // Step 1: Initiate AdvansiPay payment
      toast.loading("Initiating payment...", {
        description: "Processing your payment request",
        id: purchaseToast
      });
      
      const paymentResponse = await initiateAdvansiPayPayment({
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        username,
        amount: Number(amount),
        orderDesc,
        orderId
      });
      
      const checkoutUrl = paymentResponse?.data?.checkoutUrl;
      const token = paymentResponse?.data?.token;
      const orderIdFromResponse = paymentResponse?.data?.["order-id"] || orderId;
      
      if (!checkoutUrl) {
        throw new Error("Payment initiation failed: No checkout URL received");
      }

      // Step 2: Open checkout URL
      toast.loading("Opening payment...", {
        description: "Redirecting to payment gateway",
        id: purchaseToast
      });
      
      // Open checkout URL in new window
      const paymentWindow = window.open(checkoutUrl, '_blank', 'width=800,height=600');
      
      if (!paymentWindow) {
        throw new Error("Please allow popups to complete payment");
      }

      // Step 3: Poll for payment completion
      toast.loading("Waiting for payment...", {
        description: "Please complete your payment in the popup window",
        id: purchaseToast
      });
      
      let paymentStatus = "PENDING";
      let attempts = 0;
      const maxAttempts = 120; // 10 minutes max (5 second intervals)
      
      // Also listen for deep link callback
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'payment-callback' && event.data?.orderId === orderIdFromResponse) {
          paymentStatus = event.data.status || "COMPLETE";
        }
      };
      window.addEventListener('message', handleMessage);
      
      while (paymentStatus !== "COMPLETE" && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        // Check if payment window was closed
        if (paymentWindow.closed && paymentStatus === "PENDING") {
          // User might have closed the window - check status one more time
          try {
            const statusResponse = await checkPaymentStatus(orderIdFromResponse);
            paymentStatus = statusResponse?.data?.status || statusResponse?.status || "PENDING";
          } catch {
            // If status check fails, assume cancelled
            paymentStatus = "CANCELLED";
          }
        }
        
        try {
          const statusResponse = await checkPaymentStatus(orderIdFromResponse);
          paymentStatus = statusResponse?.data?.status || statusResponse?.status || paymentStatus;
          
          if (paymentStatus === "PENDING" || paymentStatus === "PROCESSING") {
            toast.loading("Payment processing...", {
              description: `Status: ${paymentStatus}`,
              id: purchaseToast
            });
          }
          
          if (paymentStatus === "FAILED" || paymentStatus === "CANCELLED") {
            window.removeEventListener('message', handleMessage);
            paymentWindow.close();
            throw new Error(`Payment ${paymentStatus.toLowerCase()}`);
          }
        } catch (error: any) {
          // If status check fails, continue polling
          if (error?.status === 404) {
            attempts++;
            continue;
          }
          if (error?.message?.includes("Payment")) {
            window.removeEventListener('message', handleMessage);
            throw error;
          }
        }
        
        attempts++;
      }
      
      window.removeEventListener('message', handleMessage);
      paymentWindow.close();
      
      if (paymentStatus !== "COMPLETE") {
        throw new Error("Payment timeout: Payment did not complete within expected time");
      }

      // Step 4: Credit airtime after payment is complete
      toast.loading("Crediting airtime...", {
        description: "Payment complete, crediting your account",
        id: purchaseToast
      });
      
      let transactionId: string;
      let creditResponse: any;

      if (isGhanaPrymo) {
        // Ghana Prymo: Use direct topup API
        const networkCode = getGhanaNetworkCode(operator?.name);
        
        creditResponse = await topupGhanaAirtime({
          recipientNumber: formattedRecipientPhone,
          amount: Number(amount),
          network: networkCode
        });
        
        transactionId = creditResponse?.data?.transactionId || creditResponse?.transactionId || creditResponse?.id || orderIdFromResponse;
      } else {
        // Global Reloadly: Use recharge API
        const operatorId = operator?.operatorId || operator?.id;
        if (!operatorId) {
          throw new Error("Operator ID is required");
        }

        creditResponse = await rechargeAirtime({
          userId,
          operatorId: Number(operatorId),
          amount: Number(amount),
          customIdentifier: `reloadly-airtime ${Date.now()}`,
          recipientEmail: email,
          recipientNumber: formattedRecipientPhone,
          recipientCountryCode: countryCode.trim().toUpperCase(),
          senderNumber: formattedSenderPhone,
          senderCountryCode: "GH" // Assuming sender is always from GH
        });
        
        transactionId = creditResponse?.data?.transactionId || creditResponse?.transactionId || orderIdFromResponse;
      }
      
      toast.success("Airtime purchase successful!", {
        description: `Transaction ID: ${transactionId}`,
        id: purchaseToast
      });
      
      setResult({
        ...creditResponse,
        orderId: orderIdFromResponse,
        paymentStatus: "COMPLETE"
      });
      
      // Reset wizard
      setCurrentStep(0);
      setRecipientPhone("");
      setAmount(1);
      setOperator(null);
      // Refresh transactions
      setTimeout(() => {
        txQ.refetch();
        setResult(null);
      }, 3000);
    } catch (e: any) {
      const errorMsg = extractErrorMessage(e, "Airtime purchase failed");
      toast.error("Purchase failed", {
        description: errorMsg,
        id: purchaseToast
      });
      setError(errorMsg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 px-6 py-6 text-white shadow-glow">
          <div className="text-xs font-bold uppercase tracking-wider text-white/80">Airtime</div>
          <div className="mt-2 text-2xl font-extrabold tracking-tight">Buy Airtime</div>
          <div className="mt-1 text-sm text-white/85">Top up any phone number instantly</div>
        </div>

        <Card>
          <CardHeader>
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-6">
              {STEPS.map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          backgroundColor: isCompleted 
                            ? "rgb(16, 185, 129)" 
                            : isActive 
                            ? "rgb(99, 102, 241)" 
                            : "rgb(161, 161, 170)"
                        }}
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                          isActive ? "ring-4 ring-brand-500/30" : ""
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-5 w-5 text-white" />
                        ) : (
                          <StepIcon className="h-5 w-5 text-white" />
                        )}
                      </motion.div>
                      <span className={`mt-2 text-xs font-medium hidden sm:block ${
                        isActive ? "text-brand-600 dark:text-brand-400" : "text-zinc-500 dark:text-zinc-400"
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-2 ${
                        isCompleted ? "bg-emerald-500" : "bg-zinc-200 dark:bg-zinc-800"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {/* Step 0: Select Country */}
              {currentStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Select Country
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Choose the country for your airtime purchase
                    </p>
                  </div>

                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Provider
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button
                        type="button"
                        variant={provider === "reloadly" ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => {
                          setProvider("reloadly");
                        }}
                        disabled={countryCode === "GH"} // Disable Reloadly for Ghana
                      >
                        Global (Reloadly)
                      </Button>
                      <Button
                        type="button"
                        variant={provider === "prymo" ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => {
                          setProvider("prymo");
                          // Auto-select Ghana when Prymo is selected
                          if (countryCode !== "GH") {
                            setCountryCode("GH");
                          }
                        }}
                        disabled={countryCode !== "GH"} // Only enable for Ghana
                      >
                        Ghana (Prymo)
                      </Button>
                    </div>
                    {countryCode === "GH" && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                        Ghana uses Prymo provider for direct airtime topup
                      </p>
                    )}
                  </div>

                  {countriesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
                    </div>
                  ) : (
                    <>
                      {/* Search Input */}
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Search countries..."
                          className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                        />
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-80 overflow-y-auto">
                        {filteredCountries.map((country) => {
                          const isSelected = countryCode === country.code;
                          return (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(country.code);
                                // Auto-set provider: Prymo for Ghana, Reloadly for others
                                if (country.code === "GH") {
                                  setProvider("prymo");
                                } else {
                                  setProvider("reloadly");
                                }
                              }}
                              className={`relative flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                                isSelected
                                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20"
                                  : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                              }`}
                            >
                              <CountryFlag flagUrl={country.flag} countryCode={country.code} size={32} />
                              <div className="text-center">
                                <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate w-full">
                                  {country.name}
                                </div>
                                <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                  {country.code}
                                </div>
                              </div>
                              {isSelected && (
                                <Check className="absolute top-1 right-1 h-3 w-3 text-brand-600 dark:text-brand-400" />
                              )}
                            </button>
                          );
                        })}
                        {filteredCountries.length === 0 && (
                          <div className="col-span-full py-8 text-center text-sm text-zinc-500">
                            No countries found matching "{countrySearch}"
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* Step 1: Enter Phone */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Enter Phone Number
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Enter the phone number to recharge (network will be auto-detected)
                    </p>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    {selectedCountry && (
                      <CountryFlag flagUrl={selectedCountry.flag} countryCode={selectedCountry.code} size={40} />
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {callingCode}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {selectedCountry?.name || "Select Country"}
                      </div>
                    </div>
                    <input
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="flex-[2] h-12 rounded-xl border border-zinc-200 bg-white px-4 text-base text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                      placeholder="Enter phone..."
                      required
                    />
                  </div>

                  {/* Use My Number Button */}
                  {userPhone && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={useMyNumber}
                      className="w-full border-2 border-dashed border-brand-300 dark:border-brand-700 hover:border-brand-500"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Use My Number ({userPhone})
                    </Button>
                  )}

                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    For {selectedCountry?.name || "Ghana"}, enter a number starting with {callingCode} (e.g., {callingCode.replace('+', '')}123456789)
                  </p>
                </motion.div>
              )}

              {/* Step 2: Network Detection */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Network Detected
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      We've detected the network for this phone number
                    </p>
                  </div>

                  {detectingOperator ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-brand-600 mb-4" />
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Detecting network...</p>
                    </div>
                  ) : operator ? (
                    <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                          {operator.logoUrls?.[0] ? (
                            <img src={operator.logoUrls[0]} alt={operator.name} className="h-12 w-12 object-contain" />
                          ) : (
                            <Wifi className="h-8 w-8 text-emerald-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                              {operator.name}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            {operator.country?.name || selectedCountry?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 text-center">
                      <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Could not detect network. Please check the phone number and try again.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Select Amount */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Select Amount
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Choose the amount to recharge
                    </p>
                  </div>

                  {/* Amount Input */}
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                      Amount
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                        {operator?.senderCurrencySymbol || "$"}
                      </span>
                      <input
                        value={String(amount)}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          // Allow any positive number, validation happens on submit
                          if (!isNaN(val) && val >= 0) setAmount(val);
                        }}
                        type="number"
                        min={minAmount}
                        max={maxAmount}
                        step={0.01}
                        className="flex-1 h-12 rounded-xl border border-zinc-200 bg-white px-4 text-xl font-bold text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                      />
                    </div>
                    {operator && (
                      <div className="mt-2 space-y-1">
                        {(minAmount > 1 || maxAmount < 1000000) && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {minAmount > 1 && `Min: ${operator?.senderCurrencySymbol || "$"}${minAmount.toFixed(2)}`}
                            {minAmount > 1 && maxAmount < 1000000 && " • "}
                            {maxAmount < 1000000 && `Max: ${operator?.senderCurrencySymbol || "$"}${maxAmount.toFixed(2)}`}
                          </p>
                        )}
                        {localMinAmount && localMaxAmount && fxRate > 1 && (
                          <p className="text-xs text-zinc-400 dark:text-zinc-500">
                            Recipient receives: {localMinAmount.toLocaleString()} - {localMaxAmount.toLocaleString()} {operator?.destinationCurrencySymbol || "CFA"}
                          </p>
                        )}
                      </div>
                    )}
                    {/* Show validation error if amount is out of range */}
                    {operator && (
                      <AnimatePresence>
                        {amount < minAmount && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1"
                          >
                            <XCircle className="h-3 w-3" />
                            Amount must be at least {operator?.senderCurrencySymbol || "$"}{minAmount.toFixed(2)}
                          </motion.p>
                        )}
                        {amount > maxAmount && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1"
                          >
                            <XCircle className="h-3 w-3" />
                            Amount cannot exceed {operator?.senderCurrencySymbol || "$"}{maxAmount.toFixed(2)}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Quick Amounts */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                      Quick Amounts
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {finalQuickAmounts.map((quickAmount: number) => (
                        <Button
                          key={quickAmount}
                          type="button"
                          variant={amount === quickAmount ? "primary" : "secondary"}
                          size="sm"
                          onClick={() => setAmount(quickAmount)}
                          className="text-sm"
                        >
                          {operator?.senderCurrencySymbol || "$"} {quickAmount}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirm */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Review and buy airtime
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Please review your airtime purchase details
                    </p>
                  </div>

                  <div className="space-y-4 p-6 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="text-center pb-4 border-b border-zinc-200 dark:border-zinc-700">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Airtime Purchase</h3>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <CountryFlag flagUrl={selectedCountry?.flag || ""} countryCode={selectedCountry?.code || ""} size={24} />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Country</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {selectedCountry?.name || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-zinc-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Network</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {operator?.name || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-zinc-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Phone Number</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {callingCode}{recipientPhone.replace(/^0+/, '')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-t border-zinc-200 dark:border-zinc-700 pt-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-zinc-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Amount</span>
                      </div>
                      <span className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
                        {operator?.senderCurrencySymbol || "$"}{amount.toFixed(2)}
                        {operator?.fx?.rate && operator?.destinationCurrencySymbol && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
                            (~{Math.round(amount * operator.fx.rate).toLocaleString()} {operator.destinationCurrencySymbol})
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200 flex items-start gap-3"
                >
                  <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">{typeof error === 'string' ? error : extractErrorMessage(error, "An error occurred")}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200 flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold mb-1">Airtime purchase successful!</div>
                    <div className="text-xs opacity-80">
                      Transaction ID: {result?.data?.transactionId || result?.transactionId || "N/A"}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              {currentStep < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!validateStep(currentStep) || loadingNext}
                >
                  {loadingNext ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={busy}
                  size="lg"
                >
                  {busy ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Phone className="mr-2 h-4 w-4" />
                      Complete Purchase
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Airtime Transactions</CardTitle>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {totalTxs > 0 ? `${totalTxs} total transaction${totalTxs !== 1 ? 's' : ''}` : 'No transactions yet'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => txQ.refetch()}
                disabled={!isMounted || txQ.isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isMounted && txQ.isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {txQ.isLoading ? (
              <div className="py-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                {isMounted ? (
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                ) : (
                  <div className="h-6 w-6 mx-auto mb-2" />
                )}
                Loading transactions...
              </div>
            ) : txQ.isError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
                {extractErrorMessage(txQ.error, "Failed to load transactions")}
              </div>
            ) : Array.isArray(txs) && txs.length > 0 ? (
              <>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {txs.map((t: any, idx: number) => {
                    const txId = t?._id ?? t?.id ?? idx;
                    return (
                      <button
                        key={txId}
                        onClick={() => router.push(`/airtime/${txId}`)}
                        className="w-full flex items-center justify-between gap-4 py-4 px-2 -mx-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                              {toText(t?.recipientPhone) || toText(t?.recipientName) || "Airtime Purchase"}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                t?.status === "COMPLETED" || t?.status === "completed" 
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : t?.status === "PENDING" || t?.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}>
                                {toText(t?.status) || "—"}
                              </span>
                              <span>•</span>
                              <span>{toDateTimeText(t?.createdAt)}</span>
                            </div>
                            {t?.note && (
                              <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 italic">
                                "{t.note}"
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 flex items-center gap-2">
                          <div>
                            <div className="text-sm font-extrabold text-zinc-900 dark:text-zinc-50">
                              {getTransactionCurrency(t)} {getTransactionAmount(t).toFixed(2)}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {toText(t?.transType) || "Airtime"}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-zinc-400 flex-shrink-0 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Showing <span className="font-semibold text-zinc-700 dark:text-zinc-300">{((txPage - 1) * txLimit) + 1}</span> to <span className="font-semibold text-zinc-700 dark:text-zinc-300">{Math.min(txPage * txLimit, totalTxs)}</span> of <span className="font-semibold text-zinc-700 dark:text-zinc-300">{totalTxs}</span> transactions
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setTxPage(1)}
                          disabled={txPage <= 1 || txQ.isLoading}
                          className="h-8 px-2"
                        >
                          <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setTxPage((p) => Math.max(1, p - 1))}
                          disabled={txPage <= 1 || txQ.isLoading}
                          className="h-8"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Prev
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum: number;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (txPage <= 3) {
                            pageNum = i + 1;
                          } else if (txPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = txPage - 2 + i;
                          }
                          
                          return (
                            <Button
                              key={pageNum}
                              variant={txPage === pageNum ? "primary" : "secondary"}
                              size="sm"
                              onClick={() => setTxPage(pageNum)}
                              disabled={txQ.isLoading}
                              className="h-8 min-w-[2rem]"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setTxPage((p) => Math.min(totalPages, p + 1))}
                          disabled={txPage >= totalPages || txQ.isLoading}
                          className="h-8"
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setTxPage(totalPages)}
                          disabled={txPage >= totalPages || txQ.isLoading}
                          className="h-8 px-2"
                        >
                          <ChevronsRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-zinc-400" />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  No airtime transactions yet. Make your first purchase above!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
