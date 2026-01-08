"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getRewards, getUserPoints } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Trophy, 
  Star, 
  Gift, 
  Zap, 
  Crown, 
  Target, 
  TrendingUp,
  Award,
  Coins,
  Sparkles,
  Lock,
  CheckCircle,
  ArrowRight,
  History,
  Percent,
  Users,
  Calendar
} from "lucide-react";

export default function RewardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const pointsQ = useQuery({ 
    queryKey: ["points"], 
    queryFn: () => getUserPoints(),
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 404) return false;
      return failureCount < 2;
    },
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
  const rewardsQ = useQuery({ 
    queryKey: ["rewards"], 
    queryFn: () => getRewards(),
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.status === 404) return false;
      return failureCount < 2;
    },
    retryOnMount: false,
    refetchOnWindowFocus: false
  });

  const points =
    pointsQ.data?.data?.points ?? pointsQ.data?.points ?? pointsQ.data?.user?.points ?? 0;
  const rewards =
    rewardsQ.data?.data?.rewards ?? rewardsQ.data?.rewards ?? rewardsQ.data ?? [];

  // Calculate user tier based on points
  const getUserTier = (points: number) => {
    if (points >= 10000) return { name: "Platinum", color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30", icon: Crown };
    if (points >= 5000) return { name: "Gold", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30", icon: Star };
    if (points >= 2000) return { name: "Silver", color: "text-zinc-600", bg: "bg-zinc-100 dark:bg-zinc-900/30", icon: Award };
    return { name: "Bronze", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30", icon: Trophy };
  };

  const userTier = getUserTier(points);
  const nextTierPoints = points >= 10000 ? 10000 : points >= 5000 ? 10000 : points >= 2000 ? 5000 : 2000;
  const progressToNext = (points / nextTierPoints) * 100;

  // Categories for filtering rewards
  const categories = [
    { id: "all", name: "All Rewards", icon: Gift },
    { id: "discount", name: "Discounts", icon: Percent },
    { id: "data", name: "Data Bundles", icon: Zap },
    { id: "airtime", name: "Airtime", icon: Target },
    { id: "exclusive", name: "Exclusive", icon: Crown }
  ];

  // Mock rewards data for demonstration
  const mockRewards = [
    { id: 1, title: "10% Off Next Airtime", description: "Get 10% discount on your next airtime purchase", points: 500, category: "discount", popular: true },
    { id: 2, title: "Free 1GB Data", description: "Redeem 1GB data valid for 7 days", points: 1000, category: "data" },
    { id: 3, title: "$5 Airtime Bonus", description: "Get $5 bonus on your next recharge", points: 750, category: "airtime" },
    { id: 4, title: "VIP Support", description: "Get priority customer support for 1 month", points: 2000, category: "exclusive" },
    { id: 5, title: "15% Off Data Bundles", description: "Save 15% on any data bundle purchase", points: 800, category: "discount", popular: true },
    { id: 6, title: "Free 2GB Data", description: "Redeem 2GB data valid for 14 days", points: 1800, category: "data" },
    { id: 7, title: "$10 Airtime Bonus", description: "Get $10 bonus on your next recharge", points: 1500, category: "airtime" },
    { id: 8, title: "Exclusive Deals Access", description: "Access exclusive deals and offers", points: 3000, category: "exclusive" }
  ];

  const displayRewards = rewards.length > 0 ? rewards : mockRewards;
  const filteredRewards = selectedCategory === "all" 
    ? displayRewards 
    : displayRewards.filter((r: any) => r.category === selectedCategory);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section with Points Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-indigoBrand-600 p-8 text-white shadow-2xl"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-3">
                    <Coins className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider text-white/80">Your Balance</div>
                    <div className="mt-2 text-4xl font-black tracking-tight">
                      {pointsQ.isLoading ? "—" : points.toLocaleString()}
                    </div>
                    <div className="mt-1 text-sm text-white/85">points available</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 rounded-full ${userTier.bg} px-4 py-2`}>
                  <userTier.icon className={`h-5 w-5 ${userTier.color}`} />
                  <span className={`font-bold ${userTier.color}`}>{userTier.name} Tier</span>
                </div>
                <div className="mt-3 text-sm text-white/85">
                  {nextTierPoints - points} points to next tier
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="h-2 w-full rounded-full bg-white/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-white"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{points.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowRight className="h-3 w-3 mr-1 text-green-500" />
                <span>12% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rewards Redeemed</CardTitle>
              <Gift className="h-4 w-4 text-brand-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-brand-600">2 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Member Since</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan 2024</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-zinc-600">12 months active</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How to Earn Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-brand-600" />
                How to Earn Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex items-start gap-3 rounded-xl p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <div className="rounded-full bg-brand-100 p-2 dark:bg-brand-900/30">
                    <Target className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Make Transactions</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Earn 10 points for every $1 spent on airtime and data
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Refer Friends</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Get 500 points for each successful referral
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Daily Check-ins</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Earn 50 points for daily app usage streaks
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rewards Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Rewards Catalog
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Category Tabs */}
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2 whitespace-nowrap"
                    >
                      <Icon className="h-4 w-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>

              {/* Rewards Grid */}
              {rewardsQ.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
                </div>
              ) : filteredRewards.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {filteredRewards.map((reward: any, idx: number) => {
                    const title = reward?.title ?? reward?.name ?? "Reward";
                    const required = Number(reward?.points ?? reward?.pointsRequired ?? 0);
                    const canRedeem = required > 0 && points >= required;
                    const isPopular = reward?.popular;

                    return (
                      <motion.div
                        key={reward?._id ?? reward?.id ?? idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative rounded-2xl border p-5 transition-all hover:shadow-lg ${
                          canRedeem 
                            ? "border-brand-200 bg-white dark:border-brand-800 dark:bg-zinc-900" 
                            : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
                        }`}
                      >
                        {isPopular && (
                          <div className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-brand-500 to-indigoBrand-600 px-3 py-1 text-xs font-bold text-white">
                            <Sparkles className="mr-1 inline h-3 w-3" />
                            Popular
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                              {title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {reward?.description ?? "Redeem this reward with your points."}
                            </p>
                            <div className="mt-3 flex items-center gap-2">
                              <div className={`rounded-full px-3 py-1 text-xs font-bold ${
                                canRedeem 
                                  ? "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300" 
                                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                              }`}>
                                {required ? `${required.toLocaleString()} pts` : "—"}
                              </div>
                              {!canRedeem && required > points && (
                                <span className="text-xs text-muted-foreground">
                                  Need {required - points} more
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Button
                              size="sm"
                              variant={canRedeem ? "primary" : "secondary"}
                              disabled={!canRedeem}
                              onClick={() => alert("Redemption flow: coming soon")}
                              className="min-w-[100px]"
                            >
                              {canRedeem ? (
                                <>
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Redeem
                                </>
                              ) : (
                                <>
                                  <Lock className="mr-1 h-4 w-4" />
                                  Locked
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Gift className="mx-auto h-12 w-12 text-zinc-400" />
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    No rewards available in this category yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppShell>
  );
}


