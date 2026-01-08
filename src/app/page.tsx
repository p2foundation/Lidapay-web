"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AIChatWidget } from "@/components/ai-chat-widget";
import { 
  Globe, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Wifi, 
  ArrowRight,
  Star,
  Zap,
  CreditCard,
  Smartphone,
  Rocket,
  Users,
  TrendingUp,
  CheckCircle,
  Plane,
  Gift,
  Lock,
  Headphones,
  Banknote,
  Network,
  Globe2,
  MapPin,
  Clock,
  Award
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900" />
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-brand-400/20 to-indigoBrand-500/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-indigoBrand-400/20 to-brand-500/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-900 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group flex items-center gap-2 sm:gap-3 min-w-0"
          >
            <div className="relative flex-shrink-0">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-lg shadow-brand-500/25" />
              <motion.div
                className="absolute -inset-1 rounded-xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 opacity-0 group-hover:opacity-30 blur transition-opacity"
              />
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-xs sm:text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-50 truncate">Lidapay</div>
              <div className="hidden xs:block text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">Global • Trusted • Fast</div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0"
          >
            <ThemeToggle />
            <Link 
              href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block"
            >
              <img 
                alt="Get it on Google Play" 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="sm" className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm">
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm">
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Join</span>
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      <main className="pt-14 sm:pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 py-12 sm:py-20 md:py-24 lg:py-32">
            <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-brand-500/10 to-indigoBrand-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-brand-700 dark:text-brand-300 ring-1 ring-brand-500/20"
                >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">Trusted by 100,000+ users</span>
                  <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0 hidden sm:inline" />
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight"
                >
                  Global Airtime &{" "}
                  <span className="block bg-gradient-to-r from-brand-600 to-indigoBrand-600 bg-clip-text text-transparent">
                    Data Remittance
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed"
                >
                  The fastest way to send mobile top-ups and data bundles to friends and family in 150+ countries. Secure, reliable, and instant.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4"
                >
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="group w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base">
                      Start Sending Now
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link 
                    href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-block"
                  >
                    <img 
                      alt="Get it on Google Play" 
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      className="h-12 sm:h-14 w-auto mx-auto sm:mx-0"
                    />
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4"
                >
                  {[
                    { value: "150+", label: "Countries" },
                    { value: "24/7", label: "Support" },
                    { value: "100K+", label: "Users" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-xl sm:rounded-2xl bg-white/60 p-2.5 sm:p-4 text-center backdrop-blur-sm ring-1 ring-zinc-200/60 dark:bg-zinc-900/60 dark:ring-zinc-800"
                    >
                      <div className="text-lg sm:text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-50">{stat.value}</div>
                      <div className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-0.5 sm:mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative mt-8 lg:mt-0"
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-brand-500/20 via-indigoBrand-500/20 to-brand-600/20 blur-2xl" />
                  <div className="relative rounded-[20px] sm:rounded-[24px] md:rounded-[32px] bg-gradient-to-br from-zinc-900 to-zinc-800 p-1.5 sm:p-2 shadow-2xl">
                    <div className="rounded-[18px] sm:rounded-[22px] md:rounded-[28px] bg-gradient-to-br from-brand-500 via-brand-600 to-indigoBrand-600 p-4 sm:p-6 md:p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/70">Available Now</div>
                          <div className="mt-0.5 sm:mt-1 text-xl sm:text-2xl md:text-3xl font-black text-white">Global Top-Up</div>
                        </div>
                        <div className="rounded-xl sm:rounded-2xl bg-white/20 p-2 sm:p-3 flex-shrink-0">
                          <Globe className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                        {[
                          { icon: Phone, label: "Airtime Recharge", desc: "Instant top-up to any mobile number" },
                          { icon: Wifi, label: "Data Bundles", desc: "Buy data packages for any network" },
                          { icon: CreditCard, label: "Secure Payment", desc: "Multiple payment options" }
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="rounded-xl sm:rounded-2xl bg-white/10 p-3 sm:p-4 backdrop-blur-sm transition-all"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="rounded-lg sm:rounded-xl bg-white/20 p-1.5 sm:p-2 flex-shrink-0">
                                <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm sm:text-base font-bold text-white truncate">{item.label}</div>
                                <div className="text-xs sm:text-sm text-white/80 line-clamp-2">{item.desc}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Link href="/register" className="flex-1">
                          <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-100 h-10 sm:h-11 text-sm sm:text-base">
                            Send Top-up
                          </Button>
                        </Link>
                        <Link href="/airtime" className="flex-1">
                          <Button variant="secondary" className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 h-10 sm:h-11 text-sm sm:text-base">
                            See Rates
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                Why Choose LidaPay?
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 px-4">
                Experience the difference with our world-class features
              </p>
            </motion.div>

            <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Globe2,
                  title: "Global Coverage",
                  desc: "Send airtime and data to over 150 countries worldwide. No boundaries, no limits.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Zap,
                  title: "Instant Delivery",
                  desc: "Lightning-fast top-ups delivered within seconds. No waiting, no delays.",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  icon: ShieldCheck,
                  title: "Bank-Level Security",
                  desc: "Your transactions are protected with enterprise-grade encryption.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: CreditCard,
                  title: "Multiple Payment Options",
                  desc: "Pay with card, mobile money, or bank transfer. Flexibility at its best.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Gift,
                  title: "Rewards Program",
                  desc: "Earn points with every transaction and redeem amazing rewards.",
                  gradient: "from-red-500 to-rose-500"
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  desc: "Our support team is always here to help, anytime, anywhere.",
                  gradient: "from-indigo-500 to-blue-500"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r opacity-0 blur transition-opacity group-hover:opacity-30" />
                  <div className="relative rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 md:p-8 shadow-lg ring-1 ring-zinc-200/60 dark:bg-zinc-900 dark:ring-zinc-800">
                    <div className={`inline-flex rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.gradient} p-2.5 sm:p-3`}>
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">{feature.title}</h3>
                    <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                How It Works
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 px-4">
                Send airtime and data in 3 simple steps
              </p>
            </motion.div>

            <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: Users,
                  title: "Sign Up",
                  desc: "Create your free account in seconds"
                },
                {
                  step: "02",
                  icon: Smartphone,
                  title: "Enter Details",
                  desc: "Add recipient number and amount"
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Send Instantly",
                  desc: "Airtime/data delivered immediately"
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="mx-auto inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 p-3 sm:p-4 text-2xl sm:text-3xl font-black text-white shadow-lg">
                      {step.step}
                    </div>
                    <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-lg ring-1 ring-zinc-200/60 dark:bg-zinc-900 dark:ring-zinc-800">
                      <step.icon className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-brand-600" />
                      <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">{step.title}</h3>
                      <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300">{step.desc}</p>
                    </div>
                    {i < 2 && (
                      <div className="absolute left-1/2 top-6 sm:top-8 hidden w-full -translate-y-1/2 md:block">
                        <div className="flex items-center justify-center">
                          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-300" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 p-6 sm:p-8 md:p-12 text-center text-white"
            >
              <div className="mx-auto max-w-3xl">
                <Award className="mx-auto h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-white/80" />
                <h3 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-black px-2">Trusted by Millions Worldwide</h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/90 px-2">
                  Join over 100,000 satisfied customers who trust LidaPay for their mobile top-up needs
                </p>
                <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 md:grid-cols-4">
                  {[
                    { value: "$10M+", label: "Transactions" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "4.8★", label: "App Rating" },
                    { value: "150+", label: "Countries" }
                  ].map((badge, i) => (
                    <div key={i}>
                      <div className="text-xl sm:text-2xl md:text-3xl font-black">{badge.value}</div>
                      <div className="text-xs sm:text-sm text-white/80 mt-0.5 sm:mt-1">{badge.label}</div>
                    </div>
                  ))}
                </div>
                <Link href="/login" className="inline-block mt-6 sm:mt-8">
                  <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-white text-zinc-900 hover:bg-zinc-100">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global Reach Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  Connecting You to <span className="text-brand-600">150+ Countries</span>
                </h2>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Whether you're sending airtime to family in Nigeria, data to friends in Ghana, or topping up your own phone while traveling in Kenya, LidaPay has you covered.
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { name: "Ghana", code: "GH" },
                    { name: "Nigeria", code: "NG" },
                    { name: "Kenya", code: "KE" },
                    { name: "South Africa", code: "ZA" },
                    { name: "Uganda", code: "UG" },
                    { name: "Tanzania", code: "TZ" },
                    { name: "USA", code: "US" },
                    { name: "UK", code: "GB" },
                    { name: "Canada", code: "CA" },
                  ].map((country, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700">
                      <div className="h-6 w-8 rounded overflow-hidden relative bg-zinc-100">
                        <img 
                          src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                          alt={country.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-sm text-zinc-700 dark:text-zinc-200">{country.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/airtime" className="text-brand-600 font-semibold hover:text-brand-700 inline-flex items-center">
                    View all supported countries <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-indigoBrand-500/20 blur-3xl rounded-full" />
                 <div className="relative bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800">
                   <div className="flex items-center justify-between mb-8">
                     <div>
                       <h3 className="text-xl font-bold">Recent Transfers</h3>
                       <p className="text-sm text-zinc-500">Live activity across our network</p>
                     </div>
                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   </div>
                   
                   <div className="space-y-4">
                     {[
                       { from: "United Kingdom", to: "Ghana", amount: "GHS 150.00", type: "Airtime", time: "Just now" },
                       { from: "United States", to: "Nigeria", amount: "NGN 5,000", type: "Data Bundle", time: "2 mins ago" },
                       { from: "Canada", to: "Kenya", amount: "KES 1,000", type: "Airtime", time: "5 mins ago" },
                       { from: "Germany", to: "South Africa", amount: "ZAR 200", type: "Data Bundle", time: "12 mins ago" }
                     ].map((tx, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                         <div className="flex items-center gap-3">
                           <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600">
                             {tx.type === "Airtime" ? <Phone className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
                           </div>
                           <div>
                             <div className="text-sm font-semibold">{tx.to}</div>
                             <div className="text-xs text-zinc-500">From {tx.from}</div>
                           </div>
                         </div>
                         <div className="text-right">
                           <div className="text-sm font-bold">{tx.amount}</div>
                           <div className="text-xs text-zinc-400">{tx.time}</div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 px-2">
                Ready to Get Started?
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 px-4">
                Join thousands of users sending airtime and data globally with LidaPay
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 md:h-14 px-6 sm:px-8 text-sm sm:text-base">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Link 
                  href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-block"
                >
                  <img 
                    alt="Get it on Google Play" 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    className="h-12 sm:h-14 md:h-16 w-auto mx-auto sm:mx-0"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 bg-zinc-50/50 py-8 sm:py-12 dark:border-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="col-span-1 sm:col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-lg shadow-brand-500/25 flex-shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-50">LidaPay</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">Global • Trusted • Fast</div>
                </div>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md">
                Your trusted partner for global airtime and data top-ups. Fast, secure, and reliable.
              </p>
              <div className="mt-3 sm:mt-4 flex gap-4">
                <Link 
                  href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img 
                    alt="Get it on Google Play" 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    className="h-8 sm:h-10 w-auto"
                  />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-50">Product</h4>
              <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                <li><Link href="/app" className="text-xs sm:text-sm text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">Dashboard</Link></li>
                <li><Link href="/airtime" className="text-xs sm:text-sm text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">Airtime</Link></li>
                <li><Link href="/data" className="text-xs sm:text-sm text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">Data Bundles</Link></li>
                <li><Link href="/rewards" className="text-xs sm:text-sm text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">Rewards</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-50">Company</h4>
              <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                <li><Link href="#" className="text-xs sm:text-sm text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">About</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">Contact</Link></li>
                <li><Link href="/privacy" className="text-xs sm:text-sm text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">Privacy</Link></li>
                <li><Link href="/terms" className="text-xs sm:text-sm text-zinc-600 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 border-t border-zinc-200/60 pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} LidaPay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}


