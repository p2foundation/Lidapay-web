"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AIChatWidget } from "@/components/ai-chat-widget";
import { Footer } from "@/components/footer";
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
  Award,
  ChevronDown,
  Play
} from "lucide-react";
import { useRef, useState } from "react";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-zinc-950 overflow-hidden selection:bg-brand-500/30 selection:text-brand-900 dark:selection:text-brand-50">
      {/* Video Hero Section - Full Screen with Integrated Header */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col">
        {/* Video Background - Covers Everything */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={() => setIsVideoLoaded(true)}
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234f46e5;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)'/%3E%3C/svg%3E"
          >
            <source src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" type="video/mp4" />
            {/* Fallback gradient if video fails */}
          </video>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-900/40 to-zinc-900/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 to-indigoBrand-900/20" />
        </div>

        {/* Header - Integrated into Hero */}
        <header className="relative z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl flex-shrink-0">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group flex items-center gap-3"
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-lg shadow-brand-500/20 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-xl bg-brand-500/20 opacity-0 group-hover:opacity-100 blur transition-opacity"
                />
              </div>
              <div>
                <div className="text-sm font-black tracking-tight text-white">LidaPay</div>
                <div className="text-xs font-medium text-white/80">Global Remittance</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="hidden md:flex items-center gap-6 mr-4">
                <Link 
                  href="/airtime" 
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer relative z-10"
                >
                  Airtime
                </Link>
                <Link 
                  href="/data" 
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer relative z-10"
                >
                  Data Bundles
                </Link>
                <Link 
                  href="/settings/help" 
                  className="text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer relative z-10"
                >
                  Help
                </Link>
              </div>
              <ThemeToggle />
              <div className="h-6 w-px bg-white/20 hidden sm:block" />
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="font-semibold text-white hover:bg-white/10 border-white/20">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="font-semibold shadow-lg shadow-brand-500/20 bg-white text-zinc-900 hover:bg-zinc-100">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </header>

        {/* Hero Content - Takes Remaining Space */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative z-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20"
                >
                  <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
                  Trusted by 100,000+ users worldwide
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]"
                >
                  Global Airtime & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-indigoBrand-300 to-brand-300">
                    Data Remittance
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-lg"
                >
                  Instantly send mobile top-ups and data bundles to friends and family in over 150 countries. Secure, reliable, and faster than ever.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mt-10 flex flex-col sm:flex-row gap-4 items-start"
                >
                  <Link href="/register" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-bold shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5 bg-white text-zinc-900 hover:bg-zinc-100">
                      Start Sending
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link 
                    href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <img 
                      alt="Get it on Google Play" 
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      className="h-14 sm:h-16 w-auto hover:opacity-90 transition-opacity"
                    />
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="mt-12 flex items-center gap-8 text-white/80"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30 flex items-center justify-center overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" className="h-full w-full" />
                      </div>
                    ))}
                    <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30 flex items-center justify-center text-xs font-bold text-white">
                      +100k
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-300">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-white">4.9/5 Rating</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Larger Phone Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.4, 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                className="relative lg:ml-auto"
              >
                <div className="relative z-10 mx-auto max-w-[500px] lg:max-w-[550px] rounded-[2.5rem] border-[12px] border-zinc-900 bg-zinc-950 shadow-2xl">
                  <div className="h-[48px] w-full bg-zinc-900 rounded-t-[2rem] flex items-center justify-center relative overflow-hidden">
                    <div className="h-6 w-40 bg-zinc-800 rounded-full" />
                  </div>
                  <div className="relative aspect-[9/19] bg-zinc-900 overflow-hidden rounded-b-[2rem]">
                    <div className="absolute inset-0 bg-white dark:bg-zinc-950">
                      {/* App UI Simulation */}
                      <div className="h-full w-full p-8 lg:p-10 flex flex-col">
                         <div className="flex items-center justify-between mb-8">
                           <div>
                             <div className="text-base lg:text-lg text-zinc-500">Total Balance</div>
                             <div className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50">$1,240.50</div>
                           </div>
                           <div className="h-12 w-12 lg:h-14 lg:w-14 rounded-full bg-zinc-100 dark:bg-zinc-800" />
                         </div>

                         <div className="grid grid-cols-2 gap-4 lg:gap-5 mb-6">
                           <div className="flex flex-col justify-center items-start p-6 lg:p-7 rounded-3xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg">
                             <Phone className="h-10 w-10 lg:h-12 lg:w-12 mb-4 flex-shrink-0" />
                             <div className="text-xl lg:text-2xl font-bold leading-tight mb-2">Airtime</div>
                             <div className="text-sm lg:text-base text-white/90 leading-snug">Top up instantly</div>
                           </div>
                           <div className="flex flex-col justify-center items-start p-6 lg:p-7 rounded-3xl bg-gradient-to-br from-indigoBrand-500 to-indigoBrand-600 text-white shadow-lg">
                             <Wifi className="h-10 w-10 lg:h-12 lg:w-12 mb-4 flex-shrink-0" />
                             <div className="text-xl lg:text-2xl font-bold leading-tight mb-2">Data</div>
                             <div className="text-sm lg:text-base text-white/90 leading-snug">Buy bundles</div>
                           </div>
                         </div>

                         <div className="mt-auto">
                           <div className="font-semibold text-base lg:text-lg text-zinc-900 dark:text-zinc-50 mb-3">Recent Activity</div>
                           <div className="space-y-2">
                             {[1, 2].map((i) => (
                               <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900">
                                 <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                   <ArrowRight className="h-4 w-4 -rotate-45" />
                                 </div>
                                 <div className="flex-1">
                                   <div className="font-medium text-sm">Sent to Sarah</div>
                                   <div className="text-xs text-zinc-500">Today, 10:23 AM</div>
                                 </div>
                                 <div className="font-bold text-sm">-$20.00</div>
                               </div>
                             ))}
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-8 top-20 z-20 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-xl dark:bg-zinc-900/95 ring-1 ring-black/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500">Transaction Status</p>
                      <p className="font-bold text-zinc-900 dark:text-zinc-50">Successful</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-8 bottom-40 z-20 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-xl dark:bg-zinc-900/95 ring-1 ring-black/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500">Delivery Time</p>
                      <p className="font-bold text-zinc-900 dark:text-zinc-50">Instant</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            >
              <span className="text-xs text-white/70 font-medium">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="h-4 w-4 text-white/70" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="pb-24">
        {/* Why Choose Us */}
        <section className="py-20 sm:py-32 relative overflow-hidden bg-white dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                Why Choose LidaPay?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Experience the difference with our world-class remittance platform designed for speed, security, and simplicity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Delivery",
                  desc: "Transactions are processed in real-time. No waiting, no delays.",
                  gradient: "from-amber-400 to-orange-500",
                  bg: "bg-amber-50 dark:bg-amber-900/10"
                },
                {
                  icon: ShieldCheck,
                  title: "Bank-Grade Security",
                  desc: "Your data and payments are protected by enterprise-level encryption.",
                  gradient: "from-emerald-400 to-green-500",
                  bg: "bg-emerald-50 dark:bg-emerald-900/10"
                },
                {
                  icon: Globe2,
                  title: "Global Reach",
                  desc: "Connect with over 150 countries instantly through our vast network.",
                  gradient: "from-blue-400 to-indigo-500",
                  bg: "bg-blue-50 dark:bg-blue-900/10"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="relative p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden group"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-[100%] transition-transform group-hover:scale-110`} />
                  
                  <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 relative z-10`}>
                    <feature.icon className="h-7 w-7 text-zinc-900 dark:text-zinc-50" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 relative z-10">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed relative z-10">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-32 bg-zinc-50 dark:bg-zinc-900/50 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                  How It Works
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed">
                  Sending airtime and data is as easy as 1-2-3. No complicated forms or long waiting times.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Create an Account",
                      desc: "Sign up in seconds for free. No hidden fees or maintenance charges."
                    },
                    {
                      step: "02",
                      title: "Choose Recipient",
                      desc: "Select from over 150 countries and enter the recipient's phone number."
                    },
                    {
                      step: "03",
                      title: "Send Instantly",
                      desc: "Choose amount and pay. The top-up arrives instantly on their phone."
                    }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center font-bold text-brand-600 shadow-md border border-zinc-100 dark:border-zinc-700">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{item.title}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-indigoBrand-500/20 rounded-[3rem] blur-3xl" />
                <div className="relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
                      <div>
                        <div className="text-sm text-zinc-500 mb-1">Exchange Rate</div>
                        <div className="font-bold text-zinc-900 dark:text-zinc-50">1 USD = 15.50 GHS</div>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500 mb-2">You Send</div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">100.00</span>
                          <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 rounded-lg px-3 py-1.5 shadow-sm border border-zinc-200 dark:border-zinc-700">
                            <img src="https://flagcdn.com/w40/us.png" className="w-5 h-auto rounded-sm" alt="US" />
                            <span className="font-bold text-sm">USD</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center -my-3 relative z-10">
                        <div className="h-8 w-8 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg border-4 border-white dark:border-zinc-950">
                          <ArrowRight className="h-4 w-4 rotate-90" />
                        </div>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
                        <div className="text-xs text-zinc-500 mb-2">Recipient Gets</div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">1,550.00</span>
                          <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 rounded-lg px-3 py-1.5 shadow-sm border border-zinc-200 dark:border-zinc-700">
                            <img src="https://flagcdn.com/w40/gh.png" className="w-5 h-auto rounded-sm" alt="GH" />
                            <span className="font-bold text-sm">GHS</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full h-12 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg shadow-brand-500/20">
                      Send Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Reach - Connecting 150+ Countries */}
        <section className="relative overflow-hidden py-24 sm:py-32 bg-gradient-to-b from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-1/3 -left-1/4 h-96 w-96 rounded-full bg-brand-500/10 blur-[140px]" />
            <div className="absolute -bottom-1/3 -right-1/4 h-[28rem] w-[28rem] rounded-full bg-indigoBrand-500/10 blur-[160px]" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr,0.9fr]">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500 mb-6">
                  Global Network
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
                  Connecting You to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-rose-500 to-indigoBrand-500">150+</span> Countries
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  Whether you're sending airtime to family in Nigeria, data to friends in Ghana, or topping up your own phone while traveling in Kenya, LidaPay has you covered with reliable coverage on every continent.
                </p>

                <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Ghana", code: "gh" },
                    { name: "Nigeria", code: "ng" },
                    { name: "Kenya", code: "ke" },
                    { name: "South Africa", code: "za" },
                    { name: "Uganda", code: "ug" },
                    { name: "Tanzania", code: "tz" },
                    { name: "USA", code: "us" },
                    { name: "UK", code: "gb" },
                    { name: "Canada", code: "ca" }
                  ].map((country, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 text-left shadow-[0_8px_25px_rgba(15,23,42,0.08)] backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/70"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 shadow-inner">
                        <img
                          src={`https://flagcdn.com/w40/${country.code}.png`}
                          alt={country.name}
                          className="h-5 w-8 rounded-sm object-cover"
                          loading="lazy"
                        />
                      </span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-100">{country.name}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/airtime"
                  className="mt-10 inline-flex items-center gap-2 text-base font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  View all supported countries
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-500/20 via-purple-500/20 to-indigoBrand-500/20 blur-3xl" />
                <div className="relative rounded-[2.5rem] border border-white/40 bg-white/95 p-8 shadow-[0_45px_120px_rgba(15,23,42,0.15)] dark:border-zinc-800 dark:bg-zinc-950/90">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-zinc-500">Live activity across our network</p>
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Recent Transfers</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      { country: "Ghana", from: "United Kingdom", amount: "GHS 150.00", time: "Just now", icon: Phone, accent: "from-pink-500/10 to-pink-500/20", iconColor: "text-pink-600" },
                      { country: "Nigeria", from: "United States", amount: "NGN 5,000", time: "2 mins ago", icon: Wifi, accent: "from-rose-500/10 to-rose-500/20", iconColor: "text-rose-600" },
                      { country: "Kenya", from: "Canada", amount: "KES 1,000", time: "5 mins ago", icon: Phone, accent: "from-indigo-500/10 to-indigo-500/20", iconColor: "text-indigo-600" },
                      { country: "South Africa", from: "Germany", amount: "ZAR 200", time: "12 mins ago", icon: Wifi, accent: "from-purple-500/10 to-purple-500/20", iconColor: "text-purple-600" }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-2xl border border-zinc-100/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800/70 dark:bg-zinc-900/70"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${item.accent} flex items-center justify-center ${item.iconColor}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">{item.country}</p>
                            <p className="text-xs text-zinc-500">From {item.from}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-zinc-900 dark:text-white">{item.amount}</p>
                          <p className="text-xs text-zinc-500">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-brand-500" />
                      Transparent FX rates, zero hidden fees
                    </div>
                    <Link href="/app" className="font-semibold text-brand-600 hover:text-brand-700">
                      Live dashboard →
                    </Link>
                  </div>

                  <button
                    type="button"
                    aria-label="Open assistant"
                    className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 via-rose-500 to-indigoBrand-500 shadow-2xl shadow-brand-500/40 text-white flex items-center justify-center hover:scale-105 transition"
                  >
                    <Sparkles className="h-6 w-6" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="relative rounded-[3rem] bg-zinc-900 dark:bg-zinc-50 overflow-hidden px-6 py-16 sm:px-16 sm:py-24 text-center">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-brand-500/30 blur-[100px]" />
                <div className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[80%] rounded-full bg-indigoBrand-500/30 blur-[100px]" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white dark:text-zinc-900 mb-6">
                  Ready to get started?
                </h2>
                <p className="text-lg text-zinc-300 dark:text-zinc-600 max-w-2xl mx-auto mb-10">
                  Join thousands of users who trust LidaPay for their international airtime and data needs. Create your free account today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/register">
                    <Button size="lg" className="h-14 px-8 text-base bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 border-none">
                      Create Free Account
                    </Button>
                  </Link>
                  <Link 
                    href="https://play.google.com/store/apps/details?id=com.advansistechnologies.lidapay&pcampaignid=web_share" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      alt="Get it on Google Play" 
                      src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      className="h-14 sm:h-16 w-auto hover:opacity-90 transition-opacity"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}