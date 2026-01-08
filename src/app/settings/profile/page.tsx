"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile, extractErrorMessage } from "@/lib/api";
import { User, Save, Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile()
  });

  const user = profileData?.user ?? profileData?.data?.user ?? profileData;

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setSuccess(true);
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (e: any) => {
      const errorMsg = extractErrorMessage(e, "Failed to update profile");
      setError(errorMsg);
      setTimeout(() => setError(null), 5000);
    }
  });

  const handleSave = async () => {
    setError(null);
    updateMutation.mutate({
      firstName: firstName.trim() || undefined,
      lastName: lastName.trim() || undefined,
      email: email.trim() || undefined,
      phoneNumber: phoneNumber.trim() || undefined
    });
  };

  const handleCancel = () => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
    }
    setIsEditing(false);
    setError(null);
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        </div>
      </AppShell>
    );
  }

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
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">Profile</div>
            <div className="mt-2 text-2xl font-extrabold tracking-tight">Your Profile</div>
            <div className="mt-1 text-sm text-white/85">Manage your personal information</div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar Section */}
            <div className="flex items-center gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-500 to-indigoBrand-600 flex items-center justify-center text-white text-3xl font-extrabold">
                {user?.firstName?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <div className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">
                  {user?.firstName && user?.lastName 
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName || user?.username || user?.email || "User"}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {user?.email || user?.phoneNumber || "No contact info"}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  First Name
                </div>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-400"
                />
              </label>

              <label className="block">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Last Name
                </div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-400"
                />
              </label>

              <label className="block">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Email Address
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-400"
                />
              </label>

              <label className="block">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Phone Number
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={!isEditing}
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none ring-brand-500/30 focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-400"
                />
              </label>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Username</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {user?.username || "—"}
                </span>
              </div>
              {user?.country && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Country</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {user.country}
                  </span>
                </div>
              )}
              {user?.roles && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Account Type</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {Array.isArray(user.roles) ? user.roles.join(", ") : user.roles}
                  </span>
                </div>
              )}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200 flex items-start gap-3"
                >
                  <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">{typeof error === 'string' ? error : extractErrorMessage(error, "An error occurred")}</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-200 flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">Profile updated successfully!</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex items-center gap-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={updateMutation.isPending}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="flex-1"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

