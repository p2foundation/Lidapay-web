"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { register, getCountries, extractErrorMessage, type Country } from "@/lib/api";
import { CountryFlag } from "@/components/country-flag";
import { useQuery } from "@tanstack/react-query";
import { 
  User, 
  Building2, 
  Store, 
  ChevronRight, 
  ChevronLeft, 
  Check,
  Globe,
  Lock,
  Mail,
  Phone,
  UserCircle,
  Loader2
} from "lucide-react";

const ACCOUNT_TYPES = [
  {
    id: "USER",
    label: "User",
    description: "Personal account for buying airtime and data",
    icon: User,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "MERCHANT",
    label: "Merchant",
    description: "Business account for selling services",
    icon: Building2,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: "AGENT",
    label: "Agent",
    description: "Reseller account with special benefits",
    icon: Store,
    color: "from-emerald-500 to-emerald-600"
  }
];

const STEPS = [
  { id: 0, title: "Account Type", icon: UserCircle },
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Contact Details", icon: Mail },
  { id: 3, title: "Location", icon: Globe },
  { id: 4, title: "Security", icon: Lock }
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch countries from API
  const { data: countries = [], isLoading: countriesLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
    staleTime: 1000 * 60 * 60 // Cache for 1 hour
  });

  // Form state
  const [accountType, setAccountType] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("GH"); // Default to GH (Ghana) ISO code
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const selectedCountryData = countries.find(c => c.code === country);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        return accountType !== null;
      case 1:
        return firstName.trim().length >= 2 && lastName.trim().length >= 2;
      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && phoneNumber.trim().length >= 10;
      case 3:
        return country.length > 0;
      case 4:
        return password.length >= 6 && password === confirmPassword;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < STEPS.length - 1) {
      setError(null);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      setError("Please complete all fields correctly");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setBusy(true);
    setError(null);

    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        password,
        country: country, // Use ISO code
        roles: accountType ?? "USER"
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (e: any) {
      const errorMessage = extractErrorMessage(e, "Registration failed. Please try again.");
      setError(errorMessage);
    } finally {
      setBusy(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md w-full"
        >
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-2">
            Registration Successful!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Your account has been created. Redirecting to login...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-16">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-glow flex items-center justify-center"
          >
            <UserCircle className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Join LidaPay and start managing your digital payments
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
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

        {/* Form Card */}
        <Card>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 0: Account Type */}
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
                      Choose Your Account Type
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Select the type of account that best fits your needs
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ACCOUNT_TYPES.map((type) => {
                      const Icon = type.icon;
                      const isSelected = accountType === type.id;
                      return (
                        <motion.button
                          key={type.id}
                          type="button"
                          onClick={() => setAccountType(type.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-6 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                          }`}
                        >
                          <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                            {type.label}
                          </h3>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {type.description}
                          </p>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="mt-4 flex items-center text-sm text-brand-600 dark:text-brand-400"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Selected
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Personal Information
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Tell us your name
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        First Name
                      </div>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                        placeholder="John"
                        required
                      />
                    </label>
                    <label className="block">
                      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Last Name
                      </div>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                        placeholder="Doe"
                        required
                      />
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Contact Details
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      We'll use this to verify your account
                    </p>
                  </div>
                  <label className="block">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Email Address
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </label>
                  <label className="block">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Phone Number
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                      placeholder="0244588584"
                      required
                    />
                    <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Enter without country code
                    </div>
                  </label>
                </motion.div>
              )}

              {/* Step 3: Location */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Select Your Country
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Choose your country of residence
                    </p>
                  </div>
                  {countriesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {countries.map((c) => {
                        const isSelected = country.toUpperCase() === c.name.toUpperCase();
                        return (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => setCountry(c.name.toUpperCase())}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                              isSelected
                                ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20"
                                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                            }`}
                          >
                            <CountryFlag flagUrl={c.flag} countryCode={c.code} size={40} />
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                {c.name}
                              </div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {c.code}
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Security */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      Create Password
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Choose a strong password to secure your account
                    </p>
                  </div>
                  <label className="block">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Password
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Minimum 6 characters
                    </div>
                  </label>
                  <label className="block">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Confirm Password
                    </div>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {password && confirmPassword && password !== confirmPassword && (
                      <div className="mt-1 text-xs text-red-600 dark:text-red-400">
                        Passwords do not match
                      </div>
                    )}
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200"
              >
                {typeof error === 'string' ? error : extractErrorMessage(error, "An error occurred")}
              </motion.div>
            )}

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
                  disabled={!validateStep(currentStep)}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={busy || !validateStep(4)}
                >
                  {busy ? "Creating Account..." : "Create Account"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Login Link */}
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

